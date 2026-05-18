"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Target, 
  Zap, 
  ChevronRight, 
  Star, 
  Lock, 
  CheckCircle2, 
  Compass,
  Sparkles,
  ArrowRight,
  Clock,
  Filter
} from "lucide-react";
import { useGame } from "@/context/GameContext";
import { MapNode } from "@/components/game/MapNode";
import { cn } from "@/lib/utils";

export default function SagaMap() {
  const { levels, currentLevel, selectLevel, unlockingLevelId, clearUnlockingState } = useGame();
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(currentLevel?.id || 1);
  
  const selectedLevel = levels.find(l => l.id === selectedLevelId) || levels[0];

  // Auto-clear unlocking state after animation
  useEffect(() => {
    if (unlockingLevelId) {
      const timer = setTimeout(() => {
        clearUnlockingState();
        setSelectedLevelId(unlockingLevelId);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [unlockingLevelId]);

  // Helper to get path segment between two points
  const getSegmentPath = (p1: {x: number, y: number}, p2: {x: number, y: number}) => {
    const dx = p2.x - p1.x;
    const midX = p1.x + dx * 0.5;
    return `M ${p1.x}% ${p1.y}% C ${midX}% ${p1.y}%, ${midX}% ${p2.y}%, ${p2.x}% ${p2.y}%`;
  };

  return (
    <div className="h-full flex flex-col p-8 pt-4">
      {/* Header Area */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[#0ea5e9]/20 border border-[#0ea5e9]/20">
              <Compass className="text-[#0ea5e9] animate-spin-slow" size={20} />
            </div>
            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Saga <span className="text-[#0ea5e9]">Journey</span></h1>
          </div>
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Traverse the operational landscape</p>
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
            <Sparkles size={16} className="text-[#facc15]" />
            <span className="text-[10px] font-bold text-white/60 uppercase">Active Saga: Sector A</span>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 min-h-0">
        <div className="col-span-8 relative glass-panel overflow-hidden border-white/5 bg-[#050b16]/60">
          {/* Background Grids */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          
          <div className="absolute inset-0">
            <div className="relative w-full h-full p-20">
              
              {/* SVG Path Layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                <defs>
                  <linearGradient id="path-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>

                {levels.slice(0, -1).map((level, i) => {
                  const next = levels[i+1];
                  const path = getSegmentPath(level.position, next.position);
                  const isUnlocked = level.status === 'completed';
                  const isUnlockingNow = unlockingLevelId === next.id;

                  return (
                    <g key={`path-${level.id}`}>
                      {/* Background Shadow */}
                      <path d={path} fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="10" strokeLinecap="round" className="blur-md" />
                      
                      {/* Base Path (Dotted) */}
                      <path d={path} fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="1, 10" className="opacity-10" />

                      {/* Animated Active Path */}
                      {isUnlocked && (
                        <motion.path 
                          d={path} 
                          fill="none" 
                          stroke="url(#path-grad)" 
                          strokeWidth="3" 
                          strokeLinecap="round"
                          initial={{ pathLength: isUnlockingNow ? 0 : 1 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, ease: "easeInOut", delay: isUnlockingNow ? 0.5 : 0 }}
                          className="opacity-60"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Levels / Nodes Layer */}
              <div className="relative w-full h-full z-10">
                {levels.map((level) => (
                  <div 
                    key={level.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${level.position.x}%`, top: `${level.position.y}%` }}
                  >
                    <MapNode 
                      level={level} 
                      isUnlocking={unlockingLevelId === level.id}
                      onClick={() => {
                        if (level.status !== 'locked') {
                          setSelectedLevelId(level.id);
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Map HUD */}
          <div className="absolute top-6 left-6 flex flex-col gap-3">
             <div className="glass-panel px-4 py-2 bg-black/40 border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse" />
                <span className="text-[10px] font-black text-white/60 tracking-widest uppercase italic">Atlas Synchronized</span>
             </div>
          </div>

          {/* Unlock Notification Overlay */}
          <AnimatePresence>
            {unlockingLevelId && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-50"
              >
                <div className="glass-panel px-12 py-8 bg-[#0ea5e9]/10 border-[#0ea5e9]/30 backdrop-blur-2xl flex flex-col items-center gap-4">
                   <div className="w-16 h-16 rounded-full bg-[#0ea5e9]/20 flex items-center justify-center text-[#0ea5e9] animate-bounce">
                      <Zap size={32} fill="currentColor" />
                   </div>
                   <div className="text-center">
                      <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">New Mission Unlocked</h3>
                      <p className="text-[#0ea5e9] text-xs font-bold uppercase tracking-widest mt-1">Level {unlockingLevelId} Pathway Established</p>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Level Detail Panel */}
        <div className="col-span-4 flex flex-col gap-6 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLevel.id}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              className="flex-1 glass-panel overflow-hidden border-[#0ea5e9]/20 flex flex-col bg-[#0a1628]/90 shadow-2xl"
            >
              <div className="h-48 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent z-10" />
                <img 
                  src={`https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop`}
                  className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-700"
                  alt={selectedLevel.title}
                />
                <div className="absolute bottom-4 left-6 z-20">
                   <div className="text-[10px] font-black text-[#0ea5e9] tracking-[0.3em] uppercase mb-1">CHAPTER {selectedLevel.id}</div>
                   <h2 className="text-2xl font-black text-white uppercase italic leading-none">{selectedLevel.title}</h2>
                </div>
              </div>

              <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
                <p className="text-sm text-white/50 italic leading-relaxed">{selectedLevel.description}</p>
                
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                    <Target size={12} /> OBJECTIVES
                  </h4>
                  <div className="grid gap-3">
                    {["Protocol Sync", "Field Accuracy", "Time Optimization"].map((obj, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={cn(
                          "w-5 h-5 rounded-md flex items-center justify-center",
                          selectedLevel.status === 'completed' ? "bg-[#22c55e]/20 text-[#22c55e]" : "bg-white/5 text-white/20"
                        )}>
                          <CheckCircle2 size={12} />
                        </div>
                        <span className={cn("text-[11px] font-medium", selectedLevel.status === 'completed' ? "text-white/80" : "text-white/40")}>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectLevel(selectedLevel.id)}
                  disabled={selectedLevel.status === 'locked'}
                  className={cn(
                    "w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3",
                    selectedLevel.status === 'locked' ? "bg-white/5 text-white/20" : "bg-[#0ea5e9] text-black"
                  )}
                >
                  {selectedLevel.status === 'locked' ? <>Locked</> : <>Begin Mission <ArrowRight size={16} /></>}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
