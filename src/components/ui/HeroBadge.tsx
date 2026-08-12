"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface HeroBadgeProps {
  /** Text displayed around the circular path. Defaults to the design spec. */
  label?: string;
  /** Extra classes on the outermost element. */
  className?: string;
}

/**
 * Circular premium badge with rotating text ring and a center emblem.
 * Inspired by the "BUILDING SOLUTIONS THAT MATTER" reference design.
 *
 * To change the badge text, pass the `label` prop or update BADGE_TEXT below.
 */
const BADGE_TEXT = "BUILDING SOLUTIONS THAT MATTER • AI ENGINEER •";

export function HeroBadge({ label = BADGE_TEXT, className }: HeroBadgeProps) {
  const prefersReducedMotion = useReducedMotion();

  // SVG circular text path
  const r = 44;          // text radius
  const cx = 56;         // viewBox center
  const pathId = "badge-text-path";

  // Repeat text enough times to fill path
  const repeatedLabel = `${label} ${label} `;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center select-none",
        "h-[112px] w-[112px] sm:h-[128px] sm:w-[128px]",
        className,
      )}
      aria-label={label}
      role="img"
    >
      {/* Subtle glow backdrop */}
      <motion.div
        className="absolute inset-0 rounded-full bg-accent/8 blur-xl"
        animate={prefersReducedMotion ? undefined : { opacity: [0.55, 0.8, 0.55] }}
        transition={prefersReducedMotion ? undefined : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Outer concentric ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-accent/20"
        animate={prefersReducedMotion ? undefined : { rotate: -360 }}
        transition={prefersReducedMotion ? undefined : { duration: 34, ease: "linear", repeat: Infinity }}
        aria-hidden="true"
      />
      {/* Inner ring */}
      <motion.div
        className="absolute inset-[12px] rounded-full border border-accent/15"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.025, 1] }}
        transition={prefersReducedMotion ? undefined : { duration: 5.4, ease: "easeInOut", repeat: Infinity }}
        aria-hidden="true"
      />

      {/* Rotating SVG text ring */}
      <motion.svg
        viewBox="0 0 112 112"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 18, ease: "linear", repeat: Infinity }
        }
      >
        <defs>
          <path
            id={pathId}
            d={`M ${cx},${cx} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        <text
          fontSize="7.2"
          letterSpacing="1.8"
          fontWeight="500"
          fill="rgba(245,158,11,0.72)"
          fontFamily="var(--font-mono), monospace"
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {repeatedLabel}
          </textPath>
        </text>
      </motion.svg>

      {/* Center emblem — stable, non-rotating */}
      <motion.div
        className="relative z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-accent/35 bg-background shadow-[0_0_18px_-4px_rgba(245,158,11,0.35)]"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.04, 1], boxShadow: ["0 0 18px -4px rgba(245,158,11,0.3)", "0 0 22px -3px rgba(245,158,11,0.42)", "0 0 18px -4px rgba(245,158,11,0.3)"] }}
        transition={prefersReducedMotion ? undefined : { duration: 4, ease: "easeInOut", repeat: Infinity }}
        aria-hidden="true"
      >
        {/* Code-bracket / AI glyph */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          {/* Stylised </ > code-AI emblem */}
          <path
            d="M6.5 5.5 L3 9 L6.5 12.5"
            stroke="rgba(245,158,11,0.85)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.5 5.5 L15 9 L11.5 12.5"
            stroke="rgba(245,158,11,0.85)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="9"
            cy="9"
            r="1.25"
            fill="rgba(245,158,11,0.9)"
          />
        </svg>
      </motion.div>
    </div>
  );
}
