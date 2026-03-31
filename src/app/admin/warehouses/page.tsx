'use client';

import { useEffect, useState, useCallback } from 'react';
import { TopBar } from '@/components/admin/TopBar';
import { DataTable } from '@/components/admin/DataTable';
import { Plus, Warehouse, MapPin, CheckCircle2 } from 'lucide-react';

interface WarehouseData {
  id: string;
  name: string;
  location: string | null;
  isMain: boolean;
  isActive: boolean;
}

export default function WarehousesPage() {
  const [data, setData] = useState<WarehouseData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/warehouses');
      if (res.ok) {
        const json = await res.json();
        setData(json.data);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const columns = [
    { key: 'name', label: 'Warehouse Name', render: (w: WarehouseData) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/40">
          <Warehouse size={14} />
        </div>
        <div>
          <span className="font-semibold text-white block">{w.name}</span>
          {w.isMain && <span className="text-[10px] font-bold uppercase text-violet-400">Primary Location</span>}
        </div>
      </div>
    )},
    { key: 'location', label: 'Address / Location', render: (w: WarehouseData) => (
      <div className="flex items-center gap-1.5 text-white/30 text-xs">
        <MapPin size={12} /> {w.location || 'Not specified'}
      </div>
    )},
    { key: 'status', label: 'Status', render: (w: WarehouseData) => (
      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${w.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
        {w.isActive ? 'Active' : 'Inactive'}
      </span>
    )},
  ];

  return (
    <>
      <TopBar title="Warehouses" />
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-white/30 text-sm italic">Manage physical storage locations and inventory distribution.</p>
          <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all">
            <Plus size={16} /> New Warehouse
          </button>
        </div>
        <DataTable columns={columns} data={data} isLoading={loading} />
      </div>
    </>
  );
}
