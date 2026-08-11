-- Migration: Storage Buckets and Policies

-- Note: Storage buckets and policies require the `storage` schema which is part of Supabase.
-- This script assumes the storage extension is available.

-- 1. Create Buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('event-assets', 'event-assets', true),
  ('event-documents', 'event-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Path strategy:
-- event-assets/events/{event_id}/<filename>
-- event-documents/events/{event_id}/<filename>
-- event-documents/users/{user_id}/<filename>

------------------------------------------------------------
-- EVENT ASSETS (Public Bucket for images, banners, posters)
------------------------------------------------------------

-- Public read access
DROP POLICY IF EXISTS "Public access to event assets" ON storage.objects;
CREATE POLICY "Public access to event assets" ON storage.objects
FOR SELECT USING (bucket_id = 'event-assets');

-- Insert access: Admins or Coordinators can upload
DROP POLICY IF EXISTS "Admins and Coordinators can upload event assets" ON storage.objects;
CREATE POLICY "Admins and Coordinators can upload event assets" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'event-assets' AND
  auth.role() = 'authenticated' AND
  (
    public.get_user_role() = 'ADMIN' OR
    (
      public.get_user_role() = 'COORDINATOR' AND 
      -- Enforce path matches an event they manage: path is events/<event_id>/<file>
      (storage.foldername(name))[1] = 'events' AND
      (storage.foldername(name))[2]::UUID IN (
        SELECT id FROM public.events WHERE coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = public.get_profile_id())
      )
    )
  )
);

-- Update/Delete access: Admins or Coordinators can manage
DROP POLICY IF EXISTS "Admins and Coordinators can update event assets" ON storage.objects;
CREATE POLICY "Admins and Coordinators can update event assets" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'event-assets' AND
  auth.role() = 'authenticated' AND
  (
    public.get_user_role() = 'ADMIN' OR
    (
      public.get_user_role() = 'COORDINATOR' AND 
      (storage.foldername(name))[1] = 'events' AND
      (storage.foldername(name))[2]::UUID IN (
        SELECT id FROM public.events WHERE coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = public.get_profile_id())
      )
    )
  )
);

DROP POLICY IF EXISTS "Admins and Coordinators can delete event assets" ON storage.objects;
CREATE POLICY "Admins and Coordinators can delete event assets" ON storage.objects
FOR DELETE USING (
  bucket_id = 'event-assets' AND
  auth.role() = 'authenticated' AND
  (
    public.get_user_role() = 'ADMIN' OR
    (
      public.get_user_role() = 'COORDINATOR' AND 
      (storage.foldername(name))[1] = 'events' AND
      (storage.foldername(name))[2]::UUID IN (
        SELECT id FROM public.events WHERE coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = public.get_profile_id())
      )
    )
  )
);


------------------------------------------------------------
-- EVENT DOCUMENTS (Private Bucket for reports, certificates)
------------------------------------------------------------

-- Read access: Admins, Coordinators (for their events), and Participants (for their events/user paths)
DROP POLICY IF EXISTS "Secure read access to event documents" ON storage.objects;
CREATE POLICY "Secure read access to event documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'event-documents' AND
  auth.role() = 'authenticated' AND
  (
    public.get_user_role() = 'ADMIN' OR
    (
      public.get_user_role() = 'COORDINATOR' AND 
      (storage.foldername(name))[1] = 'events' AND
      (storage.foldername(name))[2]::UUID IN (
        SELECT id FROM public.events WHERE coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = public.get_profile_id())
      )
    ) OR
    (
      public.get_user_role() = 'STUDENT' AND
      (
        -- Can read personal documents path: users/{user_id}/<file>
        ((storage.foldername(name))[1] = 'users' AND (storage.foldername(name))[2]::UUID = public.get_profile_id())
        OR
        -- Can read documents for events they are registered for: events/{event_id}/<file>
        ((storage.foldername(name))[1] = 'events' AND (storage.foldername(name))[2]::UUID IN (
          SELECT event_id FROM public.event_participants WHERE participant_id IN (SELECT id FROM public.participants WHERE profile_id = public.get_profile_id())
        ))
      )
    )
  )
);

-- Insert access: Admins or Coordinators can upload documents
DROP POLICY IF EXISTS "Admins and Coordinators can upload event documents" ON storage.objects;
CREATE POLICY "Admins and Coordinators can upload event documents" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'event-documents' AND
  auth.role() = 'authenticated' AND
  (
    public.get_user_role() = 'ADMIN' OR
    (
      public.get_user_role() = 'COORDINATOR' AND 
      (storage.foldername(name))[1] = 'events' AND
      (storage.foldername(name))[2]::UUID IN (
        SELECT id FROM public.events WHERE coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = public.get_profile_id())
      )
    )
  )
);

-- Update/Delete access: Admins or Coordinators can manage
DROP POLICY IF EXISTS "Admins and Coordinators can update event documents" ON storage.objects;
CREATE POLICY "Admins and Coordinators can update event documents" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'event-documents' AND
  auth.role() = 'authenticated' AND
  (
    public.get_user_role() = 'ADMIN' OR
    (
      public.get_user_role() = 'COORDINATOR' AND 
      (storage.foldername(name))[1] = 'events' AND
      (storage.foldername(name))[2]::UUID IN (
        SELECT id FROM public.events WHERE coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = public.get_profile_id())
      )
    )
  )
);

DROP POLICY IF EXISTS "Admins and Coordinators can delete event documents" ON storage.objects;
CREATE POLICY "Admins and Coordinators can delete event documents" ON storage.objects
FOR DELETE USING (
  bucket_id = 'event-documents' AND
  auth.role() = 'authenticated' AND
  (
    public.get_user_role() = 'ADMIN' OR
    (
      public.get_user_role() = 'COORDINATOR' AND 
      (storage.foldername(name))[1] = 'events' AND
      (storage.foldername(name))[2]::UUID IN (
        SELECT id FROM public.events WHERE coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = public.get_profile_id())
      )
    )
  )
);
