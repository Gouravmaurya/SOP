-- Create users table
CREATE TABLE public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  xp integer NOT NULL DEFAULT 0,
  badge text NOT NULL DEFAULT 'Bronze',
  department text NOT NULL DEFAULT 'Operations',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX users_xp_idx ON public.users(xp DESC);
CREATE INDEX users_email_idx ON public.users(email);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read"
ON public.users
FOR SELECT
TO public
USING (true);

-- Allow authenticated users to update their own data
CREATE POLICY "Allow user update own data"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid()::text = id::text)
WITH CHECK (auth.uid()::text = id::text);

-- Allow authenticated users to insert their own data
CREATE POLICY "Allow user insert own data"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid()::text = id::text);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS public.user_progress (
  id bigserial PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  levels jsonb NOT NULL DEFAULT '[]'::jsonb,
  stats jsonb NOT NULL DEFAULT '{"xp": 0, "points": 0, "stamina": 150, "maxStamina": 150, "stars": 0, "rank": "Trainee"}'::jsonb,
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id)
);

CREATE INDEX user_progress_user_id_idx ON public.user_progress(user_id);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Users can only see their own progress
CREATE POLICY "Users can view their own progress"
ON public.user_progress
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can only update their own progress
CREATE POLICY "Users can update their own progress"
ON public.user_progress
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can insert their own progress"
ON public.user_progress
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
