'use client';

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

const steps = [
  {
    number: "01",
    title: "Secure the Base",
    description: "Screw the sub-plate into your existing outlet box.",
  },
  {
    number: "02",
    title: "Align",
    description: "Use built-in guides for a perfectly straight fit.",
  },
  {
    number: "03",
    title: "Snap On",
    description: "Simply snap the cover into place. Done.",
  },
];

export function Installation() {
  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Simple by design.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              No tools. No professional help. Just a clean result in seconds.
            </p>
          </div>

          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6"
              >
                <span className="text-4xl font-black text-accent/10 leading-none mt-1">
                  {step.number}
                </span>
                <div>
                  <h4 className="text-base font-bold mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-muted/30 flex items-center justify-center border border-muted/30">
            <div className="text-center p-12">
              <div className="w-20 h-20 bg-accent/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-10 h-10 bg-accent/20 rounded-full animate-pulse" />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent/40">Watch the Click</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
