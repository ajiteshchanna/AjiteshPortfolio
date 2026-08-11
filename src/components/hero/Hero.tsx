"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { HeroBadge } from "@/components/ui/HeroBadge";
import { PROFILE_IMAGE } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  heroChild,
  heroEntrance,
  heroPortraitReveal,
  heroVisualFrame,
  reducedFadeInUp,
  reducedHeroVisual,
} from "@/lib/animations";

/** Edit hero stats in this array. Keep values honest. */
const HERO_STATS = [
  {
    label: "Focus areas",
    value: "4",
    detail: "AI systems, web products, automation, creative tech",
  },
  {
    label: "Featured projects",
    value: "3",
    detail: "Core work highlighted with deep case-study intent",
  },
  {
    label: "Current mode",
    value: "BUILD",
    detail: "Designing, shipping, and iterating in public",
  },
] as const;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const depthY = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  const parentVariants = prefersReducedMotion ? undefined : heroEntrance;
  const childVariants  = prefersReducedMotion ? reducedFadeInUp : heroChild;
  const frameVariants  = prefersReducedMotion ? reducedHeroVisual : heroVisualFrame;
  const imageVariants  = prefersReducedMotion ? reducedHeroVisual : heroPortraitReveal;

  return (
    <section
      ref={sectionRef}
      className="section-gap relative overflow-hidden"
      aria-label="Intro hero"
    >
      {/* ── Atmosphere ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <motion.div
          style={prefersReducedMotion ? undefined : { scale: glowScale }}
          className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl md:h-96 md:w-96"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_40%),radial-gradient(circle_at_75%_8%,rgba(245,158,11,0.1),transparent_28%)]" />
      </div>

      <div className="container-page">
        {/* ── Two-column grid ───────────────────────────────────── */}
        <motion.div
          variants={parentVariants}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? undefined : "visible"}
          className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12"
        >
          {/* Left — text column */}
          <div className="order-2 lg:order-1">
            <motion.p variants={childVariants} className="type-label mb-4 text-accent">
              AI Engineer • Creative Technologist
            </motion.p>

            <motion.h1 variants={childVariants} className="type-display text-fg">
              Ajitesh Channa
            </motion.h1>

            <motion.div variants={childVariants} className="mt-5 max-w-xl">
              <AnimatedText
                text="I build intelligent systems that solve real problems, and craft digital experiences that make complex ideas feel clear and human."
                className="type-body-lg text-fg-secondary"
              />
            </motion.div>

            <motion.div variants={childVariants} className="mt-7 flex flex-wrap gap-3">
              <Button href="/projects" size="lg" rightIcon={<ArrowRight size={15} />}>
                View Projects
              </Button>
              <Button href="/contact" size="lg" variant="secondary">
                Let&apos;s Build Together
              </Button>
            </motion.div>

            <motion.div variants={childVariants} className="mt-7">
              <SocialLinks orientation="horizontal" display="icon-label" />
            </motion.div>
          </div>

          {/* Right — portrait with blur background */}
          <motion.div
            variants={frameVariants}
            style={prefersReducedMotion ? undefined : { y: depthY }}
            className="order-1 relative mx-auto flex w-full max-w-[280px] justify-center sm:max-w-[320px] lg:order-2 lg:max-w-[400px]"
          >
            {/* Ambient glow behind frame */}
            <div
              className="absolute -inset-6 rounded-[2.5rem] bg-accent/14 blur-3xl"
              aria-hidden="true"
            />

            {/* Portrait frame with blurred background */}
            <motion.div
              variants={imageVariants}
              className="relative w-full overflow-hidden rounded-3xl border border-accent/25 shadow-[0_28px_60px_-12px_rgba(0,0,0,0.75)]"
            >
              {/* Blurred background layer — same image, heavy blur */}
              <div className="absolute inset-0 scale-110" aria-hidden="true">
                <Image
                  src={PROFILE_IMAGE.src}
                  alt=""
                  fill
                  priority
                  sizes="420px"
                  className="object-cover object-top blur-2xl brightness-50 saturate-50"
                />
              </div>

              {/* Dark vignette over blurred bg */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-background/20"
                aria-hidden="true"
              />

              {/* Sharp portrait */}
              <Image
                src={PROFILE_IMAGE.src}
                alt={PROFILE_IMAGE.alt}
                width={400}
                height={520}
                priority
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 42vw, 420px"
                className="relative z-10 w-full object-cover object-top drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
              />

              {/* Bottom caption strip */}
              <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-accent/15 bg-background/60 px-4 py-3 backdrop-blur-md">
                <p className="type-label text-accent">Builder • Problem Solver • Storyteller</p>
              </div>
            </motion.div>

            {/* Badge — bottom-right corner */}
            <div className="absolute -bottom-4 -right-4 z-20 sm:-right-2 lg:-right-6">
              <HeroBadge />
            </div>
          </motion.div>
        </motion.div>

        {/* ── Stats strip ───────────────────────────────────────── */}
        <motion.div
          variants={childVariants}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? undefined : "visible"}
          className="mt-10 grid gap-3 sm:grid-cols-3 lg:mt-12"
        >
          {HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="glow-border rounded-2xl bg-surface px-5 py-4"
            >
              <p className="type-label text-fg-subtle">{stat.label}</p>
              <p className="mt-2 type-h2 text-fg">{stat.value}</p>
              <p className="mt-1 type-caption text-fg-muted">{stat.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

