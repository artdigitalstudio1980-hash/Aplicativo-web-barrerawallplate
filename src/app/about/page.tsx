'use client';

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Target, Eye, Heart, Award, ArrowRight } from "lucide-react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from 'next/link';
import { Button } from "@/components/ui/Button";

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every curve, every edge, every millimeter is engineered to absolute perfection. We don't believe in 'good enough'.",
  },
  {
    icon: Eye,
    title: "Vision",
    description: "We see what others overlook. The smallest details create the biggest impact in a truly luxury environment.",
  },
  {
    icon: Heart,
    title: "Purpose",
    description: "Design should serve beauty and function equally. We eliminate the noise so the architecture can speak.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Architectural grade polymers, rigorous stress testing, and a lifetime warranty to back every snap.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <Section padding="none" className="pt-40 lg:pt-60 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-black/5 rounded-full blur-[120px] opacity-30" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block py-1 px-4 rounded-full bg-black/5 text-[10px] font-bold tracking-[0.4em] uppercase text-black/40 mb-10"
          >
            Our Philosophy
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-12 leading-[0.85]"
          >
            The Final <br />
            <span className="text-black/30 italic font-light">Five Percent.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-xl md:text-2xl text-black/50 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            In high-end interior design, perfection isn&apos;t just about the big pieces.
            It&apos;s about the details everyone else overlooks.
          </motion.p>
        </div>
      </Section>

      {/* Story Section */}
      <Section padding="lg" className="bg-[#F9F9FB] rounded-[4rem] mx-4 lg:mx-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-white p-12 lg:p-20"
          >
             <div className="relative w-full h-full flex items-center justify-center border border-black/5 rounded-[2rem]">
                <div className="text-center">
                   <div className="text-6xl mb-6">🏠</div>
                   <h3 className="text-sm font-bold tracking-[0.3em] uppercase mb-1">Miami, FL</h3>
                   <p className="text-[10px] font-bold tracking-widest text-black/30 uppercase">Since 2024</p>
                </div>
                <div className="absolute top-8 left-8 w-2 h-2 bg-black rounded-full" />
                <div className="absolute top-8 right-8 w-2 h-2 bg-black/5 rounded-full" />
                <div className="absolute bottom-8 left-8 w-2 h-2 bg-black/5 rounded-full" />
                <div className="absolute bottom-8 right-8 w-2 h-2 bg-black/5 rounded-full" />
             </div>
          </motion.div>

          <div className="space-y-10">
            <header>
               <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/30 mb-4 block">The Genesis</span>
               <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight mb-8">
                 Born from <br />
                 <span className="italic font-light text-black/40">Frustration.</span>
               </h2>
            </header>
            <div className="space-y-8 text-black/50 text-lg leading-relaxed font-medium">
              <p>
                Why do multi-million dollar homes still use the same industrial plastic switch covers as a basic apartment? This question haunted us during dozens of high-end builds.
              </p>
              <p>
                We spent two years engineering the Aura System — a hardware solution that feels like art. Every detail was scrutinized, every visual compromise eliminated.
              </p>
              <p>
                The result: a wall plate that disappears into your design, making everything around it look better.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Quote */}
      <Section padding="lg" className="bg-black text-white rounded-[4rem] mx-4 lg:mx-8 mb-20 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold italic text-center leading-[0.9] max-w-5xl mx-auto tracking-tighter py-20"
        >
          &ldquo;Luxury is the <br />
          <span className="opacity-30">absence of distraction.</span>&rdquo;
        </motion.blockquote>
      </Section>

      {/* Values */}
      <Section padding="lg">
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[10px] font-bold tracking-[0.4em] uppercase text-black/30 mb-6"
          >
            What We Stand For
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter"
          >
            Guiding Principles
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 1 }}
              className="flex flex-col group"
            >
              <div className="w-16 h-16 rounded-3xl bg-[#F9F9FB] flex items-center justify-center mb-8 border border-black/5 group-hover:bg-black group-hover:text-white transition-all duration-700">
                <value.icon size={28} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-tight uppercase tracking-widest text-sm">{value.title}</h3>
              <p className="text-black/40 text-sm leading-relaxed font-medium">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Final */}
      <Section padding="lg" className="border-t border-black/5 mt-20">
         <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-10 leading-tight">
              Crafted for those <br />
              <span className="italic font-light text-black/40 text-5xl lg:text-7xl">who notice.</span>
            </h2>
            <Link href="/product">
               <Button size="lg" className="rounded-full px-12 py-8 text-xl font-bold tracking-tight shadow-2xl hover:scale-105 active:scale-95 transition-all bg-black text-white">
                  Explore the Collection
                  <ArrowRight className="ml-3" size={24} />
               </Button>
            </Link>
         </div>
      </Section>
    </main>
  );
}
