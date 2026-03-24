"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { ShieldCheck, Truck, RotateCcw, CreditCard, Lock, Award } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Express Shipping",
    description: "On all US orders over $50",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "No questions asked",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Warranty",
    description: "We stand behind our product",
  },
  {
    icon: Lock,
    title: "Secure Checkout",
    description: "SSL encrypted & protected",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Shop now, pay later options",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "UV-stabilized materials",
  },
];

export function TrustBadges() {
  return (
    <Section className="bg-muted/20">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-4"
        >
          The Barrera Promise
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-accent">
          Premium experience, every time.
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {badges.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center mb-4">
              <badge.icon size={20} className="text-accent" />
            </div>
            <h4 className="text-sm font-bold text-accent mb-1">{badge.title}</h4>
            <p className="text-xs text-muted-foreground">{badge.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
