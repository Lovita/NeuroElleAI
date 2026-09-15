-- ==========================================================
-- Neuro Elle AI — Row Level Security Policies
-- Run AFTER schema.sql. This enables RLS on every table that
-- holds user or moderated data and defines the access rules.
-- ==========================================================

-- ---------- Helper: is the current user an admin? ----------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_mentor_or_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role in ('mentor','admin')
  );
$$;

-- ================= PROFILES =================
alter table profiles enable row level security;

create policy "profiles: self select"
  on profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "profiles: self update"
  on profiles for update
  using (auth.uid() = id or public.is_admin());

-- Inserts happen via the handle_new_user() trigger (security definer),
-- so no public insert policy is granted here.

-- ================= INTERESTS (public read-only catalog) =================
alter table interests enable row level security;

create policy "interests: public read"
  on interests for select
  using (true);

-- ================= USER_INTERESTS =================
alter table user_interests enable row level security;

create policy "user_interests: self manage"
  on user_interests for all
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

-- ================= RESEARCH PROJECTS =================
alter table research_projects enable row level security;

create policy "research_projects: public read published"
  on research_projects for select
  using (published = true or public.is_admin());

create policy "research_projects: admin write"
  on research_projects for insert with check (public.is_admin());
create policy "research_projects: admin update"
  on research_projects for update using (public.is_admin());
create policy "research_projects: admin delete"
  on research_projects for delete using (public.is_admin());

-- ================= RESEARCH FOLLOWERS =================
alter table research_followers enable row level security;

create policy "research_followers: self manage"
  on research_followers for all
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id or public.is_admin());

-- ================= ARTICLES =================
alter table articles enable row level security;

create policy "articles: public read published"
  on articles for select
  using (published = true or public.is_admin());

create policy "articles: contributor+ insert"
  on articles for insert
  with check (
    exists (select 1 from profiles where id = auth.uid() and role in ('contributor','admin'))
  );

create policy "articles: admin update"
  on articles for update using (public.is_admin());
create policy "articles: admin delete"
  on articles for delete using (public.is_admin());

-- ================= SAVED CONTENT =================
alter table saved_content enable row level security;

create policy "saved_content: self manage"
  on saved_content for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ================= EVENTS =================
alter table events enable row level security;

create policy "events: public read published"
  on events for select using (published = true or public.is_admin());
create policy "events: admin write"
  on events for insert with check (public.is_admin());
create policy "events: admin update"
  on events for update using (public.is_admin());
create policy "events: admin delete"
  on events for delete using (public.is_admin());

-- ================= EVENT REGISTRATIONS =================
alter table event_registrations enable row level security;

create policy "event_registrations: self manage"
  on event_registrations for all
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id);

-- ================= OPPORTUNITIES =================
alter table opportunities enable row level security;

create policy "opportunities: public read published"
  on opportunities for select using (published = true or public.is_admin());
create policy "opportunities: admin write"
  on opportunities for insert with check (public.is_admin());
create policy "opportunities: admin update"
  on opportunities for update using (public.is_admin());
create policy "opportunities: admin delete"
  on opportunities for delete using (public.is_admin());

-- ================= COMMENTS (moderated) =================
alter table comments enable row level security;

create policy "comments: read approved or own or admin"
  on comments for select
  using (status = 'approved' or user_id = auth.uid() or public.is_admin());

create policy "comments: authenticated insert as pending"
  on comments for insert
  with check (auth.uid() = user_id and status = 'pending');

create policy "comments: admin moderate"
  on comments for update using (public.is_admin());
create policy "comments: admin delete"
  on comments for delete using (public.is_admin());

-- ================= REPORTS =================
alter table reports enable row level security;

create policy "reports: anyone authenticated can file"
  on reports for insert with check (auth.uid() = reporter_id);

create policy "reports: admin read"
  on reports for select using (public.is_admin());
create policy "reports: admin update"
  on reports for update using (public.is_admin());

-- ================= NEWSLETTER PREFERENCES =================
alter table newsletter_preferences enable row level security;

create policy "newsletter_preferences: self manage"
  on newsletter_preferences for all
  using (auth.uid() = user_id or public.is_admin())
  with check (auth.uid() = user_id);

-- ================= MENTOR APPLICATIONS =================
alter table mentor_applications enable row level security;

create policy "mentor_applications: self insert"
  on mentor_applications for insert with check (auth.uid() = user_id);
create policy "mentor_applications: self or admin read"
  on mentor_applications for select using (auth.uid() = user_id or public.is_admin());
create policy "mentor_applications: admin review"
  on mentor_applications for update using (public.is_admin());

-- ================= MENTORSHIP REQUESTS =================
-- Deliberately restrictive: a student can create a request and see their own;
-- a mentor only sees requests routed to them by an admin; only an admin can
-- move a request out of pending_review. No direct student<->mentor visibility
-- is granted before admin approval, by design (see Community Safety spec).
alter table mentorship_requests enable row level security;

create policy "mentorship_requests: student insert"
  on mentorship_requests for insert with check (auth.uid() = student_id);

create policy "mentorship_requests: student/mentor/admin read"
  on mentorship_requests for select
  using (
    auth.uid() = student_id
    or (auth.uid() = mentor_id and status in ('matched'))
    or public.is_admin()
  );

create policy "mentorship_requests: admin update"
  on mentorship_requests for update using (public.is_admin());

-- ================= RESEARCH SUBMISSIONS =================
alter table research_submissions enable row level security;

create policy "research_submissions: self insert"
  on research_submissions for insert with check (auth.uid() = submitted_by);
create policy "research_submissions: self or admin read"
  on research_submissions for select using (auth.uid() = submitted_by or public.is_admin());
create policy "research_submissions: admin review"
  on research_submissions for update using (public.is_admin());

-- ================= IMPACT ENTRIES & AWARDS =================
alter table impact_entries enable row level security;
create policy "impact_entries: public read published"
  on impact_entries for select using (published = true or public.is_admin());
create policy "impact_entries: admin write"
  on impact_entries for insert with check (public.is_admin());
create policy "impact_entries: admin update"
  on impact_entries for update using (public.is_admin());

alter table awards enable row level security;
create policy "awards: public read published"
  on awards for select using (published = true or public.is_admin());
create policy "awards: admin write"
  on awards for insert with check (public.is_admin());
create policy "awards: admin update"
  on awards for update using (public.is_admin());

-- ================= NOTIFICATIONS =================
alter table notifications enable row level security;

create policy "notifications: self read"
  on notifications for select using (auth.uid() = user_id);
create policy "notifications: self update (mark read)"
  on notifications for update using (auth.uid() = user_id);

-- ================= CONTACT SUBMISSIONS =================
-- Public can insert (the contact form); only admins can read submissions.
alter table contact_submissions enable row level security;

create policy "contact_submissions: public insert"
  on contact_submissions for insert with check (true);
create policy "contact_submissions: admin read"
  on contact_submissions for select using (public.is_admin());

-- ==========================================================
-- NOTE ON MINOR PRIVACY:
-- profiles.is_private defaults to true and there is no policy
-- granting public/anon SELECT on profiles — every read requires
-- auth.uid() = id or an admin role. If a future "public researcher
-- profile" feature is added, it must be a SEPARATE table/view that
-- explicitly excludes minors (age_group in ('under_13','13_15','16_17'))
-- rather than loosening this policy.
-- ==========================================================
