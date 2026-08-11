import type { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse a filterable archive of AI, LLM/RAG, automation, data, and web application projects with case-study detail.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Ajitesh Channa",
    description:
      "Filter and explore project work across AI, data, automation, and creative technology.",
    url: "/projects",
  },
  twitter: {
    title: "Projects | Ajitesh Channa",
    description:
      "Filter and explore project work across AI, data, automation, and creative technology.",
  },
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="section-gap pb-0" aria-labelledby="projects-page-heading">
        <div className="container-page">
          <SectionHeading
            number="Projects"
            title="Build Archive"
            subtitle="A filterable index of AI, data, automation, and web systems work with case-study drill-down."
            className="max-w-3xl"
          />
        </div>
      </section>

      <ProjectGrid projects={PROJECTS} />
    </main>
  );
}
