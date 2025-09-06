-- Supabase schema
create table profiles (
  id uuid primary key references auth.users(id),
  full_name text,
  weight numeric,
  height numeric,
  created_at timestamp default now()
);

create table classes (
  id bigint generated always as identity primary key,
  title text,
  description text,
  start_time timestamptz,
  end_time timestamptz,
  capacity int,
  created_at timestamp default now()
);

create table bookings (
  id bigint generated always as identity primary key,
  user_id uuid references profiles(id),
  class_id bigint references classes(id),
  created_at timestamp default now(),
  unique(user_id, class_id)
);

create table programs (
  id bigint generated always as identity primary key,
  user_id uuid references profiles(id),
  type text check (type in ('nutrition','fitness')),
  content text,
  created_at timestamp default now()
);
