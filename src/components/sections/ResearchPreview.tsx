import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const PIPELINE = [
  "Documents",
  "Parsing",
  "OCR",
  "Chunking",
  "Embeddings",
  "FAISS",
  "Retrieval",
  "Offline LLM",
  "Answer",
  "Evaluation",
] as const;

export function ResearchPreview() {
  return (
    <section className="section-gap" aria-labelledby="research-preview-heading">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            number="05"
            title="Research"
            subtitle="An evolving body of work around private-by-default document intelligence and practical evaluation methods."
            className="mb-7"
          />

          <div className="rounded-3xl border border-border bg-surface p-6">
            <p className="type-body-lg text-fg-secondary">SecureDocAI Pipeline Preview</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {PIPELINE.map((step, index) => (
                <div key={step} className="inline-flex items-center gap-2">
                  <span className="rounded-lg border border-border bg-background px-3 py-2 type-caption text-fg-muted">
                    {step}
                  </span>
                  {index < PIPELINE.length - 1 && (
                    <span className="text-accent/70" aria-hidden="true">→</span>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-5 type-caption text-fg-subtle">
              TODO: Add validated quantitative metrics only after evaluation runs are finalized.
            </p>
          </div>

          <div className="mt-6">
            <Button href="/research" variant="secondary">Explore research</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
