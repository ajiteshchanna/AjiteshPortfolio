import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "category" | "tech" | "status";
export type BadgeStatus = "completed" | "in-progress" | "draft";

export type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  status?: BadgeStatus;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  category:
    "border border-accent/30 bg-accent/8 text-accent",
  tech:
    "border border-border bg-surface-raised text-fg-muted",
  status:
    "border",
};

const statusClasses: Record<BadgeStatus, string> = {
  completed:  "border-emerald-500/30 bg-emerald-500/8 text-emerald-400",
  "in-progress": "border-amber-500/30 bg-amber-500/8 text-amber-400",
  draft:      "border-zinc-600/40 bg-zinc-700/20 text-zinc-400",
};

export function Badge({
  children,
  variant = "tech",
  status,
  className,
}: BadgeProps) {
  const resolvedVariant =
    variant === "status" && status
      ? statusClasses[status]
      : variantClasses[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5",
        "text-[11px] font-medium tracking-wide uppercase",
        resolvedVariant,
        className,
      )}
    >
      {children}
    </span>
  );
}
