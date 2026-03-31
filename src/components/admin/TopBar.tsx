'use client';

import { useAuth } from '@/lib/auth-context';
import { Bell, Search, Settings } from 'lucide-react';
import { useState } from 'react';

export function TopBar({ title }: { title: string }) {
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="h-16 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h1 className="text-white font-bold text-lg tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className={`relative transition-all duration-300 ${searchOpen ? 'w-64' : 'w-10'}`}>
          {searchOpen ? (
            <input
              autoFocus
              onBlur={() => setSearchOpen(false)}
              placeholder="Search..."
              className="w-full bg-white/[0.06] border border-white/[0.08] rounded-xl px-4 py-2 text-white text-sm placeholder:text-white/20 outline-none focus:border-violet-500/50"
            />
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/80 transition-all"
            >
              <Search size={16} />
            </button>
          )}
        </div>

        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/80 transition-all">
          <Bell size={16} />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">3</span>
        </button>

        {/* Settings */}
        <button className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/80 transition-all">
          <Settings size={16} />
        </button>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center cursor-pointer hover:shadow-lg hover:shadow-violet-500/20 transition-all">
          <span className="text-white text-xs font-bold">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </span>
        </div>
      </div>
    </header>
  );
}
