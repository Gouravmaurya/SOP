# Database Setup Guide

## Overview
The app now saves all user data to Supabase database instead of just localStorage. This ensures proper leaderboard ranking and user data persistence.

## Required Tables

### 1. Create `users` Table

Log into your [Supabase Dashboard](https://app.supabase.com) and run this SQL in the SQL Editor:

```sql
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
```

### 2. Update `user_progress` Table (if needed)

Make sure the `user_progress` table exists:

```sql
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
```

## How Data Flows

### User Registration/Login
```
User registers/logs in
    ↓
AuthContext saves to Supabase Auth
    ↓
API POST /api/users creates user record in DB
    ↓
User data now in database
```

### XP Updates
```
User completes a level
    ↓
GameContext updates local stats
    ↓
useEffect syncs to /api/users/{id}/xp
    ↓
User's XP updated in database
    ↓
Leaderboard fetches from /api/users
    ↓
Leaderboard shows updated ranking
```

### Leaderboard Display
```
User visits /leaderboard
    ↓
Page fetches from GET /api/users
    ↓
Returns all users sorted by XP DESC
    ↓
Current user marked with "(You)"
    ↓
Top 3 shown in podium
    ↓
All users in table
```

## API Endpoints

### GET /api/users
- **Description**: Fetch all users sorted by XP
- **Returns**: Array of users with top 100 results
- **Example**:
  ```json
  [
    {
      "id": "uuid-1",
      "name": "Aditya Kumar",
      "email": "aditya@example.com",
      "xp": 13100,
      "badge": "Diamond",
      "department": "RRG"
    }
  ]
  ```

### POST /api/users
- **Description**: Create or update a user
- **Body**:
  ```json
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "department": "Operations",
    "xp": 5000
  }
  ```
- **Returns**: Updated user object

### PATCH /api/users/{id}/xp
- **Description**: Update user's XP
- **Body**: `{ "xpDelta": 100 }`
- **Returns**: Updated user object

## Key Changes

✅ **All user data saved to database** - Not just localStorage
✅ **XP synced in real-time** - When user earns XP, it's saved
✅ **Leaderboard shows all users** - Not just 10 mocks
✅ **Current user always visible** - Marked with "(You)"
✅ **Proper ranking** - All users ranked by XP DESC
✅ **User persistence** - Data survives logout/login

## Migration Notes

If you have existing user data in localStorage:
1. Create the tables above
2. Manually insert user data or clear localStorage
3. Users will be re-created in database on next login
4. XP can be set during registration or updated via API

## Troubleshooting

**"Could not find the table 'public.users'"**
- Run the SQL setup above
- Make sure you're running it in the Supabase SQL Editor

**User not showing in leaderboard**
- Check that user was saved to database
- Verify user_id matches between auth and users table
- Check that email matches exactly

**XP not updating**
- Check browser console for API errors
- Verify PATCH endpoint is being called
- Ensure user ID is correct in the request

**"Permission denied" errors**
- Check Row Level Security policies above
- Make sure user is authenticated
- Verify email in users table matches auth email
