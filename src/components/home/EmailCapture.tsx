"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmailCaptureProps {
  delay?: number;
}

export function EmailCapture({ delay = 20000 }: EmailCaptureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if already submitted
    if (typeof window !== "undefined" && localStorage.getItem("barrera_newsletter")) {
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem("barrera_newsletter", "true");
      setIsSubmitted(true);
      setTimeout(() => setIsOpen(false), 2000);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("barrera_newsletter", "true");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md z-50"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header Image */}
              <div className="h-32 bg-gradient-to-br from-accent to-zinc-800 relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={18} className="text-white" />
                </button>
                <div className="absolute bottom-6 left-6">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
                    Exclusive Offer
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="text-5xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold text-accent mb-2">You&apos;re In!</h3>
                    <p className="text-muted-foreground">
                      Check your inbox for your 15% off code.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-accent mb-2">
                      Get 15% Off Your First Order
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Join 12,000+ design-conscious homeowners who demand better details.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-muted/30 border border-muted focus:border-accent outline-none px-5 py-4 rounded-xl transition-colors"
                        required
                      />
                      <Button type="submit" className="w-full h-14 text-base">
                        Claim My Discount
                      </Button>
                    </form>

                    <p className="text-[10px] text-center text-muted-foreground mt-4">
                      No spam. Unsubscribe anytime.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
