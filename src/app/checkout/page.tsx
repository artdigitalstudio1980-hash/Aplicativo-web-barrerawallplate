"use client";

import { useCart } from "@/lib/cart";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShieldCheck, Lock, ArrowLeft, Truck, CreditCard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { items, total } = useCart();
  const tax = total * 0.07; // Simulated 7% tax
  const finalTotal = total + tax;

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <Section>
        <div className="mb-16">
          <Link href="/product" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 hover:text-black transition-colors mb-8 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Return to Collection
          </Link>
          <h1 className="text-5xl lg:text-8xl font-black tracking-tighter leading-none mb-4">
            Final <br />
            <span className="text-black/30 italic font-light">Details.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Form Side */}
          <div className="lg:col-span-7 space-y-16">
            {/* Step 1 */}
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-xs font-bold">01</span>
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-black/30">Shipping Destination</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField label="First Name" />
                <InputField label="Last Name" />
                <div className="md:col-span-2">
                  <InputField label="Street Address" />
                </div>
                <InputField label="City" />
                <InputField label="Postal Code" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-xs font-bold">02</span>
                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-black/30">Secure Payment</h2>
              </div>
              
              <GlassCard className="!p-12 border-dashed border-2 border-black/5 bg-[#F9F9FB] flex flex-col items-center justify-center text-center group">
                <div className="w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Lock size={24} className="text-black/20" />
                </div>
                <h3 className="text-sm font-bold tracking-tight mb-2">Stripe Encryption Ready</h3>
                <p className="text-[11px] text-black/40 font-medium max-w-[200px] leading-relaxed italic">
                  Complete your shipping details above to initialize secure checkout.
                </p>
              </GlassCard>
            </div>
            
            <Button size="lg" className="w-full h-20 rounded-2xl text-xl font-bold tracking-tight shadow-xl hover:shadow-3xl transition-all grayscale opacity-50 cursor-not-allowed">
              Complete Order — ${finalTotal.toFixed(2)}
            </Button>
          </div>

          {/* Summary Side */}
          <div className="lg:col-span-5 lg:sticky lg:top-40 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="!p-10 border border-black/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
                <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-black/30 mb-10 border-b border-black/5 pb-6">Your Order Summary</h3>
                
                {/* Items List */}
                <div className="space-y-8 mb-12 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-14 h-14 bg-[#F9F9FB] rounded-xl overflow-hidden relative shrink-0 border border-black/5">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold tracking-tight truncate">{item.name}</h4>
                        <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest">{item.variant} × {item.quantity}</p>
                      </div>
                      <span className="text-xs font-bold tracking-tight">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <p className="text-center py-10 text-xs text-black/30 font-bold uppercase tracking-widest italic">No items selected</p>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-4 border-t border-black/5 pt-10 mb-10">
                  <div className="flex justify-between items-center text-[10px] font-bold text-black/40 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-black">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-black/40 uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                      <Truck size={12} /> Shipping
                    </span>
                    <span className="text-green-600">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold text-black/40 uppercase tracking-widest">
                    <span>Estimated Tax</span>
                    <span className="text-black">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-black/5 pt-10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30 block mb-2">Total Amount</span>
                    <span className="text-4xl font-black tracking-tighter leading-none">${finalTotal.toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-black/30 uppercase tracking-widest italic">Includes Secure <br />Processing</p>
                  </div>
                </div>
                
                <div className="mt-12 flex items-center justify-between opacity-30 grayscale saturate-0">
                   <div className="flex flex-col items-center gap-2">
                      <Lock size={12} />
                      <span className="text-[8px] font-bold uppercase tracking-widest">Secure</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                      <CreditCard size={12} />
                      <span className="text-[8px] font-bold uppercase tracking-widest">Stripe</span>
                   </div>
                   <div className="flex flex-col items-center gap-2">
                      <ShieldCheck size={12} />
                      <span className="text-[8px] font-bold uppercase tracking-widest">AES-256</span>
                   </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </Section>
    </main>
  );
}

function InputField({ label }: { label: string }) {
  return (
    <div className="space-y-4">
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 ml-1">{label}</label>
      <input 
        className="w-full bg-[#F9F9FB] border border-black/5 p-5 rounded-2xl outline-none focus:border-black/20 focus:bg-white transition-all font-bold tracking-tight text-sm placeholder:text-black/10 placeholder:font-normal" 
        placeholder={`Enter your ${label.toLowerCase()}...`}
      />
    </div>
  );
}
