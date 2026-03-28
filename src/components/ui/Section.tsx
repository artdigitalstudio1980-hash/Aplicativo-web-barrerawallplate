import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  container?: boolean;
}

export function Section({ 
  children, 
  className, 
  id, 
  padding = "lg",
  container = true 
}: SectionProps) {
  const paddings = {
    none: "py-0",
    xs: "py-12 md:py-16",
    sm: "py-16 md:py-24",
    md: "py-24 md:py-32",
    lg: "py-32 md:py-48",
    xl: "py-48 md:py-64",
  };

  return (
    <section id={id} className={cn(paddings[padding], className)}>
      <div className={cn(container ? "container-custom" : "w-full")}>
        {children}
      </div>
    </section>
  );
}
