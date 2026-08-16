import { cn } from "@/lib/utils";

export type SectionHeadingAlignment = "left" | "center";

export type SectionHeadingProps = {
  title: string;
  number?: string;
  subtitle?: string;
  alignment?: SectionHeadingAlignment;
  className?: string;
};

export function SectionHeading({
  title,
  number,
  subtitle,
  alignment = "left",
  className,
}: SectionHeadingProps) {
  const isCenter = alignment === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        isCenter ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {number && (
        <span className="mb-3 font-mono text-xs tracking-[0.25em] text-accent uppercase">
          {number}
        </span>
      )}

      {/* Accent rule */}
      <span
        className={cn(
          "mb-4 block h-px w-10 bg-accent",
          isCenter && "mx-auto",
        )}
        aria-hidden="true"
      />

      <h2
        className={cn(
          "w-full max-w-full break-words text-[clamp(1.75rem,6vw,3rem)] font-bold uppercase tracking-tight text-fg sm:text-4xl md:text-5xl",
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-3 max-w-xl text-sm text-fg-muted sm:text-base md:text-lg",
            isCenter && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
