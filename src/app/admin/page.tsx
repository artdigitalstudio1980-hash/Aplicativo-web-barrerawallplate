'use client';

import { useEffect, useState } from 'react';
import { TopBar } from '@/components/admin/TopBar';
import { StatsCard } from '@/components/admin/StatsCard';
import { Package, Users, ShoppingCart, FileText, AlertTriangle, ClipboardList, TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface DashboardData {
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
  recentSales: Array<{
    id: string;
    saleNumber: string;
    total: number;
    status: string;
    createdAt: string;
    client?: { contactName: string } | null;
    user: { firstName: string; lastName: string };
  }>;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch('/api/v1/reports/dashboard');
        if (res.ok) {
          const json = await res.json();
          setData(json.data);
        }
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  const statusColors: Record<string, string> = {
    DRAFT: 'bg-white/10 text-white/50',
    CONFIRMED: 'bg-blue-500/20 text-blue-400',
    COMPLETED: 'bg-emerald-500/20 text-emerald-400',
    CANCELLED: 'bg-red-500/20 text-red-400',
  };

  return (
    <>
      <TopBar title="Dashboard" />
      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatsCard
            title="Today's Sales"
            value={`$${(data?.sales.today.total || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            icon={DollarSign}
            color="emerald"
            trend={{ value: 12, label: 'vs yesterday' }}
          />
          <StatsCard
            title="Monthly Revenue"
            value={`$${(data?.sales.month.total || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            icon={TrendingUp}
            color="violet"
            trend={{ value: 8, label: 'vs last month' }}
          />
          <StatsCard
            title="Active Products"
            value={data?.overview.totalProducts || 0}
            icon={Package}
            color="cyan"
          />
          <StatsCard
            title="Total Clients"
            value={data?.overview.totalClients || 0}
            icon={Users}
            color="amber"
          />
        </div>

        {/* Alert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-rose-500/10 to-rose-600/5 border border-rose-500/10 rounded-2xl p-5 flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-rose-500/20 flex items-center justify-center">
              <AlertTriangle size={20} className="text-rose-400" />
            </div>
            <div>
              <p className="text-rose-400 text-2xl font-black">{data?.overview.lowStockAlerts || 0}</p>
              <p className="text-white/30 text-xs font-medium">Low Stock Alerts</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/10 rounded-2xl p-5 flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <ClipboardList size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="text-amber-400 text-2xl font-black">{data?.overview.activeConsignments || 0}</p>
              <p className="text-white/30 text-xs font-medium">Active Consignments</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-violet-500/10 to-violet-600/5 border border-violet-500/10 rounded-2xl p-5 flex items-center gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-violet-500/20 flex items-center justify-center">
              <FileText size={20} className="text-violet-400" />
            </div>
            <div>
              <p className="text-violet-400 text-2xl font-black">{data?.overview.pendingInvoices || 0}</p>
              <p className="text-white/30 text-xs font-medium">Pending Invoices</p>
            </div>
          </motion.div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="text-white font-bold text-sm">Recent Sales</h2>
            <a href="/admin/sales" className="text-violet-400 text-xs font-semibold hover:text-violet-300 transition-colors">View All →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.04]">
                  <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-white/20">Sale #</th>
                  <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-white/20">Client</th>
                  <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-white/20">Seller</th>
                  <th className="text-left px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-white/20">Status</th>
                  <th className="text-right px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-white/20">Total</th>
                  <th className="text-right px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-white/20">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-white/20 text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                        Loading...
                      </div>
                    </td>
                  </tr>
                ) : !data?.recentSales?.length ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-white/20 text-sm">No sales yet</td>
                  </tr>
                ) : (
                  data.recentSales.map((sale) => (
                    <tr key={sale.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 text-sm font-mono text-white/60">{sale.saleNumber}</td>
                      <td className="px-6 py-4 text-sm text-white/60">{sale.client?.contactName || '—'}</td>
                      <td className="px-6 py-4 text-sm text-white/40">{sale.user.firstName} {sale.user.lastName}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${statusColors[sale.status] || 'bg-white/10 text-white/50'}`}>
                          {sale.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-white font-bold text-right">${Number(sale.total).toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-white/30 text-right">{format(new Date(sale.createdAt), 'MMM dd, HH:mm')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
