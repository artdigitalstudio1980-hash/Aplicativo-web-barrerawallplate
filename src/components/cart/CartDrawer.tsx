'use client';

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2 } from "lucide-react";
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
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-muted flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} />
                <h2 className="text-xl font-bold tracking-tight">Your Cart</h2>
                {items.length > 0 && (
                  <span className="bg-accent text-white text-xs px-2 py-0.5 rounded-full">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <ShoppingBag size={48} className="text-muted-foreground/30" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-accent underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.variantId}`} className="flex gap-6">
                      <div className="w-24 h-24 bg-muted rounded-2xl overflow-hidden relative flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-bold text-accent">{item.name}</h4>
                            <p className="text-xs text-muted-foreground">{item.variant}</p>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-muted rounded-lg">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 px-3 hover:bg-muted transition-colors"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 px-3 hover:bg-muted transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 bg-muted/30 border-t border-muted space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest">
                  Free Express US Shipping
                </p>
                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                  <Button className="w-full h-14 text-lg" variant="primary">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
