'use client';

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, total, isOpen, setIsOpen } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[60] shadow-2xl flex flex-col"
          >
            <div className="p-8 lg:p-12 border-b border-black/5 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                   <ShoppingBag size={18} />
                </div>
                <div>
                   <h2 className="text-sm font-bold tracking-[0.2em] uppercase">Your Selection</h2>
                   <p className="text-[10px] text-black/30 font-bold uppercase tracking-widest">{items.length} items</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-3 hover:bg-black/5 rounded-full transition-all group"
              >
                <X size={20} className="group-rotate-90 transition-transform" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center opacity-20">
                    <ShoppingBag size={32} />
                  </div>
                  <p className="text-sm text-black/40 font-bold uppercase tracking-widest italic">The cart is awaiting <br />your inspiration.</p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-[10px] font-black uppercase tracking-[0.3em] underline decoration-black/10 underline-offset-8 hover:decoration-black transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-10">
                  {items.map((item) => (
                    <motion.div 
                      layout
                      key={`${item.id}-${item.variantId}`} 
                      className="flex gap-6 group"
                    >
                      <div className="w-20 h-20 bg-[#F9F9FB] rounded-2xl overflow-hidden relative flex-shrink-0 border border-black/5">
                        <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-2">
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs tracking-tight truncate">{item.name}</h4>
                            <p className="text-[10px] text-black/30 font-bold uppercase tracking-widest">{item.variant}</p>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-black/20 hover:text-black transition-colors p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-[#F9F9FB] rounded-lg border border-black/5">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 px-3 text-black/40 hover:text-black transition-colors"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-[10px] font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 px-3 text-black/40 hover:text-black transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs font-bold tracking-tight">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 lg:p-12 bg-[#F9F9FB] border-t border-black/5 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">Subtotal</span>
                    <span className="text-2xl font-black tracking-tighter">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 italic">Shipping</span>
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Complimentary</span>
                  </div>
                </div>
                
                <Link href="/checkout" onClick={() => setIsOpen(false)} className="block">
                  <Button className="w-full h-16 rounded-2xl text-lg font-bold tracking-tight shadow-xl hover:shadow-2xl transition-all" variant="primary">
                    Check Out
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
                
                <p className="text-[9px] text-black/30 text-center font-bold uppercase tracking-[0.2em] leading-relaxed italic">
                  Taxes and shipping calculated <br />at specialized checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
