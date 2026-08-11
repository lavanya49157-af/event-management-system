-- Migration: Fix Schema for UUID Authorization and Constraints

-- 1. Add profile_id to participants (Replacing email reliance)
ALTER TABLE public.participants ADD COLUMN profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE;

-- Update existing participants if any (matching by email, just in case)
UPDATE public.participants p
SET profile_id = (SELECT id FROM public.profiles pr WHERE pr.email = p.email);

-- Make profile_id NOT NULL and UNIQUE (A profile can only have one participant record)
ALTER TABLE public.participants ALTER COLUMN profile_id SET NOT NULL;
ALTER TABLE public.participants ADD CONSTRAINT unique_profile_participant UNIQUE (profile_id);

-- 2. Add capacity constraint trigger to event_participants
CREATE OR REPLACE FUNCTION public.check_event_capacity()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  current_count INT;
  max_cap INT;
BEGIN
  -- Get current registration count and max capacity
  SELECT COUNT(*) INTO current_count FROM public.event_participants WHERE event_id = NEW.event_id;
  SELECT max_participants INTO max_cap FROM public.events WHERE id = NEW.event_id;
  
  -- If max_participants is set and capacity is reached, block insertion
  IF max_cap IS NOT NULL AND current_count >= max_cap THEN
    RAISE EXCEPTION 'Event capacity has been reached.';
  END IF;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS check_event_capacity_trigger ON public.event_participants;
CREATE TRIGGER check_event_capacity_trigger
  BEFORE INSERT ON public.event_participants
  FOR EACH ROW EXECUTE PROCEDURE public.check_event_capacity();

-- 3. Add Feedback unique constraint (One feedback per participant per event)
ALTER TABLE public.feedback DROP CONSTRAINT IF EXISTS unique_event_participant_feedback;
ALTER TABLE public.feedback ADD CONSTRAINT unique_event_participant_feedback UNIQUE(event_id, participant_id);

-- 4. Create Public Views for safe data exposure (Instead of exposing Profiles table)
CREATE OR REPLACE VIEW public.public_coordinators_view AS
SELECT 
  c.id as coordinator_id,
  c.department_id,
  c.designation,
  p.full_name,
  p.avatar_url
FROM public.coordinators c
JOIN public.profiles p ON c.profile_id = p.id;
-- Views bypass RLS of underlying tables if owned by a privileged user (default behavior in Supabase unless secured), 
-- but we grant select to public explicitly.
GRANT SELECT ON public.public_coordinators_view TO authenticated, anon;
