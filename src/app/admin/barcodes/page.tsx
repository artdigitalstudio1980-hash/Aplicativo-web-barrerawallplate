'use client';

import { useEffect, useState, useCallback } from 'react';
import { TopBar } from '@/components/admin/TopBar';
import { DataTable } from '@/components/admin/DataTable';
import { QrCode, Printer, RefreshCw, Eye } from 'lucide-react';

interface BarcodeRecord {
  id: string;
  code: string;
  type: string;
  variant: { name: string; sku: string; product: { name: string } };
  createdAt: string;
}

export default function BarcodesPage() {
  const [data, setData] = useState<BarcodeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [genLoading, setGenLoading] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/barcodes');
      if (res.ok) {
        const json = await res.json();
        setData(json.data);
      }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handlePrint = async (code: string) => {
    setGenLoading(code);
    try {
      const res = await fetch(`/api/v1/barcodes/generate?code=${code}&type=CODE128&text=${code}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const win = window.open(url, '_blank');
        if (win) win.focus();
      }
    } catch (err) { console.error(err); }
    finally { setGenLoading(null); }
  };

  const columns = [
    { key: 'code', label: 'Barcode / QR', render: (b: BarcodeRecord) => (
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white rounded-lg">
          <QrCode size={14} className="text-black" />
        </div>
        <span className="font-mono text-white text-xs font-bold tracking-widest">{b.code}</span>
      </div>
    )},
    { key: 'variant', label: 'Linked Variant', render: (b: BarcodeRecord) => (
      <div>
        <span className="text-white text-xs font-semibold block">{b.variant.product.name}</span>
        <span className="text-white/30 text-[10px]">{b.variant.name} ({b.variant.sku})</span>
      </div>
    )},
    { key: 'type', label: 'Format', render: (b: BarcodeRecord) => (
      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">{b.type}</span>
    )},
  ];

  return (
    <>
      <TopBar title="Barcode & Label Management" />
      <div className="p-8 space-y-6">
        <DataTable
          columns={columns}
          data={data}
          isLoading={loading}
          actions={(b: BarcodeRecord) => (
            <div className="flex items-center gap-1 justify-end">
              <button 
                onClick={() => handlePrint(b.code)}
                disabled={genLoading === b.code}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-xl text-xs font-semibold disabled:opacity-50 transition-all"
              >
                {genLoading === b.code ? <RefreshCw size={12} className="animate-spin" /> : <Printer size={12} />}
                Print Label
              </button>
            </div>
          )}
        />
      </div>
    </>
  );
}
