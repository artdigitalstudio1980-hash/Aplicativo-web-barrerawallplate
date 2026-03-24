"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 8000); // Show after 8 seconds

    return () => clearTimeout(timer);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-muted p-6 relative overflow-hidden">
          {/* Subtle gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent" />

          <button
            onClick={() => setIsDismissed(true)}
            className="absolute top-4 right-4 p-1 hover:bg-muted rounded-full transition-colors"
          >
            <X size={18} className="text-muted-foreground" />
          </button>

          <div className="flex items-start gap-4">
            <div className="hidden sm:block w-16 h-16 rounded-xl bg-accent/5 flex items-center justify-center shrink-0">
              <span className="text-2xl">✨</span>
            </div>

            <div className="flex-1 pr-8">
              <h4 className="font-bold text-accent mb-1">Upgrade Your Space Today</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Free express shipping on orders over $50. 30-day returns.
              </p>
              <Link href="/product">
                <Button size="sm" className="w-full sm:w-auto">
                  Shop Now
                  <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
