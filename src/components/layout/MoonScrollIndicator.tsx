"use client";

import { type PointerEvent as ReactPointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TRACK_TOP = 104;
const TRACK_BOTTOM = 24;
const DEFAULT_MOON_SIZE = 16;
const BASE_SHADOW =
  "0 0 0 1px rgba(255,255,255,0.92), 0 0 10px -2px rgba(125,211,252,0.32), 0 0 18px -6px rgba(191,219,254,0.28)";
const HOVER_SHADOW =
  "0 0 0 1px rgba(255,255,255,0.98), 0 0 14px -1px rgba(96,165,250,0.5), 0 0 24px -4px rgba(191,219,254,0.42)";
const DRAG_SHADOW =
  "0 0 0 1px rgba(255,255,255,1), 0 0 18px -1px rgba(59,130,246,0.62), 0 0 28px -5px rgba(147,197,253,0.5)";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function MoonScrollIndicator() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [moonSize, setMoonSize] = useState(DEFAULT_MOON_SIZE);
  const moonRef = useRef<HTMLButtonElement | null>(null);
  const activePointerIdRef = useRef<number | null>(null);

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

  useEffect(() => {
    const moonElement = moonRef.current;

    if (!moonElement) {
      return;
    }

    const updateMoonSize = () => setMoonSize(moonElement.getBoundingClientRect().height || DEFAULT_MOON_SIZE);

    updateMoonSize();

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const resizeObserver = new ResizeObserver(updateMoonSize);
    resizeObserver.observe(moonElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const availableTravel = useMemo(
    () => Math.max(viewportHeight - TRACK_TOP - TRACK_BOTTOM - moonSize, 0),
    [moonSize, viewportHeight],
  );

  const directY = useTransform(scrollYProgress, [0, 1], [0, availableTravel]);
  const smoothY = useSpring(directY, {
    stiffness: 180,
    damping: 28,
    mass: 0.32,
  });

  useEffect(() => {
    return () => {
      document.body.style.removeProperty("user-select");
      document.body.style.removeProperty("cursor");
    };
  }, []);

  const syncScrollToPointer = (clientY: number) => {
    const trackStart = TRACK_TOP + moonSize / 2;
    const progress = availableTravel === 0 ? 0 : clamp((clientY - trackStart) / availableTravel, 0, 1);
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);

    window.scrollTo({ top: progress * maxScroll, behavior: "auto" });
  };

  const endDrag = (pointerId?: number) => {
    if (pointerId !== undefined && activePointerIdRef.current !== pointerId) {
      return;
    }

    if (activePointerIdRef.current !== null && moonRef.current?.hasPointerCapture(activePointerIdRef.current)) {
      moonRef.current.releasePointerCapture(activePointerIdRef.current);
    }

    activePointerIdRef.current = null;
    setIsDragging(false);
    document.body.style.removeProperty("user-select");
    document.body.style.removeProperty("cursor");
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch" || event.button !== 0 || availableTravel === 0) {
      return;
    }

    activePointerIdRef.current = event.pointerId;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    document.body.style.setProperty("user-select", "none");
    document.body.style.setProperty("cursor", "grabbing");
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (activePointerIdRef.current !== event.pointerId) {
      return;
    }

    event.preventDefault();
    syncScrollToPointer(event.clientY);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    endDrag(event.pointerId);
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLButtonElement>) => {
    endDrag(event.pointerId);
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-3 top-[104px] bottom-6 z-[58] sm:right-4"
    >
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-white/0 via-white/8 to-white/0" />

      <motion.button
        ref={moonRef}
        type="button"
        tabIndex={-1}
        data-scroll-indicator="moon"
        className={`pointer-events-auto absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-[#fffdf6] sm:h-[18px] sm:w-[18px] ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ y: prefersReducedMotion || isDragging ? directY : smoothY, boxShadow: BASE_SHADOW }}
        animate={{
          scale: isDragging ? 1.15 : 1,
          boxShadow: isDragging ? DRAG_SHADOW : BASE_SHADOW,
        }}
        whileHover={isDragging ? undefined : { scale: 1.1, boxShadow: HOVER_SHADOW }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onLostPointerCapture={() => endDrag()}
      />
    </div>
  );
}
