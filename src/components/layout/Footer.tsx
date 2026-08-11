import Link from "next/link";
import { NAV_LINKS } from "@/data/navigation";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border" aria-label="Site footer">
      <div className="container-page py-12">

        {/* Top row */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">

          {/* Brand block */}
          <div className="space-y-1">
            <Link
              href="/"
              className="font-mono text-sm font-semibold tracking-[0.2em] text-fg uppercase hover:text-accent transition-colors duration-200"
              aria-label="Ajitesh Channa — home"
            >
              AC
            </Link>
            <p className="text-xs text-fg-subtle leading-relaxed max-w-[22rem]">
              AI Engineer &amp; Creative Technologist.<br />
              Building systems that think, systems that ship.
            </p>
          </div>

          {/* Nav links */}
          <nav
            className="flex flex-wrap gap-x-6 gap-y-3"
            aria-label="Footer navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-medium tracking-[0.08em] uppercase text-fg-muted hover:text-fg transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
          <SocialLinks orientation="horizontal" display="icon-only" />
        </div>

        {/* Divider + copyright row */}
        <div className="mt-10 border-t border-border pt-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-fg-subtle">
            &copy; {year} Ajitesh Channa. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-fg-subtle">
            Built with Next.js &amp; Framer Motion
          </p>
        </div>

      </div>
    </footer>
  );
}
