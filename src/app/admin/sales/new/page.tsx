'use client';

import { useEffect, useState, useCallback } from 'react';
import { TopBar } from '@/components/admin/TopBar';
import { Minus, Plus, Search, ShoppingCart, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Variant {
  id: string;
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
  product: { name: string };
}

interface CartItem extends Variant {
  quantity: number;
}

export default function NewSalePage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Variant[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [clients, setClients] = useState<Array<{ id: string; contactName: string; companyName: string | null }>>([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/v1/clients?limit=100').then(r => r.json()).then(d => setClients(d.data || [])).catch(() => {});
  }, []);

  const searchProducts = useCallback(async () => {
    if (!search) return;
    try {
      const res = await fetch(`/api/v1/products?search=${encodeURIComponent(search)}&limit=10`);
      if (res.ok) {
        const json = await res.json();
        const allVariants: Variant[] = [];
        for (const prod of json.data) {
          for (const v of prod.variants) {
            allVariants.push({ ...v, product: { name: prod.name } });
          }
        }
        setProducts(allVariants);
      }
    } catch (err) { console.error(err); }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(searchProducts, 300);
    return () => clearTimeout(timer);
  }, [searchProducts]);

  const addToCart = (variant: Variant) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === variant.id);
      if (existing) {
        return prev.map(i => i.id === variant.id ? { ...i, quantity: Math.min(i.quantity + 1, i.stockQuantity) } : i);
      }
      return [...prev, { ...variant, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id !== id) return i;
      const newQty = i.quantity + delta;
      if (newQty < 1 || newQty > i.stockQuantity) return i;
      return { ...i, quantity: newQty };
    }));
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));

  const subtotal = cart.reduce((sum, i) => sum + (Number(i.price) * i.quantity), 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  const handleSubmit = async () => {
    if (cart.length === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/v1/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: selectedClient || undefined,
          paymentMethod,
          items: cart.map(i => ({
            variantId: i.id,
            quantity: i.quantity,
            unitPrice: Number(i.price),
            discount: 0,
          })),
        }),
      });
      if (res.ok) {
        router.push('/admin/sales');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to create sale');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <TopBar title="New Sale — POS" />
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Search */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products by name or SKU..."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl pl-11 pr-4 py-4 text-white placeholder:text-white/20 outline-none focus:border-violet-500/50 transition-colors text-sm"
              />
            </div>

            {products.length > 0 && (
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl divide-y divide-white/[0.04] max-h-[500px] overflow-y-auto">
                {products.map((v) => (
                  <div key={v.id} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.03] transition-colors">
                    <div>
                      <p className="text-white font-semibold text-sm">{v.product.name} — {v.name}</p>
                      <p className="text-white/30 text-xs font-mono">{v.sku} · Stock: {v.stockQuantity}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-emerald-400 font-bold">${Number(v.price).toFixed(2)}</span>
                      <button
                        onClick={() => addToCart(v)}
                        disabled={v.stockQuantity === 0}
                        className="w-9 h-9 rounded-xl bg-violet-600 hover:bg-violet-500 flex items-center justify-center text-white disabled:opacity-20 transition-all"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart / Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-6 sticky top-24">
              <div className="flex items-center gap-3">
                <ShoppingCart size={18} className="text-violet-400" />
                <h3 className="text-white font-bold">Order Summary</h3>
                <span className="ml-auto text-white/20 text-xs">{cart.length} items</span>
              </div>

              {/* Client Select */}
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-violet-500/50 appearance-none"
              >
                <option value="">Walk-in Customer</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.contactName}{c.companyName ? ` (${c.companyName})` : ''}</option>
                ))}
              </select>

              {/* Cart Items */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 bg-white/[0.03] rounded-xl p-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-semibold truncate">{item.product.name}</p>
                      <p className="text-white/30 text-[10px]">{item.name}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded-md bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white transition-all">
                        <Minus size={10} />
                      </button>
                      <span className="w-8 text-center text-white text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded-md bg-white/[0.06] flex items-center justify-center text-white/40 hover:text-white transition-all">
                        <Plus size={10} />
                      </button>
                    </div>
                    <span className="text-emerald-400 text-xs font-bold w-16 text-right">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-red-400 transition-colors">
                      <X size={12} />
                    </button>
                  </div>
                ))}
                {cart.length === 0 && (
                  <p className="text-center text-white/15 text-xs py-8">Search & add products above</p>
                )}
              </div>

              {/* Payment */}
              <div className="flex gap-2">
                {['CASH', 'CARD', 'TRANSFER'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setPaymentMethod(m)}
                    className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                      paymentMethod === m ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' : 'bg-white/[0.04] text-white/30 border border-white/[0.06]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-white/[0.06] pt-4 space-y-2">
                <div className="flex justify-between text-xs text-white/30"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-xs text-white/30"><span>Tax (7%)</span><span>${tax.toFixed(2)}</span></div>
                <div className="flex justify-between text-lg font-black text-white pt-2 border-t border-white/[0.06]">
                  <span>Total</span><span className="text-emerald-400">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={cart.length === 0 || submitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
              >
                {submitting ? 'Processing...' : `Complete Sale — $${total.toFixed(2)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
