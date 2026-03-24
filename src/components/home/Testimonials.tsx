'use client';

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "The most well-designed hardware item I've ever seen. The final detail every home needs.",
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
    <Section className="bg-accent text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-6">
            What People Are Saying
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Loved by those who notice.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-6"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={12} className="fill-white/60 text-white/60" />
                ))}
              </div>
              <blockquote className="text-base font-light leading-relaxed text-white/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div>
                <p className="text-sm font-bold">{t.name}</p>
                <p className="text-xs text-white/40">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
