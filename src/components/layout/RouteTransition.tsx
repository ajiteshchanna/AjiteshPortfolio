"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { pageTransition, reducedFadeInUp } from "@/lib/animations";

interface RouteTransitionProps {
  children: ReactNode;
}

export function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={prefersReducedMotion ? "hidden" : { opacity: 0, y: 8 }}
        animate={prefersReducedMotion ? "visible" : { opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? "hidden" : { opacity: 0, y: -6 }}
        variants={prefersReducedMotion ? reducedFadeInUp : undefined}
        transition={pageTransition}
        className="flex flex-1 flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
