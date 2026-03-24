"use client";

import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-background pt-32">
      <Section>
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">The Design System</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We don’t just sell wall plates. We provide a system for visual harmony. Barrera Aura is the bridge between hardware and high-end interior design.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative aspect-square rounded-4xl overflow-hidden shadow-2xl">
            <Image
              src="/assets/design-integration.svg"
              alt="Barrera Wallplate integrated with premium wallpaper"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Wallpaper Integration</h2>
            <p className="text-lg text-muted-foreground">
              Traditional plates interrupt the flow of premium wall coverings. The Aura Series sub-plate allows for precise wallpaper cutouts, while the screwless cover creates a clean frame that complements the texture instead of fighting it.
            </p>
            <GlassCard className="p-6!">
              <h4 className="font-bold mb-2">Pro Tip for Designers</h4>
              <p className="text-sm text-muted-foreground">
                Apply a thin layer of matched paint or a circular cutout of your wallpaper to the Aura cover for a completely “hidden” effect.
              </p>
            </GlassCard>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center pb-20 border-b border-muted">
          <div>
            <h3 className="text-2xl font-bold mb-4">Minimalist Form</h3>
            <p className="text-sm text-muted-foreground">Strict geometric proportions based on the Golden Ratio for architectural balance.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Matte Finishes</h3>
            <p className="text-sm text-muted-foreground">Light-absorbing textures that eliminate unwanted glares and reflections.</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">Patented Snap</h3>
            <p className="text-sm text-muted-foreground">Engineering that ensures a rock-solid fit without a single visible fastener.</p>
          </div>
        </div>
      </Section>
    </main>
  );
}
