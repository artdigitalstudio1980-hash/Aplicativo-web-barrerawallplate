"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Home, Building2, Star, ArrowRight } from "lucide-react";

const useCases = [
  {
    icon: Home,
    title: "Homeowners",
    headline: "Your home deserves more than afterthought hardware.",
    description: "You invested in beautiful walls, premium paint, maybe even custom millwork. Why are your switches still sporting 1990s plastic? The Aura System is the detail that completes your vision.",
    cta: "Shop for Your Home",
    href: "/product",
  },
  {
    icon: Building2,
    title: "Design Professionals",
    headline: "The finishing touch that elevates your projects.",
    description: "Architects and interior designers trust Barrera to deliver the final 5% that separates good projects from unforgettable ones. Specify Aura in your next spec and watch clients take notice.",
    cta: "Trade Pricing",
    href: "/contact",
  },
  {
    icon: Star,
    title: "Airbnb Hosts & Stagers",
    headline: "Every detail is a review. Make this one count.",
    description: "Listings with premium details get better reviews and higher nightly rates. Aura wall plates are the invisible upgrade guests notice — and mention — without knowing why the space feels so polished.",
    cta: "See the Collection",
    href: "/product",
  },
];

export function UseCases() {
  return (
    <Section className="bg-white">
      <div className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-6"
        >
          Built For Excellence
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
          One system.<br />
          <span className="text-muted-foreground font-light italic">Endless possibilities.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {useCases.map((useCase, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-muted/20 rounded-3xl p-10 hover:bg-muted/30 transition-colors border border-transparent hover:border-muted"
          >
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-accent/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <useCase.icon size={24} className="text-accent" />
            </div>

            {/* Content */}
            <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">
              {useCase.title}
            </h3>
            <h4 className="text-xl font-bold tracking-tight mb-4 text-accent leading-tight">
              {useCase.headline}
            </h4>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {useCase.description}
            </p>

            {/* CTA */}
            <a
              href={useCase.href}
              className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-accent hover:gap-4 transition-all duration-300"
            >
              {useCase.cta}
              <ArrowRight size={14} />
            </a>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
