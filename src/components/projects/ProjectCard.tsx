"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/types";
import { cardHover } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProjectCardProps {
  project: Project;
}

function getStatusBadge(status: Project["status"]): "completed" | "in-progress" | "draft" {
  if (status === "Completed") return "completed";
  if (status === "In Progress") return "in-progress";
  return "draft";
}

export function ProjectCard({ project }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const statusBadge = getStatusBadge(project.status);

  return (
    <motion.article
      layout
      variants={prefersReducedMotion ? undefined : cardHover}
      initial={prefersReducedMotion ? undefined : "rest"}
      whileHover={prefersReducedMotion ? undefined : "hover"}
      data-cursor="media"
      className="group glow-border w-full min-w-0 rounded-2xl bg-surface p-6"
    >
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

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-200"
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
  );
}
