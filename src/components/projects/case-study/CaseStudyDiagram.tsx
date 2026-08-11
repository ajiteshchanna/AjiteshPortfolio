import { Reveal } from "@/components/ui";
import type { ProjectCaseStudyDiagram } from "@/types";

interface CaseStudyDiagramProps {
  diagram: ProjectCaseStudyDiagram;
}

export function CaseStudyDiagram({ diagram }: CaseStudyDiagramProps) {
  return (
    <Reveal className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
      <h2 className="type-h3 text-fg">{diagram.title}</h2>
      {diagram.description && (
        <p className="mt-3 type-body text-fg-muted">{diagram.description}</p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {diagram.nodes.map((node, index) => (
          <div key={`${node}-${index}`} className="inline-flex items-center gap-2">
            <span className="rounded-lg border border-border bg-background px-3 py-2 type-caption text-fg-muted">
              {node}
            </span>
            {index < diagram.nodes.length - 1 && (
              <span className="text-accent/70" aria-hidden="true">-&gt;</span>
            )}
          </div>
        ))}
      </div>
    </Reveal>
  );
}
