'use client';

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { ShieldCheck, Zap, Palette, Layers } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Seamless",
    description: "No visible screws. A clean surface that blends perfectly with your wall.",
  },
  {
    icon: Zap,
    title: "Snap-On",
    description: "Installs in seconds. Just snap the cover over your existing hardware.",
  },
  {
    icon: Palette,
    title: "Premium Material",
    description: "UV-resistant polymers that won't yellow or crack over time.",
  },
  {
    icon: Layers,
    title: "Paintable",
    description: "Match your wall exactly. Paint or texture for a truly invisible look.",
  },
];

export function Benefits() {
  return (
    <Section className="bg-muted/20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="space-y-4"
          >
            <benefit.icon size={20} className="text-accent/60" />
            <h3 className="text-sm font-bold tracking-wide">{benefit.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
