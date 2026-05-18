"use client";

import { 
  LayoutDashboard, 
  Target, 
  Map as MapIcon, 
  Library, 
  BarChart3, 
  Trophy, 
  Award, 
  Gift, 
  MessageSquare,
  Zap,
  Shield,
  Settings,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Target, label: "Missions", href: "/missions" },
  { icon: MapIcon, label: "Levels", href: "/map" },
  { icon: Library, label: "SOP Library", href: "/library" },
  { icon: BarChart3, label: "My Progress", href: "/progress" },
  { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
  { icon: Award, label: "Badges", href: "/badges" },
  { icon: Gift, label: "Rewards", href: "/rewards" },
  { icon: MessageSquare, label: "Ask Mentor", href: "/mentor" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col py-6 bg-[#0a1628] border-r border-white/5 z-50">
      {/* Premium Logo Area */}
      <div className="px-8 mb-10">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0ea5e9] to-[#0284c7] flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.4)] group-hover:scale-110 transition-transform">
            <Shield className="text-white fill-white/20" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-xl leading-none tracking-tighter italic">SOP QUEST</span>
            <span className="text-[#0ea5e9] text-[9px] font-black tracking-[0.3em] mt-1">NEXT GEN</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-4 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative",
                isActive 
                  ? "bg-[#0ea5e9]/10 text-[#0ea5e9]" 
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute inset-0 bg-[#0ea5e9]/5 rounded-xl border border-[#0ea5e9]/20"
                />
              )}
              
              <Icon size={18} className={cn(
                "transition-colors relative z-10",
                isActive ? "text-[#0ea5e9]" : "text-white/30 group-hover:text-white/60"
              )} />
              
              <span className="text-xs font-bold tracking-tight relative z-10">{item.label}</span>
              
              {isActive && (
                <div className="ml-auto w-1 h-4 rounded-full bg-[#0ea5e9] shadow-[0_0_10px_#0ea5e9] relative z-10" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="px-4 mt-4 space-y-4">
        {/* Daily Challenge Card - Refined */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0ea5e9]/10 to-transparent border border-[#0ea5e9]/20 relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#0ea5e9]/10 blur-2xl rounded-full" />
          
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-[#facc15] fill-[#facc15]/20" />
              <span className="text-white font-bold text-[10px] uppercase tracking-wider">Daily Goal</span>
            </div>
            <span className="text-white/30 text-[9px] font-medium">23h left</span>
          </div>
          
          <p className="text-[10px] text-white/70 mb-3 font-medium leading-tight">Complete 1 practice scenario to earn 50 XP</p>
          
          <div className="space-y-1.5">
            <div className="flex justify-between text-[9px] font-bold text-white/40">
              <span>PROGRESS</span>
              <span className="text-[#0ea5e9]">0%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-[#0ea5e9] w-0 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
            </div>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="flex items-center justify-between px-2 pt-2 border-t border-white/5">
          <button className="p-2 text-white/20 hover:text-white transition-colors">
            <Settings size={18} />
          </button>
          <button className="p-2 text-white/20 hover:text-[#ef4444] transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}

import { motion } from "framer-motion";
