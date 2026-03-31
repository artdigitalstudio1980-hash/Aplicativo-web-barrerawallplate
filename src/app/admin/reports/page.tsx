'use client';

import { useEffect, useState, useCallback } from 'react';
import { TopBar } from '@/components/admin/TopBar';
import { StatsCard } from '@/components/admin/StatsCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, ShoppingBag, UserCheck, AlertTriangle, Download } from 'lucide-react';

interface ReportData {
  overview: any;
  sales: any;
  recentSales: any[];
}

const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'];

export default function ReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/reports/dashboard')
      .then(r => r.json())
      .then(d => setData(d.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const chartData = [
    { name: 'Mon', value: 4000 }, { name: 'Tue', value: 3000 }, { name: 'Wed', value: 2000 },
    { name: 'Thu', value: 2780 }, { name: 'Fri', value: 1890 }, { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 },
  ];

  return (
    <>
      <TopBar title="Analytics & Reports" />
      <div className="p-8 space-y-8 pb-16">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-bold text-xl tracking-tight">Performance Overview</h2>
          <button className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-white/60 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/[0.08] transition-all">
            <Download size={14} /> Export Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard title="Total Revenue" value="$42,500.00" icon={TrendingUp} color="emerald" trend={{ value: 15, label: 'up self' }} />
          <StatsCard title="Total Sales" value="842" icon={ShoppingBag} color="violet" />
          <StatsCard title="Active Clients" value="128" icon={UserCheck} color="cyan" />
          <StatsCard title="Pending" value="14" icon={AlertTriangle} color="amber" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[400px]">
          {/* Revenue Area Chart */}
          <div className="lg:col-span-8 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 flex flex-col">
            <h3 className="text-white font-bold text-sm mb-6">Revenue Growth</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#12121A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ color: '#8B5CF6', fontSize: '12px', fontWeight: 'bold' }}
                    labelStyle={{ color: '#666', fontSize: '10px', marginBottom: '4px' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Pie Chart */}
          <div className="lg:col-span-4 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 flex flex-col">
            <h3 className="text-white font-bold text-sm mb-6">Sales by Category</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ name: '1-Gang', value: 400 }, { name: '2-Gang', value: 300 }, { name: '3-Gang', value: 200 }]}
                    innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value" stroke="none"
                  >
                    {COLORS.map((color, index) => <Cell key={`cell-${index}`} fill={color} />)}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#12121A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
