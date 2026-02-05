-- Create a "profiles" table
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  role text default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies so users can only see/edit their own profile
create policy "Public profiles are viewable by everyone." 
  on public.profiles for select 
  using ( true );

create policy "Users can update own profile." 
  on public.profiles for update 
  using ( auth.uid() = id );

-- Create a Trigger to automatically create a profile when a new user signs up
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create a "user_courses" table to track progress
create table public.user_courses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  course_id text not null, -- Can be expanded to a real courses table later
  progress integer default 0,
  completed boolean default false,
  last_accessed timestamp with time zone default now()
);

alter table public.user_courses enable row level security;

create policy "Users can view own course progress." 
  on public.user_courses for select 
  using ( auth.uid() = user_id );

create policy "Users can update own course progress." 
  on public.user_courses for insert 
  with check ( auth.uid() = user_id );

create policy "Users can update own course progress." 
  on public.user_courses for update
  using ( auth.uid() = user_id );
