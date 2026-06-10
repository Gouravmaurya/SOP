import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: "Supabase configuration missing" }, { status: 500 });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Fetch leaderboard data sorted by XP
    const { data, error } = await supabase
      .from("leaderboard")
      .select("*")
      .order("xp", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Error fetching leaderboard:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform data to match frontend expectations
    const leaderboardData = (data || []).map((entry: any) => ({
      name: entry.name,
      score: entry.xp,
      badge: entry.badge,
      avatar: entry.email || entry.name,
      department: entry.department,
    }));

    return NextResponse.json(leaderboardData);
  } catch (error: any) {
    console.error("Leaderboard fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
