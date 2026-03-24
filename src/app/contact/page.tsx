"use client";

import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background pt-32">
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <h1 className="text-5xl font-bold tracking-tighter mb-8">Let&apos;s talk design.</h1>
            <p className="text-lg text-muted-foreground mb-12">
              Questions about an order? Interesting in a bulk partnership for a development project? We&apos;re here to help.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">hello@barrerawallplate.com</p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-accent">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium">+1 (305) 555-0123</p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">HQ</p>
                  <p className="font-medium">Design District, Miami, FL</p>
                </div>
              </div>
            </div>
          </div>

          <GlassCard className="p-10!">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest pl-1">Name</label>
                  <input type="text" className="w-full bg-white/50 border border-muted focus:border-accent outline-none px-4 py-3 rounded-xl transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest pl-1">Email</label>
                  <input type="email" className="w-full bg-white/50 border border-muted focus:border-accent outline-none px-4 py-3 rounded-xl transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest pl-1">Message</label>
                <textarea rows={5} className="w-full bg-white/50 border border-muted focus:border-accent outline-none px-4 py-3 rounded-xl transition-colors resize-none" placeholder="How can we help you?" />
              </div>
              <Button className="w-full h-14 text-lg">Send Message</Button>
            </form>
          </GlassCard>
        </div>
      </Section>
    </main>
  );
}
