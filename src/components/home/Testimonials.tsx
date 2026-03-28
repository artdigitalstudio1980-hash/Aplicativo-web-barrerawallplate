'use client';

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "The most well-designed hardware item I've ever seen. The final detail every premium home needs.",
    name: "Sarah Jenkins",
    role: "Lead Designer, Moda Interiors",
  },
  {
    quote: "We use Barrera in every luxury listing. Stagers and buyers can't stop asking about them.",
    name: "Marcus Chen",
    role: "Real Estate Developer",
  },
  {
    quote: "Guests constantly compliment our switches. Simple upgrade, unreal impact.",
    name: "Elena Rodriguez",
    role: "Airbnb Superhost",
  },
];

export function Testimonials() {
  return (
    <Section padding="lg" className="bg-black text-white rounded-[4rem] mx-4 lg:mx-8 mb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-4 rounded-full bg-white/10 text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase mb-8"
          >
            Social Proof
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight"
          >
            Loved by those <br />
            <span className="italic font-light opacity-40">who notice everything.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 1 }}
              className="flex flex-col h-full group"
            >
              <div className="flex gap-1 mb-8 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-white text-white" />
                ))}
              </div>
              <blockquote className="text-xl lg:text-2xl font-light leading-relaxed text-white/80 mb-10 flex-grow tracking-tight">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="pt-8 border-t border-white/10 mt-auto">
                <p className="text-sm font-bold tracking-tight text-white mb-1 uppercase tracking-widest">{t.name}</p>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
