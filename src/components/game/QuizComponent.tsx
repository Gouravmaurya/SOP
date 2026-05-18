"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Star, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGame } from "@/context/GameContext";

interface Question {
  id: number;
  text: string;
  options: { id: string; text: string; isCorrect: boolean; explanation: string }[];
}

interface QuizProps {
  levelId: number;
  questions: Question[];
  onComplete: (score: number) => void;
}

export function QuizComponent({ levelId, questions, onComplete }: QuizProps) {
  const { updateStats } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentIndex];
  const selectedData = currentQuestion.options.find(o => o.id === selectedOption);

  const handleSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption || isAnswered) return;
    
    setIsAnswered(true);
    const correct = selectedData?.isCorrect;
    
    if (correct) {
      setScore(prev => prev + 1);
      updateStats(10, 10); // +10 XP, +10 Points
    } else {
      updateStats(0, -5); // -5 Points for wrong answer
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      onComplete(score);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col h-full py-8">
      {/* Progress Bar */}
      <div className="flex items-center gap-4 mb-8 px-6">
        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#0ea5e9] to-[#00f3ff]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 flex flex-col px-6"
        >
          <h2 className="text-xl font-black text-white mb-8 tracking-tight leading-tight">
            {currentQuestion.text}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const isCorrect = isAnswered && option.isCorrect;
              const isWrong = isAnswered && isSelected && !option.isCorrect;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  disabled={isAnswered}
                  className={cn(
                    "w-full p-5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group",
                    isSelected && !isAnswered && "bg-[#0ea5e9]/10 border-[#0ea5e9] shadow-[0_0_15px_rgba(14,165,233,0.2)]",
                    !isSelected && !isAnswered && "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20",
                    isCorrect && "bg-green-500/10 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]",
                    isWrong && "bg-red-500/10 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]",
                    isAnswered && !isSelected && !option.isCorrect && "opacity-40"
                  )}
                >
                  <span className={cn(
                    "text-sm font-bold",
                    isSelected || isCorrect ? "text-white" : "text-white/60"
                  )}>
                    {option.text}
                  </span>
                  
                  {isAnswered && (
                    <>
                      {option.isCorrect && <CheckCircle2 size={20} className="text-green-500" />}
                      {isWrong && <XCircle size={20} className="text-red-500" />}
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Area */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "mt-8 p-4 rounded-xl border flex gap-4",
                  selectedData?.isCorrect ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  selectedData?.isCorrect ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                )}>
                  <Info size={16} />
                </div>
                <div className="flex-1">
                  <h4 className={cn(
                    "text-[10px] font-black uppercase tracking-widest mb-1",
                    selectedData?.isCorrect ? "text-green-500" : "text-red-500"
                  )}>
                    {selectedData?.isCorrect ? "Excellent!" : "Not quite..."}
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed italic">
                    {selectedData?.explanation}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Footer Actions */}
      <div className="mt-auto p-6 border-t border-white/5 bg-[#0a111e]/50 backdrop-blur-md flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[9px] text-white/40 uppercase font-black tracking-widest">Potential Reward</span>
          <div className="flex items-center gap-2 mt-1">
            <Star size={12} className="text-[#facc15] fill-[#facc15]" />
            <span className="text-xs font-black text-white">100 XP</span>
          </div>
        </div>

        {!isAnswered ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={cn(
              "px-8 py-3 rounded-xl font-black uppercase italic tracking-widest text-sm transition-all",
              selectedOption 
                ? "bg-[#0ea5e9] text-white shadow-[0_8px_20px_rgba(14,165,233,0.3)] hover:scale-105" 
                : "bg-white/5 text-white/20 cursor-not-allowed"
            )}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-white text-[#0a111e] rounded-xl font-black uppercase italic tracking-widest text-sm hover:bg-[#0ea5e9] hover:text-white transition-all flex items-center gap-3 group"
          >
            {currentIndex < questions.length - 1 ? "Next Question" : "Complete Level"}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
