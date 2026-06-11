# Deployment Checklist - Database-Driven Leaderboard

## Pre-Deployment Setup

### Database Setup
- [ ] Log in to Supabase Dashboard
- [ ] Open SQL Editor
- [ ] Copy and paste SQL from `DB_SETUP.md`
- [ ] Execute all SQL statements
- [ ] Verify tables created:
  - [ ] `users` table exists
  - [ ] `user_progress` table exists (or create if missing)
  - [ ] Indexes created
  - [ ] Row Level Security policies enabled

### Verify Environment
- [ ] `.env` file has `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `.env` file has `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Supabase credentials are correct

## Deployment Steps

### Step 1: Test Registration
```
1. Start dev server: npm run dev
2. Navigate to /login
3. Click "Register" / Create Account
4. Fill in form:
   - Email: test@example.com
   - Name: Test User
   - Department: MMG
   - Password: testpass123
5. Submit
```

**Verify:**
- [ ] User redirected to home page
- [ ] Check Supabase: new entry in `users` table
- [ ] User has email, name, department
- [ ] XP is 0
- [ ] Badge is "Bronze"

### Step 2: Test Login
```
1. Logout current user
2. Login with email/password
3. Verify successful authentication
```

**Verify:**
- [ ] User is authenticated
- [ ] User data in Supabase is correct

### Step 3: Test XP Gain
```
1. Complete a quiz level
2. Earn XP (200+ points)
3. Check user's stats in sidebar
```

**Verify:**
- [ ] XP increased in UI
- [ ] Check Supabase `user_progress` table: stats.xp updated
- [ ] Badge might have changed if XP threshold crossed

### Step 4: Test Leaderboard - Current User
```
1. Navigate to /leaderboard
2. Look for your user in the list
```

**Verify:**
- [ ] Your user appears in leaderboard
- [ ] Name shows as "Your Name (You)"
- [ ] XP shows your current total
- [ ] Badge is correct
- [ ] Department is correct

### Step 5: Test Leaderboard - Multiple Users
```
1. Register 3-4 different test users
2. Have each complete some levels (different XP amounts)
3. Visit /leaderboard with one user
```

**Verify:**
- [ ] All 3-4 users appear in leaderboard
- [ ] Users sorted by XP (highest first)
- [ ] Current user marked with "(You)"
- [ ] Correct user highlighted
- [ ] Top 3 shown in podium
- [ ] All users in table below

### Step 6: Test Leaderboard - User Not Logged In
```
1. Logout
2. Visit /leaderboard
```

**Verify:**
- [ ] All users still visible
- [ ] No "(You)" marker
- [ ] List sorted by XP
- [ ] No errors in console

### Step 7: Test XP Persistence
```
1. Log in as test user
2. Check XP in leaderboard
3. Logout
4. Wait 5 seconds
5. Log in again as same user
6. Check leaderboard
```

**Verify:**
- [ ] XP persists across logout/login
- [ ] Data matches database
- [ ] No data loss

## Common Issues & Solutions

### Issue: "Could not find the table 'public.users'"
**Solution:**
- Run SQL from DB_SETUP.md in Supabase
- Refresh page
- Check Supabase dashboard for table

### Issue: User doesn't appear in leaderboard
**Solution:**
1. Check Supabase users table - is user there?
2. Check email matches exactly (case-sensitive check)
3. Check browser console for errors
4. Refresh page
5. Try logging in again

### Issue: XP not updating
**Solution:**
1. Check console for fetch errors
2. Verify user ID is correct
3. Check if POST /api/users is being called
4. Verify PATCH /api/users/{id}/xp endpoint works
5. Check user's stats are changing (in sidebar XP display)

### Issue: Wrong XP showing
**Solution:**
1. Check GameContext - is it updating stats?
2. Verify the XP value being sent to database
3. Check SQL in users table - correct calculation?
4. Try completing another level

### Issue: Badge not updating
**Solution:**
1. Badges calculated in API based on XP
2. After earning XP, refresh leaderboard
3. Badge should match:
   - XP > 10000 = Diamond
   - XP > 8000 = Gold
   - XP > 5000 = Silver
   - XP <= 5000 = Bronze

### Issue: "(You)" not showing for current user
**Solution:**
1. Check if user is logged in
2. Verify email in auth matches email in database
3. Refresh page
4. Check browser console for errors

## Database Verification Queries

Run these in Supabase SQL Editor to verify data:

### Check users table
```sql
SELECT id, name, email, xp, badge, department, updated_at
FROM public.users
ORDER BY xp DESC
LIMIT 20;
```

### Check specific user
```sql
SELECT *
FROM public.users
WHERE email = 'test@example.com';
```

### Check user progress
```sql
SELECT user_id, stats->>'xp' as xp, updated_at
FROM public.user_progress
ORDER BY updated_at DESC
LIMIT 10;
```

### Check leaderboard (what app queries)
```sql
SELECT id, name, email, xp, badge, department
FROM public.users
ORDER BY xp DESC
LIMIT 20;
```

## Performance Monitoring

### Monitor XP Sync
1. Open browser DevTools
2. Go to Network tab
3. Filter for "xp"
4. Complete a level
5. Watch for PATCH request to `/api/users/{id}/xp`
6. Should see 200 OK response

### Monitor Leaderboard Load
1. Open Performance tab
2. Visit /leaderboard
3. Should load in < 1 second
4. Check for:
   - One GET /api/users call
   - One POST /api/users call (sync current user)

## Rollback Plan

If something goes wrong:

1. **User data lost?**
   - Check Supabase backups
   - Can restore from SQL backups

2. **Need to clear data?**
   ```sql
   DELETE FROM public.user_progress;
   DELETE FROM public.users;
   ```

3. **Need to reset tables?**
   ```sql
   DROP TABLE public.user_progress;
   DROP TABLE public.users;
   ```
   Then re-run SQL from DB_SETUP.md

## Success Criteria

After deployment, verify:

✅ New users are saved to database on registration
✅ XP is saved to database when user completes levels
✅ Leaderboard shows all users (not just 10)
✅ Current user is always visible and marked with "(You)"
✅ Users sorted by XP (highest first)
✅ Top 3 shown in podium
✅ XP persists across logout/login
✅ Badges updated based on XP thresholds
✅ Multiple users can be ranked simultaneously
✅ No console errors during normal use

## Support

If you encounter issues:

1. Check console errors (DevTools)
2. Run verification queries above
3. Check Supabase logs for API errors
4. Verify environment variables
5. Check .env file has correct keys
