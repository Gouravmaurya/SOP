"use client";

import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import { ListChecks, CheckCircle2, AlertCircle, Play, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGame } from "@/context/GameContext";

interface Step {
  id: string;
  text: string;
  correctOrder: number;
}

interface ChecklistProps {
  levelId: number;
  steps: Step[];
  onComplete: (success: boolean) => void;
}

export function ChecklistComponent({ levelId, steps, onComplete }: ChecklistProps) {
  const { updateStats } = useGame();
  const [items, setItems] = useState(
    [...steps].sort(() => Math.random() - 0.5) // Shuffle for the challenge
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<{ id: string; isCorrect: boolean }[]>([]);

  const checkOrder = () => {
    const newResults = items.map((item, index) => ({
      id: item.id,
      isCorrect: item.correctOrder === index
    }));
    
    setResults(newResults);
    setIsSubmitted(true);
    
    const allCorrect = newResults.every(r => r.isCorrect);
    if (allCorrect) {
      updateStats(50, 50);
    } else {
      updateStats(0, -10);
    }
  };

  const handleComplete = () => {
    const allCorrect = results.every(r => r.isCorrect);
    onComplete(allCorrect);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-full py-8 px-6">
      <div className="mb-8">
        <h2 className="text-xl font-black text-white mb-2 tracking-tight uppercase italic flex items-center gap-3">
          <ListChecks className="text-[#0ea5e9]" />
          Sequence the Procedure
        </h2>
        <p className="text-xs text-white/40 font-bold uppercase tracking-widest">
          Drag and drop the steps into the correct operational sequence.
        </p>
      </div>

      <Reorder.Group 
        axis="y" 
        values={items} 
        onReorder={(val) => !isSubmitted && setItems(val)} 
        className="space-y-3"
      >
        {items.map((item, index) => {
          const result = results.find(r => r.id === item.id);
          const isCorrect = isSubmitted && result?.isCorrect;
          const isWrong = isSubmitted && !result?.isCorrect;

          return (
            <Reorder.Item
              key={item.id}
              value={item}
              className={cn(
                "p-4 rounded-xl border flex items-center gap-4 transition-all duration-300",
                !isSubmitted && "bg-white/5 border-white/5 cursor-grab active:cursor-grabbing hover:border-[#0ea5e9]/30",
                isCorrect && "bg-green-500/10 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.1)]",
                isWrong && "bg-red-500/10 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center font-black italic",
                !isSubmitted && "bg-white/10 text-white/40",
                isCorrect && "bg-green-500/20 text-green-500",
                isWrong && "bg-red-500/20 text-red-500"
              )}>
                {index + 1}
              </div>
              
              <span className={cn(
                "flex-1 text-sm font-bold",
                isSubmitted ? "text-white" : "text-white/70"
              )}>
                {item.text}
              </span>

              {isSubmitted && (
                <div className="shrink-0">
                  {isCorrect ? (
                    <CheckCircle2 size={18} className="text-green-500" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-red-500 uppercase italic">
                        Should be #{item.correctOrder + 1}
                      </span>
                      <AlertCircle size={18} className="text-red-500" />
                    </div>
                  )}
                </div>
              )}
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      <div className="mt-auto pt-8 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[9px] text-white/40 uppercase font-black tracking-widest italic">Efficiency Rating</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-black text-[#0ea5e9]">LEVEL {levelId}</span>
          </div>
        </div>

        {!isSubmitted ? (
          <button
            onClick={checkOrder}
            className="px-10 py-4 bg-[#0ea5e9] text-white rounded-xl font-black uppercase italic tracking-widest text-sm shadow-[0_8px_20px_rgba(14,165,233,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            Verify Sequence
          </button>
        ) : (
          <button
            onClick={handleComplete}
            className="px-10 py-4 bg-white text-[#0a111e] rounded-xl font-black uppercase italic tracking-widest text-sm hover:bg-green-500 hover:text-white transition-all flex items-center gap-3 group"
          >
            Finalize Assessment
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
