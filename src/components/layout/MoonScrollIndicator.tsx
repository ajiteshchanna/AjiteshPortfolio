"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TRACK_TOP = 104;
const TRACK_BOTTOM = 24;
const MOON_SIZE = 16;

export function MoonScrollIndicator() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const updateViewportHeight = () => setViewportHeight(window.innerHeight);

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight, { passive: true });
    window.visualViewport?.addEventListener("resize", updateViewportHeight);

    return () => {
      window.removeEventListener("resize", updateViewportHeight);
      window.visualViewport?.removeEventListener("resize", updateViewportHeight);
    };
  }, []);

  const availableTravel = useMemo(
    () => Math.max(viewportHeight - TRACK_TOP - TRACK_BOTTOM - MOON_SIZE, 0),
    [viewportHeight],
  );

  const directY = useTransform(scrollYProgress, [0, 1], [0, availableTravel]);
  const smoothY = useSpring(directY, {
    stiffness: 180,
    damping: 28,
    mass: 0.32,
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-3 top-[104px] bottom-6 z-[58] sm:right-4"
    >
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-white/0 via-white/8 to-white/0" />

      <motion.button
        type="button"
        tabIndex={-1}
        data-scroll-indicator="moon"
        className="pointer-events-auto absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-[#fffdf6] shadow-[0_0_0_1px_rgba(255,255,255,0.9),0_0_10px_-2px_rgba(245,158,11,0.38),0_0_18px_-6px_rgba(245,158,11,0.3)] sm:h-[18px] sm:w-[18px]"
        style={{ y: prefersReducedMotion ? directY : smoothY }}
        whileHover={{
          scale: 1.15,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.95), 0 0 14px -1px rgba(245,158,11,0.55), 0 0 22px -4px rgba(245,158,11,0.4)",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      />
    </div>
  );
}
