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
    <main className="min-h-screen bg-background pt-20">
      <Hero />
      <Comparison />
      <Benefits />
      <Installation />
      <UseCases />
      <Testimonials />
      <TrustBadges />

      {/* Email Capture - shows after 15 seconds */}
      <EmailCapture delay={15000} />

      {/* Sticky CTA - shows after 8 seconds */}
      <StickyCTA />
    </main>
  );
}
