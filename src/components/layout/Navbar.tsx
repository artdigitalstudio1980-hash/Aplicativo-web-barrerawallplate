'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, setIsOpen: setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "The System", href: "/design-system" },
    { name: "Shop", href: "/product" },
    { name: "Story", href: "/about" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
          isScrolled ? "py-3" : "py-6 px-4 md:px-0"
        )}
      >
        <div className="container-custom">
          <div
            className={cn(
              "flex items-center justify-between px-6 py-2 rounded-full transition-all duration-700 border border-transparent",
              isScrolled ? "glass-heavy border-white/20 shadow-2xl scale-[0.98] lg:scale-100" : "bg-transparent"
            )}
          >
            {/* Logo */}
            <Link href="/" className="text-xl lg:text-2xl font-bold tracking-tighter text-accent flex items-center shrink-0">
              BARRERA<span className="font-light text-muted-foreground ml-1 hidden sm:inline">Wallplate</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[11px] lg:text-xs font-bold tracking-widest uppercase text-accent/60 hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setCartOpen(true)}
                className="p-2 relative hover:bg-black/5 rounded-full transition-colors group"
              >
                <ShoppingCart size={18} className="text-accent group-hover:scale-110 transition-transform" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[9px] font-bold flex items-center justify-center rounded-full animate-fade-in">
                    {itemCount}
                  </span>
                )}
              </button>
              <Link href="/product">
                <Button size="sm" variant="primary" className="px-6 rounded-full font-bold tracking-tight h-9">
                  Shop Now
                </Button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-3">
              <button onClick={() => setCartOpen(true)} className="p-2 relative bg-accent/5 rounded-full">
                <ShoppingCart size={18} className="text-accent" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[8px] font-bold flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-accent/5 rounded-full transition-colors active:scale-95">
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="md:hidden glass-heavy border border-white/20 mt-4 mx-6 rounded-3xl overflow-hidden shadow-2xl p-8"
            >
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl font-bold text-accent tracking-tighter"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="pt-6 border-t border-accent/5">
                  <Link href="/product" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-14 rounded-2xl text-lg font-bold">Shop Aura Series</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
