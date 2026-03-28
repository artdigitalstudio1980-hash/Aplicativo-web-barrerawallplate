"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Info, ShieldCheck, Zap, Truck, Minus, Plus } from "lucide-react";
import { Installation } from "@/components/home/Installation";
import { useCart } from "@/lib/cart";

const variants = [
  { id: "white", name: "Classic White", hex: "#FFFFFF" },
  { id: "gray", name: "Soft Gray", hex: "#E5E5E5" },
  { id: "black", name: "Matte Black", hex: "#111111" },
];

const placeholderImages: Record<string, string> = {
  white: "/assets/hero-product.png",
  gray: "/assets/hero-product.png",
  black: "/assets/hero-product.png",
};

export default function ProductPage() {
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: `aura-${selectedVariant.id}`,
      name: "Aura Seamless Wall Plate",
      variant: `${selectedVariant.name} · 1-Gang`,
      variantId: selectedVariant.id,
      price: 24.00,
      image: placeholderImages[selectedVariant.id],
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with fixed Navbar adjustment */}
      <Section padding="none" className="pt-32 lg:pt-48 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Gallery - Sticky on Desktop */}
          <div className="lg:sticky lg:top-40">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="aspect-square rounded-[2rem] lg:rounded-[3rem] overflow-hidden bg-muted relative group shadow-2xl"
            >
              <Image
                src={placeholderImages[selectedVariant.id]}
                alt={`Aura Wall Plate - ${selectedVariant.name}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/5" />
            </motion.div>
            
            {/* Thumbnail selector */}
            <div className="flex gap-4 mt-8 justify-center lg:justify-start">
              {variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`w-16 h-16 rounded-2xl border-2 transition-all duration-300 ${
                    selectedVariant.id === v.id ? "border-black scale-105 shadow-md" : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                   <div className="w-full h-full rounded-xl overflow-hidden border border-black/5" style={{ backgroundColor: v.hex }} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-12">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block py-1.5 px-4 rounded-full bg-black/5 text-black text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
              >
                The Aura Series
              </motion.span>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tighter leading-[1.05]">
                The Aura Seamless <br />
                <span className="text-black/40 italic font-light">Wall Plate</span>
              </h1>
              
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-black/5">
                <span className="text-4xl font-light tracking-tight">$24.00</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Ready to ship
                </span>
              </div>

              <p className="text-lg text-black/60 leading-relaxed max-w-lg mb-10">
                Eliminate visual noise with our patented snap-on system. Designed for high-end interiors where every detail matters.
              </p>

              {/* Variant Selector */}
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/40">Finish</label>
                  <span className="text-xs font-bold text-black">{selectedVariant.name}</span>
                </div>
                <div className="flex gap-4">
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`w-12 h-12 rounded-full border-2 p-1 transition-all duration-500 ${
                        selectedVariant.id === v.id ? "border-black scale-110" : "border-black/5 hover:border-black/20"
                      }`}
                    >
                      <div
                        className="w-full h-full rounded-full shadow-inner border border-black/5"
                        style={{ backgroundColor: v.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Purchase Section */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center bg-black/5 rounded-2xl px-4 h-14">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-black/40 hover:text-black transition-colors"><Minus size={16} /></button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-black/40 hover:text-black transition-colors"><Plus size={16} /></button>
                </div>
                <Button size="lg" className="flex-1 h-14 rounded-2xl text-lg font-bold tracking-tight shadow-xl hover:shadow-2xl transition-all" onClick={handleAddToCart}>
                  Add to Cart — ${(24 * quantity).toFixed(2)}
                </Button>
              </div>
            </div>

            {/* Features Glass Card */}
            <GlassCard className="p-8! bg-white/50">
              <div className="grid grid-cols-1 gap-6">
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                      <Truck size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold mb-1">Fast US Shipping</h4>
                      <p className="text-xs text-black/50">Free shipping on orders over $100. 1-3 day local delivery.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold mb-1">Lifetime Warranty</h4>
                      <p className="text-xs text-black/50">Guaranteed against aging, cracking, or color fading.</p>
                    </div>
                 </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* Specifications */}
      <Section padding="md" className="bg-[#F9F9FB] rounded-[3rem] mx-4 lg:mx-8 mb-20 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-8 tracking-tighter">Precision Engineering.</h2>
            <div className="space-y-4">
               {[
                 { label: "Material", value: "AuraFiber™ Gloss Polymer" },
                 { label: "Dimensions", value: "4.5\" × 2.75\" (1-Gang)" },
                 { label: "Fitment", value: "Universal US Snap-On" },
                 { label: "Resistance", value: "Heat & UV Resistant" }
               ].map((spec, i) => (
                 <div key={i} className="flex justify-between py-4 border-b border-black/5">
                    <span className="text-sm font-bold text-black/40 uppercase tracking-widest">{spec.label}</span>
                    <span className="text-sm font-bold">{spec.value}</span>
                 </div>
               ))}
            </div>
          </div>
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
             <Image src="/assets/design-integration.png" alt="Aura Detail" fill className="object-cover" />
             <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>
      </Section>

      <Installation />

      {/* FAQ */}
      <Section padding="lg">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tighter mb-4">Questions & Answers</h2>
            <p className="text-black/50">Everything you need to know about the Aura System.</p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: "Will this fit my existing outlets?", a: "Yes, designed for all standard US 1-Gang boxes." },
              { q: "Do I need an electrician?", a: "No, installation is purely cosmetic and tool-less." },
              { q: "Are they paintable?", a: "The Classic White finish is fully paintable for custom matching." },
              { q: "What's the sub-plate for?", a: "It provides a rigid base for wallpapers to hide cut edges." }
            ].map((item, i) => (
              <GlassCard key={i} className="p-8">
                <h4 className="font-bold mb-3 text-black">{item.q}</h4>
                <p className="text-sm text-black/50 leading-relaxed">{item.a}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
