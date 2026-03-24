"use client";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShieldCheck, Lock } from "lucide-react";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20 font-sans">
      <Section>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Checkout Steps */}
          <div className="space-y-12">
            <h1 className="text-4xl font-bold tracking-tighter">Secure Checkout</h1>
            
            {/* Step 1: Shipping */}
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-muted pb-4">
                01. Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input className="bg-white/50 border border-muted p-4 rounded-xl focus:border-accent outline-none" placeholder="First Name" />
                <input className="bg-white/50 border border-muted p-4 rounded-xl focus:border-accent outline-none" placeholder="Last Name" />
                <input className="md:col-span-2 bg-white/50 border border-muted p-4 rounded-xl focus:border-accent outline-none" placeholder="Street Address" />
                <input className="bg-white/50 border border-muted p-4 rounded-xl focus:border-accent outline-none" placeholder="City" />
                <input className="bg-white/50 border border-muted p-4 rounded-xl focus:border-accent outline-none" placeholder="Postal Code" />
              </div>
            </div>

            {/* Step 2: Payment (Stripe Shell) */}
            <div className="space-y-6 opacity-50 pointer-events-none">
              <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground border-b border-muted pb-4">
                02. Payment Details
              </h2>
              <GlassCard className="!p-8 border-dashed border-2 border-muted flex flex-col items-center justify-center text-center">
                <Lock size={32} className="mb-4 text-muted-foreground" />
                <p className="font-medium mb-1 text-accent">Stripe Integration Ready</p>
                <p className="text-xs text-muted-foreground">Complete shipping to enable secure payment.</p>
              </GlassCard>
            </div>
            
            <Button size="lg" className="w-full h-16 text-lg">
              Proceed to Payment
            </Button>
          </div>

          {/* Cart Summary */}
          <div className="sticky top-32">
            <GlassCard className="!p-8">
              <h3 className="text-xl font-bold mb-8">Order Summary</h3>
              <div className="space-y-6 mb-8">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Aura Wall Plate (White) x 2</span>
                  <span className="font-bold">$48.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping (Express US)</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="font-bold">$3.36</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-muted">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-bold">$51.36</span>
              </div>
              
              <div className="mt-12 flex items-center justify-center gap-2 text-muted-foreground">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">SSL Secure & Encrypted</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>
    </main>
  );
}
