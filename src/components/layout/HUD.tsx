"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Search, 
  Star,
  ChevronDown,
  Activity,
  User as UserIcon,
  LogOut
} from "lucide-react";
import { useGame } from "@/context/GameContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function HUD() {
  const { stats } = useGame();
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-64 right-0 h-20 z-40 bg-[#050b16]/80 backdrop-blur-xl border-b border-white/5 px-8 flex items-center justify-between">
      {/* Search Bar - Command Style */}
      <div className="flex-1 max-w-md relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#0ea5e9] transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search missions, sectors, or SOPs..." 
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#0ea5e9]/40 focus:bg-white/[0.08] transition-all"
        />
      </div>

      {/* Resource Indicators */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-8 px-6 py-2 rounded-2xl bg-white/5 border border-white/5">
          <ResourceChip 
            icon={<Star size={14} className="text-[#a855f7]" />} 
            value={stats.xp.toLocaleString()} 
            label="XP" 
          />
        </div>

        <div className="h-10 w-px bg-white/10" />

        {/* Action Icons */}
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:border-white/10 transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#ef4444] rounded-full border-2 border-[#050b16]" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-4 pl-2 pr-4 py-2 rounded-2xl bg-white/5 border border-white/5 hover:border-[#0ea5e9]/30 transition-all group"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-[#0ea5e9]/40 p-0.5">
                <img 
                  src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav"} 
                  className="w-full h-full rounded-lg bg-[#0a1628]" 
                  alt="Profile" 
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#22c55e] border-2 border-[#050b16] rounded-full" />
            </div>
            <div className="hidden xl:flex flex-col items-start leading-tight">
              <span className="text-xs font-black text-white uppercase tracking-tight">{user?.name || "Anonymous"}</span>
              <span className="text-[10px] font-bold text-[#0ea5e9] uppercase tracking-widest">{stats.rank}</span>
            </div>
            <ChevronDown size={14} className={cn("text-white/20 transition-transform", isProfileOpen && "rotate-180")} />
          </button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-3 w-56 glass-panel p-2 bg-[#0a1628]/95 border-white/10 shadow-2xl"
              >
                <div className="p-3 border-b border-white/5 mb-1">
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Active Role</p>
                  <p className="text-xs font-bold text-white/80">{user?.role || "Unassigned"}</p>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-all text-xs font-bold uppercase tracking-wider">
                  <UserIcon size={16} /> My Protocol
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-all text-xs font-bold uppercase tracking-wider">
                  <Activity size={16} /> Analytics
                </button>
                <div className="h-px bg-white/5 my-1" />
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-500/60 hover:text-red-500 transition-all text-xs font-black uppercase tracking-wider"
                >
                  <LogOut size={16} /> Terminate
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

function ResourceChip({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
  return (
    <div className="flex items-center gap-3 group cursor-default">
      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
        {icon}
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-xs font-black text-white tracking-tight">{value}</span>
        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{label}</span>
      </div>
    </div>
  );
}

