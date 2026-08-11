-- Migration: RLS Policies

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coordinators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;


------------------------------------------------------------
-- PROFILES
------------------------------------------------------------
-- Public cannot read profiles directly. We removed USING (true).
DROP POLICY IF EXISTS "Users can read own profile." ON public.profiles;
CREATE POLICY "Users can read own profile." ON public.profiles FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can read all profiles." ON public.profiles;
CREATE POLICY "Admins can read all profiles." ON public.profiles FOR SELECT USING (public.get_user_role() = 'ADMIN');

DROP POLICY IF EXISTS "Users can update own profile." ON public.profiles;
-- The `prevent_profile_escalation` trigger prevents changing role/user_id during this update.
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can update any profile." ON public.profiles;
CREATE POLICY "Admins can update any profile." ON public.profiles FOR UPDATE USING (public.get_user_role() = 'ADMIN');


------------------------------------------------------------
-- DEPARTMENTS & CATEGORIES
------------------------------------------------------------
DROP POLICY IF EXISTS "Departments are viewable by everyone." ON public.departments;
CREATE POLICY "Departments are viewable by everyone." ON public.departments FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage departments." ON public.departments;
CREATE POLICY "Admins can manage departments." ON public.departments USING (public.get_user_role() = 'ADMIN');

DROP POLICY IF EXISTS "Categories are viewable by everyone." ON public.categories;
CREATE POLICY "Categories are viewable by everyone." ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage categories." ON public.categories;
CREATE POLICY "Admins can manage categories." ON public.categories USING (public.get_user_role() = 'ADMIN');


------------------------------------------------------------
-- COORDINATORS
------------------------------------------------------------
-- Sensitive internal coordinator details restricted. Public info is in `public_coordinators_view`.
DROP POLICY IF EXISTS "Coordinators can read own record." ON public.coordinators;
CREATE POLICY "Coordinators can read own record." ON public.coordinators FOR SELECT USING (profile_id = public.get_profile_id());

DROP POLICY IF EXISTS "Admins can view and manage coordinators." ON public.coordinators;
CREATE POLICY "Admins can view and manage coordinators." ON public.coordinators FOR ALL USING (public.get_user_role() = 'ADMIN');


------------------------------------------------------------
-- EVENTS
------------------------------------------------------------
DROP POLICY IF EXISTS "Published events are viewable by everyone." ON public.events;
CREATE POLICY "Published events are viewable by everyone." ON public.events FOR SELECT USING (is_published = true AND status != 'DRAFT');

DROP POLICY IF EXISTS "Coordinators can view their own draft events." ON public.events;
CREATE POLICY "Coordinators can view their own draft events." ON public.events FOR SELECT USING (
  coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = public.get_profile_id())
);

DROP POLICY IF EXISTS "Admins can view all events." ON public.events;
CREATE POLICY "Admins can view all events." ON public.events FOR SELECT USING (public.get_user_role() = 'ADMIN');

DROP POLICY IF EXISTS "Admins can manage events." ON public.events;
CREATE POLICY "Admins can manage events." ON public.events FOR ALL USING (public.get_user_role() = 'ADMIN');

DROP POLICY IF EXISTS "Coordinators can manage their own events." ON public.events;
CREATE POLICY "Coordinators can manage their own events." ON public.events FOR ALL USING (
  coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = public.get_profile_id())
) WITH CHECK (
  coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = public.get_profile_id())
);


------------------------------------------------------------
-- PARTICIPANTS (Students)
------------------------------------------------------------
-- Uses UUID profile_id relationship from 01_5_fix_schema.sql
DROP POLICY IF EXISTS "Participants can view their own record." ON public.participants;
CREATE POLICY "Participants can view their own record." ON public.participants FOR SELECT USING (profile_id = public.get_profile_id());

DROP POLICY IF EXISTS "Coordinators and Admins can view participants." ON public.participants;
CREATE POLICY "Coordinators and Admins can view participants." ON public.participants FOR SELECT USING (public.get_user_role() IN ('ADMIN', 'COORDINATOR'));

