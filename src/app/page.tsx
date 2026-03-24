import { Hero } from "@/components/home/Hero";
import { Comparison } from "@/components/home/Comparison";
import { Benefits } from "@/components/home/Benefits";
import { Installation } from "@/components/home/Installation";

export default function Home() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <Hero />
      <Comparison />
      <Benefits />
      <Installation />
      
      {/* Social Proof Placeholder */}
      <section className="py-24 bg-accent text-white overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale invert items-center">
            <span className="font-bold text-2xl tracking-tighter">FORBES</span>
            <span className="font-bold text-2xl tracking-tighter">WSJ</span>
            <span className="font-bold text-2xl tracking-tighter">FAST COMPANY</span>
            <span className="font-bold text-2xl tracking-tighter">HUFFPOST</span>
          </div>
          <div className="mt-16 max-w-3xl mx-auto">
            <p className="text-3xl font-light italic leading-relaxed mb-8">
              &quot;The most well-designed hardware item I&apos;ve ever seen. It&apos;s the final detail every home needs.&quot;
            </p>
            <p className="font-bold tracking-widest uppercase text-xs">SARAH JENKINS — LEAD DESIGNER AT MODA INTERIORS</p>
          </div>
        </div>
      </section>
    </main>
  );
}
