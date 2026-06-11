"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Level } from "@/lib/mockData";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

interface GameStats {
  xp: number;
  points: number;
  stamina: number;
  maxStamina: number;
  stars: number;
  rank: string;
}

interface GameContextType {
  levels: Level[];
  stats: GameStats;
  currentLevel: Level | null;
  unlockingLevelId: number | null;
  completeLevel: (levelId: number, score: number, stars: number) => void;
  updateStats: (xpDelta: number, pointsDelta: number) => void;
  setCurrentLevel: (level: Level | null) => void;
  selectLevel: (levelId: number | string) => void;
  clearUnlockingState: () => void;
  resetGame: () => void;
}

const initialLevels: Level[] = [
  { id: 1, title: "PREWORK SAFETY", description: "Learn the essential safety protocols before starting any field work.", type: "quiz", status: "current", stars: 0, points: 500, position: { x: 50, y: 7 } },
  { id: 2, title: "FOUNDATION CHECK", description: "Inspect the physical structure and surrounding area for stability.", type: "quiz", status: "locked", stars: 0, points: 750, position: { x: 32, y: 19 } },
  { id: 3, title: "PPE ESSENTIALS", description: "Correctly verify the wearing sequence of Personal Protective Equipment.", type: "quiz", status: "locked", stars: 0, points: 1000, position: { x: 68, y: 31 } },
  { id: 4, title: "REPTILE CHECK", description: "Identify and manage wildlife hazards within the equipment area.", type: "quiz", status: "locked", stars: 0, points: 1200, position: { x: 32, y: 43 } },
  { id: 5, title: "DOOR MECHANICS", description: "Understand the proper opening and securing of unit doors.", type: "quiz", status: "locked", stars: 0, points: 1500, position: { x: 68, y: 55 } },
  { id: 6, title: "INTERNAL INSPECTION", description: "Conduct a thorough check of internal components and wiring.", type: "quiz", status: "locked", stars: 0, points: 1800, position: { x: 50, y: 67 } },
  { id: 7, title: "CABLE ROUTING", description: "Identify correct routing and alignment procedures for high-voltage cables.", type: "quiz", status: "locked", stars: 0, points: 2000, position: { x: 32, y: 79 } },
  { id: 8, title: "HAZARD ANALYSIS", description: "Final assessment on comprehensive hazard identification.", type: "quiz", status: "locked", stars: 0, points: 2500, position: { x: 50, y: 91 } },
];

