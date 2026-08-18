"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { reducedFadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { ExperienceItem } from "@/types";
import { ExperienceCard } from "./ExperienceCard";

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const progressRatio = useMemo(() => {
    if (items.length <= 1) {
      return 1;
    }

    const normalizedIndex = prefersReducedMotion ? items.length - 1 : activeIndex;
    return normalizedIndex / (items.length - 1);
  }, [activeIndex, items.length, prefersReducedMotion]);

  const yearLabel = (duration: string, index: number) => {
    const yearMatch = duration.match(/\b\d{4}\b/);
    if (yearMatch) {
      return yearMatch[0];
    }

    if (index === items.length - 1) {
      return "NOW";
    }

    return "YEAR";
  };

  return (
    <section className="section-gap" aria-labelledby="experience-timeline-heading">
      <div className="container-page">
        <p id="experience-timeline-heading" className="type-label text-fg-subtle mb-7">
          Experience Timeline
        </p>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/80 px-4 py-6 sm:px-6 sm:py-7">
          <span aria-hidden="true" className="absolute bottom-8 left-16 top-8 w-px bg-white/14 sm:left-[6.25rem]" />
          <motion.span
            aria-hidden="true"
            className="absolute left-16 top-8 w-px bg-accent sm:left-[6.25rem]"
            initial={prefersReducedMotion ? false : { height: 0 }}
            animate={{ height: `${Math.max(progressRatio * 100, 2)}%` }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          />

          <ol className="space-y-6 sm:space-y-7">
            {items.map((item, index) => {
              const isActive = prefersReducedMotion ? index === items.length - 1 : index === activeIndex;
              const isPast = prefersReducedMotion ? true : index < activeIndex;

              return (
                <motion.li
                  key={item.id}
                  className="relative grid grid-cols-[3rem_1.25rem_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[4.5rem_1.5rem_minmax(0,1fr)] sm:gap-4"
                  variants={reducedFadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.58 }}
                  onViewportEnter={() => {
                    if (!prefersReducedMotion) {
                      setActiveIndex(index);
                    }
                  }}
                >
                  <p
                    className={cn(
                      "pt-1 text-right font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200",
                      isActive ? "text-accent" : isPast ? "text-fg-secondary" : "text-fg-subtle",
                    )}
                  >
                    {yearLabel(item.duration, index)}
                  </p>

                  <div className="relative flex justify-center pt-2">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative z-10 h-2.5 w-2.5 rounded-full border border-white/20 bg-white/12 transition-colors duration-200",
                        isPast && "border-accent/45 bg-accent/35",
                        isActive && "border-accent bg-accent",
                      )}
                    />
                    {isActive && !prefersReducedMotion && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute top-[0.38rem] z-0 h-2.5 w-2.5 rounded-full border border-accent/50"
                        animate={{ scale: [1, 1.85, 2.15], opacity: [0.55, 0.25, 0] }}
                        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], repeat: Number.POSITIVE_INFINITY }}
                      />
                    )}
                  </div>

                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? { opacity: 1, y: 0 }
                        : {
                            opacity: isActive ? 1 : isPast ? 0.84 : 0.64,
                            y: isActive ? 0 : 3,
                          }
                    }
                    transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ExperienceCard item={item} isActive={isActive} isPast={isPast} />
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
