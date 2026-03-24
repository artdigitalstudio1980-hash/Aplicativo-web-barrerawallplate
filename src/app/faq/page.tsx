import { Section } from "@/components/ui/Section";

export default function FAQPage() {
  const categories = [
    {
      title: "Product & Compatibility",
      items: [
        { q: "Will this fit my standard home switches?", a: "Yes. Our Aura Series is designed to meet US 1-Gang NEMA standards, fitting almost all standard single-switch and outlet boxes." },
        { q: "What materials are used?", a: "We use high-grade, UV-stabilized polycarbonate with a soft-touch matte finish that resists fingerprints and yellowing." },
      ]
    },
    {
      title: "Installation",
      items: [
        { q: "Do I need to turn off the power?", a: "Since you are only replacing the plastic faceplate and not touching the electrical wiring, it is generally safe. However, we always recommend turning off the breaker for extra safety." },
        { q: "Can I use this for multi-switch plates?", a: "Currently, we only offer 1-Gang (single switch) plates. 2-Gang and 3-Gang versions are launching late 2026." },
      ]
    },
    {
      title: "Shipping & Returns",
      items: [
        { q: "How long does shipping take?", a: "Standard US shipping takes 3-5 business days. Express shipping (1-2 days) is available at checkout." },
        { q: "What is your return policy?", a: "We offer a 30-day 'Perfect Match' guarantee. If it doesn't fit your space perfectly, return it for a full refund." },
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-background pt-32 pb-20">
      <Section className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold tracking-tighter mb-16 text-center">Frequently Asked Questions</h1>
        <div className="space-y-16">
          {categories.map((cat, i) => (
            <div key={i}>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8 border-b border-muted pb-4">{cat.title}</h2>
              <div className="space-y-10">
                {cat.items.map((item, j) => (
                  <div key={j} className="space-y-4">
                    <h4 className="text-xl font-bold text-accent">{item.q}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
