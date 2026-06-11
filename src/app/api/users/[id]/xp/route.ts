import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { xpDelta } = body;

    if (!xpDelta) {
      return NextResponse.json({ error: "Missing xpDelta" }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get current user XP
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("xp")
      .eq("id", id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    const newXp = Math.max(0, (user?.xp || 0) + xpDelta);

    // Update user XP
    const { data, error } = await supabase
      .from("users")
      .update({
        xp: newXp,
        badge: calculateBadge(newXp),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data?.[0] || {});
  } catch (error: any) {
    console.error("XP update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function calculateBadge(xp: number): string {
  if (xp > 10000) return "Diamond";
  if (xp > 8000) return "Gold";
  if (xp > 5000) return "Silver";
  return "Bronze";
}
