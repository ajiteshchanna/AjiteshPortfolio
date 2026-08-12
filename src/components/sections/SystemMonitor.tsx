"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GlowBorder } from "@/components/ui/GlowBorder";
import { Reveal } from "@/components/ui/Reveal";
import { SYSTEM_MONITOR } from "@/data/systemMonitor";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const EASE_STANDARD = [0.22, 1, 0.36, 1] as const;

const moduleListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const moduleItemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: EASE_STANDARD },
  },
};

function toBlockBar(value: number): string {
  const clamped = Math.max(0, Math.min(100, value));
  const filled = Math.round((clamped / 100) * 10);
  const empty = 10 - filled;

  return `${"█".repeat(filled)}${"░".repeat(empty)}`;
}

export function SystemMonitor() {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const monitorClipboardText = useMemo(() => {
    const metricLines = SYSTEM_MONITOR.metrics
      .map((metric) => `${metric.label.padEnd(15, " ")} ${toBlockBar(metric.value)} ${metric.value}%`)
      .join("\n");

    const moduleLines = SYSTEM_MONITOR.activeModules.map((module) => `✓ ${module}`).join("\n");
    const readyBar = `${"█".repeat(Math.round(SYSTEM_MONITOR.statusValue / 6.25))} ${SYSTEM_MONITOR.statusText}`;

    return [
      SYSTEM_MONITOR.headerLine,
      "",
      `● ${SYSTEM_MONITOR.onlineLabel}`,
      "",
      metricLines,
      "",
      SYSTEM_MONITOR.currentProcessLabel,
      "────────────────────────",
      `> ${SYSTEM_MONITOR.currentProcess}`,
      "",
      SYSTEM_MONITOR.activeModulesLabel,
      "────────────────────────",
      moduleLines,
      "",
      SYSTEM_MONITOR.locationLabel,
      SYSTEM_MONITOR.location,
      "",
      SYSTEM_MONITOR.statusLabel,
      readyBar,
    ].join("\n");
  }, []);

  const copyMonitor = async () => {
    if (!navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(monitorClipboardText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1300);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="py-3 sm:py-5" aria-labelledby="system-monitor-heading">
      <div className="container-page">
        <Reveal amount={0.12}>
          <GlowBorder
            rounded="rounded-2xl"
            className="relative mx-auto w-full max-w-2xl overflow-hidden bg-[#090909] px-4 py-4 shadow-[0_14px_40px_-28px_rgba(245,158,11,0.45)] sm:px-5"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_110%_at_100%_0%,rgba(245,158,11,0.13)_0%,rgba(245,158,11,0.05)_38%,rgba(0,0,0,0)_78%)]"
            />
            <div className="relative">
              <div className="mb-3 flex items-start justify-between gap-3">
                <p
                  id="system-monitor-heading"
                  className="font-mono text-[11px] leading-5 tracking-[0.08em] text-accent/90"
                >
                  {SYSTEM_MONITOR.headerLine}
                </p>

                <button
                  type="button"
                  onClick={copyMonitor}
                  aria-label="Copy monitor snapshot"
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-accent/20 bg-black/45 text-accent/80 transition-colors duration-200 hover:border-accent/40 hover:text-accent"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3 font-mono text-[11px] leading-5 tracking-[0.06em] text-fg-secondary sm:text-[11.5px]">
                <div className="inline-flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full bg-accent ${prefersReducedMotion ? "" : "animate-[pulse_2.8s_ease-in-out_infinite]"}`}
                    aria-hidden="true"
                  />
                  <span className="text-fg">● {SYSTEM_MONITOR.onlineLabel}</span>
                </div>

                <div className="space-y-2.5">
                  {SYSTEM_MONITOR.metrics.map((metric) => (
                    <div key={metric.label} className="grid grid-cols-[6.5rem_1fr_auto] items-center gap-2.5">
                      <span className="text-fg-muted">{metric.label}</span>
                      <div className="relative h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.span
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent/55 via-accent to-accent-hover"
                          initial={prefersReducedMotion ? false : { width: "0%" }}
                          whileInView={{ width: `${metric.value}%` }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 0.8, ease: EASE_STANDARD, delay: 0.08 }}
                          style={prefersReducedMotion ? { width: `${metric.value}%` } : undefined}
                        />
                      </div>
                      <span className="text-accent/95">{toBlockBar(metric.value)} {metric.value}%</span>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-fg">{SYSTEM_MONITOR.currentProcessLabel}</p>
                  <p className="text-accent/60">────────────────────────</p>
                  <p className="text-fg-secondary">&gt; {SYSTEM_MONITOR.currentProcess}</p>
                </div>

                <div>
                  <p className="text-fg">{SYSTEM_MONITOR.activeModulesLabel}</p>
                  <p className="text-accent/60">────────────────────────</p>
                  <motion.ul
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.45 }}
                    variants={prefersReducedMotion ? undefined : moduleListVariants}
                    className="mt-0.5 grid grid-cols-2 gap-x-3 gap-y-0.5 text-fg-secondary sm:grid-cols-3"
                  >
                    {SYSTEM_MONITOR.activeModules.map((module) => (
                      <motion.li
                        key={module}
                        variants={prefersReducedMotion ? undefined : moduleItemVariants}
                        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
                      >
                        ✓ {module}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <p className="text-fg">{SYSTEM_MONITOR.locationLabel}</p>
                    <p className="text-fg-secondary">{SYSTEM_MONITOR.location}</p>
                  </div>

                  <div>
                    <p className="text-fg">{SYSTEM_MONITOR.statusLabel}</p>
                    <div className="relative mt-1.5 h-2 overflow-hidden rounded-full border border-accent/25 bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent"
                        style={{ width: `${SYSTEM_MONITOR.statusValue}%` }}
                      />
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-y-0 w-[34%] bg-gradient-to-r from-transparent via-white/35 to-transparent"
                        initial={prefersReducedMotion ? false : { x: "-140%" }}
                        animate={
                          prefersReducedMotion
                            ? undefined
                            : {
                                x: ["-140%", "240%"],
                              }
                        }
                        transition={
                          prefersReducedMotion
                            ? undefined
                            : {
                                duration: 2.9,
                                ease: "linear",
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 1.1,
                              }
                        }
                      />
                    </div>
                    <p className="mt-1 text-accent">{"█".repeat(16)} {SYSTEM_MONITOR.statusText}</p>
                  </div>
                </div>

                <p className="text-[10px] tracking-[0.1em] text-fg-subtle">{copied ? "SNAPSHOT COPIED" : "VISUAL BRAND INDICATORS"}</p>
              </div>
            </div>
          </GlowBorder>
        </Reveal>
      </div>
    </section>
  );
}
