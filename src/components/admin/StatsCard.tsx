'use client';

import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  color?: 'violet' | 'emerald' | 'amber' | 'rose' | 'cyan';
}

const colorMap = {
  violet: { bg: 'from-violet-500/20 to-violet-600/10', icon: 'text-violet-400', border: 'border-violet-500/10' },
  emerald: { bg: 'from-emerald-500/20 to-emerald-600/10', icon: 'text-emerald-400', border: 'border-emerald-500/10' },
  amber: { bg: 'from-amber-500/20 to-amber-600/10', icon: 'text-amber-400', border: 'border-amber-500/10' },
  rose: { bg: 'from-rose-500/20 to-rose-600/10', icon: 'text-rose-400', border: 'border-rose-500/10' },
  cyan: { bg: 'from-cyan-500/20 to-cyan-600/10', icon: 'text-cyan-400', border: 'border-cyan-500/10' },
};

export function StatsCard({ title, value, icon: Icon, trend, color = 'violet' }: StatsCardProps) {
  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/[0.03] ${colors.border} border rounded-2xl p-6 hover:bg-white/[0.05] transition-all duration-300 group`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={20} className={colors.icon} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${
            trend.value > 0 ? 'text-emerald-400' : trend.value < 0 ? 'text-rose-400' : 'text-white/30'
          }`}>
            {trend.value > 0 ? <TrendingUp size={12} /> : trend.value < 0 ? <TrendingDown size={12} /> : <Minus size={12} />}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <p className="text-white/30 text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
      <p className="text-white text-2xl font-black tracking-tight">{value}</p>
      {trend && (
        <p className="text-white/20 text-[10px] font-medium mt-1">{trend.label}</p>
      )}
    </motion.div>
  );
}
