"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Section padding="none" className="pt-40 lg:pt-52 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-[10px] font-bold tracking-[0.4em] uppercase text-black/30 mb-8"
            >
              Contact Us
            </motion.span>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-10 leading-[0.85]">
              Let&apos;s talk <br />
              <span className="italic font-light text-black/30">Design.</span>
            </h1>
            
            <p className="text-xl text-black/50 font-medium leading-relaxed mb-16 max-w-md">
              Questions about an order? Interested in a partnership for a development project? We&apos;re here to provide clarity.
            </p>
            
            <div className="space-y-12">
              {[
                { icon: Mail, label: "Inquiries", value: "hello@barrerawallplate.com" },
                { icon: Phone, label: "Direct", value: "+1 (305) 555-0123" },
                { icon: MapPin, label: "Studio", value: "Design District, Miami, FL" }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#F9F9FB] flex items-center justify-center border border-black/5 group-hover:bg-black group-hover:text-white transition-all duration-500">
                    <item.icon size={22} strokeWidth={1} />
                  </div>
                  <div className="pt-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 mb-2">{item.label}</p>
                    <p className="text-lg font-bold tracking-tight text-black">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <GlassCard className="p-10! lg:p-16! bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-black/5">
              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 pl-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#F9F9FB] border-b-2 border-transparent focus:border-black outline-none px-4 py-4 rounded-xl transition-all font-medium text-black placeholder:text-black/20" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 pl-1">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-[#F9F9FB] border-b-2 border-transparent focus:border-black outline-none px-4 py-4 rounded-xl transition-all font-medium text-black placeholder:text-black/20" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black/40 pl-1">Your Message</label>
                  <textarea 
                    rows={6} 
                    className="w-full bg-[#F9F9FB] border-b-2 border-transparent focus:border-black outline-none px-4 py-4 rounded-xl transition-all font-medium text-black placeholder:text-black/20 resize-none" 
                    placeholder="How can we elevate your project?" 
                  />
                </div>
                <Button className="w-full h-16 text-lg font-bold rounded-2xl bg-black text-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl">
                   Send Message
                   <Send className="ml-3" size={18} />
                </Button>
                <p className="text-[10px] text-center text-black/30 font-bold uppercase tracking-widest">Typical response time: 2-4 hours</p>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </Section>
    </main>
  );
}
