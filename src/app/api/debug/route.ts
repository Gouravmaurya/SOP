import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({
      error: "Supabase not configured",
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey
    }, { status: 500 });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Test 1: Check if users table exists
    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .select("count()")
      .limit(1);

    // Test 2: Check if user_progress table exists
    const { data: progressData, error: progressError } = await supabase
      .from("user_progress")
      .select("count()")
      .limit(1);

    // Test 3: Get all users
    const { data: allUsers, error: usersListError } = await supabase
      .from("users")
      .select("*")
      .order("xp", { ascending: false })
      .limit(10);

    return NextResponse.json({
      supabase_configured: true,
      tables: {
        users: {
          exists: !usersError || usersError.code !== "PGRST205",
          error: usersError?.message,
          count: usersData ? "exists" : "error"
        },
        user_progress: {
          exists: !progressError || progressError.code !== "PGRST205",
          error: progressError?.message,
          count: progressData ? "exists" : "error"
        }
      },
      all_users: allUsers || [],
      user_list_error: usersListError?.message,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
