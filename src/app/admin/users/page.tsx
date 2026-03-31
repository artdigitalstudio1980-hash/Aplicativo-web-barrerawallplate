'use client';

import { useEffect, useState, useCallback } from 'react';
import { TopBar } from '@/components/admin/TopBar';
import { DataTable } from '@/components/admin/DataTable';
import { UserPlus, Shield, Mail, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
}

export default function UsersPage() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/users');
      if (res.ok) {
        const json = await res.json();
        setData(json.data);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const columns = [
    { key: 'user', label: 'User', render: (u: User) => (
      <div>
        <span className="font-semibold text-white block">{u.firstName} {u.lastName}</span>
        <div className="flex items-center gap-1.5 text-white/30 text-xs"><Mail size={10} /> {u.email}</div>
      </div>
    )},
    { key: 'role', label: 'Access Role', render: (u: User) => (
      <div className="flex items-center gap-2">
        <Shield size={12} className={u.role === 'ADMIN' ? 'text-violet-400' : 'text-blue-400'} />
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg bg-white/[0.06] ${u.role === 'ADMIN' ? 'text-violet-400' : 'text-blue-400'}`}>
          {u.role}
        </span>
      </div>
    )},
    { key: 'lastLogin', label: 'Last Login', render: (u: User) => (
      <span className="text-white/30 text-xs">
        {u.lastLogin ? format(new Date(u.lastLogin), 'MMM dd, HH:mm') : 'Never'}
      </span>
    )},
    { key: 'status', label: 'Status', render: (u: User) => (
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${u.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
        {u.isActive ? 'Enabled' : 'Disabled'}
      </span>
    )},
  ];

  return (
    <>
      <TopBar title="User Management" />
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-white/30 text-sm">Control staff access and permissions.</p>
          <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all">
            <UserPlus size={16} /> Invite Member
          </button>
        </div>
        <DataTable columns={columns} data={data} isLoading={loading} />
      </div>
    </>
  );
}
