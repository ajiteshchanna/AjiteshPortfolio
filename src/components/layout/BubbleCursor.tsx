"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CursorKind = "default" | "interactive" | "media";

const POSITION_LERP = 0.2;
const DEFAULT_SIZE = 18;

export function BubbleCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [kind, setKind] = useState<CursorKind>("default");
  const [pressed, setPressed] = useState(false);

  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const visibleRef = useRef(false);
  const kindRef = useRef<CursorKind>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rawScale = useMotionValue(1);

  const scale = useSpring(rawScale, {
    stiffness: prefersReducedMotion ? 300 : 260,
    damping: prefersReducedMotion ? 30 : 26,
    mass: 0.55,
  });

  const opacity = useSpring(
    visible
      ? kind === "interactive"
        ? 1
        : kind === "media"
          ? 0.98
          : 0.92
      : 0,
    {
      stiffness: 260,
      damping: 28,
      mass: 0.7,
    }
  );

  const bubbleStyles = useMemo(() => {
    if (kind === "interactive") {
      return {
        moon: "bg-accent-hover/95 border border-accent/70",
        cutout: "bg-[#0a0a0a]/95",
        glow: "drop-shadow-[0_0_8px_rgba(251,191,36,0.4)] drop-shadow-[0_0_18px_rgba(245,158,11,0.22)]",
      };
    }

    if (kind === "media") {
      return {
        moon: "bg-accent/88 border border-accent/65",
        cutout: "bg-[#0a0a0a]/95",
        glow: "drop-shadow-[0_0_7px_rgba(251,191,36,0.32)] drop-shadow-[0_0_14px_rgba(245,158,11,0.18)]",
      };
    }

    return {
      moon: "bg-white/90 border border-white/70",
      cutout: "bg-[#0a0a0a]/94",
      glow: "drop-shadow-[0_0_7px_rgba(255,255,255,0.28)]",
    };
  }, [kind]);

  useEffect(() => {
    const primaryFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const anyFinePointer = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");

    const updateEnabled = () => {
      setEnabled(primaryFinePointer.matches || anyFinePointer.matches);
    };

    updateEnabled();
    primaryFinePointer.addEventListener("change", updateEnabled);
    anyFinePointer.addEventListener("change", updateEnabled);

    return () => {
      primaryFinePointer.removeEventListener("change", updateEnabled);
      anyFinePointer.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const resolveKind = (target: EventTarget | null): CursorKind => {
      const element = target instanceof HTMLElement ? target : null;
      if (!element) {
        return "default";
      }

      if (element.closest("a, button, input, textarea, select, label, [role='button'], [data-cursor='interactive'], article.glow-border")) {
        return "interactive";
      }

      if (element.closest("[data-cursor='media'], article.glow-border, img")) {
        return "media";
      }

      return "default";
    };

    const onMouseMove = (event: MouseEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
      if (!visibleRef.current) {
        currentRef.current.x = event.clientX;
        currentRef.current.y = event.clientY;
        visibleRef.current = true;
        setVisible(true);
      }

      const nextKind = resolveKind(event.target);
      if (kindRef.current !== nextKind) {
        kindRef.current = nextKind;
        setKind(nextKind);
      }
    };

    const onMouseLeaveViewport = () => {
      visibleRef.current = false;
      setVisible(false);
      kindRef.current = "default";
      setKind("default");
    };

    const onMouseDown = () => setPressed(true);
    const onMouseUp = () => setPressed(false);
    const onMouseOut = (event: MouseEvent) => {
      const related = event.relatedTarget as Node | null;
      if (!related) {
        onMouseLeaveViewport();
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseout", onMouseOut);
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    const loop = () => {
      const targetX = targetRef.current.x;
      const targetY = targetRef.current.y;

      if (prefersReducedMotion) {
        currentRef.current.x = targetX;
        currentRef.current.y = targetY;
      } else {
        currentRef.current.x += (targetX - currentRef.current.x) * POSITION_LERP;
        currentRef.current.y += (targetY - currentRef.current.y) * POSITION_LERP;
      }

      x.set(currentRef.current.x - DEFAULT_SIZE / 2);
      y.set(currentRef.current.y - DEFAULT_SIZE / 2);
      frameRef.current = window.requestAnimationFrame(loop);
    };

    frameRef.current = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [enabled, prefersReducedMotion, x, y]);

  useEffect(() => {
    if (enabled && visible) {
      document.documentElement.classList.add("cursor-bubble-active");
      return;
    }

    document.documentElement.classList.remove("cursor-bubble-active");
  }, [enabled, visible]);

  useEffect(() => {
    const baseScale = kind === "interactive" ? 1.2 : kind === "media" ? 1.14 : 1;
    rawScale.set(pressed ? baseScale * 0.9 : baseScale);
  }, [kind, pressed, rawScale]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x, y, opacity, scale }}
    >
      <div
        className={`relative h-[20px] w-[20px] transition-[filter] duration-200 ${bubbleStyles.glow}`}
      >
        <span className={`absolute inset-0 rounded-full transition-[background-color,border-color] duration-200 ${bubbleStyles.moon}`} />
        <span className={`absolute left-[8px] top-[3px] h-[14px] w-[14px] rounded-full transition-colors duration-200 ${bubbleStyles.cutout}`} />
      </div>
    </motion.div>
  );
}
