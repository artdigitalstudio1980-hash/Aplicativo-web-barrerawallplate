"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShieldCheck, Truck, Minus, Plus, CreditCard, Layers } from "lucide-react";
import { Installation } from "@/components/home/Installation";
import { useCart } from "@/lib/cart";

const products = [
  {
    id: "1-gang",
    name: "Aura 1-Gang",
    description: "Single-slot precision engineering with customizable wallpaper-inlaid frame.",
    price: 24.00,
    image: "/assets/aura-1-gang-yellow.png",
    specs: [
      { label: "Configuration", value: "1-Gang (Single Slot)" },
      { label: "Material", value: "AuraFiber™ Matte Polymer" },
      { label: "Dimensions", value: "4.5\" × 2.75\"" },
      { label: "Customization", value: "Wallpaper Inlay Frame" }
    ]
  },
  {
    id: "2-gang",
    name: "Aura 2-Gang",
    description: "Double-slot architectural plate for side-by-side switches or outlets.",
    price: 32.00,
    image: "/assets/aura-2-gang-charcoal.png",
    specs: [
      { label: "Configuration", value: "2-Gang (Double Slot)" },
      { label: "Material", value: "AuraFiber™ Matte Polymer" },
      { label: "Dimensions", value: "4.5\" × 4.56\"" },
      { label: "Customization", value: "Wallpaper Inlay Frame" }
    ]
  }
];

export default function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: `${selectedProduct.id}-classic`,
      name: selectedProduct.name,
      variant: "Wallpaper Ready",
      variantId: "wallpaper-ready",
      price: selectedProduct.price,
      image: selectedProduct.image,
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <Section padding="none" className="pt-32 lg:pt-48 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Gallery */}
          <div className="lg:sticky lg:top-40 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProduct.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6 }}
                className="aspect-square rounded-[3rem] overflow-hidden bg-[#F9F9FB] relative group shadow-2xl border border-black/5"
              >
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/[0.02]" />
              </motion.div>
            </AnimatePresence>
            
            {/* Visual indicator of wallpaper customization */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-black/5 ring-1 ring-black/5`} />
                ))}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Customizable wallpaper frame</p>
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
                The Aura Collection
              </motion.span>
              
              <h1 className="text-4xl lg:text-7xl font-black mb-6 tracking-tighter leading-[0.9]">
                {selectedProduct.name} <br />
                <span className="text-black/30 italic font-light text-5xl lg:text-8xl">Wallpaper Inlay</span>
              </h1>
              
              <div className="flex items-center gap-6 mb-10 pb-10 border-b border-black/5">
                <span className="text-4xl font-light tracking-tight text-black/80">${selectedProduct.price.toFixed(2)}</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  In Stock
                </span>
              </div>

              <p className="text-lg text-black/60 leading-relaxed max-w-lg mb-12 font-medium">
                {selectedProduct.description} Designed for high-end interiors where visual continuity is paramount.
              </p>

              {/* Gang Selector */}
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">Number of Gangs</label>
                  <span className="text-[10px] font-bold text-black uppercase tracking-widest">{selectedProduct.id}</span>
                </div>
                <div className="flex gap-4">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className={`flex-1 py-4 px-6 rounded-2xl border-2 transition-all duration-500 font-bold tracking-tight text-sm ${
                        selectedProduct.id === p.id ? "border-black bg-black text-white shadow-xl" : "border-black/5 bg-white text-black/40 hover:border-black/20"
                      }`}
                    >
                      {p.id === "1-gang" ? "1-Gang" : "2-Gang"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Purchase Section */}
              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                <div className="flex items-center bg-[#F9F9FB] rounded-2xl px-4 h-16 border border-black/5">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-black/40 hover:text-black transition-colors"><Minus size={18} /></button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-black/40 hover:text-black transition-colors"><Plus size={18} /></button>
                </div>
                <Button size="lg" className="flex-1 h-16 rounded-2xl text-xl font-bold tracking-tight shadow-xl hover:shadow-2xl transition-all" onClick={handleAddToCart}>
                  Add to Cart — ${(selectedProduct.price * quantity).toFixed(2)}
                </Button>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 { icon: Layers, t: "Visual Continuity", d: "Frame inlays match your existing wallpaper." },
                 { icon: ShieldCheck, t: "Architectural Grade", d: "UV-stabilized matte finish won't yellow." },
                 { icon: Truck, t: "Complimentary Shipping", d: "On all orders exceeding $100." },
                 { icon: CreditCard, t: "Secure Checkout", d: "Full encryption for your protection." }
               ].map((f, i) => (
                 <GlassCard key={i} className="p-6! border border-black/5">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center shrink-0">
                          <f.icon size={18} strokeWidth={1.5} />
                       </div>
                       <div>
                          <h4 className="text-xs font-bold mb-1 tracking-tight">{f.t}</h4>
                          <p className="text-[10px] text-black/40 font-medium leading-tight">{f.d}</p>
                       </div>
                    </div>
                 </GlassCard>
               ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Specifications */}
      <Section padding="lg" className="bg-black text-white rounded-[4rem] mx-4 lg:mx-8 mb-20 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center relative z-10">
          <div>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 mb-8 block">Engineering</span>
            <h2 className="text-4xl lg:text-7xl font-black mb-12 tracking-tighter leading-none italic font-light opacity-80">Built for <br />the obsessive.</h2>
            <div className="space-y-4">
               {selectedProduct.specs.map((spec, i) => (
                 <div key={i} className="flex justify-between py-6 border-b border-white/10 group">
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] group-hover:text-white/60 transition-colors">{spec.label}</span>
                    <span className="text-sm font-bold tracking-tight">{spec.value}</span>
                 </div>
               ))}
            </div>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
             <Image src={selectedProduct.image} alt="Technical Detail" fill className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80" />
             <div className="absolute inset-0 bg-black/20" />
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 border border-white/20 rounded-full flex items-center justify-center animate-ping" />
             </div>
          </div>
        </div>
      </Section>

      <Installation />
    </main>
  );
}
