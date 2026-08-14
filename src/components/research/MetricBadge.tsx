import { cn } from "@/lib/utils";

interface MetricBadgeProps {
  label: string;
  value: string;
  note?: string;
  isPlaceholder?: boolean;
}

export function MetricBadge({ label, value, note, isPlaceholder }: MetricBadgeProps) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3",
        isPlaceholder ? "border-accent-hover/35 bg-accent-hover/12" : "border-border bg-surface",
      )}
    >
      <p className="type-label text-fg-subtle">{label}</p>
      <p className={cn("mt-2 type-h3", isPlaceholder ? "text-accent" : "text-fg")}>{value}</p>
      {note && <p className="mt-1 type-caption text-fg-muted">{note}</p>}
    </div>
  );
}
