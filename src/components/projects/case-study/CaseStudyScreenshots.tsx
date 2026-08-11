import Image from "next/image";
import type { ProjectCaseStudyScreenshot } from "@/types";
import { Reveal } from "@/components/ui";

interface CaseStudyScreenshotsProps {
  screenshots: ProjectCaseStudyScreenshot[];
}

export function CaseStudyScreenshots({ screenshots }: CaseStudyScreenshotsProps) {
  return (
    <Reveal className="rounded-2xl border border-border bg-surface p-6 sm:p-7">
      <h2 className="type-h3 text-fg">Screenshots</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {screenshots.map((shot) => (
          <figure key={shot.src} className="rounded-xl border border-border bg-background p-3">
            <div className="aspect-[16/10] overflow-hidden rounded-lg border border-border-subtle bg-surface-high">
              <div className="relative h-full w-full">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            {shot.caption && <figcaption className="mt-2 type-caption text-fg-muted">{shot.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </Reveal>
  );
}
