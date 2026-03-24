"use client";

import Image from "next/image";
import { Section } from "@/components/ui/Section";

export function Comparison() {
  return (
    <Section className="bg-muted/30">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Visible Screws are Visual Noise.</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Interior design is about harmony. Traditional wall plates introduce clutter where there should be calm.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Before */}
        <div className="relative group">
          <div className="absolute top-4 left-4 z-10 py-1 px-4 rounded-full bg-red-500/10 text-red-600 text-[10px] font-bold tracking-widest uppercase">
            The Traditional Way
          </div>
          <div className="aspect-4/5 rounded-4xl overflow-hidden border border-muted">
            <Image
              src="/assets/before-product.svg"
              alt="Traditional wall plate with screws"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-3">Visual Clutter</h3>
            <p className="text-muted-foreground">Visible screws, cheap materials, and yellowing plastic distract from your interior design.</p>
          </div>
        </div>

        {/* After */}
        <div className="relative group">
          <div className="absolute top-4 left-4 z-10 py-1 px-4 rounded-full bg-green-500/10 text-green-600 text-[10px] font-bold tracking-widest uppercase">
            The Barrera System
          </div>
          <div className="aspect-4/5 rounded-4xl overflow-hidden border-4 border-white shadow-2xl">
            <Image
              src="/assets/hero-product.svg"
              alt="Barrera Wallplate Seamless Finish"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-3">Seamless Harmony</h3>
            <p className="text-muted-foreground">Ultra-clean, screwless, and premium materials that blend perfectly with your modern environment.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
