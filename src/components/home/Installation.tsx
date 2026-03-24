"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

export function Installation() {
  const steps = [
    {
      number: "01",
      title: "Secure the Base",
      description: "Screw the universal sub-plate into your existing outlet or switch box.",
    },
    {
      number: "02",
      title: "Level and Align",
      description: "Use the built-in alignment guides to ensure a perfectly straight fit.",
    },
    {
      number: "03",
      title: "Snap and Secure",
      description: "Simply snap the screwless wall plate cover onto the base for a seamless finish.",
    },
  ];

  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 leading-tight">
            Sophisticated Design. <br />
            <span className="text-muted-foreground font-light italic">Simple Installation.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            No professional help required. The Barrera System is designed for the modern homeowner who values both time and aesthetics.
          </p>
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex gap-8 group"
              >
                <span className="text-5xl font-black text-accent/10 group-hover:text-accent/20 transition-colors duration-500 leading-none">
                  {step.number}
                </span>
                <div>
                  <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative group">
          <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl bg-muted/50 flex items-center justify-center border-8 border-muted/20">
             {/* This would ideally be a video or another generated image of the snap action */}
             <div className="text-center p-12">
               <div className="w-24 h-24 bg-accent/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-12 h-12 bg-accent rounded-full animate-pulse" />
               </div>
               <p className="text-xs font-bold tracking-widest uppercase text-accent/60 mb-2">Watch the Click</p>
               <p className="text-sm italic text-muted-foreground">The most satisfying click in home renovation.</p>
             </div>
          </div>
          {/* Floating Accents */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
        </div>
      </div>
    </Section>
  );
}
