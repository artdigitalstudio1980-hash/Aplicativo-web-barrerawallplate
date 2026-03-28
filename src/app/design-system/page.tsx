"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <Section padding="none" className="pt-40 lg:pt-60 pb-20 border-b border-black/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-12 leading-[0.9]"
          >
            The Design <br />
            <span className="text-black/30 italic font-light">System</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl lg:text-2xl text-black/60 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            We don’t just sell hardware. We provide a system for visual harmony. Barrera Aura is the bridge between construction and high-end design.
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
            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl bg-muted"
          >
            <Image
              src="/assets/design-integration.png"
              alt="Barrera Wallplate integration"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
          </motion.div>

          <div className="space-y-12">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-black/40 mb-4 block">Concept 01</span>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tighter leading-tight">Wallpaper <br />Integration.</h2>
              <p className="text-lg text-black/60 leading-relaxed">
                Traditional plates interrupt the flow of premium wall coverings. The Aura Series sub-plate allows for precise wallpaper cutouts, while the screwless cover creates a clean frame that complements the texture instead of fighting it.
              </p>
            </div>

            <GlassCard className="p-8! bg-[#F9F9FB]">
              <h4 className="font-bold flex items-center gap-2 mb-3">
                 <span className="w-1.5 h-1.5 bg-black rounded-full" />
                 Pro Tip for Designers
              </h4>
              <p className="text-sm text-black/60 leading-relaxed">
                Apply a thin layer of matched paint or a circular cutout of your wallpaper to the Aura cover for a completely “hidden” effect.
              </p>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Principles Grid */}
      <Section padding="lg" className="bg-black text-white rounded-[4rem] mx-4 lg:mx-8 mb-20">
        <div className="text-center mb-24">
           <h2 className="text-4xl lg:text-7xl font-bold tracking-tighter mb-4 italic font-light opacity-30">Principles</h2>
           <p className="text-white/50 text-xl font-bold tracking-widest uppercase">The Essence of Harmony</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tighter">01. Minimalist Form</h3>
            <p className="text-white/40 leading-relaxed">Strict geometric proportions based on the Golden Ratio for architectural balance.</p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tighter">02. Matte Finishes</h3>
            <p className="text-white/40 leading-relaxed">Light-absorbing textures that eliminate unwanted glares and reflections in your space.</p>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tighter">03. Patented Snap</h3>
            <p className="text-white/40 leading-relaxed">Precision engineering that ensures a rock-solid fit without a single visible fastener.</p>
          </div>
        </div>
      </Section>

      {/* Final CTA Visual */}
      <Section padding="lg">
         <div className="relative h-[600px] rounded-[4rem] overflow-hidden group shadow-2xl">
            <Image src="/assets/hero-product.png" alt="Aura System" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
               <h2 className="text-white text-5xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.8]">
                 Ready to <br />
                 <span className="italic font-light opacity-50">Upgrade?</span>
               </h2>
               <a href="/product">
                 <button className="bg-white text-black px-12 py-5 rounded-full text-lg font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl">
                    Shop the Aura Series
                 </button>
               </a>
            </div>
         </div>
      </Section>
    </main>
  );
}
