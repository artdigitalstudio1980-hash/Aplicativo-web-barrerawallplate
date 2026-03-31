'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck, Globe } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
      } else {
        setError(data.error || 'Authentication failed. Please check your credentials.');
      }
    } catch (err) {
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07070A] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[440px] z-10"
      >
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-violet-500/20">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className="text-white text-3xl font-black tracking-tighter">Barrera Wallplate ERP</h1>
          <p className="text-white/30 text-sm mt-2 font-medium">Enterprise Resource Planning Systems</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-10 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-white text-xl font-bold">Secure Access</h2>
            <p className="text-white/40 text-[13px] mt-1">Authorized personnel only. All access is logged.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-4">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-violet-500 transition-colors" size={18} />
                <input
                  type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@barrerawallplate.com"
                  className="w-full bg-white/[0.04] border border-white/[0.06] focus:border-violet-500/50 rounded-2xl pl-12 pr-4 py-4 text-white text-sm outline-none transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-4">Access Code</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-violet-500 transition-colors" size={18} />
                <input
                  type="password" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.04] border border-white/[0.06] focus:border-violet-500/50 rounded-2xl pl-12 pr-4 py-4 text-white text-sm outline-none transition-all placeholder:text-white/10"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3 text-rose-400 text-xs font-semibold"
              >
                {error}
              </motion.div>
            )}

            <button
              disabled={loading}
              className="w-full h-[56px] rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-violet-600/20 flex items-center justify-center gap-2 group transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Establish Connection
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 opacity-20">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white">
            <Globe size={12} /> GLOBAL SYSTEM
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="text-[10px] font-bold uppercase tracking-widest text-white">
            VERS. 2.0.4-ERP
          </div>
        </div>
      </motion.div>
    </div>
  );
}
