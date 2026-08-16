import { Reveal, SectionHeading } from "@/components/ui";
import {
  ABOUT_CREATIVE_INTERESTS,
  ABOUT_CURRENT_FOCUS,
  ABOUT_EDUCATION,
  ABOUT_TECHNICAL_INTERESTS,
} from "@/data/about";

function InterestBlock({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="type-h3 text-fg">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="type-body text-fg-muted">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function AboutInterests() {
  return (
    <section className="section-gap" aria-labelledby="about-interests-heading">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            number="02"
            title="Interests, Education, and Current Focus"
            subtitle="The ideas, technologies, and creative disciplines shaping what I build next."
            className="mb-10"
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <InterestBlock title="Technical Interests" items={ABOUT_TECHNICAL_INTERESTS} />
            <InterestBlock title="Education" items={ABOUT_EDUCATION} />
            <InterestBlock title="Creative Interests" items={ABOUT_CREATIVE_INTERESTS} />
            <InterestBlock title="Current Focus" items={ABOUT_CURRENT_FOCUS} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
