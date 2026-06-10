import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

const mockLeaderboardData = [
  { name: "Priya Sharma", email: "priya.sharma@ops.com", score: 12450, badge: "Diamond", department: "MMG" },
  { name: "Aditya Kumar", email: "aditya.kumar@ops.com", score: 13100, badge: "Diamond", department: "RRG" },
  { name: "Rahul Verma", email: "rahul.verma@ops.com", score: 11200, badge: "Gold", department: "RRG" },
  { name: "Neha Singh", email: "neha.singh@ops.com", score: 9200, badge: "Silver", department: "ZONE" },
  { name: "Sneha Patel", email: "sneha.patel@ops.com", score: 10800, badge: "Silver", department: "RCB" },
  { name: "Vikram Reddy", email: "vikram.reddy@ops.com", score: 8500, badge: "Bronze", department: "MRG" },
  { name: "Arjun Menon", email: "arjun.menon@ops.com", score: 7200, badge: "Bronze", department: "MMG" },
  { name: "Isha Prabhu", email: "isha.prabhu@ops.com", score: 6800, badge: "Bronze", department: "RCB" },
  { name: "Rohan Gupta", email: "rohan.gupta@ops.com", score: 5500, badge: "Silver", department: "ZONE" },
  { name: "Divya Nair", email: "divya.nair@ops.com", score: 4200, badge: "Bronze", department: "RRG" },
];

export async function POST() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: "Supabase configuration missing" }, { status: 500 });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // First, try to insert data directly - if table doesn't exist, return helpful message
    const { data: existingData, error: fetchError } = await supabase
      .from("leaderboard")
      .select("count()")
      .limit(1);

    if (fetchError?.message?.includes("relation") || fetchError?.message?.includes("not found")) {
      return NextResponse.json({
        error: "Leaderboard table does not exist yet. Please create it in Supabase with the following schema:\n\nCREATE TABLE public.leaderboard (\n  id bigserial PRIMARY KEY,\n  name text NOT NULL,\n  email text NOT NULL UNIQUE,\n  xp integer NOT NULL DEFAULT 0,\n  badge text NOT NULL,\n  department text NOT NULL,\n  created_at timestamp with time zone DEFAULT now(),\n  updated_at timestamp with time zone DEFAULT now()\n);\n\nAfter creating the table, call this endpoint again.",
        tableMissing: true
      }, { status: 400 });
    }

    // Insert mock leaderboard data
    const { error: insertError } = await supabase.from("leaderboard").insert(
      mockLeaderboardData.map((user) => ({
        name: user.name,
        email: user.email,
        xp: user.score,
        badge: user.badge,
        department: user.department,
        created_at: new Date().toISOString(),
      }))
    );

    if (insertError) {
      console.error("Error seeding leaderboard:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Leaderboard seeded successfully", count: mockLeaderboardData.length });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "POST to /api/seed-leaderboard to populate database" });
}
