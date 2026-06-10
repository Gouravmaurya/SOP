"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useGame } from "@/context/GameContext";
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Activity,
  Zap,
  Calendar,
  Award,
  Star
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProgressPage() {
  const { user } = useAuth();
  const { stats, levels } = useGame();
  
  const completedLevels = levels.filter(l => l.status === "completed").length;
  const currentLevel = stats.xp > 10000 ? "Diamond" : stats.xp > 8000 ? "Gold" : stats.xp > 5000 ? "Silver" : "Bronze";
  const accuracy = completedLevels > 0 ? Math.round((stats.stars / (completedLevels * 3)) * 100) : 0;

  const getLevelColor = (lvl: string) => {
    switch(lvl) {
      case "Diamond": return "text-blue-400";
      case "Gold": return "text-yellow-400";
      case "Silver": return "text-gray-300";
      case "Bronze": return "text-orange-400";
      default: return "text-white";
    }
  };

  return (
    <div className="min-h-screen bg-[#050b16] p-8 pb-20 text-white font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Profile Section */}
        <div className="glass-panel p-8 flex items-center justify-between relative overflow-hidden group border-white/5 bg-white/[0.02]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-24 h-24 rounded-full border-4 border-[#0ea5e9]/50 p-1 bg-[#0a1628] shadow-[0_0_30px_rgba(14,165,233,0.3)]">
              <img src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"} className="w-full h-full rounded-full bg-white/5" alt="Profile" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-[10px] font-black uppercase tracking-widest">{user?.department || "Operations"}</span>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 border",
                  currentLevel === "Diamond" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" :
                  currentLevel === "Gold" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                  currentLevel === "Silver" ? "bg-gray-400/20 text-gray-300 border-gray-400/30" :
                  "bg-orange-500/20 text-orange-400 border-orange-500/30"
                )}>
                  <Award size={12} /> {currentLevel} Tier
                </span>
              </div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                {user?.name || "Operator"}
              </h1>
              <p className="text-white/40 font-medium italic mt-1">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="text-right relative z-10">
            <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Total Accumulated XP</div>
            <div className="text-5xl font-black text-[#0ea5e9] drop-shadow-[0_0_20px_rgba(14,165,233,0.3)]">
              {stats.xp.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6">
          {[
            { label: "Missions Completed", value: completedLevels, icon: Target, color: "text-[#22c55e]", bg: "bg-[#22c55e]/10" },
            { label: "Perfect Scores", value: Math.floor(stats.stars / 3), icon: Star, color: "text-[#facc15]", bg: "bg-[#facc15]/10" },
            { label: "Current Streak", value: "1 Days", icon: Zap, color: "text-[#a855f7]", bg: "bg-[#a855f7]/10" },
            { label: "Overall Accuracy", value: `${accuracy}%`, icon: Activity, color: "text-[#0ea5e9]", bg: "bg-[#0ea5e9]/10" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 flex flex-col gap-4 group hover:border-white/20 transition-all bg-white/[0.02]"
            >
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
              </div>
              <div>
                <div className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">{stat.label}</div>
                <div className="text-3xl font-black text-white italic">{stat.value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Journey Chart & Recent Activity */}
        <div className="grid grid-cols-12 gap-8">
          
          <div className="col-span-8 space-y-6">
            <h3 className="text-xl font-black text-white uppercase tracking-tight italic">XP Progression</h3>
            <div className="glass-panel h-[320px] p-8 flex items-end justify-between gap-4 relative bg-white/[0.02]">
               {/* Mock Progression Chart */}
               {[30, 45, 40, 60, 55, 75, 70, 95].map((h, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center gap-3">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 1 }}
                      className={cn(
                        "w-full rounded-t-xl transition-all duration-500",
                        i === 7 ? "bg-[#0ea5e9] shadow-[0_0_20px_rgba(14,165,233,0.4)]" : "bg-white/5 hover:bg-white/10"
                      )}
                    />
                    <span className="text-[8px] font-bold text-white/20 uppercase">WK {i + 1}</span>
                 </div>
               ))}
               
               <div className="absolute top-8 left-8">
                  <div className="text-[10px] font-bold text-[#22c55e] uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp size={14} /> +24% vs Last Month
                  </div>
               </div>
            </div>
          </div>

          <div className="col-span-4 space-y-6">
            <h3 className="text-xl font-black text-white uppercase tracking-tight italic">Recent Logs</h3>
            <div className="glass-panel overflow-hidden border-white/5 bg-white/[0.02]">
              {[
                { title: 'Feeder Pillar Mastery', type: 'SOP Completion', time: '2h ago', xp: '+500' },
                { title: 'Safety Gear Check', type: 'Quiz Perfect', time: '1d ago', xp: '+250' },
                { title: 'Emergency Protocol', type: 'Simulation', time: '3d ago', xp: '+1000' },
                { title: 'Weekly Login Streak', type: 'Bonus', time: '1w ago', xp: '+100' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {log.type.includes('SOP') ? <ShieldCheck size={16} className="text-[#0ea5e9]" /> :
                       log.type.includes('Quiz') ? <Target size={16} className="text-[#facc15]" /> :
                       <Calendar size={16} className="text-[#a855f7]" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white/80">{log.title}</div>
                      <div className="text-[10px] font-medium text-white/40">{log.time} • {log.type}</div>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#22c55e] italic">{log.xp}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
