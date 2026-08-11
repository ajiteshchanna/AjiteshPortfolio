import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function AboutPreview() {
  return (
    <section className="section-gap" aria-labelledby="about-preview-heading">
      <div className="container-page">
        <Reveal>
            <div className="glow-border grid gap-6 rounded-3xl bg-surface p-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              number="03"
              title="About"
              subtitle="Engineering depth, creative instinct, and an obsession with building useful things."
            />

            <div>
              <p className="type-body-lg text-fg-secondary">
                I care about systems that are technically sound and emotionally legible. My work sits at the intersection
                of AI engineering, practical product building, and narrative thinking.
              </p>
              <p className="mt-4 type-body text-fg-muted">
                I approach projects by identifying the real user friction first, then designing architecture and interfaces
                that reduce complexity instead of hiding it.
              </p>
              <div className="mt-7">
                <Button href="/about" variant="secondary">Read my story</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
