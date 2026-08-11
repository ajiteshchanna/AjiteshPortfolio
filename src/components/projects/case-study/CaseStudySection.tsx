import type { ReactNode } from "react";
import { Reveal } from "@/components/ui";
import { cn } from "@/lib/utils";

interface CaseStudySectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function CaseStudySection({ title, children, className }: CaseStudySectionProps) {
  return (
    <Reveal className={cn("rounded-2xl border border-border bg-surface p-6 sm:p-7", className)}>
      <h2 className="type-h3 text-fg">{title}</h2>
      <div className="mt-4 space-y-3 type-body text-fg-muted">{children}</div>
    </Reveal>
  );
}
