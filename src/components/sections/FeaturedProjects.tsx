import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { FEATURED_PROJECTS } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <section className="section-gap" aria-labelledby="featured-projects-heading">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            number="02"
            title="Selected Projects"
            subtitle="A focused set of work that reflects system-level thinking and practical implementation discipline."
            className="mb-7"
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {FEATURED_PROJECTS.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-6">
            <Button href="/projects" variant="outline">
              Browse all projects
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
