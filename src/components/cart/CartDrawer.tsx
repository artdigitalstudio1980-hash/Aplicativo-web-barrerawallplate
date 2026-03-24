"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  // Simple state for demonstration
  const cartItems = [
    { id: 1, name: "Aura Wall Plate (White)", price: 24, quantity: 2, image: "/assets/hero-product.png" },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-100"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-101 shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-muted flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingBag size={24} />
                <h2 className="text-xl font-bold tracking-tight">Your Cart</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-6">
                  <div className="w-24 h-24 bg-muted rounded-2xl overflow-hidden relative">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <h4 className="font-bold text-accent">{item.name}</h4>
                      <button className="text-muted-foreground hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    <div className="flex items-center border border-muted rounded-lg w-fit">
                      <button className="p-1 px-2 hover:bg-muted">-</button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button className="p-1 px-2 hover:bg-muted">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-muted/30 border-t border-muted space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest ">
                Free Express US Shipping on this order
              </p>
              <Button className="w-full h-14 text-lg" variant="primary">
                Proceed to Checkout
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
