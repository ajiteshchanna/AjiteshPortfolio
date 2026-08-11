"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { NAV_LINKS } from "@/data/navigation";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const scrollDirection           = useScrollDirection();
  const pathname                  = usePathname();

  // Detect scroll position for background transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Hide navbar on scroll-down once page has scrolled; reveal on scroll-up
  const isHidden = scrollDirection === "down" && scrolled;

  return (
    <>
      <motion.header
        animate={{ y: isHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-16",
          "transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "bg-background/85 backdrop-blur-none sm:backdrop-blur-sm md:backdrop-blur-md border-b border-border/60"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="container-page flex h-full items-center justify-between">

          {/* ── Logo ─────────────────────────────────────────── */}
          <Link
            href="/"
            className="font-mono text-sm font-semibold tracking-[0.2em] text-fg uppercase hover:text-accent transition-colors duration-200"
            aria-label="Ajitesh Channa — home"
          >
            AC
          </Link>

          {/* ── Desktop navigation ───────────────────────────── */}
          <nav
            className="hidden md:flex items-center gap-7"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "type-label transition-colors duration-200",
                    isActive
                      ? "text-fg"
                      : "text-fg-muted hover:text-fg",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop CTA ──────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                "inline-flex h-9 items-center px-4 rounded-lg",
                "border border-accent/40 text-accent",
                "text-[11px] font-medium tracking-[0.08em] uppercase",
                "hover:bg-accent/10 hover:border-accent",
                "transition-colors duration-200",
              )}
            >
              Let&apos;s talk
            </Link>
          </div>

          {/* ── Mobile menu button ───────────────────────────── */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className={cn(
              "md:hidden flex h-9 w-9 items-center justify-center rounded-lg",
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
