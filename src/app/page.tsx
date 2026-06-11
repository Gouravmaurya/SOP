"use client";

import { motion } from "framer-motion";
import {
  Play,
  Trophy,
  Target,
  Zap,
  ChevronRight,
  Star,
  TrendingUp,
  Users,
  Activity,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useGame } from "@/context/GameContext";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const { stats, levels } = useGame();
  const [userRank, setUserRank] = useState<number>(0);
  const [topUsers, setTopUsers] = useState<any[]>([]);

  // Fetch leaderboard to get user's actual rank
  useEffect(() => {
    const fetchRank = async () => {
      try {
        const response = await fetch("/api/users");
        if (response.ok) {
          const users = await response.json();
          if (Array.isArray(users)) {
            // Find current user's rank
            const userIndex = users.findIndex((u: any) => u.email === user?.email);
            if (userIndex >= 0) {
              setUserRank(userIndex + 1);
            }
            // Get top 3 users
            setTopUsers(users.slice(0, 3));
          }
        }
      } catch (error) {
        console.error("Failed to fetch rank:", error);
      }
    };

    if (user?.email) {
      fetchRank();
    }
  }, [user?.email, stats.xp]);

  const totalQuestions = 48; // Total SOPs mock
  const completedLevels = levels.filter(l => l.status === "completed").length;
  const completionRate = completedLevels > 0 ? Math.round((completedLevels / totalQuestions) * 100) : 0;
  const accuracy = completedLevels > 0 ? Math.round((stats.stars / (completedLevels * 3)) * 100) : 0;

  const dashboardStats = [
    { label: "Completion Rate", value: `${completionRate}%`, icon: Activity, color: "text-[#22c55e]", bg: "bg-[#22c55e]/10" },
    { label: "Learning XP", value: stats.xp.toLocaleString(), icon: Zap, color: "text-[#facc15]", bg: "bg-[#facc15]/10" },
    { label: "SOP Mastery", value: `${completedLevels}/${totalQuestions}`, icon: ShieldCheck, color: "text-[#0ea5e9]", bg: "bg-[#0ea5e9]/10" },
    { label: "Avg. Accuracy", value: `${accuracy}%`, icon: Target, color: "text-[#a855f7]", bg: "bg-[#a855f7]/10" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 pb-20">
      {/* Dynamic Hero Section */}
      <section className="relative h-[380px] rounded-[2.5rem] overflow-hidden glass-panel border-white/10 group">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[#0a1628]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1558444479-c84826091ec2?q=80&w=1200&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
          alt="Dashboard Hero"
        />
        
        {/* Animated Particles/Grids */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0ea5e9 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

        <div className="relative z-20 h-full flex flex-col justify-center px-12 space-y-8">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#0ea5e9]/20 border border-[#0ea5e9]/30 text-[#0ea5e9] text-[10px] font-black uppercase tracking-widest">Operator Active</span>
              <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            </div>
            
            <h1 className="text-7xl font-black italic uppercase tracking-tighter text-white leading-[0.85]">
              Forge Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#a855f7]">Legacy</span>
            </h1>
            
            <p className="text-white/50 text-sm font-medium max-w-md italic">
              Operator: {user?.name || "Aarav Singh"} <br />
              <span className="text-white/30 font-bold uppercase tracking-widest text-[10px]">SOP {user?.department || "Operations"}</span>
            </p>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="/map"
              className="group inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:scale-105 transition-all"
            >
              <Play size={20} fill="currentColor" /> Continue Mission
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Floating Rank Card */}
        <div className="absolute bottom-10 right-12 z-20">
           <div className="glass-panel p-6 bg-white/5 border-white/10 backdrop-blur-xl flex items-center gap-6">
              <div className="flex flex-col items-center">
                 <span className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">GLOBAL RANK</span>
                 <span className="text-4xl font-black text-[#facc15] italic">#{userRank || "N/A"}</span>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">NEXT REWARD</span>
                 <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-[#a855f7]" />
                    <span className="text-sm font-black text-white italic">{stats.xp > 10000 ? "Master Badge" : "Elite Badge"}</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        {dashboardStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 flex flex-col gap-4 group cursor-default hover:border-white/20 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-[#22c55e] text-[10px] font-bold">
                <TrendingUp size={12} /> +2.4%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">{stat.label}</div>
              <div className="text-3xl font-black text-white italic">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Recent Performance Chart (Visual Placeholder) */}
        <div className="col-span-8 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Performance <span className="text-[#0ea5e9]">Analytics</span></h3>
            <div className="flex gap-2">
               {['7D', '1M', 'ALL'].map(t => (
                 <button key={t} className="px-3 py-1 rounded-lg text-[9px] font-black text-white/40 hover:text-white hover:bg-white/5 transition-all">{t}</button>
               ))}
            </div>
          </div>
          
          <div className="glass-panel h-[320px] p-8 flex items-end justify-between gap-4 relative group">
             {/* Simple bar chart visualization */}
             {[45, 60, 40, 85, 55, 90, 75, 95, 65, 80].map((h, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.05, duration: 1 }}
                    className={cn(
                      "w-full rounded-t-xl transition-all duration-500",
                      i === 7 ? "bg-[#0ea5e9] shadow-[0_0_20px_rgba(14,165,233,0.4)]" : "bg-white/5 group-hover:bg-white/10"
                    )}
                  />
                  <span className="text-[8px] font-bold text-white/20 uppercase">MAY {i + 1}</span>
               </div>
             ))}
             
             {/* Chart Overlay Text */}
             <div className="absolute top-10 left-10">
                <div className="text-4xl font-black text-white italic">92.4 <span className="text-lg opacity-40">SQI</span></div>
                <div className="text-[10px] font-bold text-[#22c55e] uppercase tracking-[0.2em] mt-1">Safety Quality Index • Trending Up</div>
             </div>
          </div>
        </div>

        {/* Top Performers Mini-Table */}
        <div className="col-span-4 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Top <span className="text-[#facc15]">Elite</span></h3>
            <Link href="/leaderboard" className="p-1 text-white/40 hover:text-white transition-colors">
              <Users size={18} />
            </Link>
          </div>
          
          <div className="glass-panel overflow-hidden border-white/5">
            {[
              ...(topUsers.length > 0
                ? topUsers.map((u: any, i: number) => ({
                    name: u.name,
                    score: u.xp.toLocaleString(),
                    rank: i + 1,
                    avatar: u.email || u.name,
                    self: false
                  }))
                : [
                    { name: 'Loading...', score: '—', rank: 1, avatar: 'loading', self: false },
                  ]),
              {
                name: `${user?.name || 'Aarav'} (You)`,
                score: stats.xp.toLocaleString(),
                rank: userRank || 0,
                avatar: user?.email || 'user',
                self: true
              }
            ]
              .filter((u, i, arr) => {
                // Remove duplicate current user if already in top 3
                if (u.self && i > 0 && arr.slice(0, 3).some(x => x.avatar === u.avatar && !x.self)) {
                  return false;
                }
                return i < 4;
              })
              .sort((a, b) => (a.self ? 1 : a.rank) - (b.self ? 1 : b.rank))
              .map((userItem) => (
                <div
                  key={userItem.name}
                  className={cn(
                    "flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors",
                    userItem.self && "bg-[#0ea5e9]/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-6 text-[10px] font-black text-center italic",
                        userItem.rank === 1 ? "text-[#facc15]" : "text-white/40"
                      )}
                    >
                      #{userItem.rank || "—"}
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/10 p-0.5">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userItem.avatar}`}
                        className="w-full h-full rounded-full"
                      />
                    </div>
                    <span
                      className={cn(
                        "text-xs font-bold truncate",
                        userItem.self ? "text-[#0ea5e9]" : "text-white/80"
                      )}
                    >
                      {userItem.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-black text-white italic">{userItem.score} XP</span>
                </div>
              ))}
          </div>
          
          {/* Recent Achievement Callout */}
          <div className="glass-panel p-5 bg-gradient-to-r from-[#a855f7]/20 to-transparent border-[#a855f7]/20 flex items-center gap-4 group">
             <div className="w-12 h-12 rounded-2xl bg-[#a855f7]/20 flex items-center justify-center text-[#a855f7] group-hover:rotate-12 transition-transform">
                <Trophy size={24} />
             </div>
             <div>
                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-0.5">LATEST UNLOCK</div>
                <div className="text-xs font-black text-white italic">Master Metering Tech</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
