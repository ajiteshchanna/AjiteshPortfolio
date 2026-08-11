import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ARTICLES } from "@/data/articles";

export function WritingPreview() {
  const featured = ARTICLES.slice(0, 2);

  return (
    <section className="section-gap" aria-labelledby="writing-preview-heading">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            number="06"
            title="Writing"
            subtitle="Notes on AI engineering, product craft, and creative technology through a systems lens."
            className="mb-7"
          />

          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((article) => (
              <article key={article.id} className="glow-border rounded-2xl bg-surface p-5">
                <p className="type-label text-accent">{article.category}</p>
                <h3 className="mt-3 type-h3 text-fg">{article.title}</h3>
                <p className="mt-3 type-body text-fg-muted">{article.excerpt}</p>
                <p className="mt-4 type-caption text-fg-subtle">{article.readingTime} • {article.date}</p>
              </article>
            ))}
          </div>

          <div className="mt-6">
            <Button href="/blog" variant="outline">Read all essays</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
