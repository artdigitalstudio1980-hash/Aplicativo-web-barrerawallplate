"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShieldCheck, Zap, Palette, Layers } from "lucide-react";

export function Benefits() {
  const benefits = [
    {
      icon: <ShieldCheck className="text-accent" size={32} />,
      title: "Seamless Perfection",
      description: "No visible screws. A clean, uninterrupted surface that blends perfectly with your wall.",
    },
    {
      icon: <Zap className="text-accent" size={32} />,
      title: "Snap-On Simplicity",
      description: "Installs in seconds without tools. Just snap the custom cover over the sub-plate.",
    },
    {
      icon: <Palette className="text-accent" size={32} />,
      title: "Design-First Material",
      description: "Premium UV-resistant polymers that won’t yellow or crack over time.",
    },
    {
      icon: <Layers className="text-accent" size={32} />,
      title: "Customizable Surface",
      description: "Paint it, texture it, or integrate wallpaper for a completely invisible look.",
    },
  ];

  return (
    <Section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => (
          <GlassCard key={index} delay={index * 0.1}>
            <div className="mb-6">{benefit.icon}</div>
            <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
