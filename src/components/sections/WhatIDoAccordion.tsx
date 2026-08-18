"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SKILL_CATEGORIES } from "@/data/skills";
import { accordionContent } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

function FlowNode({ label, index, reducedMotion }: { label: string; index: number; reducedMotion: boolean }) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      className="rounded-lg border border-white/12 bg-background/40 px-3 py-2"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-secondary">{label}</p>
    </motion.div>
  );
}

function VerticalConnector({ reducedMotion, index }: { reducedMotion: boolean; index: number }) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.06 }}
      className="relative mx-auto h-4 w-px origin-top bg-accent/28"
      aria-hidden="true"
    >
      {!reducedMotion && (
        <motion.span
          className="absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
          animate={{ y: [0, 16], opacity: [0, 1, 0] }}
          transition={{ duration: 2.8, ease: "linear", repeat: Number.POSITIVE_INFINITY, delay: index * 0.22 }}
        />
      )}
    </motion.div>
  );
}

function HorizontalConnector({ reducedMotion, index }: { reducedMotion: boolean; index: number }) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.06 }}
      className="relative hidden h-px w-7 origin-left bg-accent/28 md:block"
      aria-hidden="true"
    >
      {!reducedMotion && (
        <motion.span
          className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-accent"
          animate={{ x: [0, 28], opacity: [0, 1, 0] }}
          transition={{ duration: 2.8, ease: "linear", repeat: Number.POSITIVE_INFINITY, delay: index * 0.22 }}
        />
      )}
    </motion.div>
  );
}

export function WhatIDoAccordion() {
  const [openId, setOpenId] = useState<string>(SKILL_CATEGORIES[0]?.id ?? "");
  const prefersReducedMotion = useReducedMotion();
  const panelVariants = prefersReducedMotion
    ? {
        collapsed: { height: 0, opacity: 1 },
        expanded: { height: "auto", opacity: 1, transition: { duration: 0 } },
      }
    : accordionContent;

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
              const flow = category.flow ?? [];
              const isHorizontal = category.flowDirection === "horizontal";

              return (
                <div key={category.id} className={cn("glow-border rounded-2xl bg-surface", isOpen && "border-accent/40") }>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId((prev) => (prev === category.id ? "" : category.id))}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none"
                    >
                      <span className="flex items-center gap-3">
                        <span className="type-h3 text-fg">{category.title}</span>
                        {isOpen && (
                          <span className="hidden rounded-full border border-accent/35 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent sm:inline-flex">
                            Active
                          </span>
                        )}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
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
                        variants={panelVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="overflow-hidden"
                      >
                        <motion.div
                          key={category.id}
                          initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
                          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="border-t border-border px-5 py-4"
                        >
                          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6">
                            <div>
                              <p className="type-body text-fg-muted">{category.description}</p>

                              <motion.div
                                initial={prefersReducedMotion ? false : "hidden"}
                                animate={prefersReducedMotion ? "visible" : "visible"}
                                variants={{
                                  hidden: {},
                                  visible: {
                                    transition: {
                                      staggerChildren: prefersReducedMotion ? 0 : 0.05,
                                      delayChildren: prefersReducedMotion ? 0 : 0.1,
                                    },
                                  },
                                }}
                                className="mt-4 flex flex-wrap gap-2"
                              >
                                {(category.tags ?? []).map((tag) => (
                                  <motion.span
                                    key={`${category.id}-${tag}`}
                                    variants={{
                                      hidden: { opacity: 0, y: 4 },
                                      visible: { opacity: 1, y: 0 },
                                    }}
                                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                    className="rounded-full border border-accent/25 bg-background/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-fg-secondary"
                                  >
                                    {tag}
                                  </motion.span>
                                ))}
                              </motion.div>

                              <div className="mt-4 inline-flex items-center gap-3 rounded-lg border border-white/10 bg-background/35 px-3 py-2">
                                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">System Mode</span>
                                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">{category.mode}</span>
                              </div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-background/25 p-4">
                              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">System Flow</p>

                              {isHorizontal ? (
                                <>
                                  <div className="mt-3 space-y-2 md:hidden">
                                    {flow.map((node, index) => (
                                      <div key={`${category.id}-${node}-mobile`}>
                                        <FlowNode label={node} index={index} reducedMotion={prefersReducedMotion} />
                                        {index < flow.length - 1 && (
                                          <VerticalConnector reducedMotion={prefersReducedMotion} index={index} />
                                        )}
                                      </div>
                                    ))}
                                  </div>

                                  <div className="mt-3 hidden flex-wrap items-center gap-2 md:flex">
                                    {flow.map((node, index) => (
                                      <div key={`${category.id}-${node}-desktop`} className="flex items-center gap-2">
                                        <FlowNode label={node} index={index} reducedMotion={prefersReducedMotion} />
                                        {index < flow.length - 1 && (
                                          <HorizontalConnector reducedMotion={prefersReducedMotion} index={index} />
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <div className="mt-3 space-y-2">
                                  {flow.map((node, index) => (
                                    <div key={`${category.id}-${node}`}>
                                      <FlowNode label={node} index={index} reducedMotion={prefersReducedMotion} />
                                      {index < flow.length - 1 && (
                                        <VerticalConnector reducedMotion={prefersReducedMotion} index={index} />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
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