const defaultStats: GameStats = {
  xp: 0,
  points: 0,
  stamina: 150,
  maxStamina: 150,
  stars: 0,
  rank: "Trainee"
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isMock } = useAuth();
  const [levels, setLevels] = useState<Level[]>(initialLevels);
  const [unlockingLevelId, setUnlockingLevelId] = useState<number | null>(null);
  const [stats, setStats] = useState<GameStats>(defaultStats);
  const [currentLevel, setCurrentLevelState] = useState<Level | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Persistence: Load from Supabase (or localStorage in fallback/mock mode)
  useEffect(() => {
    const loadProgress = async () => {
      // Local Fallback Loader function
      const loadLocalProgress = () => {
        const savedLevels = localStorage.getItem("sop_levels");
        const savedStats = localStorage.getItem("sop_stats");
        if (savedLevels) {
          try {
            const parsed = JSON.parse(savedLevels);
            if (Array.isArray(parsed) && parsed.length === initialLevels.length) {
              setLevels(parsed);
            } else {
              setLevels(initialLevels);
            }
          } catch (e) {
            setLevels(initialLevels);
          }
        } else {
          setLevels(initialLevels);
        }
        if (savedStats) {
          try {
            setStats(JSON.parse(savedStats));
          } catch (e) {
            setStats(defaultStats);
          }
        } else {
          setStats(defaultStats);
        }
      };

      if (isMock || !supabase || !user) {
        loadLocalProgress();
        setIsInitialized(true);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user_progress")
          .select("levels, stats")
          .eq("user_id", user.id)
          .single();

        if (error) {
          // If the relation table doesn't exist (PGRST205 / 42P01) or other cache mismatch, fallback locally
          if (error.code === "PGRST205" || error.message?.includes("cache") || error.message?.includes("relation")) {
            console.warn("⚠️ [Supabase] 'user_progress' table not found. Using local resilient storage.");
            loadLocalProgress();
          } else if (error.code === "PGRST116" || error.message?.includes("no rows")) {
            // First login: No database progress record exists yet, create one securely
            const { error: insertError } = await supabase
              .from("user_progress")
              .insert({
                user_id: user.id,
                levels: initialLevels,
                stats: defaultStats,
                updated_at: new Date().toISOString()
              });
            if (insertError) {
              console.error(
                "Error creating initial profile in Supabase:", 
                insertError.message, 
                insertError.details, 
                insertError.hint
              );
            }
            setLevels(initialLevels);
            setStats(defaultStats);
          } else {
            console.error("Database query failed:", error.message, error.details);
            loadLocalProgress();
          }
        } else if (data && data.levels && data.stats) {
          // Successfully loaded from the database!
          if (Array.isArray(data.levels) && data.levels.length === initialLevels.length) {
            setLevels(data.levels);
          } else {
            setLevels(initialLevels);
          }
          setStats(data.stats as GameStats);
        } else {
          loadLocalProgress();
        }
      } catch (err: any) {
        console.error("Failed to fetch user progress:", err.message || err);
        loadLocalProgress();
      } finally {
        setIsInitialized(true);
      }
    };

    loadProgress();
  }, [user, isMock]);

  // Persistence: Save/Sync back to Supabase (and mirror locally)
  useEffect(() => {
    if (!isInitialized) return;

    // Synchronize locally
    localStorage.setItem("sop_levels", JSON.stringify(levels));
    localStorage.setItem("sop_stats", JSON.stringify(stats));

    // Synchronize to Supabase database if authenticated
    const saveToSupabase = async () => {
      if (isMock || !supabase || !user) return;

      try {
        const { error } = await supabase
          .from("user_progress")
          .upsert({
            user_id: user.id,
            levels: levels,
            stats: stats,
            updated_at: new Date().toISOString()
          });

        if (error) {
          if (error.code !== "PGRST205" && !error.message?.includes("cache") && !error.message?.includes("relation")) {
            console.error("Failed to save progress to Supabase:", error.message, error.details);
          }
        }

        // Also save XP to users table for leaderboard
        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            department: user.department || "Operations",
            xp: stats.xp,
          }),
        }).catch(err => console.log("XP sync note:", err.message));
      } catch (err: any) {
        console.error("Failed to save progress to Supabase:", err.message || err);
      }
    };

    saveToSupabase();
  }, [levels, stats, isInitialized, user, isMock]);

  const completeLevel = (levelId: number, xpGained: number, starsEarned: number) => {
    let nextId: number | null = null;
    
    setLevels(prev => {
      const newLevels = [...prev];
      const index = newLevels.findIndex(l => l.id === levelId);
      if (index !== -1) {
        newLevels[index].status = "completed";
        newLevels[index].stars = starsEarned;
        
        if (index + 1 < newLevels.length) {
          nextId = newLevels[index + 1].id;
          newLevels[index + 1].status = "current";
        }
      }
      return newLevels;
    });

    if (nextId) {
      setUnlockingLevelId(nextId);
    }

    setStats(prev => ({
      ...prev,
      xp: prev.xp + xpGained,
      points: prev.points + (xpGained * 0.5), // Example conversion
      stars: prev.stars + starsEarned,
      rank: calculateRank(prev.xp + xpGained)
    }));
  };

  const calculateRank = (xp: number) => {
    if (xp > 10000) return "Master (Top 1%)";
    if (xp > 5000) return "Expert (Top 5%)";
    if (xp > 2000) return "Senior (Top 15%)";
    return "Trainee";
  };

  const updateStats = (xpDelta: number, pointsDelta: number) => {
    setStats(prev => ({
      ...prev,
      xp: Math.max(0, prev.xp + xpDelta),
      points: Math.max(0, prev.points + pointsDelta)
    }));
  };

  const selectLevel = (levelId: number | string) => {
    const id = typeof levelId === 'string' ? parseInt(levelId.split('-')[1]) : levelId;
    const level = levels.find(l => l.id === id);
    if (level && level.status !== 'locked') {
      setCurrentLevelState(level);
      router.push("/missions");
    }
  };

  const clearUnlockingState = () => setUnlockingLevelId(null);

  const resetGame = () => {
    setLevels(initialLevels);
    setStats(defaultStats);
    localStorage.removeItem("sop_levels");
    localStorage.removeItem("sop_stats");
  };

  return (
    <GameContext.Provider value={{ 
      levels, 
      stats, 
      currentLevel, 
      unlockingLevelId,
      completeLevel, 
      updateStats,
      setCurrentLevel: setCurrentLevelState,
      selectLevel,
      clearUnlockingState,
      resetGame
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
