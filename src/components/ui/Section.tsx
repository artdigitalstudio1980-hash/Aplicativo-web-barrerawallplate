import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export function Section({ children, className, id, padding = "lg" }: SectionProps) {
  const paddings = {
    none: "py-0",
    sm: "py-16 md:py-20",
    md: "py-24 md:py-28",
    lg: "py-32 md:py-40",
    xl: "py-48 md:py-56",
  };

  return (
    <section id={id} className={cn("container mx-auto px-6", paddings[padding], className)}>
      {children}
    </section>
  );
}
