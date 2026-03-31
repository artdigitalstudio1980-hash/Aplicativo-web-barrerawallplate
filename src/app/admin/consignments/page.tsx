'use client';

import { useEffect, useState, useCallback } from 'react';
import { TopBar } from '@/components/admin/TopBar';
import { DataTable } from '@/components/admin/DataTable';
import { Plus, CheckCircle, RotateCcw, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

interface Consignment {
  id: string;
  consignmentNumber: string;
  status: string;
  shipDate: string;
  dueDate: string | null;
  client: { contactName: string; companyName: string | null } | null;
  user: { firstName: string; lastName: string };
  _count: { items: number };
}

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-blue-500/20 text-blue-400',
  PENDING: 'bg-amber-500/20 text-amber-400',
  SETTLED: 'bg-emerald-500/20 text-emerald-400',
  RETURNED: 'bg-white/10 text-white/50',
  OVERDUE: 'bg-rose-500/20 text-rose-400',
};

export default function ConsignmentsPage() {
  const [data, setData] = useState<Consignment[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (filter) params.set('status', filter);
      const res = await fetch(`/api/v1/consignments?${params}`);
      if (res.ok) {
        const json = await res.json();
        setData(json.data);
        setPagination(json.pagination);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, [filter]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const columns = [
    { key: 'number', label: 'ID', render: (c: Consignment) => <span className="font-mono text-violet-400 text-xs">{c.consignmentNumber}</span> },
    { key: 'client', label: 'Client', render: (c: Consignment) => <span className="text-white/70">{c.client?.contactName || '—'}</span> },
    { key: 'status', label: 'Status', render: (c: Consignment) => (
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${statusColors[c.status] || ''}`}>{c.status}</span>
    )},
    { key: 'items', label: 'Items', render: (c: Consignment) => <span className="text-white/30">{c._count.items}</span> },
    { key: 'date', label: 'Ship Date', render: (c: Consignment) => <span className="text-white/30 text-xs">{format(new Date(c.shipDate), 'MMM dd, yyyy')}</span> },
    { key: 'due', label: 'Due Date', render: (c: Consignment) => (
      <span className={`text-xs ${c.dueDate && new Date(c.dueDate) < new Date() ? 'text-rose-400 font-bold' : 'text-white/20'}`}>
        {c.dueDate ? format(new Date(c.dueDate), 'MMM dd, yyyy') : '—'}
      </span>
    )},
  ];

  return (
    <>
      <TopBar title="Consignments" />
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {['', 'ACTIVE', 'PENDING', 'SETTLED', 'OVERDUE'].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === st
                    ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                    : 'text-white/30 hover:text-white/60 border border-transparent'
                }`}
              >
                {st || 'All'}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all">
            <Plus size={16} /> New Consignment
          </button>
        </div>

        <DataTable
          columns={columns}
          data={data}
          pagination={pagination}
          onPageChange={(page) => fetchData(page)}
          isLoading={loading}
          actions={(c: Consignment) => (
            <div className="flex items-center gap-1 justify-end">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all" title="Settle">
                <CheckCircle size={14} />
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-amber-400 hover:bg-amber-500/10 transition-all" title="Return">
                <RotateCcw size={14} />
              </button>
            </div>
          )}
        />
      </div>
    </>
  );
}
