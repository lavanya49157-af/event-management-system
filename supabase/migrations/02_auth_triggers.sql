-- Migration: Auth Triggers and Helpers

-- 1. Helper function to securely get the current user's role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT 
LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid() LIMIT 1;
$$;

-- 2. Helper function to securely get the current user's profile ID
CREATE OR REPLACE FUNCTION public.get_profile_id()
RETURNS UUID 
LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE AS $$
  SELECT id FROM public.profiles WHERE user_id = auth.uid() LIMIT 1;
$$;

-- 3. Trigger function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  assigned_role TEXT;
BEGIN
  -- Security: Never trust a role passed from the client metadata for public signups.
  -- Default everyone to STUDENT.
  assigned_role := 'STUDENT';
  
  INSERT INTO public.profiles (user_id, full_name, email, role, department_id)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    NEW.email,
    assigned_role,
    NULLIF(NEW.raw_user_meta_data->>'department_id', '')::UUID
  );
  
  RETURN NEW;
END;
$$;

-- 4. Create the trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Trigger to prevent normal users from modifying sensitive profile fields
CREATE OR REPLACE FUNCTION public.prevent_profile_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  -- If the executing user is NOT an admin, block changes to role and user_id
  IF (public.get_user_role() IS DISTINCT FROM 'ADMIN') THEN
    IF NEW.role IS DISTINCT FROM OLD.role THEN
      RAISE EXCEPTION 'Unauthorized: Only administrators can change roles.';
    END IF;
    IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
      RAISE EXCEPTION 'Unauthorized: Cannot change user_id.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS check_profile_update ON public.profiles;
CREATE TRIGGER check_profile_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.prevent_profile_escalation();

-- 6. RPC function for Admins to elevate users (e.g. set as COORDINATOR)
CREATE OR REPLACE FUNCTION public.set_user_role(target_user_id UUID, new_role TEXT)
RETURNS VOID 
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  -- Verify the executing user is an ADMIN
  IF (public.get_user_role() != 'ADMIN') THEN
    RAISE EXCEPTION 'Unauthorized: Only administrators can change roles';
  END IF;

  -- Validate the role
  IF new_role NOT IN ('ADMIN', 'COORDINATOR', 'STUDENT') THEN
    RAISE EXCEPTION 'Invalid role specified';
  END IF;

  -- Prevent removing the last admin (basic safeguard)
  IF new_role != 'ADMIN' AND (SELECT role FROM public.profiles WHERE user_id = target_user_id) = 'ADMIN' THEN
    IF (SELECT COUNT(*) FROM public.profiles WHERE role = 'ADMIN') <= 1 THEN
      RAISE EXCEPTION 'Cannot remove the last administrator';
    END IF;
  END IF;

  -- Update the role
  UPDATE public.profiles SET role = new_role WHERE user_id = target_user_id;
END;
$$;

-- Secure the RPC so only authenticated users can call it (it checks ADMIN internally)
REVOKE EXECUTE ON FUNCTION public.set_user_role(UUID, TEXT) FROM public;
GRANT EXECUTE ON FUNCTION public.set_user_role(UUID, TEXT) TO authenticated;
