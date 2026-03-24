"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "The System", href: "/design-system" },
    { name: "Shop", href: "/product" },
    { name: "Story", href: "/about" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6",
          isScrolled ? "py-4" : "py-6"
        )}
      >
        <div className="container mx-auto px-6">
          <div
            className={cn(
              "flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500",
              isScrolled ? "glass shadow-lg" : "bg-transparent"
            )}
          >
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold tracking-tighter text-accent">
              BARRERA<span className="font-light text-muted-foreground ml-1">Wallplate</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-accent/70 hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 relative hover:bg-accent/5 rounded-full transition-colors"
              >
                <ShoppingCart size={20} className="text-accent" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-white text-[10px] flex items-center justify-center rounded-full">
                  1
                </span>
              </button>
              <Button size="sm" variant="primary">
                Upgrade Now
              </Button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setIsCartOpen(true)} className="p-2">
                <ShoppingCart size={20} className="text-accent" />
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-white/20 mt-2 mx-6 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-accent py-2 border-b border-accent/5"
                  >
                    {link.name}
                  </Link>
                ))}
                <Button className="mt-4 w-full">Upgrade Now</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
