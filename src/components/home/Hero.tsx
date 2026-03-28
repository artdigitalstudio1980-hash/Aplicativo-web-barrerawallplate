'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronRight, ArrowRight } from "lucide-react";
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-40 lg:pt-52 pb-20 overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-black/5 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-black/5 rounded-full blur-[120px] opacity-30" />

      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="h-[1px] w-8 bg-black/20" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/40">
                Interior Design Upgrade System
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-black leading-[0.85] mb-10"
            >
              Upgrade the <br />
              <span className="text-black/30 italic font-light">Smallest Detail.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl lg:text-2xl text-black/50 leading-relaxed max-w-lg mb-12 font-medium"
            >
              Seamless, screwless snap-on system. Premium materials designed to blend perfectly with high-end interiors.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
            >
              <Link href="/product">
                <Button size="lg" className="rounded-full px-12 py-7 text-lg font-bold tracking-tight shadow-2xl hover:scale-105 active:scale-95 transition-all bg-black text-white border-0">
                  Shop Aura Series
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/design-system" className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase hover:text-black/50 transition-colors pl-4">
                Explore The System
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </motion.div>

            {/* Press Proof */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1 }}
               className="mt-20 pt-10 border-t border-black/5 flex flex-wrap gap-10 opacity-30 grayscale saturate-0 items-center"
            >
               <span className="text-[9px] font-bold uppercase tracking-widest">Featured in</span>
               <span className="font-bold text-sm tracking-tighter">ARCHITECTURAL DIGEST</span>
               <span className="font-bold text-sm tracking-tighter">DWELL</span>
               <span className="font-bold text-sm tracking-tighter">VOGUE LIVING</span>
            </motion.div>
          </motion.div>

          {/* Product Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative perspective-1000"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-white/50 group">
              <Image
                src="/assets/hero-product.png"
                alt="Barrera Wallplate Detail"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              
              {/* Floating Tech Badge */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 right-10 glass px-8 py-6 rounded-[2rem] shadow-2xl border border-white/40 backdrop-blur-2xl"
              >
                <div className="flex items-center gap-4">
                   <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 text-black">Screwless Tech</p>
                      <p className="text-[10px] text-black/40 font-bold">Uninterrupted Design.</p>
                   </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
