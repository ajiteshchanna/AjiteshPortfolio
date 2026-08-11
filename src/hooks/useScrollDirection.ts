"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollDirection(threshold = 8): "up" | "down" {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateDirection = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;

      if (Math.abs(delta) < threshold) {
        return;
      }

      setDirection(delta > 0 ? "down" : "up");
      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", updateDirection, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateDirection);
    };
  }, [threshold]);

  return direction;
}
