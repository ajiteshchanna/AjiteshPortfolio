"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { reducedSectionReveal, sectionReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
};

export function Reveal({ children, className, once = true, amount = 0.2 }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={prefersReducedMotion ? reducedSectionReveal : sectionReveal}
    >
      {children}
    </motion.div>
  );
}
