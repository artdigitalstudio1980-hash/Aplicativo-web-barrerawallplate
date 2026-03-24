"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <Section padding="none" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block py-1 px-4 rounded-full bg-accent/5 text-accent text-xs font-bold tracking-widest uppercase mb-6"
          >
            The Interior Design Upgrade System
          </motion.span>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter text-accent leading-[1.1] mb-8">
            Upgrade the smallest detail. <br />
            <span className="text-muted-foreground italic font-light">Transform the entire room.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-lg">
            Barrera Wallplate eliminates visual noise with a seamless, screwless snap-on system designed for modern environments and high-end interiors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <Button size="lg" variant="primary">
              Shop the Collection
            </Button>
            <Button size="lg" variant="outline" className="group">
              Explore the Design System
              <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </div>

          <div className="mt-16 flex items-center gap-8 grayscale opacity-50">
            <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">As seen in</span>
            <div className="flex items-center gap-6 font-bold text-lg tracking-tighter">
              <span>ARCHITECTURAL DIGEST</span>
              <span>DWELL</span>
              <span>VOGUE LIVING</span>
            </div>
          </div>
        </motion.div>

        {/* Product Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative aspect-4/5 rounded-4xl overflow-hidden shadow-2xl border-8 border-white"
        >
          <Image
            src="/assets/hero-product.png"
            alt="Barrera Wallplate Premium Screwless Finish"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          
          {/* Floating Badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 right-8 glass p-6 rounded-2xl shadow-xl max-w-[200px]"
          >
            <p className="text-xs font-bold uppercase tracking-wider mb-1 text-accent">Seamless Technology</p>
            <p className="text-[10px] text-muted-foreground leading-tight">No visible screws. Just pure, uninterrupted design.</p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
