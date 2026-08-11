# Content Change Guide

This file documents exactly how to update every part of the portfolio website.
Everything is data-driven. You almost never need to touch a component file.

---

## Table of Contents

1. [Hero section](#1-hero-section)
2. [Profile image](#2-profile-image)
3. [Social links and resume](#3-social-links-and-resume)
4. [Navigation](#4-navigation)
5. [Home page stats strip](#5-home-page-stats-strip)
6. [What I Do / Services accordion](#6-what-i-do--services-accordion)
7. [About page](#7-about-page)
8. [Projects](#8-projects)
9. [Project case studies](#9-project-case-studies)
10. [Experience](#10-experience)
11. [Research page](#11-research-page)
12. [Blog / Articles](#12-blog--articles)
13. [Contact information](#13-contact-information)
14. [Skills and technologies](#14-skills-and-technologies)
15. [Images and assets](#15-images-and-assets)
16. [Design configuration](#16-design-configuration)
17. [Hero badge text](#17-hero-badge-text)
18. [SEO and site metadata](#18-seo-and-site-metadata)

---

## 1. Hero Section

**File:** `src/components/hero/Hero.tsx`

| What to change | Where |
|---|---|
| Eyebrow line ("AI Engineer • Creative Technologist") | Line with `type-label mb-4 text-accent`, change the text inside `<motion.p>` |
| Name / H1 | Change text inside `<motion.h1>` |
| Supporting paragraph | Change the `text=` prop on `<AnimatedText>` |
| CTA button labels and destinations | Change the `href` and children of the two `<Button>` elements |
| Stats strip values | Edit the `HERO_STATS` array at the top of the same file |

**Stats array (at the top of Hero.tsx):**
```ts
const HERO_STATS = [
  { label: "Focus areas", value: "4",     detail: "AI systems, web products..." },
  { label: "Featured projects", value: "3", detail: "..." },
  { label: "Current mode", value: "BUILD", detail: "..." },
];
```
Add, remove, or edit any of the three objects. The grid auto-adapts.

---

## 2. Profile Image

**Centralised path:** `src/data/profile.ts`

```ts
export const PROFILE_IMAGE = {
  src: "/images/profile_img.jpg",   // ← change this path
  alt: "Portrait of Ajitesh Channa", // ← change the alt text
};
```

**Image file location:** `public/images/profile_img.jpg`

Replace this file with any JPG/PNG/WebP image. Keep the same filename,
or update `src` in `profile.ts` to match the new filename.

The image is rendered as a transparent/cutout portrait using CSS blend modes —
no rectangular card is visible. The blend works best with a subject photographed
against a plain or dark background. Adjust `object-top` → `object-center` in
`Hero.tsx` if your image needs a different focal point.

**Responsive sizes are already set:**
```
(max-width: 640px) 80vw, (max-width: 1024px) 42vw, 420px
```
No changes needed unless you switch to a very different aspect ratio.

---

## 3. Social Links and Resume

**File:** `src/components/ui/SocialLinks.tsx`

Edit the `SOCIAL_LINKS` array at the top of the file:

```ts
const SOCIAL_LINKS: SocialLinkItem[] = [
  { id: "github",   label: "GitHub",   href: "https://github.com/yourhandle", external: true },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/yourprofile", external: true },
  { id: "email",    label: "Email",    href: "mailto:your@email.com" },
  { id: "resume",   label: "Resume",   href: "/resume.pdf", download: true },
];
```

**Resume file:** Place your PDF at `public/resume.pdf`. The download link points here by default.

---

## 4. Navigation

**File:** `src/data/navigation.ts`

```ts
export const NAV_LINKS: NavLink[] = [
  { label: "About",      href: "/about"      },
  { label: "Projects",   href: "/projects"   },
  { label: "Experience", href: "/experience" },
  { label: "Research",   href: "/research"   },
  { label: "Blog",       href: "/blog"       },
  { label: "Contact",    href: "/contact"    },
];
```

Add, remove, or reorder objects. Both the desktop navbar and mobile drawer read from this array automatically.

---

## 5. Home Page Stats Strip

**File:** `src/components/hero/Hero.tsx` → `HERO_STATS` array (see section 1 above).

---

## 6. What I Do / Services Accordion

**File:** `src/data/skills.ts`

```ts
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "ai-systems",
    title: "AI Systems Design",
    items: [
      "LLM-powered assistants ...",
      "RAG architecture ...",
    ],
  },
  // add more categories as needed
];
```

Each object = one accordion panel. Change `title` for the heading, edit `items` for the bullet list.
Add a new object to add a new panel. The first panel is open by default.

---

## 7. About Page

### Hero intro (eyebrow, title, lead paragraph, summary)
**File:** `src/data/about.ts` → `ABOUT_INTRO` object

```ts
export const ABOUT_INTRO = {
  eyebrow: "About",
  title:   "Engineering Depth, Creative Intent",
  lead:    "...",
  summary: "...",
};
```

### Philosophy and motivation sections
**File:** `src/data/about.ts` → `ABOUT_PERSPECTIVES` array
Each item has `id`, `title`, and `body`.

### Technical interests list
**File:** `src/data/about.ts` → `ABOUT_TECHNICAL_INTERESTS` array (plain string array)

### Education
**File:** `src/data/about.ts` → `ABOUT_EDUCATION` array

### Creative interests
**File:** `src/data/about.ts` → `ABOUT_CREATIVE_INTERESTS` array (if present)

### Timeline
**File:** `src/data/about.ts` → array exported as `ABOUT_TIMELINE` (items have `period`, `title`, `description`)

### Visual statement quote
**File:** `src/components/about/AboutVisualStatement.tsx` — the two quoted lines are hardcoded there as they are a designed typographic piece; edit the JSX directly.

---

## 8. Projects

**File:** `src/data/projects.ts` → `PROJECTS` array

Each project object:
```ts
{
  id: "unique-id",
  slug: "url-slug",           // becomes /projects/url-slug
  title: "Project Name",
  description: "One-paragraph summary",
  category: "AI/ML",          // must match one filter tab value
  year: "2026",
  status: "In Progress",      // "Completed" | "In Progress" | "Draft"
  technologies: ["Python", "React"],
  image: "/images/projects/filename.jpg",
  github: "https://github.com/...",  // optional
  demo:   "https://...",             // optional
  featured: true,             // shows on home page (max 3 recommended)
  caseStudy: { ... },         // see section 9
}
```

**Available category values (must match filter tabs):**
`"AI/ML"` | `"LLM/RAG"` | `"WEB APPS"` | `"AUTOMATION"` | `"DATA"` | `"CREATIVE TECH"`

**To add a project:** append a new object to `PROJECTS`.
**To remove a project:** delete its object.
**Featured projects shown on home page:** set `featured: true`; only the first 3 featured are shown.

**Project images:** place at `public/images/projects/filename.jpg`

---

## 9. Project Case Studies

Case-study content lives inside each project's `caseStudy` field in `src/data/projects.ts`.

```ts
caseStudy: {
  overview:            "...",
  problem:             "...",
  whyItMatters:        "...",
  role:                "...",
  architecture:        "...",
  stack:               "Python, FAISS, ...",
  implementation:      "...",
  engineeringDecisions: ["Decision 1", "Decision 2"],
  challenges:          ["Challenge 1"],
  solutions:           ["Solution 1"],
  results:             "...",
  evaluation:          "...",
  lessonsLearned:      ["Lesson 1"],
  futureImprovements:  ["Future 1"],
  metrics: [
    { label: "Metric name", value: "TODO", note: "Add when measured", isPlaceholder: true },
  ],
  diagram: {
    title: "Architecture",
    description: "Optional caption",
    nodes: ["Step 1", "Step 2", "Step 3"],
  },
  screenshots: [
    { src: "/images/projects/screenshot.png", alt: "...", caption: "..." },
  ],
}
```

Set `isPlaceholder: true` on any metric not yet validated. These render differently to signal they are pending.

---

## 10. Experience

**File:** `src/data/experience.ts` → `EXPERIENCE` array

Each item:
```ts
{
  id: "unique-id",
  organization: "Company Name",
  role:         "Your Title",
  duration:     "Jan 2025 – Jun 2025",
  location:     "City, Country",
  responsibilities: ["Responsibility 1", "Responsibility 2"],
  technologies:    ["Python", "SQL"],
  achievements:    ["Achievement 1"],
  impact:          "One-sentence outcome summary",
}
```

Add, reorder, or remove items. The timeline renders in array order (top = first item).

---

## 11. Research Page

**File:** `src/data/research.ts`

| Export | What it controls |
|---|---|
| `RESEARCH_HERO` | Eyebrow, title, lead, and summary at the top of the page |
| `RESEARCH_PIPELINE_STEPS` | Each step in the animated pipeline diagram |
| `RESEARCH_OBJECTIVE` | Objective section title and body |
| `RESEARCH_EXPERIMENTS` | Experiments section |
| `RESEARCH_FAILURE_ANALYSIS` | Failure analysis section |
| `RESEARCH_FUTURE_WORK` | Future work section |
| `RESEARCH_METRICS` | Metric badges (use `isPlaceholder: true` for unvalidated values) |

**Pipeline preview on the home page** is a hardcoded string array in
`src/components/sections/ResearchPreview.tsx` → `PIPELINE` — update it to match `RESEARCH_PIPELINE_STEPS`.

---

## 12. Blog / Articles

**File:** `src/data/articles.ts` → `ARTICLES` array

Each article:
```ts
{
  id:          "unique-id",
  slug:        "url-slug",         // becomes /blog/url-slug
  title:       "Article Title",
  excerpt:     "Short summary",
  category:    "AI",               // must match BLOG_FILTERS below
  readingTime: "7 min",
  date:        "2026-08-02",
  coverImage:  "/images/articles/filename.jpg",
}
```

**Filter tabs:** `BLOG_FILTERS` array in the same file. Add a new string to add a filter tab.

**Article body content:** Open `src/app/blog/[slug]/page.tsx`. Currently uses a placeholder.
To add real content per article, extend the route to look up the slug and render long-form markdown or MDX.

**To add an article:** append a new object to `ARTICLES`. The route generates statically via `generateStaticParams`.

---

## 13. Contact Information

### Page copy
**File:** `src/app/contact/page.tsx` → `CONTACT_METHODS` array

```ts
const CONTACT_METHODS = [
  { id: "email",    title: "Email",           value: "your@email.com", href: "mailto:your@email.com", ... },
  { id: "location", title: "Base",            value: "Your City",       ... },
  { id: "response", title: "Response Window", value: "24-48 hours",     ... },
];
```

### Form backend
The contact form (`src/components/contact/ContactForm.tsx`) currently validates on the frontend only.
To wire a real backend, replace the `await new Promise(...)` mock in `handleSubmit` with a `fetch` call to your API endpoint.

---

## 14. Skills and Technologies

**File:** `src/data/skills.ts` → `SKILL_CATEGORIES` (see section 6 above)

Technologies shown on project cards come from each project's `technologies` array in `src/data/projects.ts`.
Experience page technologies come from each item's `technologies` array in `src/data/experience.ts`.

---

## 15. Images and Assets

| Asset | Location |
|---|---|
| Profile photo | `public/images/profile_img.jpg` |
| Project images | `public/images/projects/` |
| Article cover images | `public/images/articles/` |
| Resume PDF | `public/resume.pdf` |
| OG/social preview image | Auto-generated from `src/app/opengraph-image.tsx` |
| Twitter card image | Auto-generated from `src/app/twitter-image.tsx` |

All `public/` assets are served at the root URL. A file at `public/images/foo.jpg` is accessible at `/images/foo.jpg`.

---

## 16. Design Configuration

### Colors
**File:** `src/app/globals.css` → `@theme inline { ... }`

| Token | Current value | Purpose |
|---|---|---|
| `--color-background` | `#0a0a0a` | Page background |
| `--color-surface` | `#111111` | Card/panel background |
| `--color-surface-raised` | `#161616` | Elevated surfaces |
| `--color-surface-high` | `#1c1c1c` | Highest surface level |
| `--color-accent` | `#f59e0b` | Amber — primary interactive/highlight color |
| `--color-accent-hover` | `#fbbf24` | Accent on hover |
| `--color-accent-press` | `#d97706` | Accent on press/active |
| `--color-fg` | `#fafafa` | Primary text |
| `--color-fg-secondary` | `#d4d4d8` | Secondary text |
| `--color-fg-muted` | `#a1a1aa` | Muted text |
| `--color-fg-subtle` | `#71717a` | Subtle/supporting text |
| `--color-border` | `#27272a` | Default border |
| `--color-border-subtle` | `#1f1f1f` | Subtle dividers |

### Typography scale
**File:** `src/app/globals.css` → `@layer utilities { ... }`

Classes: `type-display`, `type-h1`, `type-h2`, `type-h3`, `type-body-lg`, `type-body`, `type-caption`, `type-label`, `type-code`.
Adjust the `font-size: clamp(...)`, `line-height`, `letter-spacing` values per class.

Font families are set via `next/font` in `src/app/layout.tsx`:
```ts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
```
To change fonts, replace `Geist` / `Geist_Mono` with any `next/font/google` font.

### Spacing (section vertical rhythm)
**File:** `src/app/globals.css` → `.section-gap`

```css
.section-gap {
  padding-block: clamp(2.5rem, 5vw, 4.5rem);
}
```
Increase the max value (4.5rem) to add more breathing room, decrease to compact further.

Page container width and padding:
```css
.container-page {
  max-width: 72rem;
  padding-inline: clamp(1rem, 5vw, 4rem);
}
```

### Animation settings
**File:** `src/lib/animations.ts`

| Export | Controls |
|---|---|
| `standardTransition` | Default duration/easing (currently 0.5s) |
| `fastTransition` | Fast interactions (0.22s) |
| `pageTransition` | Route-change fade (0.3s) |
| `springTransition` | Spring physics for poppy elements |
| `heroEntrance` | Stagger timing for hero child elements |
| `heroChild` | Per-child reveal (0.65s, y: 28→0) |
| `cardHover` | Project/article card hover lift |
| `timelineNode` / `timelineCard` | Experience timeline scroll reveal |
| `mobileDrawer` / `mobileMenuItems` / `mobileMenuItem` | Mobile nav drawer |
| `reducedFadeInUp` / `reducedSectionReveal` | Motion-safe fallbacks |

Increase `duration` for slower, more dramatic entries; decrease for snappier feel.
Change `staggerChildren` in `heroEntrance` to adjust the gap between hero text lines appearing.

### Glow border effect
**File:** `src/app/globals.css` → `.glow-border` and `.glow-border::after`

To adjust the effect:
- **Glow intensity:** change `rgba(245, 158, 11, 0.65)` — increase the alpha (last value) for stronger glow.
- **Highlight arc width:** change the degree span around `90deg` (currently 60deg to 120deg).
- **Speed:** change `4s linear` in `animation: glow-trace` — slower = more subtle, faster = more energetic.
- **Static border colour:** change `border-color` in the `rgba(245, 158, 11, 0.25)` rule.

To apply the glow border to any new card or container:
```tsx
// Option 1 — className (simplest)
<div className="glow-border rounded-2xl bg-surface p-6">...</div>

// Option 2 — GlowBorder component
import { GlowBorder } from "@/components/ui";
<GlowBorder rounded="rounded-3xl" className="bg-surface p-6">...</GlowBorder>
```

---

## 17. Hero Badge Text

**File:** `src/components/ui/HeroBadge.tsx` → `BADGE_TEXT` constant

```ts
const BADGE_TEXT = "BUILDING SOLUTIONS THAT MATTER • AI ENGINEER •";
```

Change this string to update the rotating circular text. Keep it short (under ~48 characters for good arc spacing). The `•` character acts as a visual separator.

To change the badge **size**, edit the `h-[112px] w-[112px] sm:h-[128px] sm:w-[128px]` Tailwind classes on the wrapper div.

To change the **rotation speed**, edit `duration: 18` in the `motion.svg` animate prop (seconds per full rotation).

To change the **center icon**, replace the `<svg>` inside the center emblem div.

---

## 18. SEO and Site Metadata

### Site URL and defaults
**File:** `src/lib/site.ts`

```ts
const DEFAULT_SITE_URL = "https://ajiteshchanna.com"; // ← change to your domain
export const SITE_METADATA = {
  name:        "Ajitesh Channa Portfolio",
  title:       "Ajitesh Channa - AI Engineer and Creative Technologist",
  description: "Portfolio of Ajitesh Channa ...",
  author:      "Ajitesh Channa",
  ogImageAlt:  "Ajitesh Channa portfolio preview",
};
```

Set `NEXT_PUBLIC_SITE_URL` in your Vercel environment variables to override the domain in production.

### Per-route metadata
Each route exports its own `metadata` object. Find and edit the `export const metadata` block in:
- `src/app/page.tsx` — Home
- `src/app/about/page.tsx`
- `src/app/projects/page.tsx`
- `src/app/experience/page.tsx`
- `src/app/research/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/contact/page.tsx`

Dynamic page titles (project case studies, blog articles) are generated automatically from their data.

### Sitemap
**File:** `src/app/sitemap.ts` — auto-generates from `PROJECTS` and `ARTICLES` arrays. No manual editing needed unless you add a new static route.

---

## Quick Reference: Data Files

| What | File |
|---|---|
| Hero name, eyebrow, stats | `src/components/hero/Hero.tsx` |
| Profile image path | `src/data/profile.ts` |
| Social links and resume | `src/components/ui/SocialLinks.tsx` |
| Navigation links | `src/data/navigation.ts` |
| Services / What I Do | `src/data/skills.ts` |
| About page content | `src/data/about.ts` |
| Projects list | `src/data/projects.ts` |
| Experience list | `src/data/experience.ts` |
| Research page content | `src/data/research.ts` |
| Blog articles | `src/data/articles.ts` |
| Contact methods | `src/app/contact/page.tsx` |
| Site URL and SEO defaults | `src/lib/site.ts` |
| Color and spacing tokens | `src/app/globals.css` |
| Animation variants | `src/lib/animations.ts` |
| Hero badge text | `src/components/ui/HeroBadge.tsx` |
| Glow border component | `src/components/ui/GlowBorder.tsx` |
