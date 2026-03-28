'use client';

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Truck, RotateCcw, ShieldCheck, CreditCard } from "lucide-react";

const badges = [
  { icon: Truck, label: "Fast Shipping", sub: "1-3 Day Delivery" },
  { icon: RotateCcw, label: "30-Day Returns", sub: "Risk-Free Guarantee" },
  { icon: ShieldCheck, label: "Lifetime Warranty", sub: "Architectural Grade" },
  { icon: CreditCard, label: "Secure Payment", sub: "SSL Encrypted" },
];

export function TrustBadges() {
  return (
    <Section padding="none" className="bg-white border-t border-black/5 py-12 lg:py-16">
      <div className="flex flex-wrap justify-between items-center gap-8 lg:gap-12 opacity-40 hover:opacity-100 transition-opacity duration-700">
        {badges.map((badge, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:scale-110 transition-transform">
               <badge.icon size={16} className="text-black" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-black uppercase tracking-widest">{badge.label}</p>
              <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest">{badge.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
