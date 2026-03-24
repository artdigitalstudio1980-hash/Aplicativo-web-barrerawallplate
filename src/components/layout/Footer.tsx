import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-muted/50 py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tight text-accent">
              BARRERA
            </Link>
            <p className="text-xs text-muted-foreground mt-2">Premium screwless wall plates.</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <Link href="/product" className="hover:text-accent transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-accent transition-colors">Story</Link>
            <Link href="/faq" className="hover:text-accent transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
          </nav>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Barrera Wallplate
          </p>
        </div>
      </div>
    </footer>
  );
}
