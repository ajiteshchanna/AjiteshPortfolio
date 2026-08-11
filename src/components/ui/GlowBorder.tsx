"use client";

import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowBorderProps {
  children: ReactNode;
  className?: string;
  /** Additional rounding class, e.g. "rounded-3xl". Defaults to rounded-2xl. */
  rounded?: string;
  as?: ElementType;
}

/**
 * Thin amber animated-glow border.
 * Uses the `.glow-border` CSS class defined in globals.css.
 * Drop-in wrapper — replace a plain `<div className="rounded-2xl border ...">` with
 * `<GlowBorder>` to get the traveling highlight effect.
 */
export function GlowBorder({
  children,
  className,
  rounded = "rounded-2xl",
  as: Tag = "div",
}: GlowBorderProps) {
  return (
    <Tag className={cn("glow-border", rounded, className)}>
      {children}
    </Tag>
  );
}
