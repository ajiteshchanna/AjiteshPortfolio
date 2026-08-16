import { GitBranch, Link2, Mail, FileDown, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SocialLinkItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
  download?: boolean;
};

const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/ajiteshchanna",
    icon: GitBranch,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/ajiteshchanna",
    icon: Link2,
    external: true,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:ac.ajiteshchanna@gmail.com",
    icon: Mail,
  },
  {
    id: "resume",
    label: "Resume",
    href: "https://drive.google.com/file/d/1cKN_s90PlMr_heHmrWbN2j4H1-I6oUKA/view?usp=drive_link",
    icon: FileDown,
    download: true,
  },
];

export type SocialLinksOrientation = "horizontal" | "vertical";
export type SocialLinksDisplay = "icon-only" | "icon-label";

export type SocialLinksProps = {
  orientation?: SocialLinksOrientation;
  display?: SocialLinksDisplay;
  className?: string;
  itemClassName?: string;
};

export function SocialLinks({
  orientation = "horizontal",
  display = "icon-only",
  className,
  itemClassName,
}: SocialLinksProps) {
  return (
    <nav
      aria-label="Social links"
      className={cn(
        "flex min-w-0",
        orientation === "horizontal" ? "flex-row flex-wrap gap-3" : "flex-col gap-2",
        className,
      )}
    >
      {SOCIAL_LINKS.map(({ id, label, href, icon: Icon, external, download }) => {
        const linkClasses = cn(
          "group inline-flex min-w-0 items-center gap-2 rounded-lg whitespace-nowrap",
          "text-fg-muted transition-colors duration-200 hover:text-fg",
          display === "icon-only"
            ? "h-9 w-9 justify-center border border-border hover:border-accent/40 hover:bg-surface"
            : "h-9 max-w-full px-3 border border-border hover:border-accent/40 hover:bg-surface text-sm",
          itemClassName,
        );

        const linkContent = (
          <>
            <Icon size={16} aria-hidden="true" strokeWidth={1.75} />
            {display === "icon-label" && (
              <span className="font-medium">{label}</span>
            )}
            {external && display === "icon-label" && (
              <ExternalLink
                size={11}
                aria-hidden="true"
                className="opacity-50"
              />
            )}
          </>
        );

        if (download) {
          return (
            <a
              key={id}
              href={href}
              download
              className={linkClasses}
              aria-label={display === "icon-only" ? label : undefined}
            >
              {linkContent}
            </a>
          );
        }

        if (external) {
          return (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}
              aria-label={display === "icon-only" ? label : undefined}
            >
              {linkContent}
            </a>
          );
        }

        return (
          <a
            key={id}
            href={href}
            className={linkClasses}
            aria-label={display === "icon-only" ? label : undefined}
          >
            {linkContent}
          </a>
        );
      })}
    </nav>
  );
}
