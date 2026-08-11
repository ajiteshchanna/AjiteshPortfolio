import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ContactCTA() {
  return (
    <section className="section-gap" aria-label="Contact call to action">
      <div className="container-page">
        <Reveal>
          <div className="glow-border rounded-3xl bg-surface-high p-6 sm:p-8">
            <p className="type-label text-accent">Open for thoughtful collaboration</p>
            <h2 className="mt-4 type-h1 text-fg">Let&apos;s build something meaningful.</h2>
            <p className="mt-4 max-w-2xl type-body-lg text-fg-secondary">
              If your team is working on AI-heavy products, automation strategy, or narrative-driven digital experiences,
              I&apos;d love to hear what you&apos;re solving.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">Start a conversation</Button>
              <Button href="/projects" size="lg" variant="secondary">See project work</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
