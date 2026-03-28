'use client';

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { ShieldCheck, Zap, Palette, Layers } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Seamless Aura",
    description: "Our patented system eliminates all visible fasteners for a perfectly flush, architectural finish.",
  },
  {
    icon: Zap,
    title: "Instant Transformation",
    description: "Snap-on engineering allows for a complete room upgrade in under 60 seconds. No tools required.",
  },
  {
    icon: Palette,
    title: "Architectural Grade",
    description: "Crafted from UV-resistant, non-yellowing polymers that maintain their matte finish for life.",
  },
  {
    icon: Layers,
    title: "Wallpaper Ready",
    description: "The unique dual-plate system provides a clean edge for wallpaper, creating a 'hidden' integration.",
  },
];

export function Benefits() {
  return (
    <Section padding="lg" className="bg-[#F9F9FB]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="flex flex-col group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-black/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <benefit.icon size={22} className="text-black" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold tracking-tight mb-4 text-black">{benefit.title}</h3>
            <p className="text-sm text-black/40 leading-relaxed font-medium">
              {benefit.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
