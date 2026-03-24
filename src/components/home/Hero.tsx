"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <Section padding="none" className="relative min-h-screen flex items-center pt-36 lg:pt-32 pb-20 overflow-hidden">
      {/* Background Decorative Elements - Toned down for mobile */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 lg:w-96 lg:h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 lg:w-96 lg:h-96 bg-accent/5 rounded-full blur-3xl opacity-30 lg:opacity-100" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10 px-4 lg:px-0">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl text-center lg:text-left"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block py-1 px-4 rounded-full bg-accent/5 text-accent text-[10px] lg:text-xs font-bold tracking-widest uppercase mb-6"
          >
            The Interior Design Upgrade System
          </motion.span>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-accent leading-[1.1] mb-8">
            Upgrade the smallest detail. <br />
            <span className="text-muted-foreground italic font-light">Transform the entire room.</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-12 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Barrera Wallplate eliminates visual noise with a seamless, screwless snap-on system designed for modern environments and high-end interiors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start">
            <Button size="lg" variant="primary" className="w-full sm:w-auto">
              Shop the Collection
            </Button>
            <Button size="lg" variant="outline" className="group w-full sm:w-auto">
              Explore the Design System
              <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </div>

          {/* Press Section - Hidden on small screens to reduce clutter */}
          <div className="mt-16 hidden md:block">
            <div className="flex flex-row items-center gap-6 opacity-50">
              <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground whitespace-nowrap">As seen in</span>
              <div className="flex items-center gap-8 font-bold text-sm tracking-tighter">
                <span className="whitespace-nowrap">ARCHITECTURAL DIGEST</span>
                <span className="whitespace-nowrap">DWELL</span>
                <span className="whitespace-nowrap">VOGUE LIVING</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Product Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative aspect-4/5 rounded-3xl lg:rounded-4xl overflow-hidden shadow-2xl border-4 lg:border-8 border-white mt-12 lg:mt-0"
        >
          <Image
            src="/assets/hero-product.svg"
            alt="Barrera Wallplate Premium Screwless Finish"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          
          {/* Floating Badge - Hidden on very small screens to avoid clutter */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 glass p-4 lg:p-6 rounded-2xl shadow-xl max-w-[160px] lg:max-w-[200px]"
          >
            <p className="text-[10px] lg:text-xs font-bold uppercase tracking-wider mb-1 text-accent">Seamless Technology</p>
            <p className="text-[9px] lg:text-[10px] text-muted-foreground leading-tight">No visible screws. Just pure, uninterrupted design.</p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