DROP POLICY IF EXISTS "Participants can insert their own record." ON public.participants;
CREATE POLICY "Participants can insert their own record." ON public.participants FOR INSERT WITH CHECK (profile_id = public.get_profile_id());

DROP POLICY IF EXISTS "Participants can update their own record." ON public.participants;
CREATE POLICY "Participants can update their own record." ON public.participants FOR UPDATE USING (profile_id = public.get_profile_id());


------------------------------------------------------------
-- EVENT_PARTICIPANTS (Registrations)
------------------------------------------------------------
DROP POLICY IF EXISTS "Participants can view their own registrations." ON public.event_participants;
CREATE POLICY "Participants can view their own registrations." ON public.event_participants FOR SELECT USING (
  participant_id IN (SELECT id FROM public.participants WHERE profile_id = public.get_profile_id())
);

DROP POLICY IF EXISTS "Coordinators can view registrations for their events." ON public.event_participants;
CREATE POLICY "Coordinators can view registrations for their events." ON public.event_participants FOR SELECT USING (
  event_id IN (SELECT id FROM public.events WHERE coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = public.get_profile_id()))
);

DROP POLICY IF EXISTS "Admins can view all registrations." ON public.event_participants;
CREATE POLICY "Admins can view all registrations." ON public.event_participants FOR SELECT USING (public.get_user_role() = 'ADMIN');

DROP POLICY IF EXISTS "Participants can register themselves." ON public.event_participants;
CREATE POLICY "Participants can register themselves." ON public.event_participants FOR INSERT WITH CHECK (
  participant_id IN (SELECT id FROM public.participants WHERE profile_id = public.get_profile_id())
  AND event_id IN (
    SELECT id FROM public.events 
    WHERE is_published = true 
    AND registration_enabled = true 
    AND status NOT IN ('CANCELLED', 'DRAFT', 'COMPLETED')
    AND (registration_deadline IS NULL OR registration_deadline > NOW())
  )
);

DROP POLICY IF EXISTS "Coordinators can manage registrations for their events." ON public.event_participants;
CREATE POLICY "Coordinators can manage registrations for their events." ON public.event_participants FOR UPDATE USING (
  event_id IN (SELECT id FROM public.events WHERE coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = public.get_profile_id()))
);

DROP POLICY IF EXISTS "Admins can manage all registrations." ON public.event_participants;
CREATE POLICY "Admins can manage all registrations." ON public.event_participants FOR ALL USING (public.get_user_role() = 'ADMIN');


------------------------------------------------------------
-- EVENT_REPORTS, MEDIA, DOCUMENTS, ACHIEVEMENTS
------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_event_published(chk_event_id UUID) RETURNS BOOLEAN 
LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE AS $$
  SELECT EXISTS (SELECT 1 FROM public.events WHERE id = chk_event_id AND is_published = true AND status != 'DRAFT');
$$;

DROP POLICY IF EXISTS "Published event data is viewable by everyone." ON public.event_reports;
CREATE POLICY "Published event data is viewable by everyone." ON public.event_reports FOR SELECT USING (public.is_event_published(event_id));

DROP POLICY IF EXISTS "Published event media is viewable by everyone." ON public.event_media;
CREATE POLICY "Published event media is viewable by everyone." ON public.event_media FOR SELECT USING (public.is_event_published(event_id));

DROP POLICY IF EXISTS "Participants can view their own achievements." ON public.event_achievements;
CREATE POLICY "Participants can view their own achievements." ON public.event_achievements FOR SELECT USING (
  participant_id IN (SELECT id FROM public.participants WHERE profile_id = public.get_profile_id())
);

DROP POLICY IF EXISTS "Public can view achievements for published events." ON public.event_achievements;
CREATE POLICY "Public can view achievements for published events." ON public.event_achievements FOR SELECT USING (public.is_event_published(event_id));

DROP POLICY IF EXISTS "Coordinators can manage reports for their events." ON public.event_reports;
CREATE POLICY "Coordinators can manage reports for their events." ON public.event_reports FOR ALL USING (
  event_id IN (SELECT id FROM public.events WHERE coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = public.get_profile_id()))
);

