"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SnakeBorderIndicatorProps = {
  mode: "active" | "hover";
  visible: boolean;
  reducedMotion: boolean;
  durationSeconds?: number;
  cornerRadius?: number;
  className?: string;
};

export function SnakeBorderIndicator({
  mode,
  visible,
  reducedMotion,
  durationSeconds,
  cornerRadius = 10,
  className,
}: SnakeBorderIndicatorProps) {
  const glowId = useId();
  const isActive = mode === "active";

  const snakeStroke = isActive ? "rgba(32,120,207,0.98)" : "rgba(255,255,255,0.95)";
  const snakeGlow = isActive ? "rgba(32,120,207,0.62)" : "rgba(255,255,255,0.34)";
  const snakeDashArray = isActive ? "11 89" : "2.2 1.8 2.2 1.8 2.2 89.8";

  const shouldAnimate = visible && !reducedMotion;
  const runtime = durationSeconds ?? (isActive ? 3.7 : 4.4);

  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      <svg className="h-full w-full" viewBox="0 0 100 36" preserveAspectRatio="none">
        <defs>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.25" result="blur" />
          </filter>
        </defs>

        {visible && (
          <>
            <motion.rect
              x="0.75"
              y="0.75"
              width="98.5"
              height="34.5"
              rx={cornerRadius}
              fill="none"
              pathLength={100}
              stroke={snakeGlow}
              strokeWidth={isActive ? 2.3 : 1.8}
              strokeLinecap="round"
              strokeDasharray={snakeDashArray}
              filter={`url(#${glowId})`}
              initial={false}
              animate={shouldAnimate ? { strokeDashoffset: [0, -100] } : { strokeDashoffset: 0 }}
              transition={
                shouldAnimate
                  ? { duration: runtime, ease: "linear", repeat: Number.POSITIVE_INFINITY }
                  : { duration: 0 }
              }
            />

            <motion.rect
              x="0.75"
              y="0.75"
              width="98.5"
              height="34.5"
              rx={cornerRadius}
              fill="none"
              pathLength={100}
              stroke={snakeStroke}
              strokeWidth={isActive ? 1.45 : 1.15}
              strokeLinecap="round"
              strokeDasharray={snakeDashArray}
              strokeDashoffset={0}
              initial={false}
              animate={shouldAnimate ? { strokeDashoffset: [0, -100] } : { strokeDashoffset: 0 }}
              transition={
                shouldAnimate
                  ? { duration: runtime, ease: "linear", repeat: Number.POSITIVE_INFINITY }
                  : { duration: 0 }
              }
            />
          </>
        )}
      </svg>
    </span>
  );
}
