"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { textReveal, textRevealChild } from "@/lib/animations";

type AnimatedTextProps = {
  text: string;
  as?: "p" | "span";
  className?: string;
};

export function AnimatedText({ text, as = "p", className }: AnimatedTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.trim().split(/\s+/);

  if (prefersReducedMotion) {
    const StaticTag = as as keyof React.JSX.IntrinsicElements;
    return <StaticTag className={className}>{text}</StaticTag>;
  }

  const Tag = as === "span" ? motion.span : motion.p;

  return (
    <Tag
      className={className}
      variants={textReveal}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={textRevealChild}
          className="inline-block pr-[0.32em]"
          aria-hidden="true"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
