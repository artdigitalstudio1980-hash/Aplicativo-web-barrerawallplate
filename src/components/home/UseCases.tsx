'use client';

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Home, Building2, Star } from "lucide-react";

const useCases = [
  {
    icon: Home,
    title: "Homeowners",
    description: "The detail that completes your home. Because you notice the small things that others miss.",
  },
  {
    icon: Building2,
    title: "Designers",
    description: "The finishing touch that elevates every premium project. Trusted by architects worldwide.",
  },
  {
    icon: Star,
    title: "Airbnb Hosts",
    description: "The upgrade guests mention in reviews without knowing why. Pure, undeniable luxury.",
  },
];

export function UseCases() {
  return (
    <Section padding="lg" className="bg-white">
      <div className="text-center mb-24 max-w-2xl mx-auto">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="inline-block px-3 py-1 rounded-full bg-black/5 text-[10px] font-bold tracking-[0.3em] uppercase mb-8"
        >
           Applications
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black tracking-tighter leading-tight"
        >
          Built for the <br />
          <span className="italic font-light text-black/40">detail-obsessed.</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 max-w-6xl mx-auto">
        {useCases.map((useCase, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 1 }}
            className="text-center space-y-8 flex flex-col items-center group"
          >
            <div className="w-20 h-20 rounded-full bg-[#F9F9FB] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-700 shadow-sm">
              <useCase.icon size={28} strokeWidth={1} />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-black/30 mb-4 group-hover:text-black transition-colors">
                {useCase.title}
              </h3>
              <p className="text-base text-black/50 leading-relaxed font-medium max-w-[280px] mx-auto group-hover:text-black/80 transition-colors">
                {useCase.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
