-- ==========================================================
-- Neuro Elle AI — Supabase Schema
-- Run this in the Supabase SQL Editor on a fresh project,
-- then run rls.sql. Idempotent-ish: uses IF NOT EXISTS where sane.
-- ==========================================================

create extension if not exists "pgcrypto";

-- ---------- ENUM-LIKE CHECK CONSTRAINTS ----------
-- (Using text + check constraints instead of Postgres enums so values
--  can be extended later without an ALTER TYPE migration.)

-- ---------- PROFILES ----------
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  country text,
  age_group text check (
    age_group in ('under_13','13_15','16_17','18_24','25_39','40_49','50_64','65_plus','prefer_not_to_say')
  ),
  bio text,
  avatar_url text,
  role text not null default 'member' check (
    role in ('member','student_researcher','mentor','contributor','admin')
  ),
  is_private boolean not null default true,
  newsletter_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- INTERESTS ----------
create table if not exists interests (
  id uuid primary key default gen_random_uuid(),
  label text not null unique,
  slug text not null unique
);

create table if not exists user_interests (
  user_id uuid not null references profiles(id) on delete cascade,
  interest_label text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, interest_label)
);

-- ---------- RESEARCH ----------
create table if not exists research_projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  researcher text not null,
  summary text,
  status text not null check (
    status in ('original_research','literature_review','educational_content','exploratory_concept','future_research_direction')
  ),
  poster_url text,
  summary_pdf_url text,
  citations jsonb not null default '[]'::jsonb,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists research_followers (
  user_id uuid not null references profiles(id) on delete cascade,
  research_project_id uuid not null references research_projects(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, research_project_id)
);

-- ---------- ARTICLES (INSIGHTS JOURNAL) ----------
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  author text not null,
  category text not null,
  reading_time_minutes int not null default 5,
  excerpt text,
  body text,
  status text not null check (
    status in ('original_research','literature_review','educational_content','exploratory_concept','future_research_direction')
  ),
  featured_image_url text,
  citations jsonb not null default '[]'::jsonb,
  published boolean not null default false,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists saved_content (
  user_id uuid not null references profiles(id) on delete cascade,
  content_type text not null check (content_type in ('article','research_project','event','opportunity')),
  content_id uuid not null,
  created_at timestamptz not null default now(),
  primary key (user_id, content_type, content_id)
);

-- ---------- EVENTS ----------
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  format text not null default 'Online' check (format in ('Online','In Person','Hybrid')),
  location text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists event_registrations (
  user_id uuid not null references profiles(id) on delete cascade,
  event_id uuid not null references events(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, event_id)
);

-- ---------- OPPORTUNITIES ----------
create table if not exists opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organization text not null,
  category text not null check (
    category in (
      'Science Competitions','Research Programs','Internships','STEM Programs',
      'Scholarships','Science Fairs','Hackathons','Mentorship','Conferences','Volunteer Opportunities'
    )
  ),
  age_range text,
  region text,
  deadline date,
  format text not null default 'Online' check (format in ('Online','In Person','Hybrid')),
  url text not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- COMMENTS & MODERATION ----------
create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('article','research_project','event')),
  content_id uuid not null,
  user_id uuid not null references profiles(id) on delete cascade,
  body text not null,
  status text not null default 'pending' check (status in ('pending','approved','removed')),
  created_at timestamptz not null default now()
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references profiles(id) on delete set null,
  target_type text not null check (target_type in ('comment','profile','article','research_project')),
  target_id uuid not null,
  reason text not null,
  status text not null default 'open' check (status in ('open','reviewed','dismissed')),
  created_at timestamptz not null default now()
);

-- ---------- NEWSLETTER ----------
create table if not exists newsletter_preferences (
  user_id uuid primary key references profiles(id) on delete cascade,
  segments jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------- MENTORSHIP ----------
create table if not exists mentor_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  motivation text,
  credentials text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  reviewed_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists mentorship_requests (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references profiles(id) on delete cascade,
  mentor_id uuid references profiles(id) on delete set null,
  topic text,
  status text not null default 'pending_review' check (
    status in ('pending_review','approved','matched','declined')
  ),
  reviewed_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------- RESEARCH SUBMISSIONS ----------
create table if not exists research_submissions (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid not null references profiles(id) on delete cascade,
  title text not null,
  summary text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  reviewed_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------- IMPACT & AWARDS ----------
create table if not exists impact_entries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  entry_type text not null check (
    entry_type in ('award','presentation','publication','speaking','workshop','collaboration','media')
  ),
  description text,
  entry_date date,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists awards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  awarding_body text,
  award_date date,
  description text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- NOTIFICATIONS ----------
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  body text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- CONTACT SUBMISSIONS ----------
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organization text,
  email text not null,
  reason text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- ---------- INDEXES ----------
create index if not exists idx_articles_category on articles(category);
create index if not exists idx_articles_published on articles(published);
create index if not exists idx_opportunities_category on opportunities(category);
create index if not exists idx_opportunities_deadline on opportunities(deadline);
create index if not exists idx_events_starts_at on events(starts_at);
create index if not exists idx_comments_content on comments(content_type, content_id);
create index if not exists idx_reports_status on reports(status);
create index if not exists idx_research_projects_status on research_projects(status);

-- ---------- AUTO-CREATE PROFILE ON SIGNUP ----------
-- Reads display_name / country / age_group / newsletter_opt_in out of the
-- signUp() call's `options.data` (auth.users.raw_user_meta_data) so the
-- profile row exists even before email confirmation completes.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, country, age_group, newsletter_opt_in)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', 'New Member'),
    new.raw_user_meta_data->>'country',
    new.raw_user_meta_data->>'age_group',
    coalesce((new.raw_user_meta_data->>'newsletter_opt_in')::boolean, false)
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------- updated_at HELPER ----------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on profiles;
create trigger set_profiles_updated_at before update on profiles
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_research_projects_updated_at on research_projects;
create trigger set_research_projects_updated_at before update on research_projects
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_articles_updated_at on articles;
create trigger set_articles_updated_at before update on articles
  for each row execute procedure public.set_updated_at();

-- ---------- SEED: interest catalog (safe to re-run) ----------
insert into interests (label, slug) values
  ('Neuroscience','neuroscience'),
  ('Women''s Brain Health','womens-brain-health'),
  ('Perimenopause Research','perimenopause-research'),
  ('Environmental Neuroscience','environmental-neuroscience'),
  ('Wearable Technology','wearable-technology'),
  ('AI & Machine Learning','ai-machine-learning'),
  ('Brain Health','brain-health'),
  ('Sleep & Cognition','sleep-cognition'),
  ('Teen STEM','teen-stem'),
  ('Research Opportunities','research-opportunities'),
  ('Science Competitions','science-competitions'),
  ('Mentorship','mentorship'),
  ('Women''s Health Awareness','womens-health-awareness'),
  ('Biomedical Engineering','biomedical-engineering'),
  ('Computational Neuroscience','computational-neuroscience')
on conflict (label) do nothing;
