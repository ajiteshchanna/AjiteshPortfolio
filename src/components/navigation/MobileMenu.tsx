"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { NavLink } from "@/data/navigation";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { mobileDrawer, mobileMenuItem, mobileMenuItems } from "@/lib/animations";

interface MobileMenuProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileMenu({ id, isOpen, onClose, links }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

  // Escape key to close and trap focus inside the dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        return;
      }

      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab") {
        return;
      }

      const panel = panelRef.current;
      if (!panel) {
        return;
      }

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (e.shiftKey && activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll while open; focus close button on open
  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      // defer so the element has mounted
      const raf = requestAnimationFrame(() => closeButtonRef.current?.focus());
      return () => {
        cancelAnimationFrame(raf);
        document.body.style.overflow = "";
        lastFocusedRef.current?.focus();
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — dims the visible page area */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-none sm:backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel — slides in from the right */}
          <motion.div
            key="panel"
            id={id}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={prefersReducedMotion ? { opacity: 0 } : "closed"}
            animate={prefersReducedMotion ? { opacity: 1 } : "open"}
            exit={prefersReducedMotion ? { opacity: 0 } : "closed"}
            variants={prefersReducedMotion ? undefined : mobileDrawer}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-surface border-l border-border"
          >
            {/* Panel header row */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
              <Link
                href="/"
                onClick={onClose}
                className="font-mono text-sm font-semibold tracking-[0.2em] text-fg uppercase hover:text-accent transition-colors duration-200"
                aria-label="Ajitesh Channa — home"
              >
                AC
              </Link>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-fg-muted hover:text-fg hover:border-accent/40 transition-colors duration-200"
                aria-label="Close navigation menu"
              >
                <X size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            {/* Nav links */}
            <nav
              className="flex flex-1 flex-col justify-center px-8 py-10"
              aria-label="Mobile navigation"
            >
              <motion.ul
                initial={prefersReducedMotion ? undefined : "closed"}
                animate={prefersReducedMotion ? undefined : "open"}
                variants={prefersReducedMotion ? undefined : mobileMenuItems}
                className="space-y-1"
                role="list"
              >
                {links.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                  <motion.li
                    key={link.href}
                    variants={prefersReducedMotion ? undefined : mobileMenuItem}
                    initial={prefersReducedMotion ? { opacity: 0 } : undefined}
                    animate={prefersReducedMotion ? { opacity: 1 } : undefined}
                    transition={prefersReducedMotion ? { duration: 0.2 } : undefined}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="group relative flex items-baseline gap-3 py-3 text-3xl font-bold tracking-tight text-fg-secondary hover:text-fg transition-colors duration-200"
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span
                        className={
                          isActive
                            ? "font-mono text-xs text-accent opacity-100 transition-opacity duration-200 translate-y-[-2px]"
                            : "font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200 translate-y-[-2px]"
                        }
                        aria-hidden="true"
                      >
                        /
                      </span>
                      {link.label}

                      <span
                        className={
                          isActive
                            ? "pointer-events-none absolute -bottom-0.5 left-[1.2rem] h-px w-12 rounded-full bg-accent"
                            : "pointer-events-none absolute -bottom-0.5 left-[1.2rem] h-px w-0 rounded-full bg-accent transition-all duration-200 group-hover:w-12"
                        }
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.li>
                  );
                })}
              </motion.ul>
            </nav>

            {/* Panel footer — social links */}
            <div className="shrink-0 border-t border-border px-8 py-6">
              <SocialLinks orientation="horizontal" display="icon-only" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
