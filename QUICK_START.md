# Quick Start - Database-Driven Leaderboard

## What Changed?
✅ User data now saved to **database** instead of just localStorage
✅ Leaderboard shows **all users** from database, not 10 mock ones  
✅ Current user **always visible** and properly ranked
✅ XP **syncs in real-time** with the database

## What You Need to Do Right Now

### 1. Create Database Tables (5 minutes)

Go to [Supabase Dashboard](https://app.supabase.com) → SQL Editor

Copy & paste this SQL and execute:

```sql
-- Create users table for leaderboard
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

-- Create indexes
CREATE INDEX users_xp_idx ON public.users(xp DESC);
CREATE INDEX users_email_idx ON public.users(email);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow public to read leaderboard
CREATE POLICY "Allow public read"
ON public.users
FOR SELECT
TO public
USING (true);

-- Allow users to update their own data
CREATE POLICY "Allow user update own data"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid()::text = id::text)
WITH CHECK (auth.uid()::text = id::text);

-- Allow users to insert their own data
CREATE POLICY "Allow user insert own data"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid()::text = id::text);
```

✅ You're done! Tables created.

### 2. Test It Out (2 minutes)

```bash
npm run dev
```

Then:
1. Go to `http://localhost:3000/login`
2. Register a new user
3. Complete some quiz levels (to earn XP)
4. Visit `http://localhost:3000/leaderboard`

**You should see:**
- Your user in the leaderboard list ✓
- Your name marked with "(You)" ✓
- Your XP from the levels you completed ✓
- Your badge based on total XP ✓

## How It Works Now

### Registration
```
User registers
    ↓
Email/password saved to Supabase Auth
    ↓
User profile saved to "users" table
    ↓
Ready for leaderboard!
```

### Earning XP
```
User completes level
    ↓
XP increases in game
    ↓
Auto-saved to database
    ↓
Leaderboard updates!
```

### Leaderboard
```
User visits leaderboard
    ↓
Fetches ALL users from database
    ↓
Sorts by XP (highest first)
    ↓
Shows top 3 in podium
    ↓
Shows everyone else in table
    ↓
Marks current user with "(You)"
```

## Files Modified

- ✅ `src/context/AuthContext.tsx` - Saves user to DB on login/register
- ✅ `src/context/GameContext.tsx` - Syncs XP to DB when user earns it
- ✅ `src/app/leaderboard/page.tsx` - Shows all DB users, not mock data
- ✅ `src/app/api/users/route.ts` - NEW: Get/create users
- ✅ `src/app/api/users/[id]/xp/route.ts` - NEW: Update user XP

## API Endpoints

### Get all users
```
GET /api/users
```
Returns all users sorted by XP (highest first)

### Create/update user
```
POST /api/users
Body: {
  id: "user-id",
  name: "User Name",
  email: "user@example.com",
  department: "MMG",
  xp: 5000
}
```

### Update user's XP
```
PATCH /api/users/{id}/xp
Body: { xpDelta: 100 }
```

## Testing Multiple Users

1. Register User 1 with email: user1@test.com
2. Complete some levels → earn 5000 XP
3. Go to leaderboard → see User 1 with 5000 XP
4. Logout and register User 2 with email: user2@test.com
5. Complete LESS levels → earn 2000 XP
6. Go to leaderboard → see:
   - User 1 ranked #1 (5000 XP)
   - User 2 ranked #2 (2000 XP) with "(You)"

## Key Features

| Feature | Before | After |
|---------|--------|-------|
| User data storage | localStorage only | Database + localStorage |
| Leaderboard users | 10 mock users | All registered users |
| Current user shown | Sometimes | Always |
| XP persistence | Session only | Permanent |
| User ranking | Mock data | Real data |
| Data across devices | NO | YES |

## Troubleshooting

**"User not showing in leaderboard"**
→ Check Supabase: go to users table and see if user exists
→ Verify email matches exactly
→ Refresh page

**"XP not updating"**
→ Check browser console for errors
→ Complete another level
→ Refresh page

**"Table doesn't exist error"**
→ Run the SQL from step 1 above
→ Make sure to execute in Supabase SQL Editor

## Next Steps

- ✅ Create database tables (you are here)
- ✅ Register users and complete levels
- ✅ Check leaderboard shows all users
- Future: Add filters, real-time updates, achievements

## More Documentation

- **Full Setup Guide**: `DB_SETUP.md`
- **All Changes Made**: `CHANGES_SUMMARY.md`
- **Deployment Checklist**: `DEPLOYMENT_CHECKLIST.md`

## Need Help?

1. Check browser DevTools Console for errors
2. Check Supabase Dashboard for data
3. Run queries from DEPLOYMENT_CHECKLIST.md
4. Verify .env file has correct Supabase keys

---

**You're all set!** Create the tables above and start testing. 🚀
