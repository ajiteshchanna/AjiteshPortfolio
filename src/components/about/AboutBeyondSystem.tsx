"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeInUp, reducedFadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { ABOUT_BEYOND_SYSTEM } from "@/data/about";

export function AboutBeyondSystem() {
  const prefersReducedMotion = useReducedMotion();
  const revealVariant = prefersReducedMotion ? reducedFadeInUp : fadeInUp;

  return (
    <section className="section-gap" aria-labelledby="about-beyond-system-heading">
      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.08, 0)}
        >
          <motion.p variants={revealVariant} className="type-label text-accent">
            {ABOUT_BEYOND_SYSTEM.eyebrow}
          </motion.p>
          <motion.span
            variants={revealVariant}
            aria-hidden="true"
            className="mt-3 block h-px w-10 bg-accent"
          />
          <motion.h2
            id="about-beyond-system-heading"
            variants={revealVariant}
            className="mt-4 max-w-3xl type-h2 text-fg"
          >
            {ABOUT_BEYOND_SYSTEM.title}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.14 }}
          variants={staggerContainer(0.1, 0.08)}
          className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {ABOUT_BEYOND_SYSTEM.items.map((item) => {
            const isLearning = item.category === "LEARNING";

            return (
              <motion.article
                key={item.category}
                variants={revealVariant}
                data-cursor-glow="true"
                className="group cursor-glow-surface cursor-glow-soft rounded-2xl border border-border bg-surface p-6 transition-[border-color,background-color] duration-250 hover:border-accent/45 hover:bg-surface-high"
              >
                <span aria-hidden="true" className="cursor-glow-layer" />

                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent/90">
                    {item.number} / {item.category}
                  </p>
                  <span
                    aria-hidden="true"
                    className="block h-px w-7 origin-left bg-accent/65 transition-[width,opacity] duration-250 group-hover:w-11 group-hover:opacity-100"
                  />
                </div>

                <div className={cn("mt-5 transition-transform duration-250 group-hover:-translate-y-0.5", isLearning ? "space-y-4" : "space-y-5")}>
                  {item.entries.map((entry) => (
                    <div key={`${item.category}-${entry.title}-${entry.subtitle ?? ""}`}>
                      <p className={cn("text-fg", isLearning ? "text-sm font-medium" : "type-h3")}>
                        {entry.title}
                      </p>

                      {entry.label && (
                        <p className="mt-2 inline-flex rounded-full border border-accent/35 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                          {entry.label}
                        </p>
                      )}

                      {entry.subtitle && (
                        <p className="mt-1.5 type-body text-fg-secondary">{entry.subtitle}</p>
                      )}

                      {entry.description && (
                        <p className="mt-3 type-body text-fg-muted">{entry.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}