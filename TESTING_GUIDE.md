# Comprehensive App Testing Guide

## Test Environment
- **URL**: http://localhost:3000
- **Dev Server**: Running (npm run dev)
- **Database**: Supabase with 10 test users seeded
- **Browsers**: Chrome/Edge (with DevTools open on Console tab)

---

## 1. Authentication & User Management

### 1.1 Login Test
**Steps:**
1. Visit `/login`
2. Click "Sign In"
3. Enter email: `test@example.com` (or use a test user email)
4. Enter password: any value (app doesn't validate in fallback mode)
5. Submit

**Expected:**
- ✅ Redirected to dashboard `/`
- ✅ User name shows in dashboard hero section
- ✅ User profile loaded in sidebar/HUD
- ✅ No console errors

**Check:**
- [ ] Login works
- [ ] User data persists after refresh
- [ ] No 500 errors in console

---

### 1.2 Register Test
**Steps:**
1. Visit `/login`
2. Click "Create Account"
3. Fill in:
   - Email: `newuser@test.com`
   - Name: `Test User`
   - Department: `MMG` (or any department)
   - Password: `testpass123`
4. Submit

**Expected:**
- ✅ Account created
- ✅ Redirected to dashboard
- ✅ User saved to Supabase `users` table
- ✅ XP starts at 0

**Check:**
- [ ] Registration works
- [ ] New user appears in database (check Supabase)
- [ ] No errors on registration

---

### 1.3 Logout Test
**Steps:**
1. Click logout button (should be in sidebar/HUD)
2. Should be redirected to login page

**Expected:**
- ✅ User logged out
- ✅ Local storage cleared
- ✅ Redirected to `/login`

**Check:**
- [ ] Logout works
- [ ] Session cleared
- [ ] Can login again with same account

---

## 2. Dashboard Testing

### 2.1 Dashboard Display
**Visit:** `/`

**Expected to see:**
- ✅ Hero section with user name and department
- ✅ "Forge Your Legacy" title
- ✅ "Continue Mission" button
- ✅ Global Rank card (bottom right)
- ✅ 4 stat cards (Completion Rate, Learning XP, SOP Mastery, Avg. Accuracy)
- ✅ Performance Analytics chart
- ✅ Top Elite section with 3 top users

**Check:**
- [ ] All elements display
- [ ] No layout broken
- [ ] Images load properly
- [ ] Responsive (try mobile view)

---

### 2.2 Rank Display
**Check:**
- [ ] Global Rank shows correct number (not hardcoded #14)
- [ ] Rank updates after completing levels
- [ ] Top 3 users shown are from database
- [ ] Current user highlighted with "(You)" marker
- [ ] Top Elite section shows top 3 users from database

**Test:**
1. Note your current rank
2. Go complete a level (earn XP)
3. Return to dashboard
4. Rank should decrease (better rank = lower number)

---

### 2.3 Stats Display
**Check:**
- [ ] Completion Rate: Shows correct percentage
- [ ] Learning XP: Shows your current XP
- [ ] SOP Mastery: Shows completed/total levels
- [ ] Avg. Accuracy: Shows star percentage

**Test:**
1. Complete a quiz level
2. Return to dashboard
3. Stats should update

---

## 3. Game/Map Testing

### 3.1 Map Page
**Visit:** `/map`

**Expected:**
- ✅ Game map displays
- ✅ Levels shown in progression
- ✅ Current level highlighted
- ✅ Level connections visible

**Check:**
- [ ] Map loads properly
- [ ] No WebGL errors (check console)
- [ ] Levels display correctly
- [ ] Can click on levels

---

### 3.2 Level Completion
**Steps:**
1. Click on current level
2. Complete the quiz (answer questions correctly)
3. Submit answers

**Expected:**
- ✅ Quiz displays
- ✅ Questions load
- ✅ Can select answers
- ✅ Submit button works
- ✅ Results show (stars earned)
- ✅ XP awarded
- ✅ Next level unlocked

**Check:**
- [ ] Quiz displays properly
- [ ] Can answer questions
- [ ] XP increases after completion
- [ ] Stars awarded correctly
- [ ] Results show stars/XP earned
- [ ] Console: No errors

---

### 3.3 XP Gain & Persistence
**Steps:**
1. Note current XP in dashboard
2. Complete a level
3. Check XP increase in sidebar
4. Refresh page
5. Check XP persists

**Expected:**
- ✅ XP increases after level completion
- ✅ XP visible in real-time
- ✅ XP persists after page refresh
- ✅ XP synced to database

**Check:**
- [ ] XP increases when completing levels
- [ ] XP shows in sidebar
- [ ] XP persists after refresh
- [ ] XP synced to Supabase (check database)

---

## 4. Leaderboard Testing

### 4.1 Leaderboard Display
**Visit:** `/leaderboard`

**Expected:**
- ✅ Top 3 podium shows
- ✅ Full leaderboard table below
- ✅ **All users shown** (not just 10)
- ✅ Users sorted by XP (highest first)
- ✅ Correct badges displayed
- ✅ Current user marked with "(You)"

**Check:**
- [ ] Top 3 podium displays
- [ ] All 10+ test users visible
- [ ] Sorted by XP correctly
- [ ] Current user shown
- [ ] Badges match XP tiers
- [ ] Departments display correctly

---

### 4.2 Rank Accuracy
**Steps:**
1. Look at leaderboard
2. Count your position
3. Go to dashboard
4. Compare rank number

**Expected:**
- ✅ Dashboard rank matches leaderboard position
- ✅ If you're #5 on leaderboard, dashboard shows #5

**Check:**
- [ ] Rank matches between dashboard and leaderboard
- [ ] Rank updates when you gain XP

---

### 4.3 Real-Time Updates
**Steps:**
1. Open leaderboard in browser
2. Complete a level (gain XP)
3. Refresh leaderboard

**Expected:**
- ✅ Your XP updated in leaderboard
- ✅ Your rank may change
- ✅ Data synchronized with database

**Check:**
- [ ] XP updates after level completion
- [ ] Leaderboard refreshes correctly
- [ ] No stale data shown

---

## 5. Progress Page Testing

### 5.1 Progress Display
**Visit:** `/progress`

**Expected:**
- ✅ Page loads
- ✅ Shows level progression
- ✅ Shows completed/total levels
- ✅ Visual progress indicator

**Check:**
- [ ] Progress page displays
- [ ] Progress updates after completing levels
- [ ] Correct progress percentage shown

---

## 6. Badges Page Testing

### 6.1 Badges Display
**Visit:** `/badges`

**Expected:**
- ✅ Page loads
- ✅ Shows earned badges
- ✅ Shows locked badges
- ✅ Badge requirements shown

**Check:**
- [ ] Badges page loads
- [ ] Badges unlock as you progress
- [ ] Badge display is correct

---

## 7. Rewards Page Testing

### 7.1 Rewards Display
**Visit:** `/rewards`

**Expected:**
- ✅ Page loads
- ✅ Shows available rewards
- ✅ Shows claimed/unclaimed status

**Check:**
- [ ] Rewards page loads
- [ ] Rewards display correctly
- [ ] Claiming rewards works (if implemented)

---

## 8. Data Persistence Testing

### 8.1 Logout/Login Persistence
**Steps:**
1. Note your current XP
2. Logout
3. Login again with same email
4. Check XP

**Expected:**
- ✅ XP persists after logout/login
- ✅ Progress saved
- ✅ Stats same as before logout

**Check:**
- [ ] XP persists
- [ ] Progress persists
- [ ] All user data recoverable

---

### 8.2 Page Refresh Persistence
**Steps:**
1. Complete a level (gain XP)
2. Refresh page (F5)
3. Check if XP still there

**Expected:**
- ✅ XP persists
- ✅ Stats reload correctly
- ✅ No data loss

**Check:**
- [ ] XP persists after refresh
- [ ] All data loads correctly
- [ ] No console errors after refresh

---

### 8.3 Multi-User Leaderboard
**Steps:**
1. Login as User A
2. Complete levels (gain XP)
3. Logout
4. Login as User B (or register new)
5. Complete levels
6. Logout
7. Check leaderboard (can view without login)

**Expected:**
- ✅ Both users appear in leaderboard
- ✅ Ranked correctly by XP
- ✅ Each user's XP independent

**Check:**
- [ ] Multi-user leaderboard works
- [ ] Each user's data separate
- [ ] Ranking accurate

---

## 9. API & Database Testing

### 9.1 API Endpoints
**Test each endpoint:**

**GET /api/users**
```bash
curl http://localhost:3000/api/users
```
Expected: Array of all users sorted by XP

**POST /api/users**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"id":"test","name":"Test","email":"test@test.com","xp":5000,"department":"Test"}'
```
Expected: User created/updated in database

**Check:**
- [ ] GET /api/users returns all users
- [ ] POST /api/users creates users
- [ ] PATCH /api/users/{id}/xp updates XP
- [ ] No 500 errors in API responses

---

### 9.2 Database Integrity
**Check in Supabase:**

1. **users table:**
   - [ ] 10+ users exist
   - [ ] All emails unique
   - [ ] XP values correct
   - [ ] Badges match XP
   - [ ] Departments populated

2. **user_progress table:**
   - [ ] Has entries for each user
   - [ ] Progress data saves
   - [ ] Stats update correctly

---

## 10. Console Error Checking

### Check DevTools Console for:
- [ ] No 404 errors (missing files/assets)
- [ ] No 500 errors (server errors)
- [ ] No network failures
- [ ] No RLS violations
- [ ] No undefined variables
- [ ] No infinite loops
- [ ] All API calls succeed

**Common Errors to Check:**
```
❌ "Cannot read property 'email' of undefined"
❌ "Failed to fetch /api/users"
❌ "Row level security policy"
❌ "TypeError: data.map is not a function"
```

---

## 11. Performance Testing

### Load Times
- [ ] Dashboard loads in < 2 seconds
- [ ] Leaderboard loads in < 1.5 seconds
- [ ] Quiz page loads in < 2 seconds
- [ ] Map loads in < 3 seconds

### Memory
- [ ] No significant memory leaks
- [ ] Page doesn't slow down after many interactions

### API Response Times
- [ ] GET /api/users responds in < 500ms
- [ ] POST /api/users responds in < 500ms

---

## 12. Mobile Responsiveness

### Test on Mobile Size (375px width)
- [ ] Dashboard displays correctly
- [ ] Leaderboard table doesn't overflow
- [ ] All buttons clickable
- [ ] Text readable
- [ ] Images load
- [ ] Navigation works

---

## 13. Edge Cases & Error Handling

### Test These Scenarios:

**Empty Database:**
- [ ] App handles no users gracefully
- [ ] Leaderboard shows "No users" message

**Very Large XP:**
- [ ] Handles users with 100,000+ XP
- [ ] Display doesn't break

**Special Characters in Names:**
- [ ] Names with spaces work
- [ ] Names with special chars display correctly

**Missing Data:**
- [ ] User without avatar shows default
- [ ] User without department shows default
- [ ] Missing XP shows 0

**Network Issues:**
- [ ] API error shows user-friendly message
- [ ] App doesn't crash on API failure
- [ ] Fallback data shown if available

---

## 14. Bug Report Template

If you find a bug, document it:

**Bug Title:** [Clear description]

**Steps to Reproduce:**
1. ...
2. ...
3. ...

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happens]

**Console Error:** 
[Copy paste from DevTools]

**Severity:** 
- [ ] Critical (breaks functionality)
- [ ] Major (affects feature)
- [ ] Minor (cosmetic)

**Browser:** Chrome/Edge/Safari

**URL:** http://localhost:3000/[page]

---

## Testing Checklist Summary

**Core Features:**
- [ ] Login/Register works
- [ ] Dashboard displays correctly
- [ ] Leaderboard shows all users
- [ ] Game levels work
- [ ] XP tracking works
- [ ] Rank calculation correct

**Data:**
- [ ] Data persists after refresh
- [ ] Data persists after logout/login
- [ ] Database has all users
- [ ] XP syncs to database

**UI/UX:**
- [ ] No broken layouts
- [ ] All pages accessible
- [ ] Responsive design
- [ ] Intuitive navigation

**Performance:**
- [ ] Fast load times
- [ ] No memory leaks
- [ ] Smooth animations

**Errors:**
- [ ] No console errors
- [ ] Graceful error handling
- [ ] User-friendly messages

---

## How to Run Tests

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Open DevTools:**
   - Press F12
   - Go to Console tab
   - Clear any existing messages

3. **Test each section:**
   - Follow the steps above
   - Check for errors
   - Note any issues

4. **Document findings:**
   - Use bug report template
   - Include console errors
   - Note exact steps to reproduce

5. **Report issues:**
   - Share findings with development team
   - Include console errors
   - Provide reproduction steps

---

## Quick Test Run (5 minutes)

If you want to test quickly:

1. **Login** → Check user data loads
2. **Dashboard** → Check rank displays
3. **Complete 1 level** → Check XP increases
4. **Leaderboard** → Check you appear
5. **Refresh** → Check data persists
6. **Check Console** → Look for errors

That's it! 🚀
