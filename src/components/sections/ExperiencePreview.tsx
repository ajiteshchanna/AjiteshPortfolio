import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { EXPERIENCE } from "@/data/experience";

export function ExperiencePreview() {
  const highlights = EXPERIENCE.slice(0, 2);

  return (
    <section className="section-gap" aria-labelledby="experience-preview-heading">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            number="04"
            title="Experience"
            subtitle="Recent roles and project contexts that shaped how I ship robust systems."
            className="mb-7"
          />

          <div className="grid gap-4 md:grid-cols-2">
            {highlights.map((item) => (
              <article key={item.id} className="glow-border rounded-2xl bg-surface p-5">
                <p className="type-label text-accent">{item.duration}</p>
                <h3 className="mt-3 type-h3 text-fg">{item.role}</h3>
                <p className="mt-1 type-body text-fg-secondary">{item.organization} • {item.location}</p>
                <p className="mt-3 type-body text-fg-muted">{item.impact}</p>
              </article>
            ))}
          </div>

          <div className="mt-6">
            <Button href="/experience" variant="outline">View full timeline</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
