"use client";

import Image from "next/image";
import { type MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { HeroBadge } from "@/components/ui/HeroBadge";
import { SystemDetailsPanel } from "@/components/hero/SystemDetailsPanel";
import { HeroCodeBackdrop } from "@/components/hero/HeroCodeBackdrop";
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

const HERO_EYEBROW_TEXT = "AI Engineer • Creative Technologist";
const EYEBROW_WRITE_DURATION_MS = 1450;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const [allowTilt, setAllowTilt] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const depthY = useTransform(scrollYProgress, [0, 1], [0, -14]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const shiftX = useMotionValue(0);
  const shiftY = useMotionValue(0);
  const ringShiftX = useMotionValue(0);
  const ringShiftY = useMotionValue(0);

  const rotateX = useSpring(tiltX, { stiffness: 180, damping: 22, mass: 0.75 });
  const rotateY = useSpring(tiltY, { stiffness: 180, damping: 22, mass: 0.75 });
  const offsetX = useSpring(shiftX, { stiffness: 190, damping: 24, mass: 0.8 });
  const offsetY = useSpring(shiftY, { stiffness: 190, damping: 24, mass: 0.8 });
  const ringX = useSpring(ringShiftX, { stiffness: 140, damping: 26, mass: 0.85 });
  const ringY = useSpring(ringShiftY, { stiffness: 140, damping: 26, mass: 0.85 });
  const [eyebrowVisibleChars, setEyebrowVisibleChars] = useState(0);
  const [eyebrowComplete, setEyebrowComplete] = useState(false);

  useEffect(() => {
    const fullLength = HERO_EYEBROW_TEXT.length;

    if (prefersReducedMotion) {
      return;
    }

    let cancelled = false;
    const timerIds: number[] = [];
    const easeOut = (value: number) => 1 - Math.pow(1 - value, 2.1);

    const resetId = window.setTimeout(() => {
      if (!cancelled) {
        setEyebrowVisibleChars(0);
        setEyebrowComplete(false);
      }
    }, 0);
    timerIds.push(resetId);

    for (let index = 1; index <= fullLength; index += 1) {
      const progress = index / fullLength;
      const at = Math.round(EYEBROW_WRITE_DURATION_MS * easeOut(progress));
      const timerId = window.setTimeout(() => {
        if (!cancelled) {
          setEyebrowVisibleChars(index);
        }
      }, at);
      timerIds.push(timerId);
    }

    const completeId = window.setTimeout(() => {
      if (!cancelled) {
        setEyebrowComplete(true);
      }
    }, EYEBROW_WRITE_DURATION_MS);
    timerIds.push(completeId);

    return () => {
      cancelled = true;
      timerIds.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const update = () => setAllowTilt(mediaQuery.matches && !prefersReducedMotion);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [prefersReducedMotion]);

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
    shiftX.set(0);
    shiftY.set(0);
    ringShiftX.set(0);
    ringShiftY.set(0);
  };

  const handlePortraitMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!allowTilt || !portraitRef.current) {
      return;
    }

    const rect = portraitRef.current.getBoundingClientRect();
    const ratioX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ratioY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    const maxTilt = 4.6;

    tiltY.set(ratioX * maxTilt);
    tiltX.set(-ratioY * (maxTilt * 0.82));
    shiftX.set(ratioX * 7);
    shiftY.set(ratioY * 5);
    ringShiftX.set(ratioX * 11);
    ringShiftY.set(ratioY * 8);
  };

  const parentVariants = prefersReducedMotion ? undefined : heroEntrance;
  const childVariants  = prefersReducedMotion ? reducedFadeInUp : heroChild;
  const frameVariants  = prefersReducedMotion ? reducedHeroVisual : heroVisualFrame;
  const imageVariants  = prefersReducedMotion ? reducedHeroVisual : heroPortraitReveal;
  const displayedEyebrowChars = prefersReducedMotion ? HERO_EYEBROW_TEXT.length : eyebrowVisibleChars;
  const showWritingCursor = !prefersReducedMotion && !eyebrowComplete;

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.03),transparent_40%),radial-gradient(circle_at_75%_8%,rgba(223,37,49,0.10),transparent_30%),radial-gradient(circle_at_85%_26%,rgba(58,8,13,0.12),transparent_36%)]" />
      </div>

      <HeroCodeBackdrop />

      <div className="container-page relative z-10">
        {/* ── Two-column grid ───────────────────────────────────── */}
        <motion.div
          variants={parentVariants}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? undefined : "visible"}
          className="flex flex-col gap-7 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12"
        >
          {/* Left — text column */}
          <div className="order-1 min-w-0 lg:order-1">
            <motion.p variants={childVariants} className="type-label mb-4 text-accent">
              <span className="sr-only">{HERO_EYEBROW_TEXT}</span>
              <span aria-hidden="true" className="inline-flex min-w-0 items-center">
                <span>{HERO_EYEBROW_TEXT.slice(0, displayedEyebrowChars)}</span>
                {showWritingCursor && (
                  <span
                    aria-hidden="true"
                    className="ml-0.5 inline-block h-[0.9em] w-px bg-accent/75 align-[-0.1em]"
                  />
                )}
              </span>
            </motion.p>

            <motion.h1 variants={childVariants} className="type-display max-w-[11ch] text-fg sm:max-w-none">
              Ajitesh Channa
            </motion.h1>

            <motion.div variants={childVariants} className="mt-5 max-w-full sm:max-w-xl">
              <AnimatedText
                text="I build intelligent systems, engineer thoughtful products, and turn complex ideas into experiences people can actually understand."
                className="type-body-lg text-fg-secondary"
              />
            </motion.div>

            <motion.div variants={childVariants} className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
              <Button href="/projects" size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight size={15} />}>
                View Projects
              </Button>
              <Button href="/contact" size="lg" variant="secondary" className="w-full sm:w-auto">
                Let&apos;s Build Together
              </Button>
            </motion.div>

            <motion.div variants={childVariants} className="mt-6 sm:mt-7">
              <SocialLinks orientation="horizontal" display="icon-label" className="w-full justify-start" />
            </motion.div>
          </div>

          {/* Right — portrait cutout with subtle depth */}
          <motion.div
            variants={frameVariants}
            style={prefersReducedMotion ? undefined : { y: depthY }}
            className="order-2 relative mx-auto flex w-full max-w-[320px] flex-col items-center justify-center gap-4 sm:max-w-[350px] lg:order-2 lg:max-w-[440px]"
          >
            <motion.div
              ref={portraitRef}
              variants={imageVariants}
              onMouseMove={handlePortraitMove}
              onMouseLeave={resetTilt}
              data-cursor="media"
              style={
                allowTilt
                  ? {
                      rotateX,
                      rotateY,
                      x: offsetX,
                      y: offsetY,
                      transformStyle: "preserve-3d",
                    }
                  : undefined
              }
              className="relative w-full [perspective:1100px]"
            >
              <motion.div
                style={allowTilt ? { x: ringX, y: ringY } : undefined}
                className="pointer-events-none absolute left-1/2 top-[52%] z-0 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/22"
                aria-hidden="true"
              />

              <motion.div
                style={allowTilt ? { x: ringX, y: ringY } : undefined}
                className="pointer-events-none absolute left-1/2 top-[52%] z-0 h-[94%] w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/12"
                aria-hidden="true"
              />

              <div className="pointer-events-none absolute left-1/2 top-[52%] z-0 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/14 blur-3xl" aria-hidden="true" />
              <div className="pointer-events-none absolute left-1/2 top-[57%] z-0 h-[52%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-black/70 blur-2xl" aria-hidden="true" />

              <div className="relative z-10 flex justify-center">
                <Image
                  src={PROFILE_IMAGE.src}
                  alt={PROFILE_IMAGE.alt}
                  width={440}
                  height={620}
                  priority
                  sizes="(max-width: 480px) 84vw, (max-width: 768px) 70vw, (max-width: 1024px) 44vw, 440px"
                  style={{ width: "100%", height: "auto" }}
                  className="object-contain object-top drop-shadow-[0_26px_40px_rgba(0,0,0,0.72)]"
                />
              </div>

              <div className="pointer-events-none absolute bottom-[20%] left-1/2 z-20 h-10 w-[72%] -translate-x-1/2 rounded-full border border-accent/26 bg-accent/8 blur-[1px]" aria-hidden="true" />

              <div className="absolute bottom-1 left-1/2 z-20 -translate-x-1/2 rounded-full border border-accent/20 bg-background/65 px-3 py-1.5 backdrop-blur-sm sm:bottom-2 sm:px-4 sm:py-2">
                <p className="type-label text-accent">Builder • Problem Solver • Storyteller</p>
              </div>
            </motion.div>

            {/* Badge — bottom-right corner */}
            <div className="relative z-30 mt-4 flex justify-center lg:absolute lg:-bottom-2 lg:-right-5 lg:mt-0">
              <HeroBadge />
            </div>

            <SystemDetailsPanel className="z-40 mt-4 w-full max-w-[22rem] lg:absolute lg:right-0 lg:top-4 lg:mt-0 lg:max-w-[18.5rem]" />
          </motion.div>
        </motion.div>

        {/* ── Stats strip ───────────────────────────────────────── */}
        <motion.div
          variants={childVariants}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? undefined : "visible"}
          className="mt-8 grid gap-3 sm:grid-cols-3 lg:mt-10"
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

