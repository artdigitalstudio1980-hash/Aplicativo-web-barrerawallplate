"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Lead Designer, Moda Interiors",
    quote: "The most well-designed hardware item I've ever seen. It's the final detail every home needs.",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    role: "Real Estate Developer",
    quote: "We use Barrera in every luxury listing. Stagers and buyers alike can't stop asking about them.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Airbnb Superhost",
    quote: "Guests constantly compliment our switches. Such a simple upgrade, but the impact is unreal.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <Section className="bg-accent text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 border border-white rounded-full" />
        <div className="absolute bottom-20 right-20 w-64 h-64 border border-white rounded-full" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 mb-6"
          >
            What People Are Saying
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Loved by designers.<br />
            <span className="font-light italic text-white/70">Trusted by professionals.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass border border-white/10 p-10 rounded-3xl"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-8">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="fill-white text-white" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-10 text-white/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-lg font-bold">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Press Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-16 border-t border-white/10"
        >
          <p className="text-center text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-12">
            As Seen In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
            <span className="text-2xl font-bold tracking-tighter whitespace-nowrap">ARCHITECTURAL DIGEST</span>
            <span className="text-2xl font-bold tracking-tighter whitespace-nowrap">DWELL</span>
            <span className="text-2xl font-bold tracking-tighter whitespace-nowrap">VOGUE LIVING</span>
            <span className="text-2xl font-bold tracking-tighter whitespace-nowrap">FORBES</span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
