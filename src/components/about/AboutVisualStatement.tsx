import { Reveal } from "@/components/ui";

export function AboutVisualStatement() {
  return (
    <section className="section-gap" aria-label="Visual statement">
      <div className="container-page">
        <Reveal>
          <div
            data-cursor-glow="true"
            className="cursor-glow-surface cursor-glow-soft rounded-3xl border border-accent/35 bg-surface-high p-8 sm:p-10"
          >
            <span aria-hidden="true" className="cursor-glow-layer" />
            <div className="grid gap-6 md:grid-cols-2 md:gap-10">
              <div>
                <p className="type-label text-accent">Core Belief</p>
                <p className="mt-4 type-h2 text-fg">Technology is how I solve problems.</p>
              </div>

              <div>
                <p className="type-label text-accent">Creative Compass</p>
                <p className="mt-4 type-h2 text-fg">Creativity is how I decide what is worth building.</p>
              </div>
            </div>

            <p className="mt-8 max-w-3xl type-body-lg text-fg-secondary">
              The strongest work happens at the intersection of technical rigor and human understanding.
              I want to build systems that are not only capable, but meaningful, intuitive, and worth using.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
