import { Badge } from "@/components/ui";
import type { ExperienceItem } from "@/types";

interface ExperienceCardProps {
  item: ExperienceItem;
}

export function ExperienceCard({ item }: ExperienceCardProps) {
  return (
    <article className="glow-border rounded-2xl bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="type-h3 text-fg">{item.role}</h3>
          <p className="mt-1 type-body text-fg-secondary">{item.organization} • {item.location}</p>
        </div>
        <time dateTime={item.duration} className="type-caption text-fg-subtle">
          {item.duration}
        </time>
      </div>

      <section className="mt-5" aria-label="Responsibilities">
        <h4 className="type-label text-accent">Responsibilities</h4>
        <ul className="mt-2 space-y-2">
          {item.responsibilities.map((responsibility) => (
            <li key={responsibility} className="type-body text-fg-muted">
              {responsibility}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-5" aria-label="Achievements">
        <h4 className="type-label text-accent">Achievements</h4>
        <ul className="mt-2 space-y-2">
          {item.achievements.map((achievement) => (
            <li key={achievement} className="type-body text-fg-muted">
              {achievement}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-5" aria-label="Technologies">
        <h4 className="type-label text-accent">Technologies</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {item.technologies.map((technology) => (
            <Badge key={technology} variant="tech">{technology}</Badge>
          ))}
        </div>
      </section>

      {item.impact && (
        <section className="mt-5" aria-label="Outcome">
          <h4 className="type-label text-accent">Outcome</h4>
          <p className="mt-2 type-body text-fg-secondary">{item.impact}</p>
        </section>
      )}
    </article>
  );
}
