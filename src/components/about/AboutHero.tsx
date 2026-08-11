import { Button } from "@/components/ui";
import { Reveal, SocialLinks } from "@/components/ui";
import { ABOUT_INTRO } from "@/data/about";

export function AboutHero() {
  return (
    <section className="section-gap relative overflow-hidden" aria-label="About introduction">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 right-0 h-72 w-72 rounded-full bg-accent/10 blur-2xl md:h-96 md:w-96 md:blur-3xl" />
        <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-white/5 blur-2xl md:h-80 md:w-80 md:blur-3xl" />
      </div>

      <div className="container-page">
        <Reveal>
          <p className="type-label text-accent">{ABOUT_INTRO.eyebrow}</p>
          <h1 className="mt-4 type-h1 text-fg max-w-4xl">{ABOUT_INTRO.title}</h1>
          <p className="mt-6 type-body-lg text-fg-secondary max-w-3xl">{ABOUT_INTRO.lead}</p>
          <p className="mt-4 type-body text-fg-muted max-w-3xl">{ABOUT_INTRO.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/projects" size="lg">Explore My Work</Button>
            <Button href="/contact" variant="secondary" size="lg">Start a Conversation</Button>
          </div>

          <div className="mt-8">
            <SocialLinks display="icon-label" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
