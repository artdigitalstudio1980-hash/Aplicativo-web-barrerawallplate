'use client';

import { useEffect, useState, useCallback } from 'react';
import { TopBar } from '@/components/admin/TopBar';
import { DataTable } from '@/components/admin/DataTable';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string | null;
  basePrice: number;
  isActive: boolean;
  _count: { variants: number };
  variants: Array<{ id: string; name: string; sku: string; price: number; stockQuantity: number }>;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', sku: '', basePrice: '', category: '', description: '' });

  const fetchProducts = useCallback(async (page = 1, searchQuery = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20', active: 'all' });
      if (searchQuery) params.set('search', searchQuery);
      const res = await fetch(`/api/v1/products?${params}`);
      if (res.ok) {
        const json = await res.json();
        setProducts(json.data);
        setPagination(json.pagination);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/v1/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          sku: form.sku,
          basePrice: parseFloat(form.basePrice),
          category: form.category || undefined,
          description: form.description || undefined,
        }),
      });
      if (res.ok) {
        setShowModal(false);
        setForm({ name: '', sku: '', basePrice: '', category: '', description: '' });
        fetchProducts();
      }
    } catch (err) {
      console.error('Error creating product:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deactivate this product?')) return;
    try {
      await fetch(`/api/v1/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const columns = [
    { key: 'sku', label: 'SKU', render: (p: Product) => <span className="font-mono text-violet-400 text-xs">{p.sku}</span> },
    { key: 'name', label: 'Name', render: (p: Product) => <span className="font-semibold text-white">{p.name}</span> },
    { key: 'category', label: 'Category', render: (p: Product) => <span className="text-white/40">{p.category || '—'}</span> },
    { key: 'basePrice', label: 'Price', render: (p: Product) => <span className="font-bold text-emerald-400">${Number(p.basePrice).toFixed(2)}</span> },
    { key: 'variants', label: 'Variants', render: (p: Product) => <span className="text-white/40">{p._count.variants}</span> },
    {
      key: 'status', label: 'Status',
      render: (p: Product) => (
        <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg ${p.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
          {p.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  return (
    <>
      <TopBar title="Products" />
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white/40 text-xs font-bold uppercase tracking-widest">Product Catalog</h2>
            <p className="text-white/20 text-xs mt-1">{pagination.total} products total</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-violet-500/25 transition-all"
          >
            <Plus size={16} />
            New Product
          </button>
        </div>

        <DataTable
          columns={columns}
          data={products}
          pagination={pagination}
          onPageChange={(page) => fetchProducts(page, search)}
          onSearch={(q) => { setSearch(q); fetchProducts(1, q); }}
          searchPlaceholder="Search products..."
          isLoading={loading}
          emptyMessage="No products found"
          actions={(p: Product) => (
            <div className="flex items-center gap-1 justify-end">
              <button onClick={() => handleDelete(p.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all">
                <Trash2 size={14} />
              </button>
            </div>
          )}
        />

        {/* Create Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <div className="bg-[#12121A] border border-white/[0.08] rounded-2xl p-8 w-full max-w-lg space-y-6" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-white font-bold text-lg">New Product</h3>
              <div className="space-y-4">
                {[
                  { key: 'name', label: 'Product Name', placeholder: 'e.g. Barrera 1-Gang Wallplate' },
                  { key: 'sku', label: 'SKU', placeholder: 'e.g. BWP-1G-WHT' },
                  { key: 'basePrice', label: 'Base Price (USD)', placeholder: '0.00', type: 'number' },
                  { key: 'category', label: 'Category', placeholder: 'e.g. 1-Gang' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/30 mb-1.5 block">{field.label}</label>
                    <input
                      type={field.type || 'text'}
                      value={(form as Record<string, string>)[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/15 outline-none focus:border-violet-500/50 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/30 mb-1.5 block">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/15 outline-none focus:border-violet-500/50 transition-colors resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/[0.06] transition-all">Cancel</button>
                <button onClick={handleCreate} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all">Create Product</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
