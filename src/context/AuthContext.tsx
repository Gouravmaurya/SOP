"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseFallback } from "@/lib/supabase";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, nameOrPass: string, pass?: string) => Promise<void>;
  register: (email: string, name: string, department: string, pass?: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  isMock: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state
  useEffect(() => {
    if (isSupabaseFallback || !supabase) {
      // Mock Fallback Mode: Load user from localStorage
      const savedUser = localStorage.getItem("sop_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    } else {
      // Supabase Mode: Fetch active session & subscribe to shifts
      supabase.auth.getSession().then(({ data: { session } }) => {
        try {
          if (session?.user) {
            const mappedUser: User = {
              id: session.user.id,
              name: session.user.user_metadata?.name || session.user.email?.split("@")[0] || "Anonymous User",
              email: session.user.email || "",
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email || "sop"}`,
              role: "Field Engineer", // Default premium role
              department: session.user.user_metadata?.department || "Operations"
            };
            setUser(mappedUser);
            localStorage.setItem("sop_user", JSON.stringify(mappedUser));
          } else {
            setUser(null);
            localStorage.removeItem("sop_user");
          }
        } catch (error) {
          console.error("Error setting Supabase user on load:", error);
        } finally {
          setLoading(false);
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        try {
          if (session?.user) {
            const mappedUser: User = {
              id: session.user.id,
              name: session.user.user_metadata?.name || session.user.email?.split("@")[0] || "Anonymous User",
              email: session.user.email || "",
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email || "sop"}`,
              role: "Field Engineer",
              department: session.user.user_metadata?.department || "Operations"
            };
            setUser(mappedUser);
            localStorage.setItem("sop_user", JSON.stringify(mappedUser));
          } else {
            setUser(null);
            localStorage.removeItem("sop_user");
          }
        } catch (error) {
          console.error("Error inside Supabase auth listener change:", error);
        } finally {
          setLoading(false);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, nameOrPass: string, pass?: string) => {
    setLoading(true);
    try {
      if (isSupabaseFallback || !supabase) {
        // Mock Login Fallback
        const defaultName = pass ? nameOrPass : "Aarav Singh";
        const mockUser = {
          id: "user_1",
          name: defaultName,
          email: email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          role: "Field Engineer",
          department: "Operations"
        };
        setUser(mockUser);
        localStorage.setItem("sop_user", JSON.stringify(mockUser));
        router.push("/");
      } else {
        // Supabase Login
        const password = pass || nameOrPass;
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw new Error(error.message);
        router.push("/");
      }
    } catch (error: any) {
      setLoading(false);
      throw new Error(error.message || error);
    }
  };

  const register = async (email: string, name: string, department: string, pass?: string) => {
    setLoading(true);
    try {
      if (isSupabaseFallback || !supabase) {
        // Mock Register Fallback
        const mockUser = {
          id: Math.random().toString(36).substring(2, 11),
          name: name,
          email: email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          role: "Trainee",
          department: department
        };
        setUser(mockUser);
        localStorage.setItem("sop_user", JSON.stringify(mockUser));
        router.push("/");
      } else {
        // Supabase Signup
        if (!pass) {
          throw new Error("Password is required for registration.");
        }
        const { error } = await supabase.auth.signUp({
          email,
          password: pass,
          options: {
            data: {
              name: name,
              department: department
            }
          }
        });
        if (error) throw new Error(error.message);
        router.push("/");
      }
    } catch (error: any) {
      setLoading(false);
      throw new Error(error.message || error);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (isSupabaseFallback || !supabase) {
        setUser(null);
        localStorage.removeItem("sop_user");
        router.push("/login");
      } else {
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error(error.message);
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Error during log out:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user,
      loading,
      isMock: isSupabaseFallback || !supabase
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
