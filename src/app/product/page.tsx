"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Info, ShieldCheck, Zap, Truck } from "lucide-react";
import { Installation } from "@/components/home/Installation";

const variants = [
  { id: "white", name: "Classic White", hex: "#FFFFFF", image: "/assets/hero-product.png" },
  { id: "gray", name: "Soft Gray", hex: "#E5E5E5", image: "/assets/hero-product.png" }, // Placeholder, would generate more
  { id: "black", name: "Matte Black", hex: "#1A1A1A", image: "/assets/hero-product.png" }, // Placeholder
];

export default function ProductPage() {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <main className="min-h-screen bg-background pt-32">
      <Section padding="sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Gallery */}
          <div className="sticky top-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-4xl overflow-hidden border-8 border-white shadow-2xl relative"
            >
              <Image
                src={selectedVariant.image}
                alt={selectedVariant.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </motion.div>
            
            <div className="grid grid-cols-4 gap-4 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden border-2 border-muted hover:border-accent transition-colors cursor-pointer bg-muted/50">
                  {/* Thumbnails */}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-10">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4 block">Aura Series</span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-accent mb-4">
                The Aura Seamless Wall Plate
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-light text-accent">$24.00</span>
                <span className="px-2 py-1 bg-green-500/10 text-green-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  In Stock & Ready to Ship
                </span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Transform your home’s aesthetic with the Aura Series. Our patented snap-on system eliminates visible screws, creating a perfectly clean, minimalist finish that elevates any room.
              </p>
            </div>

            {/* Variant Selector */}
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Finish: <span className="text-muted-foreground">{selectedVariant.name}</span></p>
              <div className="flex gap-4">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      selectedVariant.id === v.id ? "border-accent scale-110 shadow-lg" : "border-transparent hover:border-muted-foreground"
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full border border-muted shadow-inner"
                      style={{ backgroundColor: v.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center border-2 border-muted rounded-full px-4 h-14">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-muted-foreground hover:text-accent font-bold">-</button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-muted-foreground hover:text-accent font-bold">+</button>
              </div>
              <Button size="lg" className="flex-1 h-14 text-lg">
                Add to Cart — ${(24 * quantity).toFixed(2)}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-muted">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={20} className="text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Fast US Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={20} className="text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Lifetime Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Zap size={20} className="text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Easy Installation</span>
              </div>
            </div>

            {/* Product Details Collapse (Simplified for now) */}
            <GlassCard className="p-6!">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-muted pb-3">
                  <span className="font-bold text-sm">Product Specifications</span>
                  <Info size={16} className="text-muted-foreground" />
                </div>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li className="flex justify-between"><span>Material</span><span className="text-accent font-medium">Premium High-Gloss Polymer</span></li>
                  <li className="flex justify-between"><span>Dimensions</span><span className="text-accent font-medium">4.5&quot; x 2.75&quot; (Standard 1-Gang)</span></li>
                  <li className="flex justify-between"><span>Compatibility</span><span className="text-accent font-medium">All standard switch/outlet types</span></li>
                </ul>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      <Installation />

      {/* FAQ Preview */}
      <Section className="bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Will this fit my existing outlets?", a: "Yes, our Aura Series is designed to fit all standard US 1-Gang electrical boxes." },
              { q: "Do I need an electrician?", a: "No! The installation is purely cosmetic and snaps right over your existing hardware." },
              { q: "Can I paint the covers?", a: "The White finish is paintable. We recommend using a high-quality spray paint for a professional look." },
            ].map((item, i) => (
              <div key={i} className="glass p-6 rounded-2xl">
                <h4 className="font-bold mb-2 flex gap-3 text-accent"><span className="text-muted-foreground">Q:</span>{item.q}</h4>
                <p className="text-sm text-muted-foreground pl-7">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
