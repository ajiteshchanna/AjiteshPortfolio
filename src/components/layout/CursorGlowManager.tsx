"use client";

import { useEffect } from "react";

const GLOW_SELECTOR = "[data-cursor-glow='true']";

function setGlowPosition(element: HTMLElement, clientX: number, clientY: number) {
  const rect = element.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  element.style.setProperty("--cursor-glow-x", `${x}px`);
  element.style.setProperty("--cursor-glow-y", `${y}px`);
}

export function CursorGlowManager() {
  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let activeElement: HTMLElement | null = null;

    const canUseGlow = () => hoverQuery.matches && !reduceMotionQuery.matches;

    const deactivate = (element: HTMLElement | null) => {
      if (!element) {
        return;
      }

      element.removeAttribute("data-cursor-glow-active");
    };

    const activate = (element: HTMLElement | null, clientX: number, clientY: number) => {
      if (!element) {
        return;
      }

      element.setAttribute("data-cursor-glow-active", "true");
      setGlowPosition(element, clientX, clientY);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!canUseGlow() || event.pointerType !== "mouse") {
        deactivate(activeElement);
        activeElement = null;
        return;
      }

      const target = (event.target as HTMLElement | null)?.closest(GLOW_SELECTOR) as HTMLElement | null;

      if (target !== activeElement) {
        deactivate(activeElement);
        activeElement = target;
        activate(activeElement, event.clientX, event.clientY);
      }

      if (activeElement) {
        setGlowPosition(activeElement, event.clientX, event.clientY);
      }
    };

    const handlePointerLeaveWindow = () => {
      deactivate(activeElement);
      activeElement = null;
    };

    const handlePreferenceChange = () => {
      if (!canUseGlow()) {
        deactivate(activeElement);
        activeElement = null;
      }
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", handlePointerLeaveWindow);
    window.addEventListener("pointerleave", handlePointerLeaveWindow);
    hoverQuery.addEventListener("change", handlePreferenceChange);
    reduceMotionQuery.addEventListener("change", handlePreferenceChange);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handlePointerLeaveWindow);
      window.removeEventListener("pointerleave", handlePointerLeaveWindow);
      hoverQuery.removeEventListener("change", handlePreferenceChange);
      reduceMotionQuery.removeEventListener("change", handlePreferenceChange);
      deactivate(activeElement);
    };
  }, []);

  return null;
}