DROP POLICY IF EXISTS "Coordinators can manage media for their events." ON public.event_media;
CREATE POLICY "Coordinators can manage media for their events." ON public.event_media FOR ALL USING (
  event_id IN (SELECT id FROM public.events WHERE coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = public.get_profile_id()))
);

DROP POLICY IF EXISTS "Coordinators can manage achievements for their events." ON public.event_achievements;
CREATE POLICY "Coordinators can manage achievements for their events." ON public.event_achievements FOR ALL USING (
  event_id IN (SELECT id FROM public.events WHERE coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = public.get_profile_id()))
);

DROP POLICY IF EXISTS "Admins can manage reports, media, achievements." ON public.event_reports;
CREATE POLICY "Admins can manage reports, media, achievements." ON public.event_reports FOR ALL USING (public.get_user_role() = 'ADMIN');

DROP POLICY IF EXISTS "Admins can manage media." ON public.event_media;
CREATE POLICY "Admins can manage media." ON public.event_media FOR ALL USING (public.get_user_role() = 'ADMIN');

DROP POLICY IF EXISTS "Admins can manage achievements." ON public.event_achievements;
CREATE POLICY "Admins can manage achievements." ON public.event_achievements FOR ALL USING (public.get_user_role() = 'ADMIN');


------------------------------------------------------------
-- FEEDBACK
------------------------------------------------------------
DROP POLICY IF EXISTS "Participants can insert their own feedback." ON public.feedback;
CREATE POLICY "Participants can insert their own feedback." ON public.feedback FOR INSERT WITH CHECK (
  participant_id IN (SELECT id FROM public.participants WHERE profile_id = public.get_profile_id())
  AND event_id IN (SELECT event_id FROM public.event_participants WHERE participant_id IN (SELECT id FROM public.participants WHERE profile_id = public.get_profile_id()) AND attendance_status = 'PRESENT')
);

DROP POLICY IF EXISTS "Participants can read their own feedback." ON public.feedback;
CREATE POLICY "Participants can read their own feedback." ON public.feedback FOR SELECT USING (
  participant_id IN (SELECT id FROM public.participants WHERE profile_id = public.get_profile_id())
);

DROP POLICY IF EXISTS "Coordinators can view feedback for their events." ON public.feedback;
CREATE POLICY "Coordinators can view feedback for their events." ON public.feedback FOR SELECT USING (
  event_id IN (SELECT id FROM public.events WHERE coordinator_id IN (SELECT id FROM public.coordinators WHERE profile_id = public.get_profile_id()))
);

DROP POLICY IF EXISTS "Admins can view all feedback." ON public.feedback;
CREATE POLICY "Admins can view all feedback." ON public.feedback FOR SELECT USING (public.get_user_role() = 'ADMIN');


------------------------------------------------------------
-- AUDIT LOGS
------------------------------------------------------------
DROP POLICY IF EXISTS "Admins can view audit logs." ON public.audit_logs;
CREATE POLICY "Admins can view audit logs." ON public.audit_logs FOR SELECT USING (public.get_user_role() = 'ADMIN');

-- Universal block on update/delete for audit logs.
DROP POLICY IF EXISTS "No one can update audit logs." ON public.audit_logs;
CREATE POLICY "No one can update audit logs." ON public.audit_logs FOR UPDATE USING (false);

DROP POLICY IF EXISTS "No one can delete audit logs." ON public.audit_logs;
CREATE POLICY "No one can delete audit logs." ON public.audit_logs FOR DELETE USING (false);

-- System functions (e.g. database triggers) will insert logs directly. Users cannot manually insert them.
DROP POLICY IF EXISTS "No one can manually insert audit logs." ON public.audit_logs;
CREATE POLICY "No one can manually insert audit logs." ON public.audit_logs FOR INSERT WITH CHECK (false);


------------------------------------------------------------
-- NOTIFICATIONS
------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view their own notifications." ON public.notifications;
CREATE POLICY "Users can view their own notifications." ON public.notifications FOR SELECT USING (user_id = public.get_profile_id());

DROP POLICY IF EXISTS "Users can update their own notifications (mark read)." ON public.notifications;
CREATE POLICY "Users can update their own notifications (mark read)." ON public.notifications FOR UPDATE USING (user_id = public.get_profile_id());
