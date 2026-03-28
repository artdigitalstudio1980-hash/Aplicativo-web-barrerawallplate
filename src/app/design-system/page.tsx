"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import Link from 'next/link';

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <Section padding="none" className="pt-40 lg:pt-60 pb-20 border-b border-black/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block py-1.5 px-6 rounded-full bg-black/5 text-[10px] font-bold tracking-[0.4em] uppercase text-black/40 mb-10"
          >
            The Engineering Document
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-9xl font-black tracking-tighter mb-12 leading-[0.85]"
          >
            Mechanical <br />
            <span className="text-black/30 italic font-light">Harmony.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl lg:text-2xl text-black/60 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            We don’t just sell hardware. We provide a system for visual continuity. Barrera Aura is the bridge between structural necessity and high-end aesthetics.
          </motion.p>
        </div>
      </Section>

      {/* Integration Section */}
      <Section padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-[#F9F9FB] border border-black/5"
          >
            <Image
              src="/assets/aura-1-gang-yellow.png"
              alt="1-Gang Wallpaper Integration"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/[0.03]" />
          </motion.div>

          <div className="space-y-12">
            <div>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/30 mb-6 block">Concept 01</span>
              <h2 className="text-4xl lg:text-7xl font-black mb-8 tracking-tighter leading-tight">Wallpaper <br />Continuity.</h2>
              <p className="text-lg text-black/50 leading-relaxed font-medium">
                Traditional plates interrupt the flow of premium wall coverings. The Aura Series frame allows you to inlay the exact same wallpaper, creating a design where the hardware disappears into the texture of the room.
              </p>
            </div>

            <GlassCard className="p-8! bg-[#F9F9FB] border border-black/5">
              <h4 className="font-bold flex items-center gap-3 mb-4 tracking-tight">
                 <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                 Specialized Configurations
              </h4>
              <p className="text-sm text-black/40 leading-relaxed font-medium">
                Our system is optimized for **1-Gang** and **2-Gang** light switch and outlet boxes, ensuring a perfectly flush mount regardless of the wall material.
              </p>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Examples Grid */}
      <Section padding="lg" className="bg-[#F9F9FB] rounded-[4rem] mx-4 lg:mx-8 mb-20">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <div className="space-y-10 group">
               <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-white border border-black/5">
                  <Image src="/assets/aura-2-gang-charcoal.png" alt="2-Gang Integration" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
               </div>
               <div className="pl-6">
                  <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase tracking-[0.2em] text-xs">The 2-Gang Solution</h3>
                  <p className="text-black/50 text-sm leading-relaxed max-w-sm font-medium">
                     Architectural double-slot plates designed for side-by-side controls. The larger surface area highlights the wallpaper inlay for a truly custom finish.
                  </p>
               </div>
            </div>
            <div className="space-y-10 group mt-12 md:mt-24">
               <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-white border border-black/5">
                  <Image src="/assets/aura-1-gang-yellow.png" alt="1-Gang Detail" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
               </div>
               <div className="pl-6">
                  <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase tracking-[0.2em] text-xs">The 1-Gang Precision</h3>
                  <p className="text-black/50 text-sm leading-relaxed max-w-sm font-medium">
                     Our flagship single-slot plate. Perfectly balanced proportions using the Golden Ratio for maximum aesthetic impact in minimal spaces.
                  </p>
               </div>
            </div>
         </div>
      </Section>

      {/* Final CTA Visual */}
      <Section padding="lg" className="border-t border-black/5 mt-20">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl lg:text-8xl font-black tracking-tighter mb-12 leading-[0.85]">
              Ready to <br />
              <span className="italic font-light text-black/30">Elevate?</span>
            </h2>
            <Link href="/product">
               <Button size="lg" className="rounded-full px-16 py-8 text-xl font-bold tracking-tight shadow-2xl hover:scale-105 active:scale-95 transition-all bg-black text-white">
                  Shop Aura Series
               </Button>
            </Link>
         </div>
      </Section>
    </main>
  );
}
