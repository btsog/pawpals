-- ============================================================================
-- Pawpals — Database schema for Supabase (PostgreSQL)
-- ----------------------------------------------------------------------------
-- HOW TO USE:
--   1. Open your Supabase project → SQL Editor → "New query"
--   2. Paste this ENTIRE file and click "Run"
--   3. It is safe to run again later — it drops & recreates the objects.
--
-- WHAT IT CREATES:
--   - profiles            : one row per signed-up user (owner OR caretaker)
--   - caretaker_profiles  : extra info shown on a caretaker's public page
--   - pets                : pets that belong to an owner
--   - services            : the 5 service types Pawpals offers (seeded below)
--   - caretaker_services  : which services a caretaker offers + their price
--   - bookings            : a request from an owner to a caretaker
--   - reviews             : a rating an owner leaves after a booking
--
-- SECURITY:
--   Row Level Security (RLS) is ON for every table. The policies below decide
--   who can read/write what. This keeps users' data private by default.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 0. Clean up (so you can re-run this file without errors)
-- ----------------------------------------------------------------------------
drop table if exists public.reviews            cascade;
drop table if exists public.bookings           cascade;
drop table if exists public.caretaker_services  cascade;
drop table if exists public.services           cascade;
drop table if exists public.pets               cascade;
drop table if exists public.caretaker_profiles  cascade;
drop table if exists public.profiles           cascade;

drop type if exists public.user_role        cascade;
drop type if exists public.booking_status   cascade;


-- ----------------------------------------------------------------------------
-- 1. Custom types (fixed lists of allowed values)
-- ----------------------------------------------------------------------------
create type public.user_role     as enum ('owner', 'caretaker');
create type public.booking_status as enum ('pending', 'accepted', 'declined', 'completed', 'cancelled');


