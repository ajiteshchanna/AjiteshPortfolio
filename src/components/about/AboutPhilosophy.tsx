import { Reveal, SectionHeading } from "@/components/ui";
import { ABOUT_PERSPECTIVES } from "@/data/about";

export function AboutPhilosophy() {
  return (
    <section className="section-gap" aria-labelledby="about-philosophy-heading">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            number="01"
            title="Philosophy and Motivation"
            subtitle="How I think about building, and why I choose the problems I choose."
            className="mb-10"
          />

          <div className="grid gap-5 md:grid-cols-2">
            {ABOUT_PERSPECTIVES.map((item) => (
              <article
                key={item.id}
                data-cursor-glow="true"
                className="cursor-glow-surface cursor-glow-soft rounded-2xl border border-border bg-surface p-6"
              >
                <span aria-hidden="true" className="cursor-glow-layer" />
                <h3 className="type-h3 text-fg">{item.title}</h3>
                <p className="mt-4 type-body text-fg-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
