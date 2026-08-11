"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { reducedFadeInUp, timelineCard, timelineNode } from "@/lib/animations";
import type { ExperienceItem } from "@/types";
import { ExperienceCard } from "./ExperienceCard";

interface ExperienceTimelineProps {
  items: ExperienceItem[];
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-gap" aria-labelledby="experience-timeline-heading">
      <div className="container-page">
        <SectionHeading
          number="Experience"
          title="Impact Timeline"
          subtitle="A concise view of hands-on engineering contexts, responsibilities, and outcomes."
          className="mb-7"
        />

        <ol className="relative space-y-8 border-l border-border pl-6 sm:pl-8">
          {items.map((item) => (
            <li key={item.id} className="relative">
              <motion.span
                variants={prefersReducedMotion ? reducedFadeInUp : timelineNode}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="absolute -left-[1.95rem] top-3 h-3 w-3 rounded-full border border-accent/80 bg-background sm:-left-[2.45rem]"
                aria-hidden="true"
              />

              <motion.div
                variants={prefersReducedMotion ? reducedFadeInUp : timelineCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                <ExperienceCard item={item} />
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
