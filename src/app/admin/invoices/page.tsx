'use client';

import { useEffect, useState, useCallback } from 'react';
import { TopBar } from '@/components/admin/TopBar';
import { DataTable } from '@/components/admin/DataTable';
import { FileDown, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Invoice {
  id: string;
  invoiceNumber: string;
  status: string;
  total: number;
  dueDate: string | null;
  createdAt: string;
  client: { contactName: string; companyName: string | null } | null;
  sale: { saleNumber: string } | null;
}

const statusColors: Record<string, string> = {
  DRAFT: 'bg-white/10 text-white/50',
  SENT: 'bg-blue-500/20 text-blue-400',
  PAID: 'bg-emerald-500/20 text-emerald-400',
  OVERDUE: 'bg-rose-500/20 text-rose-400',
  CANCELLED: 'bg-red-500/20 text-red-400',
};

export default function InvoicesPage() {
  const [data, setData] = useState<Invoice[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/invoices?page=${page}&limit=20`);
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
    { key: 'number', label: 'Invoice #', render: (i: Invoice) => <span className="font-mono text-violet-400 text-xs">{i.invoiceNumber}</span> },
    { key: 'client', label: 'Client', render: (i: Invoice) => <span className="text-white/70">{i.client?.contactName || '—'}</span> },
    { key: 'sale', label: 'Sale Ref', render: (i: Invoice) => <span className="text-white/30 text-xs font-mono">{i.sale?.saleNumber || '—'}</span> },
    { key: 'status', label: 'Status', render: (i: Invoice) => (
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${statusColors[i.status] || ''}`}>{i.status}</span>
    )},
    { key: 'total', label: 'Total', render: (i: Invoice) => <span className="font-bold text-emerald-400">${Number(i.total).toFixed(2)}</span> },
    { key: 'date', label: 'Created', render: (i: Invoice) => <span className="text-white/30 text-xs">{format(new Date(i.createdAt), 'MMM dd, yyyy')}</span> },
  ];

  return (
    <>
      <TopBar title="Billing & Invoices" />
      <div className="p-8 space-y-6">
        <DataTable
          columns={columns}
          data={data}
          pagination={pagination}
          onPageChange={(page) => fetchData(page)}
          isLoading={loading}
          actions={(i: Invoice) => (
            <div className="flex items-center gap-1 justify-end">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all" title="Mark as Paid">
                <CheckCircle size={14} />
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-violet-400 hover:bg-violet-500/10 transition-all" title="Download PDF">
                <FileDown size={14} />
              </button>
            </div>
          )}
        />
      </div>
    </>
  );
}
