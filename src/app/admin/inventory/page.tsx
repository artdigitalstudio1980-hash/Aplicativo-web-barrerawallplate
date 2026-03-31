'use client';

import { useEffect, useState, useCallback } from 'react';
import { TopBar } from '@/components/admin/TopBar';
import { DataTable } from '@/components/admin/DataTable';
import { StatsCard } from '@/components/admin/StatsCard';
import { Package, AlertTriangle, TrendingDown, ArrowUpDown } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
  minStockAlert: number;
  product: { name: string; category: string | null; sku: string };
  barcodes: Array<{ code: string; type: string }>;
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [alerts, setAlerts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showLowStock, setShowLowStock] = useState(false);

  const fetchInventory = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '30' });
      if (showLowStock) params.set('lowStock', 'true');
      const res = await fetch(`/api/v1/inventory?${params}`);
      if (res.ok) {
        const json = await res.json();
        setItems(json.data);
        setPagination(json.pagination);
        setAlerts(json.alerts);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [showLowStock]);

  useEffect(() => { fetchInventory(); }, [fetchInventory]);

  const totalStock = items.reduce((sum, i) => sum + i.stockQuantity, 0);
  const totalValue = items.reduce((sum, i) => sum + (i.stockQuantity * Number(i.price)), 0);

  const columns = [
    { key: 'product', label: 'Product', render: (item: InventoryItem) => (
      <div>
        <span className="font-semibold text-white text-sm">{item.product.name}</span>
        <span className="text-white/30 text-xs block">{item.name}</span>
      </div>
    )},
    { key: 'sku', label: 'SKU', render: (item: InventoryItem) => <span className="font-mono text-violet-400 text-xs">{item.sku}</span> },
    { key: 'barcode', label: 'Barcode', render: (item: InventoryItem) => (
      <span className="font-mono text-white/30 text-xs">{item.barcodes[0]?.code || '—'}</span>
    )},
    { key: 'stockQuantity', label: 'Stock', render: (item: InventoryItem) => {
      const isLow = item.stockQuantity <= item.minStockAlert;
      return (
        <div className="flex items-center gap-2">
          <span className={`font-bold text-lg ${isLow ? 'text-rose-400' : 'text-white'}`}>{item.stockQuantity}</span>
          {isLow && <AlertTriangle size={14} className="text-rose-400" />}
        </div>
      );
    }},
    { key: 'minAlert', label: 'Min Alert', render: (item: InventoryItem) => <span className="text-white/30">{item.minStockAlert}</span> },
    { key: 'value', label: 'Value', render: (item: InventoryItem) => (
      <span className="font-bold text-emerald-400">${(item.stockQuantity * Number(item.price)).toFixed(2)}</span>
    )},
  ];

  return (
    <>
      <TopBar title="Inventory" />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard title="Total Units" value={totalStock.toLocaleString()} icon={Package} color="cyan" />
          <StatsCard title="Inventory Value" value={`$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`} icon={TrendingDown} color="emerald" />
          <StatsCard title="Low Stock Alerts" value={alerts} icon={AlertTriangle} color="rose" />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLowStock(!showLowStock)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
              showLowStock
                ? 'bg-rose-500/20 border-rose-500/30 text-rose-400'
                : 'bg-white/[0.04] border-white/[0.06] text-white/40 hover:text-white'
            }`}
          >
            <AlertTriangle size={12} />
            {showLowStock ? 'Showing Low Stock Only' : 'Show Low Stock'}
          </button>
        </div>

        <DataTable
          columns={columns}
          data={items}
          pagination={pagination}
          onPageChange={(page) => fetchInventory(page)}
          isLoading={loading}
          emptyMessage="No inventory items found"
        />
      </div>
    </>
  );
}
