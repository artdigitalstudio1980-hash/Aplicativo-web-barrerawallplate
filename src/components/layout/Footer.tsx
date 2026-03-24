import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-muted py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold tracking-tighter text-accent mb-6">
              BARRERA<span className="font-light text-muted-foreground ml-1">Wallplate</span>
            </h3>
            <p className="text-muted-foreground max-w-sm mb-8">
              Transforming interiors through the smallest details. Premium, screwless design for modern environments.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/product" className="hover:text-accent transition-colors">The Collection</Link></li>
              <li><Link href="/design-system" className="hover:text-accent transition-colors">Design System</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">Our Story</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-accent transition-colors">FAQs</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-accent transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-muted text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} Barrera Wallplate. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
