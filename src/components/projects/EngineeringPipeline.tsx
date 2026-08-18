"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface EngineeringPipelineProps {
  flow?: string[];
  active?: boolean;
  className?: string;
  compact?: boolean;
}

const STEP_MS = 170;
const SETTLE_MS = 220;
const RESET_MS = 420;

export function EngineeringPipeline({
  flow,
  active = false,
  className,
  compact = false,
}: EngineeringPipelineProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(-1);
  const [settled, setSettled] = useState(false);

  const steps = useMemo(() => {
    if (!flow || flow.length < 2) {
      return [];
    }

    return flow.slice(0, 10);
  }, [flow]);

  useEffect(() => {
    if (steps.length === 0 || !active || prefersReducedMotion) {
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    const initializeId = window.setTimeout(() => {
      if (!cancelled) {
        setActiveStep(-1);
        setSettled(false);
      }
    }, 0);
    timers.push(initializeId);

    steps.forEach((_, index) => {
      const timerId = window.setTimeout(() => {
        if (!cancelled) {
          setActiveStep(index);
        }
      }, index * STEP_MS);
      timers.push(timerId);
    });

    const settleId = window.setTimeout(() => {
      if (!cancelled) {
        setSettled(true);
      }
    }, steps.length * STEP_MS + SETTLE_MS);
    timers.push(settleId);

    const resetId = window.setTimeout(() => {
      if (!cancelled) {
        setActiveStep(-1);
        setSettled(false);
      }
    }, steps.length * STEP_MS + SETTLE_MS + RESET_MS);
    timers.push(resetId);

    return () => {
      cancelled = true;
      timers.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, [active, prefersReducedMotion, steps]);

  if (steps.length === 0) {
    return null;
  }

  const effectiveStep = prefersReducedMotion ? steps.length - 1 : active ? activeStep : -1;
  const showSettled = prefersReducedMotion ? true : active && settled;

  return (
    <div className={cn("rounded-xl border border-white/10 bg-background/35 p-3", compact ? "p-2.5" : "p-3", className)}>
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">Architecture Signal</p>
      <ol className={cn("mt-2", compact ? "space-y-1.5" : "space-y-2")}>
        {steps.map((step, index) => {
          const isCurrent = index === effectiveStep;
          const isPassed = index < effectiveStep;
          const isFinalSettled = showSettled && index === steps.length - 1;
          const isActiveVisual = isCurrent || isPassed || isFinalSettled;

          return (
            <li key={`${step}-${index}`} className="relative pl-4">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full border border-white/20 bg-white/10",
                  isPassed && "border-accent/40 bg-accent/35",
                  isFinalSettled && "border-accent bg-accent",
                )}
              />

              {isCurrent && !prefersReducedMotion && (
                <motion.span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-accent"
                  initial={{ scale: 0.9, opacity: 0.85 }}
                  animate={{ scale: [0.9, 1.5, 1], opacity: [0.85, 0.28, 1] }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                />
              )}

              <p
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle transition-[color,opacity,transform] duration-200",
                  isActiveVisual && "text-fg-secondary",
                  isCurrent && "text-fg opacity-100",
                  !isActiveVisual && "opacity-80",
                )}
              >
                {step}
              </p>

              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-[2px] top-4 h-[calc(100%+0.22rem)] w-px bg-white/12 transition-colors duration-200",
                    index < effectiveStep && "bg-accent/35",
                    showSettled && index === steps.length - 2 && "bg-accent/55",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
