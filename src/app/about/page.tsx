'use client';

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Target, Eye, Heart, Award } from "lucide-react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every curve, every edge, every millimeter is engineered to absolute perfection.",
  },
  {
    icon: Eye,
    title: "Vision",
    description: "We see what others overlook. The smallest details create the biggest impact.",
  },
  {
    icon: Heart,
    title: "Purpose",
    description: "Design should serve beauty and function equally. No compromises.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Premium materials, rigorous testing, and a lifetime warranty to back it all.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-32">
      {/* Hero */}
      <Section padding="none" className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-accent/5 to-transparent rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-6"
          >
            Our Story
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8"
          >
            The Final 5%
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-accent font-light leading-relaxed"
          >
            In high-end interior design, perfection isn&apos;t about the big pieces.
            It&apos;s about the details everyone else overlooks.
          </motion.p>
        </div>
      </Section>

      {/* Story Section */}
      <Section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-muted/50 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent/5 flex items-center justify-center">
                    <span className="text-4xl">🏠</span>
                  </div>
                  <p className="text-sm font-bold text-accent/60 uppercase tracking-widest">Miami, FL</p>
                  <p className="text-xs text-muted-foreground mt-1">Founded 2024</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Born from Frustration
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Why do multi-million dollar homes still use the same plastic switch covers as a 1980s apartment? This question haunted us during countless luxury home projects.
              </p>
              <p>
                We spent two years engineering the Aura System — a hardware solution that feels like art. Every detail considered, every compromise eliminated.
              </p>
              <p>
                The result: a wall plate that disappears into your design, making everything around it look better.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Quote */}
      <Section padding="lg" className="bg-accent text-white">
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-light italic text-center leading-relaxed max-w-4xl mx-auto"
        >
          &ldquo;Luxury is the absence of distraction.&rdquo;
        </motion.blockquote>
      </Section>

      {/* Values */}
      <Section>
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4"
          >
            What We Stand For
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Principles That Guide Us
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => (
            <GlassCard key={i} delay={i * 0.1}>
              <div className="w-14 h-14 rounded-2xl bg-accent/5 flex items-center justify-center mb-6">
                <value.icon size={24} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Mission Statement */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Built for Those Who Notice
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Today, Barrera is the preferred choice for architectural firms, luxury real estate staging, 
            and homeowners who believe that every detail matters. If you notice the small details, 
            we made this for you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="pt-4"
          >
            <a
              href="/product"
              className="inline-flex items-center gap-2 text-accent font-bold hover:gap-4 transition-all duration-300"
            >
              Explore the Collection →
            </a>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
