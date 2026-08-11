"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FilterTabs, type FilterTabItem } from "@/components/projects/FilterTabs";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project, ProjectCategory } from "@/types";
import { fadeInUp, reducedFadeInUp, staggerContainer } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ProjectFilter = "ALL" | ProjectCategory;

const FILTERS: FilterTabItem[] = [
  { label: "ALL", value: "ALL" },
  { label: "AI/ML", value: "AI/ML" },
  { label: "LLM/RAG", value: "LLM/RAG" },
  { label: "WEB APPS", value: "WEB APPS" },
  { label: "AUTOMATION", value: "AUTOMATION" },
  { label: "DATA", value: "DATA" },
  { label: "CREATIVE TECH", value: "CREATIVE TECH" },
];

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("ALL");
  const prefersReducedMotion = useReducedMotion();

  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") {
      return projects;
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  const displayedCount = filteredProjects.length;

  return (
    <section aria-labelledby="projects-archive-heading" className="section-gap">
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="projects-archive-heading" className="type-h2 text-fg">
              Project Archive
            </h2>
            <p className="mt-2 type-body text-fg-muted">
              {displayedCount} project{displayedCount === 1 ? "" : "s"} shown
            </p>
          </div>

          <FilterTabs
            tabs={FILTERS}
            activeTab={activeFilter}
            onChange={(value) => setActiveFilter(value as ProjectFilter)}
          />
        </div>

        <motion.div
          id="projects-grid-panel"
          role="tabpanel"
          aria-labelledby={`tab-${activeFilter}`}
          layout
          variants={staggerContainer(0.08, 0)}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? undefined : "visible"}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={prefersReducedMotion ? reducedFadeInUp : fadeInUp}
                initial={prefersReducedMotion ? undefined : "hidden"}
                animate={prefersReducedMotion ? undefined : "visible"}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
