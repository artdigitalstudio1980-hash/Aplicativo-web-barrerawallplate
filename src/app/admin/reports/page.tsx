'use client';

import { useEffect, useState, useCallback } from 'react';
import { TopBar } from '@/components/admin/TopBar';
import { StatsCard } from '@/components/admin/StatsCard';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, ShoppingBag, UserCheck, AlertTriangle, Download } from 'lucide-react';

interface ReportTrend {
  name: string;
  value: number;
}

interface RecentSale {
  id: string;
  saleNumber: string;
  total: number;
  status: string;
  createdAt: string;
  client?: { contactName: string };
  user?: { firstName: string; lastName: string };
}

interface ReportData {
  overview: {
    totalProducts: number;
    totalClients: number;
    lowStockAlerts: number;
    activeConsignments: number;
    pendingInvoices: number;
  };
  sales: {
    today: { count: number; total: number };
    week: { count: number; total: number };
    month: { count: number; total: number };
  };
  recentSales: RecentSale[];
}

const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'];

export default function ReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [trendData, setTrendData] = useState<ReportTrend[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [dashRes, trendRes] = await Promise.all([
        fetch('/api/v1/reports/dashboard'),
        fetch('/api/v1/reports/sales-trend')
      ]);
      const dashJson = await dashRes.json();
      const trendJson = await trendRes.json();
      
      if (dashJson.data) setData(dashJson.data);
      if (trendJson.data) setTrendData(trendJson.data);
    } catch (err) {
      console.error('Error fetching report data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(val);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

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
          <StatsCard 
            title="Today's Revenue" 
            value={formatCurrency(data?.sales?.today?.total || 0)} 
            icon={TrendingUp} 
            color="emerald" 
          />
          <StatsCard 
            title="Weekly Sales" 
            value={data?.sales?.week?.count?.toString() || '0'} 
            icon={ShoppingBag} 
            color="violet" 
          />
          <StatsCard 
            title="Total Clients" 
            value={data?.overview?.totalClients?.toString() || '0'} 
            icon={UserCheck} 
            color="cyan" 
          />
          <StatsCard 
            title="Low Stock" 
            value={data?.overview?.lowStockAlerts?.toString() || '0'} 
            icon={AlertTriangle} 
            color="amber" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[400px]">
          {/* Revenue Area Chart */}
          <div className="bg-white/3 border border-white/6 rounded-2xl p-6 flex flex-col">
            <h3 className="text-white font-bold text-sm mb-6">Revenue Growth</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
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
                    formatter={(value: unknown) => [formatCurrency(Number(value || 0)), 'Revenue']}
                  />
                  <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Pie Chart */}
          <div className="lg:col-span-4 bg-white/3 border border-white/6 rounded-2xl p-6 flex flex-col">
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
