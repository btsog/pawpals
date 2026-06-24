# 🐾 Pawpals — Build Checklist

Track your progress here. Tick a box (`[ ]` → `[x]`) as you finish each item.

Pawpals is a **two-sided marketplace**: pet owners book care, caretakers offer
services. The foundation is built and tested — your job is to build the service
& booking features on top of the starter scaffolding. Every starter file has
`STARTER` / `TODO` comments to guide you and any AI helper.

---

## ✅ Done So Far

**Foundation & setup**
- [x] Next.js project (App Router) + Tailwind styling
- [x] Mobile-responsive layout, navbar & footer
- [x] Supabase connection helpers (browser + server)
- [x] Verified production build passes
- [x] Preview mode — app runs even without Supabase keys (no connection errors)
- [x] Code pushed to GitHub (github.com/btsog/pawpals)
- [x] Vercel deployment guide added to the README

**Database** (run `supabase/schema.sql` in Supabase)
- [x] 7 tables created with relationships
- [x] Row Level Security rules on every table
- [x] 5 services pre-loaded
- [x] Auto-creates a profile on sign-up

**Working features**
- [x] Sign up (owner or caretaker) & log in / log out
- [x] Protected dashboard (redirects if logged out)
- [x] Homepage with the 5 services
- [x] Starter pages: browse caretakers + caretaker profile

---

## 🚀 First-Run Checklist (one-time setup)

- [ ] Create a Supabase project
- [ ] Run `supabase/schema.sql` in the SQL Editor
- [ ] Copy `.env.local.example` → `.env.local` and add your keys
- [ ] Turn OFF "Confirm email" in Supabase while building
- [ ] Run `npm install` then `npm run dev`
- [ ] Open http://localhost:3000

---

## 🌍 Go Live (when you're ready — see README for full steps)

- [ ] Sign up at vercel.com with your GitHub account
- [ ] Import the `pawpals` repo into Vercel
- [ ] Add the two Supabase env vars in Vercel (URL + anon key)
- [ ] Deploy and get your live link (e.g. `pawpals.vercel.app`)
- [ ] Set the Site URL + Redirect URL in Supabase (Authentication → URL Configuration)

> After this, every `git push` auto-updates your live site.

---

## 📝 Your To-Do List (build these next)

### 1. Caretaker services & prices  ← _start here_
- [ ] Let caretakers pick which services they offer
- [ ] Set a price for each (saves to `caretaker_services`)
- [ ] Show services + prices on the caretaker profile page

### 2. Booking flow  ← _the core feature_
- [ ] "Book" form on a caretaker's page (date, pet, notes)
- [ ] Save request to `bookings` (status = `pending`)
- [ ] Caretaker accepts / declines from their dashboard
- [ ] Owner sees the status update

### 3. Pet management (owners)
- [ ] Add / edit / remove pets (`pets` table)
- [ ] Pick a pet when booking

### 4. Search & filtering
- [ ] Filter caretakers by service type
- [ ] Search by city / location
- [ ] Sort by rating

### 5. Reviews & ratings
- [ ] Owner leaves a rating after a completed booking
- [ ] Update caretaker's average rating
- [ ] Show reviews on the profile

### 6. Profile polish
- [ ] Edit profile (name, city, photo, bio)
- [ ] Upload avatars (Supabase Storage)

### Later (when ready to launch)
- [ ] In-app payments (Stripe)
- [ ] Messaging between owner & caretaker
- [ ] Email / push notifications

---

## 💬 How to build each to-do with AI

Tackle **one item at a time** and test it in the browser before moving on.
When you ask an AI for help, tell it:

> "This is a Next.js App Router + Supabase project. Use the helpers in
> `src/lib/supabase/`."

…then paste the matching table from `supabase/schema.sql` plus the relevant
`STARTER` page. That gives it everything it needs to write code that fits your
project.

---

🐾 _Pawpals — built with care for pets and their people._
