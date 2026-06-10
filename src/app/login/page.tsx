"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { 
  Shield, 
  Zap, 
  Mail, 
  Lock, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  Command,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const { login, register, isMock } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, name, department, password);
      }
    } catch (err: any) {
      console.error("Authentication action failed:", err);
      
      let msg = "Authorization failed. Check system credentials.";
      if (err.message) {
        // Custom user-friendly maps for Supabase error messages
        if (err.message.includes("Invalid login credentials")) {
          msg = "Invalid work email or master password. Access Denied.";
        } else if (err.message.includes("User already registered")) {
          msg = "This email is already registered in our command database.";
        } else if (err.message.includes("Password should be at least")) {
          msg = "Insecure password. Master password must be at least 6 characters.";
        } else if (err.message.includes("Unable to validate email")) {
          msg = "Malformed email address. Check email protocol format.";
        } else {
          msg = err.message;
        }
      }
      
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050b16] flex overflow-hidden">
      {/* Left Side: Cinematic Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0a1628]">
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#0a1628] via-[#0a1628]/40 to-transparent" />
        <img 
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1200&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
          alt="Infrastructure"
        />
        
        {/* Animated Grid / Tech Overlays */}
        <div className="absolute inset-0 z-20 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        
        <div className="relative z-30 flex flex-col justify-between p-16 w-full h-full">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-xl bg-[#0ea5e9] flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.5)]">
                <Command className="text-black" size={28} />
             </div>
             <span className="text-2xl font-black text-white italic tracking-tighter uppercase">Quest <span className="text-[#0ea5e9]">SOP</span></span>
          </div>

          <div className="max-w-md">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="flex items-center gap-2 mb-6"
             >
                <div className="px-3 py-1 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#0ea5e9] text-[10px] font-black uppercase tracking-widest">
                   System v4.0.2 Stable
                </div>
             </motion.div>
             <h1 className="text-6xl font-black text-white uppercase italic leading-[0.9] tracking-tighter mb-6">
                Master the <br /> <span className="text-[#0ea5e9]">Frontier.</span>
             </h1>
             <p className="text-lg text-white/40 font-medium leading-relaxed italic">
                Step into the next generation of operational training. Gamified SOPs for high-stakes environments.
             </p>
          </div>

          <div className="flex items-center gap-8 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
             <span>Secure Core</span>
             <span>Operational Ready</span>
          </div>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative bg-[#050b16]">
        {/* Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg aspect-square bg-[#0ea5e9]/5 blur-[150px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md relative z-10"
        >
          {isMock && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-6 px-4 py-2 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-2"
            >
              <Zap size={12} className="animate-pulse text-yellow-400" />
              Demo Mode: Local Mock Auth
            </motion.div>
          )}

          <div className="mb-8">
            <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">
              {isLogin ? "Welcome Back" : "Initialize Access"}
            </h2>
            <p className="text-white/40 font-medium italic">
              {isLogin ? "Re-establish your session with secure credentials." : "Register your identity in the command database."}
            </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-start gap-3"
            >
              <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-white/20 group-focus-within:text-[#0ea5e9] transition-colors">
                    <Shield size={18} />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#0ea5e9]/50 focus:bg-white/[0.08] transition-all"
                    placeholder="Enter full name..."
                  />
                </div>
              </div>
            )}

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Department</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-white/20 group-focus-within:text-[#0ea5e9] transition-colors">
                    <Command size={18} />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#0ea5e9]/50 focus:bg-white/[0.08] transition-all"
                    placeholder="e.g. MMG, RRG, RCB..."
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center text-white/20 group-focus-within:text-[#0ea5e9] transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#0ea5e9]/50 focus:bg-white/[0.08] transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Master Password</label>
                {isLogin && <button type="button" className="text-[10px] font-black text-[#0ea5e9] uppercase tracking-widest hover:underline">Forgot?</button>}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center text-white/20 group-focus-within:text-[#0ea5e9] transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#0ea5e9]/50 focus:bg-white/[0.08] transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              type="submit"
              disabled={submitting}
              className="w-full py-5 rounded-2xl bg-[#0ea5e9] text-black font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(14,165,233,0.3)] hover:shadow-[0_25px_50px_rgba(14,165,233,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {isLogin ? "Authenticate" : "Create Account"} <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
             <p className="text-white/40 text-xs font-medium italic">
                {isLogin ? "Don't have access yet?" : "Already have an identity?"}
                <button 
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError(null);
                  }}
                  className="ml-2 text-[#0ea5e9] font-black uppercase tracking-widest hover:underline"
                >
                  {isLogin ? "Request Core" : "Login Core"}
                </button>
             </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
