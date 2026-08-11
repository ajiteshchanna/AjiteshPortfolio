"use client";

import { useRef } from "react";
import type { KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export interface FilterTabItem {
  label: string;
  value: string;
}

interface FilterTabsProps {
  tabs: FilterTabItem[];
  activeTab: string;
  onChange: (value: string) => void;
}

export function FilterTabs({ tabs, activeTab, onChange }: FilterTabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();

  const focusTab = (index: number) => {
    const bounded = (index + tabs.length) % tabs.length;
    tabRefs.current[bounded]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        focusTab(index + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusTab(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(tabs.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Project categories"
      className="flex flex-wrap gap-2"
    >
      {tabs.map((tab, index) => {
        const isActive = tab.value === activeTab;

        return (
          <button
            key={tab.value}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`tab-${tab.value}`}
            aria-selected={isActive}
            aria-controls="projects-grid-panel"
            tabIndex={isActive ? 0 : -1}
            onKeyDown={(event) => onKeyDown(event, index)}
            onClick={() => onChange(tab.value)}
            className={cn(
              "relative overflow-hidden rounded-xl border px-4 py-2",
              "text-[11px] font-medium tracking-[0.08em] uppercase",
              "transition-colors duration-200",
              isActive
                ? "border-accent bg-accent/15 text-accent"
                : "border-border bg-surface text-fg-muted hover:border-accent/40 hover:text-fg",
            )}
          >
            {isActive && !prefersReducedMotion && (
              <motion.span
                layoutId="project-filter-active"
                className="absolute inset-0 -z-10 bg-accent/12"
                transition={{ type: "spring", stiffness: 360, damping: 30 }}
                aria-hidden="true"
              />
            )}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
