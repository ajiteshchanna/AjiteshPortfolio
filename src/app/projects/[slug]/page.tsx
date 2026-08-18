import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui";
import { MetricBadge } from "@/components/research/MetricBadge";
import { EngineeringPipeline } from "@/components/projects";
import {
  CaseStudyDiagram,
  CaseStudyList,
  CaseStudyScreenshots,
  CaseStudySection,
} from "@/components/projects/case-study";
import { PROJECTS } from "@/data/projects";

interface ProjectCaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

const REQUIRED_TODO = "TODO: This section is intentionally left as placeholder until verified data is available.";

function resolveContent(value?: string): string {
  return value && value.trim().length > 0 ? value : REQUIRED_TODO;
}

function resolveList(values?: string[]): string[] {
  return values && values.length > 0 ? values : [REQUIRED_TODO];
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Case Study Not Found",
      description: "Requested project case study was not found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${project.title} Case Study`,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} Case Study | Ajitesh Channa`,
      description: project.description,
      url: `/projects/${project.slug}`,
      type: "article",
    },
    twitter: {
      title: `${project.title} Case Study | Ajitesh Channa`,
      description: project.description,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const caseStudy = project.caseStudy;

  return (
    <main>
      <section className="section-gap pb-0" aria-labelledby="case-study-title">
        <div className="container-page">
          <div className="mb-6">
            <Link href="/projects" className="type-caption text-fg-subtle hover:text-fg transition-colors duration-200">
              Back to Projects
            </Link>
          </div>

          <p className="type-label text-accent">Case Study</p>
          <h1 id="case-study-title" className="mt-4 type-h1 text-fg max-w-4xl">{project.title}</h1>
          <p className="mt-5 type-body-lg text-fg-secondary max-w-3xl">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="category">{project.category}</Badge>
            <Badge variant="status" status={project.status === "Completed" ? "completed" : project.status === "In Progress" ? "in-progress" : "draft"}>
              {project.status}
            </Badge>
            <Badge variant="tech">{project.year}</Badge>
          </div>
        </div>
      </section>

      <section className="section-gap" aria-label="Case study content sections">
        <div className="container-page space-y-5">
          <CaseStudySection title="Overview">
            <p>{resolveContent(caseStudy?.overview)}</p>
          </CaseStudySection>

          <CaseStudySection title="Problem">
            <p>{resolveContent(caseStudy?.problem)}</p>
          </CaseStudySection>

          <CaseStudySection title="Why It Matters">
            <p>{resolveContent(caseStudy?.whyItMatters)}</p>
          </CaseStudySection>

          <CaseStudySection title="Role">
            <p>{resolveContent(caseStudy?.role)}</p>
          </CaseStudySection>

          <CaseStudySection title="Architecture">
            <p>{resolveContent(caseStudy?.architecture)}</p>
            <EngineeringPipeline
              flow={project.architectureFlow ?? caseStudy?.diagram?.nodes}
              active
              className="mt-4"
            />
          </CaseStudySection>

          {caseStudy?.diagram && <CaseStudyDiagram diagram={caseStudy.diagram} />}

          <CaseStudySection title="Stack">
            <p>{resolveContent(caseStudy?.stack)}</p>
          </CaseStudySection>

          <CaseStudySection title="Implementation">
            <p>{resolveContent(caseStudy?.implementation)}</p>
          </CaseStudySection>

          <CaseStudySection title="Engineering Decisions">
            <CaseStudyList items={resolveList(caseStudy?.engineeringDecisions)} />
          </CaseStudySection>

          <CaseStudySection title="Challenges">
            <CaseStudyList items={resolveList(caseStudy?.challenges)} />
          </CaseStudySection>

          <CaseStudySection title="Solutions">
            <CaseStudyList items={resolveList(caseStudy?.solutions)} />
          </CaseStudySection>

          <CaseStudySection title="Results">
            <p>{resolveContent(caseStudy?.results)}</p>
          </CaseStudySection>

          <CaseStudySection title="Evaluation">
            <p>{resolveContent(caseStudy?.evaluation)}</p>
          </CaseStudySection>

          <CaseStudySection title="Metrics">
            <div className="grid gap-3 sm:grid-cols-2">
              {(caseStudy?.metrics && caseStudy.metrics.length > 0
                ? caseStudy.metrics
                : [
                    {
                      label: "Metrics",
                      value: "TODO",
                      note: "Add validated metrics when available.",
                      isPlaceholder: true,
                    },
                  ]).map((metric) => (
                <MetricBadge
                  key={`${metric.label}-${metric.value}`}
                  label={metric.label}
                  value={metric.value}
                  note={metric.note}
                  isPlaceholder={metric.isPlaceholder}
                />
              ))}
            </div>
          </CaseStudySection>

          {caseStudy?.screenshots && caseStudy.screenshots.length > 0 && (
            <CaseStudyScreenshots screenshots={caseStudy.screenshots} />
          )}

          <CaseStudySection title="Lessons">
            <CaseStudyList items={resolveList(caseStudy?.lessonsLearned)} />
          </CaseStudySection>

          <CaseStudySection title="Future Improvements">
            <CaseStudyList items={resolveList(caseStudy?.futureImprovements)} />
          </CaseStudySection>
        </div>
      </section>
    </main>
  );
}
