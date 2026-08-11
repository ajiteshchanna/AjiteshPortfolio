"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeInUp, reducedFadeInUp, staggerContainer } from "@/lib/animations";
import type { ResearchPipelineStep } from "@/data/research";

interface ResearchPipelineProps {
  steps: ResearchPipelineStep[];
}

export function ResearchPipeline({ steps }: ResearchPipelineProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-labelledby="research-pipeline-heading" className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
      <h2 id="research-pipeline-heading" className="type-h3 text-fg">
        Research Pipeline
      </h2>
      <p className="mt-3 type-body text-fg-muted">
        End-to-end flow from raw documents to evaluated answers, designed for private and constrained deployment settings.
      </p>

      <motion.ol
        className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
        variants={staggerContainer(0.06, 0)}
        initial={prefersReducedMotion ? undefined : "hidden"}
        whileInView={prefersReducedMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.2 }}
      >
        {steps.map((step, index) => (
          <motion.li
            key={step.id}
            variants={prefersReducedMotion ? reducedFadeInUp : fadeInUp}
            className="relative rounded-xl border border-border bg-background p-4"
          >
            <p className="type-label text-accent">Step {index + 1}</p>
            <h3 className="mt-2 type-h3 text-fg">{step.label}</h3>
            <p className="mt-2 type-caption text-fg-muted">{step.detail}</p>

            {index < steps.length - 1 && (
              <span
                className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-accent/70 xl:block"
                aria-hidden="true"
              >
                -&gt;
              </span>
            )}
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
