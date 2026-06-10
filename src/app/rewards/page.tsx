"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useGame } from "@/context/GameContext";
import { Gift, Lock, CheckCircle2, ChevronRight, Zap, Coffee, Shirt, Ticket, GraduationCap, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const REWARDS = [
  { id: "r1", name: "Premium Coffee Voucher", type: "Digital", desc: "A free premium coffee at the company cafeteria.", xpReq: 2000, icon: Coffee, color: "text-[#a855f7]" },
  { id: "r2", name: "Exclusive Company T-Shirt", type: "Physical", desc: "Limited edition 'SOP Elite' apparel.", xpReq: 5000, icon: Shirt, color: "text-[#0ea5e9]" },
  { id: "r3", name: "Extra Leave Half-Day", type: "Perk", desc: "Redeemable half-day off for excellent safety compliance.", xpReq: 8000, icon: Ticket, color: "text-[#22c55e]" },
  { id: "r4", name: "Master Operator Certification", type: "Credential", desc: "Official HR-recognized certificate for your portfolio.", xpReq: 12000, icon: GraduationCap, color: "text-[#facc15]" },
  { id: "r5", name: "VIP Parking Spot (1 Month)", type: "Perk", desc: "Prime parking spot reserved at headquarters.", xpReq: 20000, icon: Star, color: "text-orange-400" },
];

export default function RewardsPage() {
  const { user } = useAuth();
  const { stats } = useGame();

  const userXp = stats.xp; // Using context

  return (
    <div className="min-h-screen bg-[#050b16] p-8 pb-20 text-white font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#22c55e]/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
            <Gift size={40} className="text-[#22c55e]" />
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter text-white">
            Available <span className="text-[#22c55e]">Rewards</span>
          </h1>
          <p className="text-white/40 font-medium max-w-lg mx-auto">
            Your high accuracy and dedication earn tangible benefits. Redeem your XP for exclusive company rewards.
          </p>
        </div>

        {/* Current Balance */}
        <div className="glass-panel p-8 rounded-2xl bg-gradient-to-r from-[#22c55e]/10 to-transparent border-[#22c55e]/20 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Your Redeemable Balance</div>
            <div className="text-4xl font-black text-white italic flex items-center gap-3">
              {userXp.toLocaleString()} <span className="text-xl text-[#22c55e]">XP</span>
            </div>
          </div>
          <button className="px-6 py-3 bg-[#22c55e] hover:bg-[#16a34a] text-black font-black uppercase tracking-widest text-xs rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all">
            History
          </button>
        </div>

        {/* Rewards List */}
        <div className="space-y-4">
          {REWARDS.map((reward, index) => {
            const isUnlocked = userXp >= reward.xpReq;
            const progress = Math.min((userXp / reward.xpReq) * 100, 100);

            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "glass-panel p-6 rounded-2xl flex items-center gap-6 transition-all duration-300",
                  isUnlocked ? "bg-white/[0.02] border-white/10 hover:border-white/20" : "bg-white/[0.01] border-white/5 opacity-70 grayscale"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                  isUnlocked ? `bg-white/5 ${reward.color}` : "bg-white/5 text-white/20"
                )}>
                  <reward.icon size={32} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-black uppercase italic tracking-tight text-white">{reward.name}</h3>
                    <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-white/10 text-white/60">
                      {reward.type}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white/40 mb-3">{reward.desc}</p>
                  
                  {/* Progress Bar for Locked Items */}
                  {!isUnlocked && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[9px] font-bold text-white/40">
                        <span>PROGRESS TO UNLOCK</span>
                        <span>{userXp.toLocaleString()} / {reward.xpReq.toLocaleString()} XP</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white/20 rounded-full" 
                          style={{ width: `${progress}%` }} 
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-3 shrink-0 ml-4">
                  <div className="text-right">
                    <div className="text-lg font-black text-[#22c55e]">{reward.xpReq.toLocaleString()}</div>
                    <div className="text-[9px] font-black text-white/40 uppercase tracking-widest">Required XP</div>
                  </div>
                  
                  {isUnlocked ? (
                    <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2">
                      Redeem <ChevronRight size={14} />
                    </button>
                  ) : (
                    <div className="px-5 py-2.5 bg-white/5 text-white/20 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 cursor-not-allowed">
                      <Lock size={14} /> Locked
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
