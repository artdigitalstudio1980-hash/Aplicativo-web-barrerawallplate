'use client';

import { useEffect, useState, useCallback } from 'react';
import { TopBar } from '@/components/admin/TopBar';
import { DataTable } from '@/components/admin/DataTable';
import { Plus, Mail, Phone, MapPin } from 'lucide-react';

interface Client {
  id: string;
  contactName: string;
  companyName: string | null;
  email: string | null;
  phone: string | null;
  type: string;
  _count: { sales: number; consignments: number };
}

export default function ClientsPage() {
  const [data, setData] = useState<Client[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchData = useCallback(async (page = 1, query = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (query) params.set('search', query);
      const res = await fetch(`/api/v1/clients?${params}`);
      if (res.ok) {
        const json = await res.json();
        setData(json.data);
        setPagination(json.pagination);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const columns = [
    { key: 'name', label: 'Client / Company', render: (c: Client) => (
      <div>
        <span className="font-semibold text-white block">{c.contactName}</span>
        {c.companyName && <span className="text-white/30 text-xs">{c.companyName}</span>}
      </div>
    )},
    { key: 'type', label: 'Type', render: (c: Client) => (
      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg bg-white/[0.06] text-white/40">{c.type}</span>
    )},
    { key: 'contact', label: 'Contact', render: (c: Client) => (
      <div className="space-y-1">
        {c.email && <div className="flex items-center gap-1.5 text-white/30 text-xs"><Mail size={10} /> {c.email}</div>}
        {c.phone && <div className="flex items-center gap-1.5 text-white/30 text-xs"><Phone size={10} /> {c.phone}</div>}
      </div>
    )},
    { key: 'stats', label: 'Activity', render: (c: Client) => (
      <div className="text-xs text-white/20">
        <span className="text-white/40 font-bold">{c._count.sales}</span> sales · <span className="text-white/40 font-bold">{c._count.consignments}</span> consignments
      </div>
    )},
  ];

  return (
    <>
      <TopBar title="Client Directory" />
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all">
            <Plus size={16} /> Add New Client
          </button>
        </div>

        <DataTable
          columns={columns}
          data={data}
          pagination={pagination}
          onPageChange={(page) => fetchData(page, search)}
          onSearch={(q) => { setSearch(q); fetchData(1, q); }}
          searchPlaceholder="Search clients by name, email or company..."
          isLoading={loading}
        />
      </div>
    </>
  );
}
