"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { NAV_LINKS } from "@/data/navigation";
import { MarqueeBar } from "@/components/layout/MarqueeBar";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { SnakeBorderIndicator } from "@/components/navigation/SnakeBorderIndicator";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const prefersReducedMotion      = useReducedMotion();
  const pathname                  = usePathname();
  const isHome = pathname === "/";

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Detect scroll position for background transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[5rem] sm:h-[5.5rem]",
          "transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "bg-background/88 backdrop-blur-none sm:backdrop-blur-sm md:backdrop-blur-md border-b border-border/60"
            : "bg-background/35 border-b border-border/20",
        )}
      >
        <div className="container-page flex h-14 min-w-0 items-center justify-between gap-3 sm:h-16">

          {/* ── Desktop command bar ────────────────────────── */}
          <div
            className={cn(
              "hidden md:flex w-full items-center justify-between rounded-2xl px-2.5 py-1.5 lg:px-3",
              "border border-white/10 bg-[#060606]/72",
              scrolled ? "backdrop-blur-md" : "backdrop-blur-sm",
            )}
          >
            <div className="flex items-center gap-4 lg:gap-5">
              {/* ── Logo ───────────────────────────────────── */}
              <Link
                href="/"
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
                onFocus={() => setIsLogoHovered(true)}
                onBlur={() => setIsLogoHovered(false)}
                className={cn(
                  "relative inline-flex h-9 shrink-0 items-center rounded-lg px-3.5",
                  "bg-transparent font-mono text-sm font-semibold tracking-[0.2em] text-fg uppercase",
                  "transition-[color,background-color] duration-200 hover:text-accent",
                  "focus-visible:outline-none focus-visible:text-fg",
                )}
                aria-label="Ajitesh Channa — home"
              >
                {isHome && (
                  <motion.span
                    aria-hidden="true"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: -1 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-none absolute left-1/2 top-[5px] h-px w-3 -translate-x-1/2 bg-accent"
                  />
                )}

                <motion.span
                  className="inline-block"
                  initial={false}
                  animate={
                    !prefersReducedMotion && isLogoHovered
                      ? {
                          scale: [1, 1.08, 1, 1.08, 1],
                          y: [0, -1.5, 0, -1, 0],
                        }
                      : {
                          scale: 1,
                          y: 0,
                        }
                  }
                  transition={
                    !prefersReducedMotion && isLogoHovered
                      ? {
                          duration: 1.1,
                          ease: [0.22, 1, 0.36, 1],
                          repeat: Number.POSITIVE_INFINITY,
                        }
                      : {
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }
                  }
                >
                  AC
                </motion.span>

                <SnakeBorderIndicator
                  mode="active"
                  visible={isHome}
                  reducedMotion={prefersReducedMotion}
                />

                <SnakeBorderIndicator
                  mode="hover"
                  visible={isLogoHovered && !isHome}
                  reducedMotion={prefersReducedMotion}
                />
              </Link>

              {/* ── Desktop navigation ────────────────────── */}
              <nav
                className="flex items-center gap-2 lg:gap-3"
                aria-label="Main navigation"
              >
                {NAV_LINKS.map((link) => {
                  const isActive = isLinkActive(link.href);
                  const isHovered = hoveredHref === link.href && !isActive;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onMouseEnter={() => setHoveredHref(link.href)}
                      onMouseLeave={() => setHoveredHref((prev) => (prev === link.href ? null : prev))}
                      onFocus={() => setHoveredHref(link.href)}
                      onBlur={() => setHoveredHref((prev) => (prev === link.href ? null : prev))}
                      className={cn(
                        "relative inline-flex h-9 items-center rounded-lg px-3.5",
                        "bg-transparent type-label transition-[color,background-color] duration-200",
                        "focus-visible:outline-none focus-visible:text-fg",
                        isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span>{link.label}</span>

                      <SnakeBorderIndicator
                        mode="active"
                        visible={isActive}
                        reducedMotion={prefersReducedMotion}
                      />

                      <SnakeBorderIndicator
                        mode="hover"
                        visible={isHovered}
                        reducedMotion={prefersReducedMotion}
                      />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* ── Desktop CTA ─────────────────────────────── */}
            <div className="flex items-center gap-3 pl-2">
              <Link
                href="/contact"
                className={cn(
                  "group inline-flex h-9 items-center gap-1.5 px-4 rounded-lg",
                  "border border-accent/45 bg-transparent text-accent",
                  "text-[11px] font-medium tracking-[0.08em] uppercase",
                  "hover:bg-accent/14 hover:border-accent hover:text-white",
                  "transition-[color,background-color,border-color] duration-200",
                )}
              >
                Let&apos;s talk
                <ArrowRight
                  size={13}
                  aria-hidden="true"
                  className="translate-x-0 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* ── Mobile logo ───────────────────────────────────── */}
          <Link
            href="/"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            onFocus={() => setIsLogoHovered(true)}
            onBlur={() => setIsLogoHovered(false)}
            className={cn(
              "relative inline-flex h-9 shrink-0 items-center rounded-lg px-3.5 md:hidden",
              "bg-transparent font-mono text-sm font-semibold tracking-[0.2em] text-fg uppercase",
              "transition-[color,background-color] duration-200 hover:text-accent",
              "focus-visible:outline-none focus-visible:text-fg",
            )}
            aria-label="Ajitesh Channa — home"
          >
            {isHome && (
              <motion.span
                aria-hidden="true"
                initial={prefersReducedMotion ? false : { opacity: 0, y: -1 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute left-1/2 top-[5px] h-px w-3 -translate-x-1/2 bg-accent"
              />
            )}

            <motion.span
              className="inline-block"
              initial={false}
              animate={
                !prefersReducedMotion && isLogoHovered
                  ? {
                      scale: [1, 1.08, 1, 1.08, 1],
                      y: [0, -1.5, 0, -1, 0],
                    }
                  : {
                      scale: 1,
                      y: 0,
                    }
              }
              transition={
                !prefersReducedMotion && isLogoHovered
                  ? {
                      duration: 1.1,
                      ease: [0.22, 1, 0.36, 1],
                      repeat: Number.POSITIVE_INFINITY,
                    }
                  : {
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }
              }
            >
              AC
            </motion.span>

            <SnakeBorderIndicator
              mode="active"
              visible={isHome}
              reducedMotion={prefersReducedMotion}
            />

            <SnakeBorderIndicator
              mode="hover"
              visible={isLogoHovered && !isHome}
              reducedMotion={prefersReducedMotion}
            />
          </Link>

          {/* ── Mobile menu button ───────────────────────────── */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className={cn(
              "md:hidden flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-9 sm:w-9 sm:rounded-lg",
              "border border-border text-fg-muted",
              "hover:text-fg hover:border-accent/40",
              "transition-colors duration-200",
            )}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="x-icon"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate:  45,  opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <X size={18} strokeWidth={1.75} aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu-icon"
                  initial={{ rotate: 45,  opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate: -45,  opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <Menu size={18} strokeWidth={1.75} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

        </div>

        <MarqueeBar />
      </motion.header>

      {/* Mobile drawer — rendered outside the header so z-index stacking works */}
      <MobileMenu
        id="mobile-menu"
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
