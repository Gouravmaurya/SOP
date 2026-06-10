"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useGame } from "@/context/GameContext";
import { Award, Lock, Shield, Zap, Target, Star, ShieldCheck, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

const BADGES = [
  { id: "b1", name: "Rookie Operator", desc: "Completed the first SOP mission", req: "1 Mission", icon: Shield, color: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/30", xpReq: 0 },
  { id: "b2", name: "Safety First", desc: "Achieved 100% accuracy on a safety protocol", req: "1 Perfect Score", icon: ShieldCheck, color: "text-[#22c55e]", bg: "bg-[#22c55e]/20", border: "border-[#22c55e]/30", xpReq: 1000 },
  { id: "b3", name: "Silver Technician", desc: "Accumulated 5,000 Total XP", req: "5,000 XP", icon: Award, color: "text-gray-300", bg: "bg-gray-400/20", border: "border-gray-400/30", xpReq: 5000 },
  { id: "b4", name: "Gold Engineer", desc: "Accumulated 8,000 Total XP", req: "8,000 XP", icon: Award, color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30", xpReq: 8000 },
  { id: "b5", name: "Diamond Elite", desc: "Accumulated 10,000 Total XP", req: "10,000 XP", icon: Award, color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30", xpReq: 10000 },
  { id: "b6", name: "Master of Protocol", desc: "Completed all SOPs without a single error", req: "48/48 Mastered", icon: Target, color: "text-[#a855f7]", bg: "bg-[#a855f7]/20", border: "border-[#a855f7]/30", xpReq: 15000 },
  { id: "b7", name: "Streak Legend", desc: "Maintained a 30-day activity streak", req: "30 Day Streak", icon: Zap, color: "text-[#facc15]", bg: "bg-[#facc15]/20", border: "border-[#facc15]/30", xpReq: 20000 },
  { id: "b8", name: "Crisis Manager", desc: "Perfect score on emergency scenarios", req: "Emergency SOPs", icon: ShieldAlert, color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30", xpReq: 25000 },
];

export default function BadgesPage() {
  const { user } = useAuth();
  const { stats } = useGame();

  const userXp = stats.xp; // Using context

  return (
    <div className="min-h-screen bg-[#050b16] p-8 pb-20 text-white font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#0ea5e9]/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(14,165,233,0.2)]">
            <Award size={40} className="text-[#0ea5e9]" />
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
            Mastery <span className="text-[#0ea5e9]">Badges</span>
          </h1>
          <p className="text-white/40 font-medium max-w-lg mx-auto">
            Collect badges by completing SOPs, maintaining accuracy, and leveling up. Badges showcase your expertise to the fleet.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="glass-panel p-8 rounded-2xl bg-white/[0.02] border-white/5 mb-10">
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Badge Completion</div>
              <div className="text-2xl font-black text-white italic">
                {BADGES.filter(b => userXp >= b.xpReq).length} / {BADGES.length} Unlocked
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-black text-[#0ea5e9] uppercase tracking-widest mb-1">Next Unlock at {BADGES.find(b => userXp < b.xpReq)?.xpReq.toLocaleString() || "Max"} XP</div>
            </div>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(BADGES.filter(b => userXp >= b.xpReq).length / BADGES.length) * 100}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-[#0ea5e9] shadow-[0_0_15px_rgba(14,165,233,0.5)]"
            />
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BADGES.map((badge, index) => {
            const isUnlocked = userXp >= badge.xpReq;

            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative glass-panel p-6 rounded-2xl border transition-all duration-300 group overflow-hidden",
                  isUnlocked 
                    ? `bg-white/[0.03] hover:bg-white/[0.05] ${badge.border}` 
                    : "bg-white/[0.01] border-white/5 grayscale opacity-60"
                )}
              >
                {!isUnlocked && (
                  <div className="absolute top-4 right-4 text-white/20">
                    <Lock size={16} />
                  </div>
                )}
                
                {isUnlocked && (
                  <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${badge.bg} blur-[50px] rounded-full pointer-events-none opacity-50`} />
                )}

                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl transition-transform group-hover:scale-110",
                  isUnlocked ? `${badge.bg} ${badge.color}` : "bg-white/5 text-white/20"
                )}>
                  <badge.icon size={28} />
                </div>
                
                <div>
                  <h3 className={cn(
                    "text-lg font-black uppercase italic tracking-tight mb-2",
                    isUnlocked ? "text-white" : "text-white/40"
                  )}>
                    {badge.name}
                  </h3>
                  <p className="text-xs font-medium text-white/40 mb-4 line-clamp-2">
                    {badge.desc}
                  </p>
                  
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest",
                    isUnlocked ? "bg-[#22c55e]/10 text-[#22c55e]" : "bg-white/5 text-white/40"
                  )}>
                    {isUnlocked ? <Star size={10} /> : <Target size={10} />}
                    {isUnlocked ? "Acquired" : badge.req}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
