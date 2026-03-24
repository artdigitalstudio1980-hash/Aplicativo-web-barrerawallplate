import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export function Section({ children, className, id, padding = "md" }: SectionProps) {
  const paddings = {
    none: "py-0",
    sm: "py-12 md:py-16",
    md: "py-20 md:py-24",
    lg: "py-28 md:py-32",
    xl: "py-40 md:py-48",
  };

  return (
    <section id={id} className={cn("container mx-auto px-6", paddings[padding], className)}>
      {children}
    </section>
  );
}
