'use client';

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

export default function FAQPage() {
  const categories = [
    {
      title: "The Product",
      items: [
        { q: "Will this fit my standard home switches?", a: "Yes. Our Aura Series is designed to meet US 1-Gang NEMA standards, fitting almost all standard single-switch and outlet boxes without modification." },
        { q: "What materials are used?", a: "We use high-grade, UV-stabilized polycarbonate with a soft-touch matte finish that resists fingerprints, scratches, and yellowing over time." },
      ]
    },
    {
      title: "Installation",
      items: [
        { q: "Do I need to turn off the power?", a: "Replacing the plastic faceplate doesn't require touching electrical wiring. However, we always recommend turning off the breaker for absolute peace of mind." },
        { q: "Can I use this for multi-switch plates?", a: "Currently, Aura is available for 1-Gang (single switch) only. 2-Gang and 3-Gang versions are currently in development for late 2026." },
      ]
    },
    {
      title: "Commerce",
      items: [
        { q: "How long does shipping take?", a: "Standard US shipping takes 3-5 business days. Express overnight delivery is available at checkout for urgent interior projects." },
        { q: "What is your return policy?", a: "We offer a 30-day 'Perfect Design' guarantee. If it doesn't elevate your space perfectly, return it for a full refund. No questions." },
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Section padding="none" className="pt-40 lg:pt-60 pb-20">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-24">
             <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block text-[10px] font-bold tracking-[0.4em] uppercase text-black/30 mb-8"
              >
                Help Center
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-10 leading-[0.85]"
              >
                Simple <br />
                <span className="italic font-light text-black/30 text-5xl md:text-7xl">Clarified.</span>
              </motion.h1>
          </header>

          <div className="space-y-24">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group"
              >
                <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30 mb-12 border-b border-black/5 pb-4 transition-colors group-hover:text-black group-hover:border-black/10">
                  {cat.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                  {cat.items.map((item, j) => (
                    <div key={j} className="space-y-4 group/item">
                      <h4 className="text-xl font-bold text-black tracking-tight group-hover/item:text-black/60 transition-colors">
                        {item.q}
                      </h4>
                      <p className="text-black/40 text-sm leading-relaxed font-medium">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section padding="lg" className="border-t border-black/5 mt-20">
         <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold tracking-tight mb-4">Still have questions?</h3>
            <p className="text-black/50 mb-10">Our design team is available 24/7 to help you with your project.</p>
            <a href="/contact">
               <button className="bg-black text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl">
                  Contact Support
               </button>
            </a>
         </div>
      </Section>
    </main>
  );
}
