# Leaderboard Setup Guide

The leaderboard is configured to display mock data by default, and will automatically use real database data once the Supabase table is created.

## Current Status
- ✅ Leaderboard page displays mock competitor data
- ✅ API endpoints created and ready
- ⏳ Supabase table needs to be created for real data

## Setting Up the Database (Optional)

If you want to use real data stored in Supabase instead of mock data, follow these steps:

### 1. Create the Leaderboard Table

Log in to your [Supabase Dashboard](https://app.supabase.com) and go to the SQL Editor. Run the following SQL:

```sql
CREATE TABLE public.leaderboard (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  xp integer NOT NULL DEFAULT 0,
  badge text NOT NULL,
  department text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create an index for faster queries
CREATE INDEX leaderboard_xp_idx ON public.leaderboard(xp DESC);
```

### 2. Enable Row Level Security (Optional but Recommended)

```sql
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read leaderboard
CREATE POLICY "Allow public read access"
ON public.leaderboard
FOR SELECT
TO public
USING (true);

-- Only allow inserts via the seed endpoint
CREATE POLICY "Allow service role to insert"
ON public.leaderboard
FOR INSERT
TO authenticated
WITH CHECK (true);
```

### 3. Seed the Database with Mock Data

Once the table is created, run:

```bash
curl -X POST http://localhost:3000/api/seed-leaderboard
```

Response should be:
```json
{"message":"Leaderboard seeded successfully","count":10}
```

### 4. Verify

Visit `http://localhost:3000/leaderboard` - you should now see the data from the database!

## How It Works

### Fetch Flow
1. Page loads and calls `/api/leaderboard`
2. API queries Supabase for leaderboard data
3. Data is displayed on the page

### Fallback Behavior
If the Supabase table doesn't exist:
1. API returns an error
2. Frontend catches the error and uses mock data
3. Mock competitors are displayed

This means the leaderboard always shows data - either real or mock!

## Mock Data

The following mock users are included by default:

| Name | Department | XP | Badge |
|------|------------|----|----|
| Aditya Kumar | RRG | 13,100 | Diamond |
| Priya Sharma | MMG | 12,450 | Diamond |
| Sneha Patel | RCB | 10,800 | Silver |
| Rahul Verma | RRG | 11,200 | Gold |
| Neha Singh | ZONE | 9,200 | Silver |
| Vikram Reddy | MRG | 8,500 | Bronze |
| Arjun Menon | MMG | 7,200 | Bronze |
| Isha Prabhu | RCB | 6,800 | Bronze |
| Rohan Gupta | ZONE | 5,500 | Silver |
| Divya Nair | RRG | 4,200 | Bronze |

## Adding Your Own Data

To add user scores programmatically:

```typescript
// Call the seed endpoint with custom data by modifying:
// src/app/api/seed-leaderboard/route.ts

// Or insert directly via Supabase client:
const { error } = await supabase.from('leaderboard').insert({
  name: 'Your Name',
  email: 'your@email.com',
  xp: 5000,
  badge: 'Silver',
  department: 'YOUR_DEPT'
});
```

## API Endpoints

### GET /api/leaderboard
Returns top 20 competitors sorted by XP.

**Response:**
```json
[
  {
    "name": "Aditya Kumar",
    "score": 13100,
    "badge": "Diamond",
    "avatar": "aditya.kumar@ops.com",
    "department": "RRG"
  },
  ...
]
```

### POST /api/seed-leaderboard
Seeds the database with 10 mock users (only works if table exists).

**Response:**
```json
{
  "message": "Leaderboard seeded successfully",
  "count": 10
}
```

## Troubleshooting

**"Could not find the table 'public.leaderboard'"**
- The table hasn't been created yet
- Follow the setup steps above
- The app will show mock data in the meantime

**"Leaderboard table does not exist yet"**
- Same as above - create the table in Supabase SQL Editor

**Data not updating after seeding**
- Clear your browser cache
- Refresh the page
- Check that the table exists in Supabase

## Current User Integration

When a user is logged in, they are automatically added to the leaderboard with their current XP from the game context. This allows them to see where they rank against other players.
