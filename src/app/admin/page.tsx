"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  ShieldCheck,
  TrendingUp,
  Users,
  Activity,
  Search,
  Filter,
  ChevronLeft,
  RotateCcw
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useGame } from "@/context/GameContext";
import { useAuth } from "@/context/AuthContext";

// Dummy data matching the requested metrics and Indian names
const mockReportData = [
  { id: "EMP-1042", department: "MMG", name: "Priya Sharma", marks: 95, laval: "Diamond", sqi: 98, rank: "Gold", rating: "Outstanding", completionRate: "100%", sopDone: "48/48", accuracy: "96%" },
  { id: "EMP-1043", department: "RRG", name: "Rahul Verma", marks: 88, laval: "Gold", sqi: 85, rank: "Silver", rating: "Excellent", completionRate: "90%", sopDone: "43/48", accuracy: "92%" },
  { id: "EMP-1044", department: "RCB", name: "Sneha Patel", marks: 76, laval: "Silver", sqi: 72, rank: "Bronze", rating: "Good", completionRate: "75%", sopDone: "36/48", accuracy: "81%" },
  { id: "EMP-1045", department: "ZONE", name: "Aarav Singh", marks: 92, laval: "Diamond", sqi: 94, rank: "Gold", rating: "Outstanding", completionRate: "100%", sopDone: "48/48", accuracy: "95%" },
  { id: "EMP-1046", department: "MRG", name: "Vikram Reddy", marks: 65, laval: "Bronze", sqi: 60, rank: "Bronze", rating: "Average", completionRate: "60%", sopDone: "28/48", accuracy: "68%" },
];

export default function AdminReportPage() {
  const { resetGame } = useGame();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<1 | 2 | 3>(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleResetProgress = async () => {
    if (confirm("⚠️ This will reset all your game progress. Are you sure?")) {
      try {
        // Reset local state
        resetGame();

        // Reset Supabase data if user is authenticated
        if (user?.id) {
          await fetch("/api/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id }),
          });
        }

        alert("✅ Game progress reset! Refresh the page.");
      } catch (error) {
        console.error("Reset error:", error);
        alert("❌ Error resetting progress. Try again.");
      }
    }
  };

  const handleDownloadCSV = () => {
    // Generate CSV from mockReportData
    const headers = ["DEPARTMENT", "NAME", "ID", "MARKS", "LAVAL (LEVEL)", "SQI", "OVER ALL RAINK", "RATING", "COMPLETION RATE", "SOP DONE", "ACCURACY"];
    const rows = mockReportData.map(row => [
      row.department, 
      row.name, 
      row.id, 
      row.marks, 
      row.laval, 
      row.sqi, 
      row.rank, 
      row.rating,
      row.completionRate,
      row.sopDone,
      row.accuracy
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `admin_report_${activeTab}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = mockReportData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050b16] p-8 pb-20 font-sans text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/60 hover:text-white">
              <ChevronLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="px-3 py-1 rounded-full bg-[#a855f7]/20 border border-[#a855f7]/30 text-[#a855f7] text-[10px] font-black uppercase tracking-widest">Command Center</span>
              </div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                Admin <span className="text-[#0ea5e9]">Reports</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleResetProgress}
              className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-black uppercase tracking-widest text-xs rounded-xl flex items-center gap-2 transition-all"
            >
              <RotateCcw size={16} /> Reset Progress
            </button>
            <button
              onClick={handleDownloadCSV}
              className="px-6 py-3 bg-[#0ea5e9] hover:bg-[#00f3ff] text-black font-black uppercase tracking-widest text-xs rounded-xl flex items-center gap-2 shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all"
            >
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        {/* Report Generators */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { id: 1, title: "Report 1", desc: "Performance & Levels", icon: Activity },
            { id: 2, title: "Report 2", desc: "SOP Completion", icon: ShieldCheck },
            { id: 3, title: "Report 3", desc: "Department Ranks", icon: Users },
          ].map((report) => (
            <button
              key={report.id}
              onClick={() => setActiveTab(report.id as 1|2|3)}
              className={cn(
                "p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group",
                activeTab === report.id 
                  ? "bg-[#0ea5e9]/10 border-[#0ea5e9]/50 shadow-[0_0_30px_rgba(14,165,233,0.15)]" 
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              )}
            >
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <div className={cn(
                    "text-[10px] font-black uppercase tracking-widest mb-2",
                    activeTab === report.id ? "text-[#0ea5e9]" : "text-white/40"
                  )}>Generate</div>
                  <div className="text-xl font-black italic uppercase text-white">{report.title}</div>
                  <div className="text-xs font-medium text-white/50 mt-1">{report.desc}</div>
                </div>
                <div className={cn(
                  "p-3 rounded-xl",
                  activeTab === report.id ? "bg-[#0ea5e9] text-black" : "bg-white/10 text-white/40"
                )}>
                  <report.icon size={20} />
                </div>
              </div>
              {activeTab === report.id && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ea5e9]/20 blur-[50px] rounded-full pointer-events-none" />
              )}
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className="glass-panel border-white/10 overflow-hidden rounded-2xl bg-white/[0.02]">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-black uppercase italic tracking-wide">Data Overview</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Search operator..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#0ea5e9]/50 transition-colors w-64"
                />
              </div>
              <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors">
                <Filter size={18} />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/40">
                <tr>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Marks</th>
                  <th className="px-6 py-4">Laval (Level)</th>
                  <th className="px-6 py-4">SQI</th>
                  <th className="px-6 py-4">Overall Rank</th>
                  <th className="px-6 py-4">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredData.map((row, i) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={row.id} 
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-white/10 text-xs font-bold text-white/80">{row.department}</span>
                    </td>
                    <td className="px-6 py-4 font-bold">{row.name}</td>
                    <td className="px-6 py-4 text-white/40 font-mono text-xs">{row.id}</td>
                    <td className="px-6 py-4 font-black text-[#0ea5e9]">{row.marks}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-black uppercase tracking-wider",
                        row.laval === "Diamond" ? "bg-blue-500/20 text-blue-400" :
                        row.laval === "Gold" ? "bg-yellow-500/20 text-yellow-400" :
                        row.laval === "Silver" ? "bg-gray-400/20 text-gray-300" :
                        "bg-orange-500/20 text-orange-400"
                      )}>{row.laval}</span>
                    </td>
                    <td className="px-6 py-4 font-bold">{row.sqi}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {row.rank === "Gold" && <span className="w-2 h-2 rounded-full bg-yellow-400" />}
                        {row.rank === "Silver" && <span className="w-2 h-2 rounded-full bg-gray-300" />}
                        {row.rank === "Bronze" && <span className="w-2 h-2 rounded-full bg-orange-400" />}
                        <span className="font-medium text-white/80">{row.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-white/60 italic">{row.rating}</span>
                    </td>
                  </motion.tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-white/40 italic">
                      No operators found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Metrics Row */}
        <div className="grid grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl bg-white/5 border-white/10">
            <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Avg Completion Rate</div>
            <div className="text-3xl font-black text-white italic">85%</div>
          </div>
          <div className="glass-panel p-6 rounded-2xl bg-white/5 border-white/10">
            <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">SOP Questions Done</div>
            <div className="text-3xl font-black text-white italic">203/240</div>
          </div>
          <div className="glass-panel p-6 rounded-2xl bg-[#22c55e]/10 border-[#22c55e]/20">
            <div className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest mb-1">Avg Accuracy</div>
            <div className="text-3xl font-black text-white italic">86.4%</div>
          </div>
        </div>

      </div>
    </div>
  );
}
