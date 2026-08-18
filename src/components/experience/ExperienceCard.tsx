import { Badge } from "@/components/ui";
import type { ExperienceItem } from "@/types";

interface ExperienceCardProps {
  item: ExperienceItem;
  isActive?: boolean;
  isPast?: boolean;
}

export function ExperienceCard({ item, isActive = false, isPast = false }: ExperienceCardProps) {
  return (
    <article
      data-cursor-glow="true"
      className={[
        "glow-border cursor-glow-surface cursor-glow-soft rounded-2xl bg-surface p-5 sm:p-6",
        "transition-[opacity,transform,border-color,box-shadow] duration-300",
        isActive
          ? "opacity-100 border-accent/35 shadow-[0_14px_34px_rgba(0,0,0,0.34)]"
          : isPast
            ? "opacity-80"
            : "opacity-62",
      ].join(" ")}
    >
      <span aria-hidden="true" className="cursor-glow-layer" />

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
