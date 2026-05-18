import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const hasSupabaseConfig = 
  supabaseUrl && 
  supabaseUrl !== "your-supabase-project-url" && 
  supabaseAnonKey && 
  supabaseAnonKey !== "your-supabase-anon-key";

let supabase: SupabaseClient | null = null;
let isSupabaseFallback = true;

if (hasSupabaseConfig) {
  try {
    supabase = createClient(supabaseUrl!, supabaseAnonKey!);
    isSupabaseFallback = false;
    
    if (process.env.NODE_ENV !== "production") {
      console.log("🚀 [Supabase] Secure database client initialized successfully.");
    }
  } catch (error) {
    console.error("❌ [Supabase] Client creation failed:", error);
  }
} else {
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "⚠️ [Supabase] Missing credentials in env. Running in resilient mock fallback mode."
    );
  }
}

export { supabase, isSupabaseFallback };
