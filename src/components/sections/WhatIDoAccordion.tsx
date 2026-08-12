"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SKILL_CATEGORIES } from "@/data/skills";
import { accordionContent } from "@/lib/animations";

export function WhatIDoAccordion() {
  const [openId, setOpenId] = useState<string>(SKILL_CATEGORIES[0]?.id ?? "");

  return (
    <section className="section-gap" aria-labelledby="what-i-do-heading">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            number="01"
            title="What I Do"
            subtitle="From AI pipelines to polished interfaces, I work at the intersection of systems thinking and creative execution."
            className="mb-7"
          />

          <div className="space-y-3">
            {SKILL_CATEGORIES.map((category) => {
              const isOpen = openId === category.id;
              const panelId = `${category.id}-panel`;

              return (
                <div key={category.id} className="glow-border rounded-2xl bg-surface">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId((prev) => (prev === category.id ? "" : category.id))}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="type-h3 text-fg">{category.title}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-fg-muted"
                      >
                        <ChevronDown size={18} aria-hidden="true" />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-label={category.title}
                        variants={accordionContent}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="overflow-hidden"
                      >
                        <ul className="space-y-3 border-t border-border px-5 py-4">
                          {category.items.map((item) => (
                            <li key={item} className="type-body text-fg-muted">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
