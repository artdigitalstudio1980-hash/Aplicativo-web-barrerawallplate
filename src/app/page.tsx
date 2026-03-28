import { Hero } from "@/components/home/Hero";
import { Comparison } from "@/components/home/Comparison";
import { Benefits } from "@/components/home/Benefits";
import { Installation } from "@/components/home/Installation";
import { Testimonials } from "@/components/home/Testimonials";
import { UseCases } from "@/components/home/UseCases";
import { TrustBadges } from "@/components/home/TrustBadges";
import { StickyCTA } from "@/components/home/StickyCTA";
import { EmailCapture } from "@/components/home/EmailCapture";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero handles its own padding for a seamless entry */}
      <Hero />
      
      <div className="space-y-0 lg:space-y-12">
        <Comparison />
        <Benefits />
        <Installation />
        <UseCases />
        <Testimonials />
        <TrustBadges />
      </div>

      {/* Email Capture - shows after 25 seconds for a less intrusive feel */}
      <EmailCapture delay={25000} />

      {/* Sticky CTA - shows after 10 seconds */}
      <StickyCTA />
    </main>
  );
}
