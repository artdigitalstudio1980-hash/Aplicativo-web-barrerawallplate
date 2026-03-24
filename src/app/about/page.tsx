import { Section } from "@/components/ui/Section";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-32">
      <Section className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold tracking-tighter mb-12">The Final 5%</h1>
        <div className="prose prose-lg text-muted-foreground space-y-8">
          <p className="text-xl text-accent font-medium leading-relaxed">
            In high-end interior design, perfection isn&apos;t just about the big pieces. It&apos;s about the details that everyone else overlooks.
          </p>
          <p>
            Founded in Miami, Barrera Wallplate was born from a simple frustration: why do multi-million dollar homes still use the same plastic switch covers as a 1980s apartment?
          </p>
          <p>
            We spent two years engineering the Aura System—a hardware solution that feels like art. Our mission is to eliminate visual noise and allow the true design of your space to shine through.
          </p>
          <div className="py-12 border-y border-muted my-12">
            <blockquote className="text-3xl italic font-light text-accent text-center">
              &quot;Luxury is the absence of distraction.&quot;
            </blockquote>
          </div>
          <p>
            Today, Barrera is the preferred choice for architectural firms, luxury real estate staging, and homeowners who believe that every detail matters.
          </p>
        </div>
      </Section>
    </main>
  );
}
