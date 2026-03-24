'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground"
          >
            The Interior Design Upgrade System
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-accent leading-[1.05]"
          >
            Upgrade the smallest detail.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-md"
          >
            Seamless, screwless snap-on system. Premium materials that blend perfectly with your space.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4"
          >
            <a href="/product">
              <Button size="lg" variant="primary">Shop Collection</Button>
            </a>
            <a href="/design-system">
              <Button size="lg" variant="outline" className="group">
                How It Works
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/50"
        >
          <Image
            src="/assets/hero-product.svg"
            alt="Barrera Wallplate"
            fill
            className="object-cover"
            priority
          />
          
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 right-8 glass p-5 rounded-2xl shadow-lg"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider mb-1 text-accent">Seamless</p>
            <p className="text-[10px] text-muted-foreground">No visible screws</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
