'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

export function Comparison() {
  return (
    <Section padding="lg" className="bg-white">
      <div className="text-center mb-24 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-[10px] font-bold tracking-[0.3em] uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
          The Difference
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black tracking-tighter text-black leading-tight"
        >
          Details speak volumes.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-black/50 font-medium"
        >
           Traditional hardware creates visual noise. Aura Wallpaper Integration creates harmony.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
        {/* Before */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-10 group"
        >
          <div className="aspect-square rounded-[3rem] overflow-hidden border border-black/5 grayscale group-hover:grayscale-0 transition-all duration-700 shadow-sm relative bg-[#F9F9FB]">
            <Image
              src="/assets/before-product.png"
              alt="Traditional wall plate with visual noise"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>
          <div className="pl-6 border-l-2 border-red-500/20">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-4 px-2 py-1 bg-red-500/5 inline-block rounded-md">Visual Noise</h3>
            <p className="text-black/50 text-base leading-relaxed max-w-sm font-medium">
              Obtrusive screws and industrial plastic interrupt the continuity of your interior design vision.
            </p>
          </div>
        </motion.div>

        {/* After */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-10 group mt-12 lg:mt-24"
        >
          <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-white shadow-[0_50px_80px_-20px_rgba(0,0,0,0.15)] relative bg-[#F9F9FB]">
            <Image
              src="/assets/aura-2-gang-charcoal.png"
              alt="Aura 2-Gang Wallpaper Integration"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/[0.02]" />
          </div>
          <div className="pl-6 border-l-2 border-green-500/20">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-green-600 mb-4 px-2 py-1 bg-green-500/5 inline-block rounded-md">Pure Continuity</h3>
            <p className="text-black/50 text-base leading-relaxed max-w-sm font-medium">
               A specialized **2-Gang** plate with integrated wallpaper inlay, creating a seamless architectural finish that blends into your space.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
