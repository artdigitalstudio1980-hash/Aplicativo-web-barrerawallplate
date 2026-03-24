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
    { name: "Home", href: "/" },
    { name: "The System", href: "/design-system" },
    { name: "Shop", href: "/product" },
    { name: "Story", href: "/about" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 lg:py-6 px-4 lg:px-0",
          isScrolled ? "py-2 lg:py-4" : "py-4 lg:py-6"
        )}
      >
        <div className="container mx-auto">
          <div
            className={cn(
              "flex items-center justify-between px-4 lg:px-6 py-3 rounded-full transition-all duration-500",
              isScrolled ? "glass-heavy shadow-xl" : "bg-transparent"
            )}
          >
            <Link href="/" className="text-xl lg:text-2xl font-bold tracking-tighter text-accent flex items-center shrink-0">
              BARRERA<span className="font-light text-muted-foreground ml-1 hidden sm:inline">Wallplate</span>
            </Link>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs lg:text-sm font-medium text-accent/70 hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => setCartOpen(true)}
                className="p-2 relative hover:bg-accent/5 rounded-full transition-colors"
              >
                <ShoppingCart size={20} className="text-accent" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-white text-[10px] flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
              <Link href="/product">
                <Button size="sm" variant="primary" className="px-6">
                  Shop Now
                </Button>
              </Link>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button onClick={() => setCartOpen(true)} className="p-2 relative">
                <ShoppingCart size={20} className="text-accent" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-3 h-3 bg-accent text-white text-[8px] flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-accent/5 rounded-full">
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden glass-heavy border border-white/20 mt-3 mx-4 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="flex flex-col p-6 gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-bold text-accent tracking-tighter border-b border-accent/5 pb-2"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-4 pt-4">
                  <Link href="/product" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full h-14">Shop Aura Series</Button>
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
