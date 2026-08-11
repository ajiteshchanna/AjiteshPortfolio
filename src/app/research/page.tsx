import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui";
import { MetricBadge, ResearchPipeline, ResearchSection } from "@/components/research";
import {
  RESEARCH_EXPERIMENTS,
  RESEARCH_FAILURE_ANALYSIS,
  RESEARCH_FUTURE_WORK,
  RESEARCH_HERO,
  RESEARCH_METRICS,
  RESEARCH_OBJECTIVE,
  RESEARCH_PIPELINE_STEPS,
} from "@/data/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research notes and architecture walkthrough for SecureDocAI, including pipeline design, experiments, failure analysis, and future work.",
  alternates: {
    canonical: "/research",
  },
  openGraph: {
    title: "Research | Ajitesh Channa",
    description:
      "SecureDocAI research narrative with pipeline architecture and evaluation strategy.",
    url: "/research",
  },
  twitter: {
    title: "Research | Ajitesh Channa",
    description:
      "SecureDocAI research narrative with pipeline architecture and evaluation strategy.",
  },
};

export default function ResearchPage() {
  return (
    <main>
      <section className="section-gap pb-0" aria-labelledby="research-page-heading">
        <div className="container-page">
          <p className="type-label text-accent">{RESEARCH_HERO.eyebrow}</p>
          <h1 id="research-page-heading" className="mt-4 type-h1 text-fg max-w-4xl">
            {RESEARCH_HERO.title}
          </h1>
          <p className="mt-5 type-body-lg text-fg-secondary max-w-3xl">{RESEARCH_HERO.lead}</p>
          <p className="mt-3 type-body text-fg-muted max-w-3xl">{RESEARCH_HERO.summary}</p>
        </div>
      </section>

      <section className="section-gap" aria-label="Research content">
        <div className="container-page space-y-5">
          <SectionHeading
            number="Research"
            title="SecureDocAI Investigation"
            subtitle="Objective, experiments, and failure-led iteration toward reliable retrieval-based answering."
            className="mb-2"
          />

          <ResearchPipeline steps={RESEARCH_PIPELINE_STEPS} />

          <div className="grid gap-5 lg:grid-cols-2">
            <ResearchSection
              id="research-objective"
              title={RESEARCH_OBJECTIVE.title}
              body={RESEARCH_OBJECTIVE.body}
            />
            <ResearchSection
              id="research-experiments"
              title={RESEARCH_EXPERIMENTS.title}
              body={RESEARCH_EXPERIMENTS.body}
            />
            <ResearchSection
              id="research-failure-analysis"
              title={RESEARCH_FAILURE_ANALYSIS.title}
              body={RESEARCH_FAILURE_ANALYSIS.body}
            />
            <ResearchSection
              id="research-future-work"
              title={RESEARCH_FUTURE_WORK.title}
              body={RESEARCH_FUTURE_WORK.body}
            />
          </div>

          <section aria-labelledby="research-metrics-heading" className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
            <h2 id="research-metrics-heading" className="type-h3 text-fg">Metrics</h2>
            <p className="mt-3 type-body text-fg-muted">
              Metrics are intentionally shown as TODO placeholders until validated evaluation values are finalized.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {RESEARCH_METRICS.map((metric) => (
                <MetricBadge
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  note={metric.note}
                  isPlaceholder={metric.isPlaceholder}
                />
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
