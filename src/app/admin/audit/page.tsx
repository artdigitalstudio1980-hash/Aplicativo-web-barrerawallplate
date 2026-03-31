'use client';

import { useEffect, useState, useCallback } from 'react';
import { TopBar } from '@/components/admin/TopBar';
import { DataTable } from '@/components/admin/DataTable';
import { ShieldAlert, Terminal, Clock, Fingerprint } from 'lucide-react';
import { format } from 'date-fns';

interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  userAgent: string | null;
  ipAddress: string | null;
  createdAt: string;
  user: { firstName: string; lastName: string; email: string } | null;
}

export default function AuditLogPage() {
  const [data, setData] = useState<AuditLog[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/audit?page=${page}&limit=50`);
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
    { key: 'action', label: 'Action', render: (l: AuditLog) => (
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg ${
          l.action === 'CREATE' ? 'bg-emerald-500/20 text-emerald-400' : 
          l.action === 'DELETE' ? 'bg-rose-500/20 text-rose-400' : 'bg-white/10 text-white/40'
        }`}>
          {l.action}
        </span>
        <span className="text-white/60 font-medium text-xs">{l.entityType}</span>
      </div>
    )},
    { key: 'user', label: 'Operator', render: (l: AuditLog) => (
      <div className="text-xs">
        <span className="text-white block font-medium">{l.user?.firstName} {l.user?.lastName}</span>
        <span className="text-white/20">{l.user?.email}</span>
      </div>
    )},
    { key: 'infra', label: 'System Context', render: (l: AuditLog) => (
      <div className="space-y-1 opacity-40">
        <div className="flex items-center gap-1.5 text-[10px]"><Terminal size={10} /> {l.ipAddress || 'Internal'}</div>
        <div className="flex items-center gap-1.5 text-[10px] truncate max-w-[200px]"><Fingerprint size={10} /> {l.userAgent || 'API'}</div>
      </div>
    )},
    { key: 'timestamp', label: 'Timestamp', render: (l: AuditLog) => (
      <div className="flex items-center gap-1.5 text-white/30 text-[11px]">
        <Clock size={12} /> {format(new Date(l.createdAt), 'MMM dd, HH:mm:ss')}
      </div>
    )},
  ];

  return (
    <>
      <TopBar title="Security Audit Log" />
      <div className="p-8 space-y-6">
        <div className="flex items-center gap-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl p-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm">System Transparency</h4>
            <p className="text-white/30 text-xs">All CRUD operations are logged for compliance and security monitoring.</p>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data}
          pagination={pagination}
          onPageChange={(page) => fetchData(page)}
          isLoading={loading}
        />
      </div>
    </>
  );
}
