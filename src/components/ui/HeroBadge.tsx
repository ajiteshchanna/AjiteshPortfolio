"use client";

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
      <div className="absolute inset-0 rounded-full bg-accent/8 blur-xl" aria-hidden="true" />

      <div
        className={cn(
          "absolute inset-0 origin-center",
          prefersReducedMotion ? "" : "hero-badge-outer-ring",
        )}
        aria-hidden="true"
      >
        {/* Outer concentric ring */}
        <div className="absolute inset-0 rounded-full border border-accent/20" aria-hidden="true" />

        {/* Inner ring */}
        <div className="absolute inset-[12px] rounded-full border border-accent/15" aria-hidden="true" />

        {/* Rotating SVG text ring */}
        <svg
          viewBox="0 0 112 112"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
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
        </svg>
        </div>

      {/* Center emblem — stable, non-rotating */}
        <div
        className="relative z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-accent/35 bg-background shadow-[0_0_18px_-4px_rgba(245,158,11,0.35)]"
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
      </div>
    </div>
  );
}
