"use client";

import { motion } from "framer-motion";
import { SYSTEM_DETAILS } from "@/data/systemDetails";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SystemDetailsPanelProps = {
  className?: string;
};

export function SystemDetailsPanel({ className }: SystemDetailsPanelProps) {
  const prefersReducedMotion = useReducedMotion();

  const baseValueClass = prefersReducedMotion
    ? "text-fg-secondary"
    : "text-fg-secondary transition-[color,opacity] duration-200 group-hover:text-fg group-hover:opacity-100";

  return (
    <motion.aside
      aria-label="System details"
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -2,
              borderColor: "rgba(223, 37, 49, 0.4)",
              boxShadow:
                "0 10px 26px -18px rgba(223, 37, 49, 0.5), inset 0 0 0 1px rgba(90, 11, 18, 0.2)",
            }
      }
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className={`group w-full max-w-[22rem] overflow-hidden rounded-xl border border-white/14 bg-background/68 px-3.5 py-3 backdrop-blur-[6px] ${className ?? ""}`}
    >
      <div className="mb-2 h-px w-10 bg-accent/55" aria-hidden="true" />

      <div className="grid gap-2">
        {SYSTEM_DETAILS.map((item) => {
          const isStatus = item.key === "status";

          return (
            <div key={item.key} className="flex items-center justify-between gap-3">
              <span className="type-label text-[10px] tracking-[0.09em] text-fg-subtle">
                {item.label}
              </span>

              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.08em]">
                {isStatus && (
                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-accent ${prefersReducedMotion ? "" : "animate-[pulse_3.6s_ease-in-out_infinite]"}`}
                    aria-hidden="true"
                  />
                )}
                <span className={isStatus ? "text-accent-hover transition-colors duration-200 group-hover:text-accent" : baseValueClass}>
                  {item.value}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </motion.aside>
  );
}
