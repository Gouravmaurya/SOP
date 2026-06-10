"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Shield, Medal, Award } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useGame } from "@/context/GameContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";

interface LeaderboardEntry {
  id?: string;
  name: string;
  score: number;
  badge: string;
  avatar: string;
  department: string;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  const { stats } = useGame();
  const [competitors, setCompetitors] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const mockData: LeaderboardEntry[] = [
        { name: "Priya Sharma", score: 12450, badge: "Diamond", avatar: "7", department: "MMG" },
        { name: "Aditya Kumar", score: 13100, badge: "Diamond", avatar: "9", department: "RRG" },
        { name: "Rahul Verma", score: 11200, badge: "Gold", avatar: "3", department: "RRG" },
        { name: "Neha Singh", score: 9200, badge: "Silver", avatar: "5", department: "ZONE" },
        { name: "Sneha Patel", score: 10800, badge: "Silver", avatar: "12", department: "RCB" },
        { name: "Vikram Reddy", score: 8500, badge: "Bronze", avatar: "15", department: "MRG" },
        { name: "Arjun Menon", score: 7200, badge: "Bronze", avatar: "8", department: "MMG" },
        { name: "Isha Prabhu", score: 6800, badge: "Bronze", avatar: "11", department: "RCB" },
        { name: "Rohan Gupta", score: 5500, badge: "Silver", avatar: "6", department: "ZONE" },
        { name: "Divya Nair", score: 4200, badge: "Bronze", avatar: "14", department: "RRG" },
      ];

