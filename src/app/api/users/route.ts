import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Fetch all users sorted by XP
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, xp, badge, department")
      .order("xp", { ascending: false })
      .limit(100);

    if (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error("Users fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { id, name, email, department, xp = 0 } = body;

    if (!id || !email) {
      return NextResponse.json({ error: "Missing id or email" }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Upsert user (insert or update if already exists)
    const { data, error } = await supabase
      .from("users")
      .upsert({
        id,
        name,
        email,
        xp: xp || 0,
        badge: calculateBadge(xp),
        department: department || "Operations",
        updated_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      console.error("Error upserting user:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data?.[0] || {});
  } catch (error: any) {
    console.error("User POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function calculateBadge(xp: number): string {
  if (xp > 10000) return "Diamond";
  if (xp > 8000) return "Gold";
  if (xp > 5000) return "Silver";
  return "Bronze";
}
