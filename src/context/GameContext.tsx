"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Level } from "@/lib/mockData";

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
  { id: 1, title: "FOUNDATION LEVEL", description: "Learn the core basics of safety and operational awareness.", type: "quiz", status: "current", stars: 0, points: 500, position: { x: 15, y: 70 } },
  { id: 2, title: "ESSENTIALS LEVEL", description: "Master the sequence of technical steps for maximum efficiency.", type: "technical", status: "locked", stars: 0, points: 1000, position: { x: 30, y: 30 } },
  { id: 3, title: "OPERATIONAL LEVEL", description: "Apply SOPs in high-pressure real-world simulations.", type: "simulation", status: "locked", stars: 0, points: 1500, position: { x: 50, y: 60 } },
  { id: 4, title: "ADVANCED LEVEL", description: "Handle complex failure scenarios and emergency protocols.", type: "simulation", status: "locked", stars: 0, points: 2000, position: { x: 70, y: 25 } },
  { id: 5, title: "EXPERT LEVEL", description: "Identify subtle hazards in complex electrical environments.", type: "quiz", status: "locked", stars: 0, points: 2500, position: { x: 85, y: 65 } },
  { id: 6, title: "MASTER LEVEL", description: "Comprehensive final evaluation of field competency.", type: "simulation", status: "locked", stars: 0, points: 3000, position: { x: 60, y: 85 } },
  { id: 7, title: "CHAMPION LEVEL", description: "Become a sector mentor and validate peer procedures.", type: "technical", status: "locked", stars: 0, points: 5000, position: { x: 35, y: 85 } },
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
  const [levels, setLevels] = useState<Level[]>(initialLevels);
  const [unlockingLevelId, setUnlockingLevelId] = useState<number | null>(null);
  const [stats, setStats] = useState<GameStats>(defaultStats);
  const [currentLevel, setCurrentLevelState] = useState<Level | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Persistence: Load from localStorage
  useEffect(() => {
    const savedLevels = localStorage.getItem("sop_levels");
    const savedStats = localStorage.getItem("sop_stats");
    
    if (savedLevels) setLevels(JSON.parse(savedLevels));
    if (savedStats) setStats(JSON.parse(savedStats));
    
    setIsInitialized(true);
  }, []);

  // Persistence: Save to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("sop_levels", JSON.stringify(levels));
      localStorage.setItem("sop_stats", JSON.stringify(stats));
    }
  }, [levels, stats, isInitialized]);

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
