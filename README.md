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
