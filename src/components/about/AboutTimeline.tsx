import { Reveal, SectionHeading } from "@/components/ui";
import { ABOUT_TIMELINE } from "@/data/about";

export function AboutTimeline() {
  return (
    <section className="section-gap" aria-labelledby="about-timeline-heading">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            number="03"
            title="Personal Timeline"
            subtitle="A concise arc of how my perspective and practice have evolved."
            className="mb-10"
          />

          <ol className="relative space-y-7 border-l border-border pl-6 sm:pl-8">
            {ABOUT_TIMELINE.map((item) => (
              <li key={item.id} className="relative">
                <span
                  className="absolute -left-[1.95rem] top-1.5 h-3 w-3 rounded-full border border-accent/70 bg-background sm:-left-[2.45rem]"
                  aria-hidden="true"
                />

                <p className="type-label text-accent">{item.period}</p>
                <h3 className="mt-2 type-h3 text-fg">{item.title}</h3>
                <p className="mt-3 type-body text-fg-muted">{item.description}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
