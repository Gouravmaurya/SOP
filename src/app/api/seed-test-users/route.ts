import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const testUsers = [
  { name: "Aditya Kumar", email: "aditya@test.com", xp: 13100, badge: "Diamond", department: "RRG" },
  { name: "Priya Sharma", email: "priya@test.com", xp: 12450, badge: "Diamond", department: "MMG" },
  { name: "Rahul Verma", email: "rahul@test.com", xp: 11200, badge: "Gold", department: "RRG" },
  { name: "Sneha Patel", email: "sneha@test.com", xp: 10800, badge: "Silver", department: "RCB" },
  { name: "Neha Singh", email: "neha@test.com", xp: 9200, badge: "Silver", department: "ZONE" },
  { name: "Vikram Reddy", email: "vikram@test.com", xp: 8500, badge: "Gold", department: "MRG" },
  { name: "Arjun Menon", email: "arjun@test.com", xp: 7200, badge: "Silver", department: "MMG" },
  { name: "Isha Prabhu", email: "isha@test.com", xp: 6800, badge: "Silver", department: "RCB" },
  { name: "Rohan Gupta", email: "rohan@test.com", xp: 5500, badge: "Silver", department: "ZONE" },
  { name: "Divya Nair", email: "divya@test.com", xp: 4200, badge: "Bronze", department: "RRG" },
];

async function seedUsers() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { error: "Supabase not configured" };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Insert test users
    const { data, error } = await supabase
      .from("users")
      .insert(
        testUsers.map((user) => ({
          name: user.name,
          email: user.email,
          xp: user.xp,
          badge: user.badge,
          department: user.department,
        }))
      )
      .select();

    if (error) {
      console.error("Error seeding users:", error);
      return { error: error.message };
    }

    return {
      success: true,
      message: "Test users created successfully",
      count: data?.length || 0,
      users: data,
    };
  } catch (error: any) {
    console.error("Seed error:", error);
    return { error: error.message };
  }
}

export async function POST() {
  const result = await seedUsers();
  return NextResponse.json(result, {
    status: result.error ? 500 : 200,
  });
}

export async function GET() {
  const result = await seedUsers();
  return NextResponse.json(result, {
    status: result.error ? 500 : 200,
  });
}
