"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { EngineeringPipeline } from "@/components/projects/EngineeringPipeline";
import type { Project } from "@/types";
import { cardHover } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProjectCardProps {
  project: Project;
}

type TransitionPhase = "idle" | "initializing" | "ready" | "exiting";

const INITIALIZING_MS = 120;
const PROGRESS_MS = 270;
const READY_VISIBLE_MS = 60;

const READY_AT_MS = INITIALIZING_MS + PROGRESS_MS;
const EXIT_AT_MS = READY_AT_MS + READY_VISIBLE_MS;
const NAVIGATE_AT_MS = EXIT_AT_MS;

const PROGRESS_CHECKPOINTS = [
  { at: 0, value: 0 },
  { at: INITIALIZING_MS, value: 9 },
  { at: INITIALIZING_MS + 55, value: 29 },
  { at: INITIALIZING_MS + 110, value: 51 },
  { at: INITIALIZING_MS + 165, value: 73 },
  { at: INITIALIZING_MS + 220, value: 90 },
  { at: READY_AT_MS, value: 100 },
] as const;

function getStatusBadge(status: Project["status"]): "completed" | "in-progress" | "draft" {
  if (status === "Completed") return "completed";
  if (status === "In Progress") return "in-progress";
  return "draft";
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const statusBadge = getStatusBadge(project.status);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [isPipelineActive, setIsPipelineActive] = useState(false);
  const timeoutIds = useRef<number[]>([]);

  const isTransitioning = phase !== "idle";

  useEffect(() => {
    return () => {
      timeoutIds.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      timeoutIds.current = [];
    };
  }, []);

  useEffect(() => {
    router.prefetch(`/projects/${project.slug}`);
  }, [project.slug, router]);

  function scheduleTransition() {
    setPhase("initializing");
    setProgress(0);

    timeoutIds.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutIds.current = [];

    for (const checkpoint of PROGRESS_CHECKPOINTS) {
      const timeoutId = window.setTimeout(() => {
        setProgress(checkpoint.value);
      }, checkpoint.at);
      timeoutIds.current.push(timeoutId);
    }

    timeoutIds.current.push(
      window.setTimeout(() => {
        setPhase("ready");
      }, READY_AT_MS),
    );

    timeoutIds.current.push(
      window.setTimeout(() => {
        setPhase("exiting");
      }, EXIT_AT_MS),
    );

    timeoutIds.current.push(
      window.setTimeout(() => {
        router.push(`/projects/${project.slug}`);
      }, NAVIGATE_AT_MS),
    );
  }

  function handleCaseStudyClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (isTransitioning) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    scheduleTransition();
  }

  return (
    <>
      <motion.article
        layout
        variants={prefersReducedMotion ? undefined : cardHover}
        initial={prefersReducedMotion ? undefined : "rest"}
        whileHover={prefersReducedMotion ? undefined : "hover"}
        onHoverStart={() => setIsPipelineActive(true)}
        onHoverEnd={() => setIsPipelineActive(false)}
        onFocusCapture={() => setIsPipelineActive(true)}
        onBlurCapture={() => setIsPipelineActive(false)}
        data-cursor-glow="true"
        data-cursor="media"
        className="group glow-border cursor-glow-surface cursor-glow-strong w-full min-w-0 rounded-2xl bg-surface p-6"
      >
        <span aria-hidden="true" className="cursor-glow-layer" />

        <div className="mb-4 flex items-start justify-between gap-4">
          <Badge variant="category">{project.category}</Badge>
          <span className="type-caption text-fg-subtle">{project.year}</span>
        </div>

        <h3 className="type-h3 text-fg">{project.title}</h3>
        <p className="mt-3 type-body text-fg-muted">{project.description}</p>

        <div className="mt-4">
          <Badge variant="status" status={statusBadge}>{project.status}</Badge>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="tech">{tech}</Badge>
          ))}
        </div>

        <EngineeringPipeline
          flow={project.architectureFlow ?? project.caseStudy?.diagram?.nodes}
          active={isPipelineActive}
          compact
          className="mt-5"
        />

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href={`/projects/${project.slug}`}
            onClick={handleCaseStudyClick}
            aria-disabled={isTransitioning}
            className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${isTransitioning ? "pointer-events-none text-accent/55" : "text-accent hover:text-accent-hover"}`}
          >
            View case study
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-accent/25 bg-transparent px-3 py-1.5 text-[11px] font-medium tracking-wide uppercase text-accent/80 transition-colors duration-200 hover:border-accent/55 hover:bg-accent/10 hover:text-accent"
              aria-label={`${project.title} on GitHub`}
            >
              <GitBranch size={12} aria-hidden="true" strokeWidth={1.75} />
              GitHub
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="type-caption text-fg-subtle hover:text-fg transition-colors duration-200"
            >
              Live demo
            </a>
          )}
        </div>
      </motion.article>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            role="status"
            aria-live="polite"
            aria-label="Opening project"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.12 : 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black px-4"
          >
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.965, y: 8 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.01, y: -6 }}
              transition={{ duration: prefersReducedMotion ? 0.14 : 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[38rem] rounded-2xl border border-accent/25 bg-[#060606]/90 px-5 py-6 shadow-[0_24px_68px_rgba(0,0,0,0.55)] sm:px-8 sm:py-7"
            >
              <p className="type-label text-fg-subtle">PROJECT ROUTE</p>
              <h3 className="mt-2 break-words text-[clamp(1.6rem,5vw,2.5rem)] font-semibold uppercase tracking-[0.08em] text-fg">
                {project.title}
              </h3>

              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-fg-subtle">Project ID</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.1em] text-fg-secondary break-words">{project.id}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-fg-subtle">Category</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.1em] text-fg-secondary break-words">{project.category}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-fg-subtle">Year</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.1em] text-fg-secondary break-words">{project.year || "CURRENT"}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent/90">
                  {phase === "ready" || phase === "exiting" ? "SYSTEM READY" : "INITIALIZING..."}
                </p>

                <div className="mt-3 h-2 w-full overflow-hidden rounded-full border border-accent/35 bg-accent/10">
                  <motion.span
                    className="block h-full rounded-full bg-gradient-to-r from-accent/70 to-accent"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: prefersReducedMotion ? 0.08 : 0.12, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.14em] text-fg-subtle">
                  <span>LOADING CASE STUDY</span>
                  <span className="text-accent">{progress}%</span>
                </div>

                {(phase === "ready" || phase === "exiting") && (
                  <p className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    <span className={`h-1.5 w-1.5 rounded-full bg-accent ${prefersReducedMotion ? "" : "animate-[pulse_1.8s_ease-in-out_infinite]"}`} aria-hidden="true" />
                    SYSTEM READY
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