-- ----------------------------------------------------------------------------
-- 2. profiles  — one row per user, linked to Supabase's built-in auth.users
-- ----------------------------------------------------------------------------
create table public.profiles (
  id          uuid        primary key references auth.users (id) on delete cascade,
  role        public.user_role not null default 'owner',
  full_name   text        not null default '',
  phone       text,
  city        text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.profiles is 'Public profile for every Pawpals user. "id" matches the auth user id.';


-- ----------------------------------------------------------------------------
-- 3. caretaker_profiles — extra details for users whose role = caretaker
-- ----------------------------------------------------------------------------
create table public.caretaker_profiles (
  id                uuid        primary key references public.profiles (id) on delete cascade,
  headline          text        not null default '',     -- e.g. "Loving dog walker in downtown"
  bio               text        not null default '',
  years_experience  int         not null default 0,
  has_own_transport boolean     not null default false,   -- useful for pet taxi
  is_active         boolean     not null default true,    -- caretaker is accepting bookings
  rating_average    numeric(2,1) not null default 0,      -- 0.0 – 5.0, updated from reviews
  rating_count      int         not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);


-- ----------------------------------------------------------------------------
-- 4. pets — belong to an owner
-- ----------------------------------------------------------------------------
create table public.pets (
  id           uuid        primary key default gen_random_uuid(),
  owner_id     uuid        not null references public.profiles (id) on delete cascade,
  name         text        not null,
  species      text        not null default 'dog',   -- dog, cat, etc.
  breed        text,
  age_years    int,
  notes        text,                                  -- allergies, temperament, etc.
  created_at   timestamptz not null default now()
);

create index pets_owner_id_idx on public.pets (owner_id);


-- ----------------------------------------------------------------------------
-- 5. services — the catalog of service types (seeded below). Read-only to users.
-- ----------------------------------------------------------------------------
create table public.services (
  id           uuid        primary key default gen_random_uuid(),
  slug         text        not null unique,   -- machine name, e.g. 'dog-walking'
  name         text        not null,          -- display name, e.g. 'Dog Walking'
  description  text        not null default '',
  sort_order   int         not null default 0
);


-- ----------------------------------------------------------------------------
-- 6. caretaker_services — which services a caretaker offers, and at what price
-- ----------------------------------------------------------------------------
create table public.caretaker_services (
  id           uuid        primary key default gen_random_uuid(),
  caretaker_id uuid        not null references public.profiles (id) on delete cascade,
  service_id   uuid        not null references public.services (id) on delete cascade,
  price        numeric(10,2) not null default 0,   -- price per visit/walk/night
  price_unit   text        not null default 'per visit',
  created_at   timestamptz not null default now(),
  unique (caretaker_id, service_id)                 -- one price row per service
);

create index caretaker_services_caretaker_idx on public.caretaker_services (caretaker_id);


-- ----------------------------------------------------------------------------
-- 7. bookings — an owner requests a service from a caretaker
-- ----------------------------------------------------------------------------
create table public.bookings (
  id           uuid        primary key default gen_random_uuid(),
  owner_id     uuid        not null references public.profiles (id) on delete cascade,
  caretaker_id uuid        not null references public.profiles (id) on delete cascade,
  service_id   uuid        not null references public.services (id),
  pet_id       uuid        references public.pets (id) on delete set null,
  status       public.booking_status not null default 'pending',
  start_at     timestamptz not null,
  end_at       timestamptz,
  notes        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index bookings_owner_idx     on public.bookings (owner_id);
create index bookings_caretaker_idx on public.bookings (caretaker_id);


-- ----------------------------------------------------------------------------
-- 8. reviews — left by an owner about a caretaker, tied to a booking
-- ----------------------------------------------------------------------------
create table public.reviews (
  id           uuid        primary key default gen_random_uuid(),
  booking_id   uuid        not null unique references public.bookings (id) on delete cascade,
  owner_id     uuid        not null references public.profiles (id) on delete cascade,
  caretaker_id uuid        not null references public.profiles (id) on delete cascade,
  rating       int         not null check (rating between 1 and 5),
  comment      text,
  created_at   timestamptz not null default now()
);

create index reviews_caretaker_idx on public.reviews (caretaker_id);


-- ============================================================================
-- 9. Auto-create a profile row whenever someone signs up
--    (reads optional values passed from the signup form as user metadata)
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    coalesce((new.raw_user_meta_data ->> 'role')::public.user_role, 'owner'),
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );

  -- If they signed up as a caretaker, also create their caretaker profile.
  if coalesce(new.raw_user_meta_data ->> 'role', 'owner') = 'caretaker' then
    insert into public.caretaker_profiles (id) values (new.id);
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ============================================================================
-- 10. Keep updated_at columns fresh automatically
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at           before update on public.profiles           for each row execute function public.set_updated_at();
create trigger caretaker_profiles_updated_at before update on public.caretaker_profiles for each row execute function public.set_updated_at();
create trigger bookings_updated_at           before update on public.bookings           for each row execute function public.set_updated_at();


-- ============================================================================
-- 11. Row Level Security (RLS) — turn it on, then add policies
-- ============================================================================
alter table public.profiles           enable row level security;
alter table public.caretaker_profiles enable row level security;
alter table public.pets               enable row level security;
alter table public.services           enable row level security;
alter table public.caretaker_services enable row level security;
alter table public.bookings           enable row level security;
alter table public.reviews            enable row level security;

-- profiles: anyone can read (so caretakers can be browsed); you edit only your own
create policy "profiles are viewable by everyone"
  on public.profiles for select using (true);
create policy "users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- caretaker_profiles: public to read; only the caretaker can edit theirs
create policy "caretaker profiles are viewable by everyone"
  on public.caretaker_profiles for select using (true);
create policy "caretakers can insert their own caretaker profile"
  on public.caretaker_profiles for insert with check (auth.uid() = id);
create policy "caretakers can update their own caretaker profile"
  on public.caretaker_profiles for update using (auth.uid() = id);

-- pets: only the owner can see/manage their pets
create policy "owners manage their own pets"
  on public.pets for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- services: everyone can read the catalog; nobody edits it from the app
create policy "services are viewable by everyone"
  on public.services for select using (true);

-- caretaker_services: public to read; the caretaker manages their own rows
create policy "caretaker services are viewable by everyone"
  on public.caretaker_services for select using (true);
create policy "caretakers manage their own service offerings"
  on public.caretaker_services for all
  using (auth.uid() = caretaker_id)
  with check (auth.uid() = caretaker_id);

-- bookings: only the owner or the caretaker on the booking can see it
create policy "booking parties can view their bookings"
  on public.bookings for select
  using (auth.uid() = owner_id or auth.uid() = caretaker_id);
create policy "owners can create bookings"
  on public.bookings for insert with check (auth.uid() = owner_id);
create policy "booking parties can update their booking"
  on public.bookings for update
  using (auth.uid() = owner_id or auth.uid() = caretaker_id);

-- reviews: public to read; only the owner who booked can write one
create policy "reviews are viewable by everyone"
  on public.reviews for select using (true);
create policy "owners can create reviews for their bookings"
  on public.reviews for insert with check (auth.uid() = owner_id);


-- ============================================================================
-- 12. Seed the 5 services Pawpals offers
-- ============================================================================
insert into public.services (slug, name, description, sort_order) values
  ('drop-in-visit',       'Drop-In Visits',        'A short visit to feed, play with, and check on your pet at home.',        1),
  ('dog-walking',         'Dog Walking',           'A walk around the neighborhood to keep your dog happy and active.',       2),
  ('overnight-sitting',   'Overnight Pet Sitting', 'A caretaker stays overnight to look after your pet in your home.',        3),
  ('pet-taxi',            'Pet Taxi',              'Transport for your pet to the vet, groomer, or anywhere they need to go.', 4),
  ('basic-grooming',      'Basic Grooming',        'Bathing, brushing, and basic tidy-ups to keep your pet clean.',           5)
on conflict (slug) do nothing;

-- Done! ✅  Your Pawpals database is ready.
