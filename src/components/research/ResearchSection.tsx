import { Reveal } from "@/components/ui";

interface ResearchSectionProps {
  id: string;
  title: string;
  body: string;
}

export function ResearchSection({ id, title, body }: ResearchSectionProps) {
  return (
    <Reveal>
      <section
        id={id}
        aria-labelledby={`${id}-heading`}
        data-cursor-glow="true"
        className="cursor-glow-surface cursor-glow-soft rounded-2xl border border-border bg-surface p-6 sm:p-7"
      >
        <span aria-hidden="true" className="cursor-glow-layer" />
        <h2 id={`${id}-heading`} className="type-h3 text-fg">
          {title}
        </h2>
        <p className="mt-3 type-body text-fg-muted">{body}</p>
      </section>
    </Reveal>
  );
}
