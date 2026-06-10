"use client";

import { Sidebar } from "./Sidebar";
import { HUD } from "./HUD";
import { GameProvider } from "@/context/GameContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const isLoginPage = pathname === "/login";

  // Protection logic
  useEffect(() => {
    if (!loading && !isAuthenticated && !isLoginPage) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  // If not authenticated and not on login page, don't render content to avoid flicker
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#050b16]">
        <div className="w-12 h-12 rounded-full border-4 border-[#0ea5e9]/20 border-t-[#0ea5e9] animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#050b16] selection:bg-[#0ea5e9]/30">
      <Sidebar />

      <div className="flex-1 pl-64 flex flex-col relative min-w-0">
        <HUD />

        <main className="flex-1 pt-20 overflow-y-auto custom-scrollbar">
          {children}
        </main>

        {/* Refined Brand Overlay */}
        <div className="fixed bottom-6 right-8 opacity-10 pointer-events-none select-none z-0">
          {/* <div className="flex flex-col items-end">
              <div className="text-white font-black text-2xl italic leading-none tracking-tighter">TATA POWER-DDL</div>
              <div className="text-[#0ea5e9] text-[8px] font-black tracking-[0.3em] mt-1 uppercase italic">Towards a Greener Tomorrow</div>
           </div> */}
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <GameProvider>
        <AppContent>{children}</AppContent>
      </GameProvider>
    </AuthProvider>
  );
}
