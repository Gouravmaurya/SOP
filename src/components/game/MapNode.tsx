"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lock, CheckCircle2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Level } from "@/lib/mockData";

interface MapNodeProps {
  level: Level;
  onClick: () => void;
  isUnlocking?: boolean;
}

export function MapNode({ level, onClick, isUnlocking }: MapNodeProps) {
  const isLocked = level.status === "locked" && !isUnlocking;
  const isCompleted = level.status === "completed";
  const isCurrent = level.status === "current" || isUnlocking;

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        whileHover={!isLocked ? { scale: 1.1 } : {}}
        whileTap={!isLocked ? { scale: 0.95 } : {}}
        initial={isUnlocking ? { scale: 0, rotate: -180 } : false}
        animate={isUnlocking ? { scale: 1.2, rotate: 0 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
        onClick={onClick}
        className={cn(
          "relative w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500",
          "border-4",
          isLocked && "bg-[#1a1c23]/50 border-white/5 text-white/10 cursor-not-allowed",
          isCurrent && "bg-[#0ea5e9]/20 border-[#0ea5e9] text-[#0ea5e9] shadow-[0_0_30px_rgba(14,165,233,0.4)] animate-pulse-soft",
          isCompleted && "bg-[#22c55e]/20 border-[#22c55e] text-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.2)]"
        )}
      >
        {/* Glow Rings & Radar Effect */}
        {isCurrent && (
          <>
            <div className="absolute -inset-4 rounded-full border-2 border-[#0ea5e9] opacity-20 animate-ping" />
            <div className="absolute -inset-8 rounded-full border border-[#0ea5e9] opacity-10 animate-pulse" />
            <div className="absolute -inset-12 rounded-full border border-[#0ea5e9]/5 opacity-5 animate-pulse-soft" />
          </>
        )}
        
        {isCompleted && (
          <div className="absolute -inset-3 rounded-full border-2 border-[#22c55e] opacity-20 animate-ping" />
        )}

        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            {isLocked ? (
              <motion.div
                key="locked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ scale: 0, opacity: 0, rotate: 90 }}
              >
                <Lock size={28} className="opacity-50" />
              </motion.div>
            ) : isCompleted ? (
              <motion.div
                key="completed"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <CheckCircle2 size={32} />
              </motion.div>
            ) : (
              <motion.span 
                key="active"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-3xl font-black italic"
              >
                {level.id}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Achievement Indicator */}
        {isCompleted && (
          <div className="absolute -bottom-2 -right-2 bg-[#facc15] text-black rounded-full p-1.5 shadow-lg">
            <Star size={12} fill="currentColor" />
          </div>
        )}
      </motion.div>

      {/* Label Card */}
      <div className={cn(
        "flex flex-col items-center gap-1 transition-all duration-300",
        isLocked ? "opacity-30" : "opacity-100"
      )}>
        <span className={cn(
          "text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-md border",
          isCurrent ? "bg-[#0ea5e9]/10 border-[#0ea5e9]/30 text-[#0ea5e9]" : "bg-white/5 border-white/10 text-white/60"
        )}>
          LEVEL {level.id}
        </span>
        <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{level.title.split(' ')[0]}</span>
      </div>
    </div>
  );
}
