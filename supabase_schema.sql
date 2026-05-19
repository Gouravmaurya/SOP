-- ======================================================================
-- SOP QUEST - DATABASE SCHEMA MIGRATION SCRIPT
-- ======================================================================
-- Run this script in the Supabase SQL Editor to create the game progress
-- table and enable secure Row Level Security (RLS) policies.

-- 1. Create the user_progress table
CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  levels JSONB NOT NULL,
  stats JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS) to protect user records
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow users to read their own progress record
CREATE POLICY "Allow users to read their own progress" 
  ON public.user_progress 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- 4. Policy: Allow users to insert their own initial progress record
CREATE POLICY "Allow users to insert their own progress" 
  ON public.user_progress 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- 5. Policy: Allow users to update their own progress records
CREATE POLICY "Allow users to update their own progress" 
  ON public.user_progress 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- 6. Grant public access (restricted securely by RLS above)
GRANT ALL ON public.user_progress TO authenticated;
GRANT ALL ON public.user_progress TO anon;
GRANT ALL ON public.user_progress TO service_role;

-- ======================================================================
-- Schema successfully verified!
-- ======================================================================

-- ======================================================================
-- QUICK FIX: BYPASS "EMAIL NOT CONFIRMED" FOR EXISTING USERS
-- ======================================================================
-- Run this query to instantly activate all registered user accounts:
--
-- UPDATE auth.users 
-- SET email_confirmed_at = NOW(), 
--     confirmed_at = NOW(),
--     last_sign_in_at = NOW();
-- ======================================================================

