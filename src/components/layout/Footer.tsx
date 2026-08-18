"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/data/navigation";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeInUp, reducedFadeInUp, staggerContainer } from "@/lib/animations";

export function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const year = new Date().getFullYear();
  const revealItem = prefersReducedMotion ? reducedFadeInUp : fadeInUp;

  return (
    <footer className="mt-auto border-t border-border" aria-label="Site footer">
      <div className="container-page overflow-x-clip py-12 sm:py-14">
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.08, 0)}
          className="mx-auto flex w-full max-w-4xl flex-col items-center text-center"
        >
          <motion.p
            variants={revealItem}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent"
          >
            End of Transmission
          </motion.p>

          <motion.span
            variants={revealItem}
            aria-hidden="true"
            className="mt-3 block h-px w-28 bg-accent/75"
            initial={prefersReducedMotion ? false : { width: 0, opacity: 0 }}
            whileInView={prefersReducedMotion ? undefined : { width: "7rem", opacity: 1 }}
            viewport={{ once: true, amount: 0.9 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.62, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          />

          <motion.h2 variants={revealItem} className="mt-7 type-h2 text-fg">
            Have an idea worth building?
          </motion.h2>

          <motion.div variants={revealItem} className="mt-5">
            <Button
              href="/contact"
              size="lg"
              className="group uppercase tracking-[0.08em]"
              rightIcon={
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              }
            >
              Let&apos;s Talk
            </Button>
          </motion.div>

          <motion.div variants={revealItem} className="mt-10 flex flex-col items-center">
            <div className="relative h-40 w-40 sm:h-44 sm:w-44" aria-hidden="true">
              <span className="absolute inset-0 rounded-full border border-accent/18" />
              <span className="absolute inset-[0.8rem] rounded-full border border-accent/14" />
              <span className="absolute inset-[1.6rem] rounded-full border border-accent/10" />

              <motion.span
                className="absolute inset-[0.8rem]"
                animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : {
                        duration: 8.4,
                        ease: "linear",
                        repeat: Number.POSITIVE_INFINITY,
                      }
                }
              >
                <span className="absolute -top-[2px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent/85" />
              </motion.span>

              <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/30 bg-background">
                <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-fg">AC</span>
              </div>
            </div>

            <p className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent/85" aria-hidden="true" />
              Session Complete
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
              System Session Complete
            </p>
          </motion.div>

          <motion.p variants={revealItem} className="mt-7 px-2 text-xs text-fg-muted sm:text-sm">
            AI ENGINEER · CREATIVE TECHNOLOGIST · STORYTELLER
          </motion.p>
        </motion.div>

        <div className="mx-auto mt-10 h-px w-full max-w-5xl bg-accent/20" aria-hidden="true" />

        <div className="mt-7 flex flex-col items-center gap-5">
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-medium tracking-[0.1em] uppercase text-fg-muted transition-colors duration-200 hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <SocialLinks orientation="horizontal" display="icon-label" className="justify-center" />
        </div>

        <div className="mx-auto mt-8 h-px w-full max-w-5xl bg-accent/18" aria-hidden="true" />

        <div className="mt-4 flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-[11px] text-fg-subtle">
            &copy; {year} Ajitesh Channa. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-subtle">
            India · Online
          </p>
        </div>
      </div>
    </footer>
  );
}
