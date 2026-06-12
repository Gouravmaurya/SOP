"use client";

import { useGame } from "@/context/GameContext";
import Link from "next/link";

export default function DebugPage() {
  const { stats, levels } = useGame();

  const completedLevels = levels.filter(l => l.status === "completed");
  const totalCompleted = completedLevels.length;
  const totalStars = stats.stars;
  const maxPossibleStars = totalCompleted * 3;
  const calculatedAccuracy = totalCompleted > 0 ? Math.min(100, Math.round((totalStars / maxPossibleStars) * 100)) : 0;

  return (
    <div className="min-h-screen bg-[#050b16] p-8 text-white">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link href="/" className="text-[#0ea5e9] hover:underline">← Back to Dashboard</Link>

        <div className="glass-panel p-6 space-y-4 bg-white/5">
          <h1 className="text-2xl font-black">Debug Info</h1>

          <div className="bg-white/10 p-4 rounded-lg space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span>Total Stars in stats:</span>
              <span className="font-bold text-[#facc15]">{totalStars}</span>
            </div>

            <div className="flex justify-between">
              <span>Completed Levels:</span>
              <span className="font-bold text-[#22c55e]">{totalCompleted}</span>
            </div>

            <div className="flex justify-between">
              <span>Max Possible Stars:</span>
              <span className="font-bold">{maxPossibleStars}</span>
            </div>

            <div className="border-t border-white/20 pt-2 mt-2">
              <div className="flex justify-between">
                <span>Calculation: {totalStars} / {maxPossibleStars} * 100</span>
                <span className="font-bold text-[#0ea5e9]">{calculatedAccuracy}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 p-4 rounded-lg space-y-2">
            <h2 className="font-bold">Completed Levels:</h2>
            {completedLevels.length === 0 ? (
              <p className="text-white/40">No completed levels</p>
            ) : (
              completedLevels.map(lvl => (
                <div key={lvl.id} className="text-sm flex justify-between">
                  <span>Level {lvl.id}: {lvl.title}</span>
                  <span className="text-[#facc15] font-bold">⭐ {lvl.stars}/3</span>
                </div>
              ))
            )}
          </div>

          <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-lg text-sm">
            <p className="font-bold text-red-400 mb-2">Issue:</p>
            <p>If this shows 100% but you got wrong answers, go to <code className="bg-black/30 px-2 py-1 rounded">/admin</code> and click "Reset Progress" again, then refresh the page.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