      try {
        const response = await fetch("/api/leaderboard");
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setCompetitors(data);
          } else {
            setCompetitors(mockData);
          }
        } else {
          // Use mock data if API fails
          setCompetitors(mockData);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
        setCompetitors(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Add current user to leaderboard if authenticated
  useEffect(() => {
    if (user && competitors.length > 0) {
      const userInLeaderboard = competitors.some(c => c.name.includes(user.name));
      if (!userInLeaderboard) {
        const userEntry: LeaderboardEntry = {
          name: `${user.name} (You)`,
          score: stats.xp,
          badge: stats.xp > 10000 ? "Diamond" : stats.xp > 8000 ? "Gold" : stats.xp > 5000 ? "Silver" : "Bronze",
          avatar: user.email || "sop",
          department: user.department || "Operations",
        };
        setCompetitors(prev => [...prev, userEntry]);
      }
    }
  }, [user, stats.xp]);

  // Sort by score descending
  const sortedLeaderboard = [...competitors].sort((a, b) => b.score - a.score);

  const getBadgeIcon = (badge: string) => {
    switch(badge) {
      case "Diamond": return <Trophy size={16} className="text-blue-400" />;
      case "Gold": return <Medal size={16} className="text-yellow-400" />;
      case "Silver": return <Medal size={16} className="text-gray-300" />;
      case "Bronze": return <Award size={16} className="text-orange-400" />;
      default: return <Star size={16} className="text-white/40" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch(badge) {
      case "Diamond": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Gold": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Silver": return "bg-gray-400/20 text-gray-300 border-gray-400/30";
      case "Bronze": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-white/5 text-white/40 border-white/10";
    }
  };

  return (
    <div className="min-h-screen bg-[#050b16] p-8 pb-20 text-white font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#facc15]/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(250,204,21,0.2)]">
            <Trophy size={40} className="text-[#facc15]" />
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
            Global <span className="text-[#facc15]">Leaderboard</span>
          </h1>
          <p className="text-white/40 font-medium max-w-lg mx-auto">
            Top operators ranked by accumulated XP and Mastery Badges. Only the elite reach the Diamond tier.
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-4 mt-12 mb-16 h-64">
          {/* Rank 2 */}
          {sortedLeaderboard[1] && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="mb-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-gray-300 p-1 mb-2 bg-[#0a1628]">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sortedLeaderboard[1].avatar}`} className="w-full h-full rounded-full bg-white/5" alt="avatar" />
                </div>
                <span className="font-bold text-sm text-white max-w-[100px] truncate text-center">{sortedLeaderboard[1].name.replace(" (You)", "")}</span>
                <span className="text-xs text-[#0ea5e9] font-black">{sortedLeaderboard[1].score} XP</span>
              </div>
              <div className="w-28 h-32 bg-gradient-to-t from-gray-300/20 to-gray-300/5 border-t-4 border-gray-300 rounded-t-xl flex justify-center pt-4">
                <span className="text-3xl font-black text-gray-300/50">2</span>
              </div>
            </motion.div>
          )}

          {/* Rank 1 */}
          {sortedLeaderboard[0] && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center z-10"
            >
              <div className="mb-4 flex flex-col items-center relative">
                <Trophy size={24} className="absolute -top-8 text-[#facc15] drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                <div className="w-24 h-24 rounded-full border-4 border-[#facc15] p-1 mb-2 bg-[#0a1628] shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sortedLeaderboard[0].avatar}`} className="w-full h-full rounded-full bg-white/5" alt="avatar" />
                </div>
                <span className="font-bold text-base text-white max-w-[120px] truncate text-center">{sortedLeaderboard[0].name.replace(" (You)", "")}</span>
                <span className="text-sm text-[#0ea5e9] font-black">{sortedLeaderboard[0].score} XP</span>
              </div>
              <div className="w-32 h-40 bg-gradient-to-t from-[#facc15]/20 to-[#facc15]/5 border-t-4 border-[#facc15] rounded-t-xl flex justify-center pt-4 shadow-[0_-10px_40px_rgba(250,204,21,0.15)]">
                <span className="text-5xl font-black text-[#facc15]/50">1</span>
              </div>
            </motion.div>
          )}

          {/* Rank 3 */}
          {sortedLeaderboard[2] && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="mb-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-4 border-orange-400 p-1 mb-2 bg-[#0a1628]">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sortedLeaderboard[2].avatar}`} className="w-full h-full rounded-full bg-white/5" alt="avatar" />
                </div>
                <span className="font-bold text-sm text-white max-w-[100px] truncate text-center">{sortedLeaderboard[2].name.replace(" (You)", "")}</span>
                <span className="text-xs text-[#0ea5e9] font-black">{sortedLeaderboard[2].score} XP</span>
              </div>
              <div className="w-28 h-24 bg-gradient-to-t from-orange-400/20 to-orange-400/5 border-t-4 border-orange-400 rounded-t-xl flex justify-center pt-4">
                <span className="text-3xl font-black text-orange-400/50">3</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Leaderboard List */}
        <div className="glass-panel overflow-hidden border-white/5 rounded-2xl bg-white/[0.02]">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-5">Operator</div>
            <div className="col-span-3 text-center">Department</div>
            <div className="col-span-3 text-right pr-4">Score & Badge</div>
          </div>

          <div className="divide-y divide-white/5">
            {sortedLeaderboard.map((player, index) => {
              const isCurrentUser = player.name.includes("(You)");
              return (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={player.name}
                  className={cn(
                    "grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-white/5",
                    isCurrentUser && "bg-[#0ea5e9]/10 border-l-2 border-[#0ea5e9]"
                  )}
                >
                  <div className="col-span-1 text-center font-black text-white/40">
                    #{index + 1}
                  </div>
                  
                  <div className="col-span-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/10 p-0.5 bg-white/5">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.avatar}`} className="w-full h-full rounded-full" alt="avatar" />
                    </div>
                    <span className={cn(
                      "font-bold text-sm",
                      isCurrentUser ? "text-[#0ea5e9]" : "text-white"
                    )}>
                      {player.name}
                    </span>
                  </div>

                  <div className="col-span-3 text-center">
                    <span className="text-xs font-medium text-white/60 bg-white/5 px-2 py-1 rounded">
                      {player.department}
                    </span>
                  </div>

                  <div className="col-span-3 flex items-center justify-end gap-4 pr-4">
                    <div className="text-right flex flex-col items-end">
                      <span className="font-black text-white text-sm">{player.score.toLocaleString()}</span>
                      <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold">XP</span>
                    </div>
                    <div className={cn(
                      "flex items-center gap-1 px-2 py-1 rounded border",
                      getBadgeColor(player.badge)
                    )}>
                      {getBadgeIcon(player.badge)}
                      <span className="text-[10px] font-black uppercase tracking-wider hidden sm:inline">{player.badge}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
