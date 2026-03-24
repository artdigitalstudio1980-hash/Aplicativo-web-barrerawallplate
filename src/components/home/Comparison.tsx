'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

export function Comparison() {
  return (
    <Section className="bg-white">
      <div className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground mb-6"
        >
          The Difference
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold tracking-tight text-accent"
        >
          The details speak volumes.
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Before */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="aspect-square rounded-3xl overflow-hidden border border-muted/50">
            <Image
              src="/assets/before-product.svg"
              alt="Traditional wall plate"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-red-500 mb-3">Before</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Visible screws. Cheap materials. Yellowing plastic. The detail that breaks the room.
            </p>
          </div>
        </motion.div>

        {/* After */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="space-y-6"
        >
          <div className="aspect-square rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
            <Image
              src="/assets/hero-product.svg"
              alt="Barrera Wallplate"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-green-600 mb-3">After</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Seamless. Screwless. Premium. The detail that completes the room.
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
