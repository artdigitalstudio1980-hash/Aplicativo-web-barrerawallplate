'use client';

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Secure the Base",
    description: "Simply screw the sub-plate into your existing electrical box using the original screws.",
  },
  {
    number: "02",
    title: "Perfect Alignment",
    description: "Self-centering guides ensure the Aura plate is perfectly straight before snapping.",
  },
  {
    number: "03",
    title: "Final Snap",
    description: "Align the cover and press firmly until you hear the signature click. Pure perfection.",
  },
];

export function Installation() {
  return (
    <Section padding="lg" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* Visual Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-square rounded-[3rem] lg:rounded-[4rem] bg-[#F9F9FB] overflow-hidden group shadow-inner border border-black/5 flex items-center justify-center p-20"
        >
          <div className="relative w-full h-full flex items-center justify-center">
             <div className="absolute inset-0 bg-black/5 rounded-full blur-3xl opacity-20" />
             <div className="relative z-10 w-48 h-48 bg-white rounded-3xl shadow-2xl flex items-center justify-center border border-black/5 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-1000">
                <div className="w-20 h-28 bg-black/10 rounded-lg animate-pulse" />
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-black/[0.03] rounded-full" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-black/[0.05] rounded-full" />
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
             <div className="w-1.5 h-1.5 bg-black rounded-full" />
             <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/30">Snap Technology</span>
          </div>
        </motion.div>

        {/* Info Column */}
        <div className="space-y-16">
          <header>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/30 mb-6 block">The Installation</span>
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter mb-6 text-black">
              Simple. <br />
              <span className="italic font-light text-black/30">By design.</span>
            </h2>
            <p className="text-lg text-black/50 font-medium max-w-sm">
              No tools. No professional help. Achieving a clean, high-end result takes under 60 seconds.
            </p>
          </header>

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="flex gap-8 group"
              >
                <span className="text-5xl font-black text-black/5 leading-none transition-colors group-hover:text-black/10 translate-y-2">
                  {step.number}
                </span>
                <div className="pt-2">
                  <h4 className="text-xl font-bold mb-3 tracking-tight group-hover:translate-x-1 transition-transform">{step.title}</h4>
                  <p className="text-black/40 text-sm leading-relaxed max-w-xs">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
