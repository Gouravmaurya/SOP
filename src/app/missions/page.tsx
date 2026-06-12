"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/context/GameContext";
import { QuizComponent } from "@/components/game/QuizComponent";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, ArrowLeft, RefreshCw, Map as MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { levelQuestions } from "@/lib/questions";

export default function MissionPage() {
  const { currentLevel, completeLevel, updateStats } = useGame();
  const router = useRouter();
  const [missionState, setMissionState] = useState<"briefing" | "playing" | "summary">("briefing");
  const [results, setResults] = useState<{ score: number; stars: number; accuracy: number } | null>(null);

  // If no level selected, redirect to map
  useEffect(() => {
    if (!currentLevel) {
      router.push("/map");
    }
  }, [currentLevel, router]);

  if (!currentLevel) return null;

  const XP_BASE = 500;       // Flat XP for completing any level
  const XP_STAR_BONUS = 100; // Extra XP per star above 1 (2★ = +100, 3★ = +200)

  const handleComplete = (score: number) => {
    const qCount = levelQuestions[currentLevel.id]?.length || 5;
    const ratio = score / qCount;
    const stars = ratio >= 0.8 ? 3 : ratio >= 0.5 ? 2 : ratio > 0 ? 1 : 0;
    const accuracy = Math.round(ratio * 100);

    // XP = flat base (500) + bonus for extra stars
    // 1★ = 500 XP, 2★ = 600 XP, 3★ = 700 XP
    const xpEarned = XP_BASE + (stars - 1) * XP_STAR_BONUS;
    
    setResults({ score: xpEarned, stars, accuracy });
    setMissionState("summary");
    completeLevel(currentLevel.id, xpEarned, stars);
  };

  const renderLevelArchetype = () => {
    switch (currentLevel.type) {
      case "quiz":
        const quizQuestions = levelQuestions[currentLevel.id] || [
          {
            id: 1,
            text: "What is the FIRST step before opening a Feeder Pillar?",
            options: [
              { id: "a", text: "Visually inspect for physical damage or signs of heating", isCorrect: true, explanation: "Safety protocol requires a visual check to avoid immediate flash hazards." },
              { id: "b", text: "Directly unlock and pull the door open", isCorrect: false, explanation: "Pulling the door without inspection can trigger arc flashes if there's internal damage." },
              { id: "c", text: "Check the meter reading through the glass", isCorrect: false, explanation: "Inspection comes before data gathering for safety." }
            ]
          }
        ];
        return (
          <QuizComponent 
            levelId={currentLevel.id} 
            questions={quizQuestions}
            onComplete={handleComplete}
          />
        );
      default:
        return <div>Unknown level type</div>;
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col bg-[#050b16] relative">
      <AnimatePresence mode="wait">
        {missionState === "briefing" && (
          <motion.div 
            key="briefing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center p-6"
          >
            <div className="glass-panel max-w-xl w-full p-10 bg-[#0a111e]/90 border-white/5 text-center">
              <div className="w-20 h-20 rounded-full bg-[#0ea5e9]/20 flex items-center justify-center mx-auto mb-6">
                <Trophy size={40} className="text-[#0ea5e9]" />
              </div>
              <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-4">
                Mission Briefing: {currentLevel.title}
              </h1>
              <p className="text-sm text-white/60 mb-8 leading-relaxed italic px-6">
                You are about to enter a {currentLevel.type} mission. 
                Maintain high accuracy to earn maximum XP and Stars. 
                Remember: Safety decisions are prioritized.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">Archetype</div>
                  <div className="text-sm font-bold text-white capitalize">{currentLevel.type}</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">Estimated Time</div>
                  <div className="text-sm font-bold text-white">3-5 Mins</div>
                </div>
              </div>

              {/* XP Breakdown for this level */}
              <div className="p-4 rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/20 mb-8 text-left">
                <div className="text-[10px] text-[#a855f7] uppercase font-black tracking-widest mb-3">XP You Can Earn</div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/50">Complete Level</span>
                    <span className="font-black text-white">+500 XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">★★ Good (≥50% correct)</span>
                    <span className="font-black text-[#facc15]">+100 XP bonus</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">★★★ Perfect (≥80% correct)</span>
                    <span className="font-black text-[#facc15]">+200 XP bonus</span>
                  </div>
                  <div className="border-t border-white/10 pt-1.5 flex justify-between">
                    <span className="text-white/70 font-bold">Max Earnable</span>
                    <span className="font-black text-[#a855f7]">700 XP</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setMissionState("playing")}
                className="w-full py-4 bg-[#0ea5e9] hover:bg-[#00f3ff] text-white font-black uppercase italic tracking-[0.2em] rounded-xl shadow-[0_8px_30px_rgba(14,165,233,0.3)] transition-all"
              >
                Start Mission
              </button>
            </div>
          </motion.div>
        )}

        {missionState === "playing" && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1"
          >
            {renderLevelArchetype()}
          </motion.div>
        )}

        {missionState === "summary" && results && (
          <motion.div 
            key="summary"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center p-6"
          >
            <div className="glass-panel max-w-xl w-full p-10 bg-[#0a111e]/90 border-white/5 text-center">
              <div className="text-[#facc15] font-black text-lg tracking-widest uppercase mb-2">Mission Accomplished</div>
              <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase mb-8">Excellent Work!</h2>
              
              <div className="flex justify-center gap-4 mb-8">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <Star 
                      size={48} 
                      className={cn(
                        "fill-current",
                        i < results.stars ? "text-[#facc15] drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" : "text-white/10"
                      )} 
                    />
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-6 rounded-2xl bg-[#a855f7]/10 border border-[#a855f7]/20">
                  <div className="text-[10px] text-[#a855f7] uppercase font-black tracking-widest mb-1">XP Gained</div>
                  <div className="text-2xl font-black text-white">+{results.score}</div>
                </div>
                <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20">
                  <div className="text-[10px] text-green-500 uppercase font-black tracking-widest mb-1">Accuracy</div>
                  <div className="text-2xl font-black text-white">{results.accuracy}%</div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => router.push("/map")}
                  className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-black uppercase italic tracking-widest rounded-xl transition-all flex items-center justify-center gap-3"
                >
                  <MapIcon size={18} /> Back to Map
                </button>
                <button 
                  onClick={() => setMissionState("briefing")}
                  className="flex-1 py-4 bg-[#0ea5e9] hover:bg-[#00f3ff] text-white font-black uppercase italic tracking-widest rounded-xl shadow-[0_8px_30px_rgba(14,165,233,0.2)] transition-all flex items-center justify-center gap-3"
                >
                  <RefreshCw size={18} /> Replay Level
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* HUD Exit Button */}
      {missionState === "playing" && (
        <button 
          onClick={() => router.push("/map")}
          className="absolute top-8 left-8 p-3 glass-panel bg-black/40 border-white/10 text-white/40 hover:text-white transition-all z-20 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </button>
      )}
    </div>
  );
}
