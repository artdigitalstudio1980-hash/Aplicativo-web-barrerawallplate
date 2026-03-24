'use client';

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Truck, RotateCcw, ShieldCheck, CreditCard } from "lucide-react";

const badges = [
  { icon: Truck, label: "Free Shipping", sub: "Orders over $50" },
  { icon: RotateCcw, label: "30-Day Returns", sub: "No questions" },
  { icon: ShieldCheck, label: "Lifetime Warranty", sub: "We stand behind it" },
  { icon: CreditCard, label: "Secure Checkout", sub: "SSL encrypted" },
];

export function TrustBadges() {
  return (
    <Section className="bg-white">
      <div className="flex flex-wrap justify-center items-center gap-12">
        {badges.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3"
          >
            <badge.icon size={16} className="text-muted-foreground" />
            <div>
              <p className="text-xs font-bold text-accent">{badge.label}</p>
              <p className="text-[10px] text-muted-foreground">{badge.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
