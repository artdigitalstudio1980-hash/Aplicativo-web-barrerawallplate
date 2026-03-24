'use client';

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Home, Building2, Star } from "lucide-react";

const useCases = [
  {
    icon: Home,
    title: "Homeowners",
    description: "The detail that completes your home. Because you notice the small things.",
  },
  {
    icon: Building2,
    title: "Design Professionals",
    description: "The finishing touch that elevates every project. Trusted by architects.",
  },
  {
    icon: Star,
    title: "Airbnb & Staging",
    description: "The upgrade guests notice. And mention. Without knowing why.",
  },
];

export function UseCases() {
  return (
    <Section className="bg-white">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Built for those who notice.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {useCases.map((useCase, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mx-auto">
              <useCase.icon size={20} className="text-accent" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {useCase.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
              {useCase.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
