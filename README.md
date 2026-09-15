# Neuro Elle AI

Understanding the brain. Across every stage of life.

A global neuroscience and women's brain-health research, education, and awareness platform. Built with React + Vite + TypeScript, Tailwind CSS, and Supabase (auth + Postgres + Row Level Security). Static-output SPA — no Node.js server required at runtime, so it deploys cleanly to **IONOS Deploy Now** or any static host.

---

## 1. What's built

- Full design system (colors, type, motion) matching the brand spec, plus a signature animated "signal trace" hero visual.
- Public pages: Home, About, Research (+ ThinkNeuro project detail), Women's Brain Health, Brain Health, Learn Neuroscience, Innovation Lab, Insights, Opportunities, Impact, Community, Collaborate, Contact, Privacy, Community Guidelines.
- Auth pages: Login, three-step Register (with an under-13 guardian-consent gate), Forgot/Reset Password.
- Member area: Dashboard (personalized sections, interests sync), Profile settings (download data, delete-account flow, privacy defaults).
- Admin: a role-gated Admin Dashboard **scaffold** — the structure and RLS are in place; individual moderation table views still need to be built out (see Section 6).
- Supabase schema (`supabase/schema.sql`) and Row Level Security policies (`supabase/rls.sql`) covering every table in the spec: profiles, interests, research projects, articles, events, opportunities, comments, reports, mentorship, research submissions, impact/awards, notifications, contact submissions.
- Accessibility: semantic HTML, visible focus states, skip link, `prefers-reduced-motion` support, accessible accordion/menu patterns.
- SEO: per-page title/meta via `PageSEO`, Open Graph tags, JSON-LD Organization schema in `index.html`.

**Everything on this site that would otherwise require a real fact — Myra's bio, research findings, statistics, awards, articles — is left as a clearly labeled placeholder.** Nothing has been invented. Replace placeholders with real content before launch; do not delete the labeling system that distinguishes Original Research / Literature Review / Educational Content / Exploratory Concept / Future Research Direction — it's core to the platform's scientific integrity.

---

## 2. Local development

Requires Node.js 20+.

```bash
npm install
cp .env.example .env       # then fill in your Supabase URL + anon key
npm run dev                # starts at http://localhost:5173
```

Build and preview the production bundle:

```bash
npm run build               # outputs to /dist
npm run preview
```

`npm run build` runs `tsc -b` first — the project currently type-checks and builds with zero errors.

---

## 3. Configure Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy the **Project URL** and **anon public key** into your `.env`.
3. In the **SQL Editor**, run `supabase/schema.sql`, then run `supabase/rls.sql`.
4. In **Authentication → Providers**, email/password is enabled by default. Google/Apple sign-in can be added later under the same providers screen — the frontend `AuthContext` doesn't need to change to support them.
5. In **Authentication → URL Configuration**, set your Site URL and add `/reset-password` as a redirect URL once you have a real domain.
6. Decide on **email confirmation** (Authentication → Providers → Email → "Confirm email"). If it's on, new members won't have a session until they verify — the registration flow already handles this (interests are queued in `localStorage` and synced on first authenticated dashboard load).

### Creating your first admin account

There's no self-serve way to become an admin (by design). After registering a normal account:

```sql
update profiles set role = 'admin' where id = 'the-users-uuid-from-auth.users';
```

Run this once in the Supabase SQL Editor for your own account.

---

## 4. Project structure

```
src/
  components/     Reusable UI: Header, Footer, CTAButton, Section, Accordion, etc.
  pages/          One file per route
  data/           Structural site copy (nav, pillars, learn modules) — no fabricated facts
  lib/            supabaseClient.ts
  context/        AuthContext (session + profile state)
  types/          Shared TypeScript domain types
supabase/
  schema.sql      Tables, triggers, indexes, interest catalog seed
  rls.sql         Row Level Security policies for every table
```

---

## 5. Push to GitHub

```bash
git init
git add .
git commit -m "Initial Neuro Elle AI build"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/neuro-elle-ai.git
git push -u origin main
```

Make sure `.env` is **not** committed (it's already in `.gitignore` from the Vite template — double check before pushing).

---

## 6. Deploy via IONOS Deploy Now

1. In IONOS, create a new **Deploy Now** project and connect your GitHub repository.
2. Framework preset: **Vite** (or "static site" if Vite isn't listed — the build command is the same).
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variables in the Deploy Now project settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Because this is a client-side-routed SPA (React Router), configure a rewrite/fallback rule so any path (e.g. `/research/thinkneuro`) serves `index.html` instead of a 404. IONOS Deploy Now's static-site hosting supports SPA fallback in its project settings — enable "Single Page Application" mode if offered, or add a rewrite rule sending all paths to `/index.html`.
7. Trigger a deploy. Subsequent pushes to `main` will redeploy automatically once connected.

### Connecting your domain

1. In the Deploy Now project, go to **Domains** and add your domain (e.g. `neuroelle.ai`).
2. IONOS will show you DNS records (usually a CNAME or A record) to add at your domain's DNS provider — if the domain is already with IONOS, this can often be done with one click.
3. SSL is provisioned automatically by IONOS Deploy Now once the domain resolves correctly — no manual certificate steps needed.
4. Update your Supabase project's **Authentication → URL Configuration** Site URL to your real domain once it's live, and add `https://yourdomain.com/reset-password` to the redirect allow-list.

---

## 7. What must be completed before public launch

This is a working, tested build — but it is **not launch-ready** on its own. The following require human review before this goes live publicly, especially because minors will use the platform:

- **Legal review**: Privacy Policy, Terms of Use, and Community Guidelines pages currently contain honest placeholders and must be reviewed by a qualified privacy/legal professional for COPPA, GDPR, CCPA, and any other applicable jurisdiction before launch.
- **Account deletion**: the "Delete My Account" button in `/profile` currently shows an explanatory alert rather than deleting anything. Real deletion requires a Supabase **Edge Function using the service_role key**, which must run server-side — never in frontend code. This needs to be built and wired up.
- **Content moderation**: comments and reports have RLS policies and a `pending` status model, but there's no admin UI yet to actually review/approve/reject them. The Admin Dashboard is a scaffold, not a working moderation queue.
- **Mentorship workflow**: the `mentorship_requests` table and RLS enforce that students and mentors can't see each other until an admin explicitly approves and matches them — but the actual admin-side matching UI still needs to be built.
- **Under-13 guardian consent**: the registration flow blocks self-registration and points to the Contact page, but there is no actual guardian-consent intake process yet — that needs a real designed workflow, likely with legal input.
- **Spam/abuse protection**: the contact form has a basic honeypot field; production should add a real CAPTCHA or server-side rate limiting (e.g. via a Supabase Edge Function) before launch.
- **Content**: every placeholder (Myra's bio/photo, research poster, articles, opportunities, statistics, citations) needs real content before this goes public. Do not publish fabricated facts to fill these in.
- **Testing checklist**: registration (including under-13 path), login, password reset, profile edit, admin role escalation via SQL, RLS verification (log in as two different non-admin accounts and confirm neither can read the other's private data), mobile responsiveness pass, and a Lighthouse accessibility/performance audit.

---

## 8. Tech stack summary

React 19 · Vite · TypeScript · Tailwind CSS v4 · React Router v7 · Supabase (Postgres + Auth + RLS) · lucide-react icons.
