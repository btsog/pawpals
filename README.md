# 🐾 Pawpals

Help people find trusted caretakers for their pets — drop-in visits, dog
walking, overnight pet sitting, pet taxi, and basic grooming.

Built with **Next.js** (App Router) + **Tailwind CSS** + **Supabase**.

This is a **starter base**. Auth (sign up / log in) works out of the box. The
service/booking features are scaffolded for you to build on top of.

---

## ✅ What you need first (one-time)

1. **Node.js** — download the "LTS" version from <https://nodejs.org> and install it.
2. **A Supabase account** — free at <https://supabase.com>.
3. **A code editor** — [VS Code](https://code.visualstudio.com) is recommended.

---

## 🚀 Setup — follow these steps in order

### Step 1 — Create your Supabase project
1. Go to <https://supabase.com> → **New project**. Pick a name and a password.
2. Wait ~2 minutes for it to finish setting up.

### Step 2 — Create the database tables
1. In Supabase, open the **SQL Editor** (left sidebar) → **New query**.
2. Open the file `supabase/schema.sql` from this project, copy **everything**,
   and paste it into the editor.
3. Click **Run**. You should see "Success". Your tables are now created. 🎉

### Step 3 — Get your API keys
1. In Supabase, go to **Project Settings** (gear icon) → **API**.
2. You'll need two values:
   - **Project URL**
   - **anon public** key

### Step 4 — Add your keys to the project
1. In this project, find the file `.env.local.example`.
2. Make a copy of it and name the copy **`.env.local`**.
3. Open `.env.local` and paste in your two values from Step 3.

### Step 5 — Install and run
Open a terminal **in this project folder** and run:

```bash
npm install
npm run dev
```

Then open <http://localhost:3000> in your browser. 🐾

---

## 🔐 A note about email confirmation

By default, Supabase asks new users to confirm their email before logging in.
While building, you may want to turn this off so signup is instant:

- Supabase → **Authentication** → **Providers** → **Email** →
  turn **OFF** "Confirm email". (Turn it back on before going live.)

---

## 🌍 Put your site online with Vercel (free)

Vercel is made by the same team as Next.js and hosts Pawpals for free. Your
code is already on GitHub, so this takes about 5 minutes.

### Step 1 — Connect GitHub to Vercel
1. Go to <https://vercel.com> and click **Sign Up** → **Continue with GitHub**.
2. Approve the access so Vercel can see your repositories.

### Step 2 — Import the project
1. On your Vercel dashboard, click **Add New… → Project**.
2. Find **`pawpals`** in the list and click **Import**.
3. Vercel auto-detects Next.js — leave the build settings as they are.

### Step 3 — Add your Supabase keys
This is the most important step. Without it, the live site stays in preview mode.

1. On the import screen, open the **Environment Variables** section.
2. Add these two (the same values from your `.env.local`):

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | your Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon public key |

### Step 4 — Deploy
1. Click **Deploy** and wait ~1–2 minutes.
2. Vercel gives you a live link like `https://pawpals.vercel.app`. That's your site! 🎉

### Step 5 — Tell Supabase about your live address
So login/signup works on the live site (not just locally):

1. Supabase → **Authentication** → **URL Configuration**.
2. Set **Site URL** to your Vercel link (e.g. `https://pawpals.vercel.app`).
3. Add the same link under **Redirect URLs**.

### After that: automatic updates 🔁
Every time you `git push` to GitHub, Vercel rebuilds and updates your live site
automatically. No extra steps.

> 💡 If you change environment variables in Vercel later, you must **redeploy**
> for them to take effect (Vercel → your project → **Deployments** → **Redeploy**).

---

## 🗂️ Where things live

```
pawpals/
├─ supabase/
│  └─ schema.sql            ← Run this in Supabase (your database)
├─ src/
│  ├─ app/
│  │  ├─ page.js            ← Homepage
│  │  ├─ login/             ← Log in page (works)
│  │  ├─ signup/            ← Sign up page (works)
│  │  ├─ dashboard/         ← Logged-in area (starter, protected)
│  │  └─ caretakers/        ← Browse caretakers (starter)
│  ├─ components/           ← Reusable UI pieces (Navbar, cards, etc.)
│  └─ lib/
│     ├─ services.js        ← The 5 service types
│     └─ supabase/          ← Connection helpers (client/server)
└─ .env.local              ← Your secret keys (you create this)
```

---

## 🧱 What's done vs. what's yours to build

**Done & working**
- Project setup, Tailwind styling, responsive layout
- Database schema with security rules (RLS)
- Sign up / log in / log out
- Auto-creating a user profile on signup
- Homepage + starter pages for browsing caretakers and a dashboard

**For you to build on top (starter scaffolding included)**
- Caretaker service listings + prices
- The booking flow (creating bookings, accepting/declining)
- Pet management for owners
- Reviews & ratings
- Search and filtering

When you ask AI to help build these, point it at the matching table in
`supabase/schema.sql` and the matching starter page — they're labeled with
`STARTER` and `TODO` comments to guide you.

---

## 💬 Tips when building with AI
- Tell the AI: *"This is a Next.js App Router + Supabase project. Use the
  helpers in `src/lib/supabase/`."*
- Share the relevant part of `supabase/schema.sql` so it knows your tables.
- Build one small feature at a time and test it in the browser.
```
