# Student Login + Tracker — Setup Guide

The site now has a **student login** and a personal **tracker dashboard**
(`/dashboard`) with an editable spreadsheet grid whose data saves per student.

Right now it runs in **demo mode**: you can click **Student Login → Sign in with
Google**, and it signs you in locally and saves data in your browser only. To
turn on real Google school-email login with data synced across devices, follow
the steps below. This is the only part that needs *your* accounts — I've built
everything else.

---

## What you do (~15 min, one time)

### 1. Create a free Supabase project
1. Go to <https://supabase.com> → **Start your project** → sign in with GitHub or email.
2. **New project** → name it (e.g. `caap-tracker`), set a database password, pick a region near you.
3. Wait ~2 min for it to provision.

### 2. Create the database table
1. In the project, open **SQL Editor → New query**.
2. Open `supabase/schema.sql` from this repo, copy all of it, paste, and click **Run**.
   This creates the `tracker_docs` table with row-level security so each student
   only sees their own data.

### 3. Turn on Google login
1. In Supabase: **Authentication → Providers → Google → Enable**.
2. It shows a **Callback URL** like
   `https://YOUR-REF.supabase.co/auth/v1/callback`. Copy it.
3. In **Google Cloud Console** (<https://console.cloud.google.com>):
   - Create/select a project → **APIs & Services → Credentials**.
   - **Create Credentials → OAuth client ID → Web application**.
   - Under **Authorized redirect URIs**, paste the Supabase callback URL.
   - Copy the **Client ID** and **Client secret**.
4. Back in Supabase Google provider settings, paste the **Client ID** and
   **Client secret** → **Save**.

> **School domain note:** If your school's Google Workspace admin restricts
> third-party apps, they may need to allow this OAuth app. If students can't
> sign in with their school account, either ask the admin to allow-list it, or
> let students use a personal Google account.

### 4. Add your keys to the site
1. In Supabase: **Project Settings → API**. Copy the **Project URL** and the
   **anon public** key.
2. In the repo root, copy `.env.example` to `.env.local` and fill it in:
   ```
   VITE_SUPABASE_URL=https://YOUR-REF.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   VITE_ALLOWED_EMAIL_DOMAIN=students.myschool.edu
   ```
   - `VITE_ALLOWED_EMAIL_DOMAIN` is optional — set it to your school domain to
     reject non-school Google accounts. Leave blank to allow any Google account.
3. Restart the dev server (`npm run dev`). Demo mode disappears and real Google
   login is live.

### 5. Deploy
When you deploy to Azure Static Web Apps, add the same three `VITE_...` values as
build environment variables (Azure Portal → your Static Web App → **Configuration**,
or in the GitHub Actions build workflow), so the production build picks them up.

> **How this repo is wired:** `.github/workflows/azure-static-web-apps.yml`
> passes `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and
> `VITE_ALLOWED_EMAIL_DOMAIN` from **GitHub repo variables** into the build.
> Set them under **GitHub repo → Settings → Secrets and variables → Actions →
> Variables**. The anon key is safe as a plain variable (it ships in the client
> bundle either way). Deploys run automatically on push/merge to `master`.

### 6. Production URLs (required for login on the live site)

The deployed CAAP site runs at:

- Custom domain: **https://www.caapnyc.org**
- Azure default: **https://green-meadow-038fb720f.7.azurestaticapps.net**

For Google sign-in to complete on production (not just localhost), these must be
registered in two places:

**Supabase → Authentication → URL Configuration**
- **Site URL:** `https://www.caapnyc.org`
- **Redirect URLs:**
  ```
  https://www.caapnyc.org/**
  https://green-meadow-038fb720f.7.azurestaticapps.net/**
  http://localhost:5173/**
  ```

**Google Cloud Console → OAuth client → Authorized JavaScript origins**
```
https://www.caapnyc.org
https://green-meadow-038fb720f.7.azurestaticapps.net
```
The **Authorized redirect URI** stays the Supabase callback
(`https://<project-ref>.supabase.co/auth/v1/callback`) — unchanged across
environments.

> If you add a new domain or a new Static Web Apps preview URL later, add it to
> both lists above or sign-in will fail with a redirect error.

---

## What I built (already done)

- `src/auth/*` — Google sign-in, session handling, optional school-domain lock.
- `src/pages/Login.tsx` — the sign-in screen.
- `src/pages/Dashboard.tsx` — tabbed tracker: **My Progress**, **College List**,
  **Essays**, **Deadlines**.
- `src/components/SpreadsheetGrid.tsx` — the editable spreadsheet grid
  (add/edit/delete rows, dropdowns, autosave).
- `src/lib/*` — Supabase client + per-student data layer with a `localStorage`
  fallback so it works before setup.
- `supabase/schema.sql` — the database table + security rules.

## Costs
Supabase free tier: up to 50,000 monthly users and 500 MB database — far more
than a small cohort needs. **$0/month.** (Free projects pause after ~1 week of no
activity and wake on next visit.)
