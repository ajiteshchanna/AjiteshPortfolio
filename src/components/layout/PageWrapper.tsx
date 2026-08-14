import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: ReactNode;
  /** Extra Tailwind classes for layout overrides if needed per-page. */
  className?: string;
}

/**
 * Wraps page content with consistent top offset for the fixed navbar
 * and flex-1 to push the footer to the bottom.
 */
export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={cn("flex-1 pt-[5rem] sm:pt-[5.5rem]", className)}>
      {children}
    </div>
  );
}
