import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "glass";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-accent text-white hover:bg-zinc-800",
      secondary: "bg-muted text-accent hover:bg-zinc-200",
      outline: "border-2 border-accent text-accent hover:bg-accent hover:text-white",
      glass: "glass text-accent hover:bg-white/40",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-8 py-3 text-base font-medium",
      lg: "px-10 py-4 text-lg font-semibold",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "rounded-full transition-all duration-300 flex items-center justify-center gap-2",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
