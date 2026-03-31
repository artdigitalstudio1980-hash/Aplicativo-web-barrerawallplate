'use client';

import { useEffect, useState, useCallback } from 'react';
import { TopBar } from '@/components/admin/TopBar';
import { DataTable } from '@/components/admin/DataTable';
import { Plus, Eye } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

interface Sale {
  id: string;
  saleNumber: string;
  status: string;
  total: number;
  paymentMethod: string;
  saleDate: string;
  client?: { contactName: string; companyName: string | null } | null;
  user: { firstName: string; lastName: string };
  _count: { items: number };
}

const statusColors: Record<string, string> = {
  DRAFT: 'bg-white/10 text-white/50',
  CONFIRMED: 'bg-blue-500/20 text-blue-400',
  COMPLETED: 'bg-emerald-500/20 text-emerald-400',
  CANCELLED: 'bg-red-500/20 text-red-400',
};

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchSales = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (statusFilter) params.set('status', statusFilter);
      const res = await fetch(`/api/v1/sales?${params}`);
      if (res.ok) {
        const json = await res.json();
        setSales(json.data);
        setPagination(json.pagination);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => { fetchSales(); }, [fetchSales]);

  const columns = [
    { key: 'saleNumber', label: 'Sale #', render: (s: Sale) => <span className="font-mono text-violet-400 text-xs">{s.saleNumber}</span> },
    { key: 'client', label: 'Client', render: (s: Sale) => <span className="text-white/70">{s.client?.contactName || 'Walk-in'}</span> },
    { key: 'seller', label: 'Seller', render: (s: Sale) => <span className="text-white/40">{s.user.firstName} {s.user.lastName}</span> },
    { key: 'items', label: 'Items', render: (s: Sale) => <span className="text-white/30">{s._count.items}</span> },
    { key: 'payment', label: 'Payment', render: (s: Sale) => (
      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg bg-white/[0.06] text-white/40">{s.paymentMethod}</span>
    )},
    { key: 'status', label: 'Status', render: (s: Sale) => (
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${statusColors[s.status] || ''}`}>{s.status}</span>
    )},
    { key: 'total', label: 'Total', render: (s: Sale) => <span className="font-bold text-emerald-400">${Number(s.total).toFixed(2)}</span> },
    { key: 'date', label: 'Date', render: (s: Sale) => <span className="text-white/30 text-xs">{format(new Date(s.saleDate), 'MMM dd, HH:mm')}</span> },
  ];

  return (
    <>
      <TopBar title="Sales" />
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {['', 'DRAFT', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                    : 'text-white/30 hover:text-white/60 border border-transparent'
                }`}
              >
                {st || 'All'}
              </button>
            ))}
          </div>
          <Link
            href="/admin/sales/new"
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all"
          >
            <Plus size={16} />
            New Sale
          </Link>
        </div>

        <DataTable
          columns={columns}
          data={sales}
          pagination={pagination}
          onPageChange={(page) => fetchSales(page)}
          isLoading={loading}
          emptyMessage="No sales recorded yet"
        />
      </div>
    </>
  );
}
