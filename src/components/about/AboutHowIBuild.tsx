"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const BUILD_STEPS = [
  {
    title: "Understand",
    description: "Understand the problem before choosing the technology.",
  },
  {
    title: "Model",
    description: "Translate the problem into a system that can be reasoned about.",
  },
  {
    title: "Build",
    description: "Turn the architecture into working software.",
  },
  {
    title: "Test",
    description: "Validate behavior instead of assuming correctness.",
  },
  {
    title: "Break",
    description: "Find where the system fails.",
  },
  {
    title: "Iterate",
    description: "Refine based on evidence.",
  },
  {
    title: "Ship",
    description: "Turn the solution into something usable.",
  },
] as const;

export function AboutHowIBuild() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const progressRatio = useMemo(() => {
    if (BUILD_STEPS.length <= 1) {
      return 1;
    }

    const normalizedIndex = prefersReducedMotion ? BUILD_STEPS.length - 1 : activeIndex;
    return normalizedIndex / (BUILD_STEPS.length - 1);
  }, [activeIndex, prefersReducedMotion]);

  return (
    <section className="section-gap" aria-labelledby="how-i-build-heading">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="type-label text-accent">About</p>
          <h2 id="how-i-build-heading" className="mt-4 type-h2 text-fg">How I Build</h2>
          <p className="mt-4 type-body text-fg-secondary">
            A signal-driven engineering workflow that starts with problem clarity and ends with reliable delivery.
          </p>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-surface/80 px-4 py-6 sm:px-6 sm:py-7">
          <span aria-hidden="true" className="absolute bottom-7 left-6 top-7 w-px bg-white/14 sm:left-8" />
          <motion.span
            aria-hidden="true"
            className="absolute left-6 top-7 w-px bg-accent sm:left-8"
            initial={prefersReducedMotion ? false : { height: 0 }}
            animate={{ height: `${Math.max(progressRatio * 100, 2)}%` }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />

          <ol className="space-y-4 sm:space-y-5">
            {BUILD_STEPS.map((step, index) => {
              const isActive = prefersReducedMotion ? index === BUILD_STEPS.length - 1 : index === activeIndex;
              const isPast = prefersReducedMotion ? true : index < activeIndex;

              return (
                <motion.li
                  key={step.title}
                  className="relative pl-9 sm:pl-11"
                  onViewportEnter={() => {
                    if (!prefersReducedMotion) {
                      setActiveIndex(index);
                    }
                  }}
                  viewport={{ amount: 0.72, once: false }}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-[19px] top-2 h-2 w-2 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 transition-all duration-200 sm:left-[27px]",
                      isPast && "border-accent/40 bg-accent/35",
                      isActive && "border-accent bg-accent",
                    )}
                  />

                  <motion.div
                    data-cursor-glow="true"
                    animate={
                      prefersReducedMotion
                        ? { opacity: 1, y: 0, scale: 1 }
                        : {
                            opacity: isActive ? 1 : isPast ? 0.86 : 0.62,
                            y: isActive ? -1 : 0,
                            scale: isActive ? 1.015 : 1,
                          }
                    }
                    transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="cursor-glow-surface cursor-glow-soft rounded-xl border border-white/10 bg-background/35 px-3 py-3 sm:px-4"
                  >
                    <span aria-hidden="true" className="cursor-glow-layer" />
                    <p className={cn(
                      "font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200",
                      isActive ? "text-fg" : isPast ? "text-fg-secondary" : "text-fg-subtle",
                    )}
                    >
                      {step.title}
                    </p>
                    <p className={cn(
                      "mt-1 text-sm leading-relaxed transition-colors duration-200",
                      isActive ? "text-fg-secondary" : "text-fg-subtle",
                    )}
                    >
                      {step.description}
                    </p>
                  </motion.div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
