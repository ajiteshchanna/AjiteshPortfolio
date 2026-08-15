import { type Transition, type Variants } from "framer-motion";

// ─── Shared easings ──────────────────────────────────────────────────────────

const EASE_STANDARD = [0.22, 1, 0.36, 1] as const;
const EASE_SPRING_SOFT = [0.34, 1.56, 0.64, 1] as const;
const EASE_OUT_GENTLE = [0, 0, 0.2, 1] as const;

// ─── Reusable transitions ────────────────────────────────────────────────────

export const standardTransition: Transition = {
  duration: 0.5,
  ease: EASE_STANDARD,
};

export const fastTransition: Transition = {
  duration: 0.22,
  ease: EASE_STANDARD,
};

export const pageTransition: Transition = {
  duration: 0.3,
  ease: EASE_OUT_GENTLE,
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 24,
  mass: 0.9,
};

// ─── Entry variants ──────────────────────────────────────────────────────────

/** Fade + rise — general purpose section element reveal */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: standardTransition,
  },
};

/** Fade only — for elements where vertical motion is unwanted */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: standardTransition,
  },
};

/** Section-level reveal with subtle scale */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: standardTransition,
  },
};

/** Image/card reveal with slight scale-up */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.62, ease: EASE_STANDARD },
  },
};

/** Hero portrait wrapper reveal with depth */
export const heroVisualFrame: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.68, ease: EASE_STANDARD },
  },
};

/** Hero portrait image-only reveal */
export const heroPortraitReveal: Variants = {
  hidden: { opacity: 0, scale: 1.06, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.82, ease: EASE_OUT_GENTLE },
  },
};

/** Text reveal — character or word-level stagger parent */
export const textReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

export const textRevealChild: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_STANDARD },
  },
};

/** Hero staged entrance — each child animates in sequence */
export const heroEntrance: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

export const heroChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_STANDARD },
  },
};

// ─── Stagger helper ──────────────────────────────────────────────────────────

export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

// ─── Hover variants ──────────────────────────────────────────────────────────

export const subtleHoverLift: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.01,
    transition: {
      duration: 0.24,
      ease: EASE_STANDARD,
    },
  },
};

export const cardHover: Variants = {
  rest: { y: 0, scale: 1, boxShadow: "0 0 0 0 rgba(223,37,49,0)" },
  hover: {
    y: -6,
    scale: 1.01,
    boxShadow: "0 20px 40px -8px rgba(0,0,0,0.5), 0 0 0 1px rgba(223,37,49,0.16)",
    transition: { duration: 0.3, ease: EASE_STANDARD },
  },
};

export const arrowHover: Variants = {
  rest: { x: 0 },
  hover: { x: 4, transition: { duration: 0.2, ease: EASE_SPRING_SOFT } },
};

export const iconNudge: Variants = {
  rest: { x: 0 },
  hover: {
    x: 2,
    transition: { duration: 0.18, ease: EASE_STANDARD },
  },
};

export const tabHighlight: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: fastTransition },
};

// ─── Accordion / disclosure ──────────────────────────────────────────────────

export const accordionContent: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.35, ease: EASE_STANDARD },
  },
};

// ─── Timeline ────────────────────────────────────────────────────────────────

export const timelineNode: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: EASE_SPRING_SOFT },
  },
};

export const timelineCard: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_STANDARD },
  },
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export const mobileDrawer: Variants = {
  closed: { opacity: 0, x: "100%" },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: EASE_STANDARD },
  },
};

export const mobileMenuItems: Variants = {
  closed: {},
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

export const mobileMenuItem: Variants = {
  closed: { opacity: 0, x: 24 },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: EASE_STANDARD },
  },
};

// ─── Reduced-motion safe variants ────────────────────────────────────────────
// When prefers-reduced-motion is active, swap in these instead.
// They preserve opacity changes (meaningful feedback) while
// removing all translate / scale / height transforms.

export const reducedFadeInUp: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export const reducedSectionReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export const reducedHeroVisual: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.22 } },
};
