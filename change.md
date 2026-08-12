# Portfolio Content and Design Change Guide

This guide explains exactly where to edit content, structure, and visual behavior after the latest UI/UX update.
The project is mostly data-driven: update data files first, then touch component files only when layout or behavior needs to change.

---

## 1. Home Page Structure

File location
- `src/app/page.tsx`

Data/object/array to edit
- Route section composition inside `HomePage()`

What can be changed
- Section order and which sections appear on home.
- Current order:
  - `Hero`
  - `WhatIDoAccordion` (services)
  - `FeaturedProjects`
  - `AboutPreview`
  - `ExperiencePreview`
  - `ResearchPreview`
  - `WritingPreview`
  - `SystemMonitor`
  - `ContactCTA`

How to add/remove items
- Add a new dynamic import and render it in the `<main>` flow.
- Remove a section by removing its JSX component call from `HomePage()`.

### 1.1 Home System Monitor (Compact Command-Center Panel)

File location
- `src/data/systemMonitor.ts`
- Render integration: `src/app/page.tsx`
- UI component: `src/components/sections/SystemMonitor.tsx`

Data/object/array to edit
- `SYSTEM_MONITOR` object in `src/data/systemMonitor.ts`

What can be changed
- Header line (`headerLine`)
- Online label (`onlineLabel`)
- Progress rows (`metrics` array: `label`, `value`)
- Current process copy (`currentProcessLabel`, `currentProcess`)
- Active modules (`activeModulesLabel`, `activeModules` array)
- Location block (`locationLabel`, `location`)
- Status block (`statusLabel`, `statusText`, `statusValue`)

How to add/remove items
- Add/remove progress items in `metrics`.
- Add/remove module names in `activeModules`.
- Update any text values directly in `SYSTEM_MONITOR`.
- Keep `value` and `statusValue` within 0–100 for clean progress rendering.

---

## 2. Hero Heading and Description

File location
- `src/components/hero/Hero.tsx`

Data/object/array to edit
- Hero eyebrow text inside the first `<motion.p>`
- Hero heading inside `<motion.h1>`
- Hero description inside `<AnimatedText text="..." />`

What can be changed
- Intro role line, name/title, and lead narrative copy.

How to add/remove items
- Replace text directly in the JSX.

---

## 3. Profile Image (Transparent Hero Portrait)

File location
- `src/data/profile.ts`
- Asset folder: `public/images/`

Data/object/array to edit
- `PROFILE_IMAGE.src`
- `PROFILE_IMAGE.alt`

What can be changed
- Profile image file path and accessible alt text.
- Current source points to `"/images/profile_img.png"`.

How to add/remove items
- Add a new image file under `public/images/`.
- Update `PROFILE_IMAGE.src` to the new asset path.

---

## 4. Hero Statistics

File location
- `src/components/hero/Hero.tsx`

Data/object/array to edit
- `HERO_STATS` array (local constant at top of file)

What can be changed
- Stat `label`, `value`, and `detail` content.

How to add/remove items
- Add/remove objects in `HERO_STATS`.
- The grid auto-adjusts across breakpoints.

---

## 4.1 System Details Panel (Hero)

File location
- `src/data/systemDetails.ts`
- Render integration: `src/components/hero/Hero.tsx`
- Panel component: `src/components/hero/SystemDetailsPanel.tsx`

Data/object/array to edit
- `SYSTEM_DETAILS` array in `src/data/systemDetails.ts`

What can be changed
- Each row label/value in the technical panel:
  - `System Status`
  - `Location`
  - `Focus`
  - `Available For`

How to add/remove items
- Edit the `SYSTEM_DETAILS` objects (`label`, `value`) for copy updates.
- Keep the `key` values stable (`status`, `location`, `focus`, `availability`) so status-dot behavior remains attached to `status`.

---

## 5. Social Links and Resume

File location
- `src/components/ui/SocialLinks.tsx`
- Resume asset: `public/resume.pdf`

Data/object/array to edit
- `SOCIAL_LINKS` array

What can be changed
- Link labels, destinations, external flags, and download behavior.

How to add/remove items
- Add/remove objects in `SOCIAL_LINKS`.
- For resume, replace `public/resume.pdf` while keeping or updating the `href`.

---

## 6. Navbar Links and Active Orbit Indicator

File location
- Links data: `src/data/navigation.ts`
- Navbar behavior and active/hover orbit UI: `src/components/layout/Navbar.tsx`

Data/object/array to edit
- `NAV_LINKS` array
- Orbit underline/ring markup and motion timing in desktop nav map

What can be changed
- Nav item labels and routes.
- Active state (amber underline + rotating amber orbit).
- Hover/focus state for inactive links (white underline + rotating dashed white orbit).

How to add/remove items
- Add/remove/reorder objects in `NAV_LINKS`.
- Indicator behavior is applied automatically per nav item.

---

## 7. Marquee Text Below Navbar

File location
- Content: `src/data/marquee.ts`
- Marquee component: `src/components/layout/MarqueeBar.tsx`
- Marquee animation speed/style: `src/app/globals.css` (`.marquee-track`, `@keyframes marquee-scroll`)

Data/object/array to edit
- `MARQUEE_ITEMS` array

What can be changed
- Phrase sequence shown in marquee.
- Star symbol styling, typography, border, and motion speed.

How to add/remove items
- Add/remove strings in `MARQUEE_ITEMS`.
- Separator `|` is generated from `MARQUEE_ITEMS.join(" | ")`.

---

## 8. Services (What I Do)

File location
- Data: `src/data/skills.ts`
- UI behavior: `src/components/sections/WhatIDoAccordion.tsx`

Data/object/array to edit
- `SKILL_CATEGORIES` array

What can be changed
- Service category title and bullet items.

How to add/remove items
- Add/remove category objects in `SKILL_CATEGORIES`.
- Add/remove bullet strings inside each category `items` array.

---

## 9. About Page

File location
- `src/data/about.ts`
- Visual statement text block: `src/components/about/AboutVisualStatement.tsx`

Data/object/array to edit
- `ABOUT_INTRO`
- `ABOUT_PERSPECTIVES`
- `ABOUT_TECHNICAL_INTERESTS`
- `ABOUT_EDUCATION`
- `ABOUT_CREATIVE_INTERESTS`
- `ABOUT_CURRENT_FOCUS`
- `ABOUT_TIMELINE`

What can be changed
- About heading, summaries, philosophy, interests, and timeline narrative.

How to add/remove items
- Add/remove objects for list-based arrays.
- Add/remove strings for simple text arrays.
- Edit visual statement directly in `AboutVisualStatement.tsx` (it is intentionally handcrafted text).

---

## 10. Projects and Project Cards

File location
- Data: `src/data/projects.ts`
- Card UI: `src/components/projects/ProjectCard.tsx`
- Archive grid: `src/components/projects/ProjectGrid.tsx`

Data/object/array to edit
- `PROJECTS` array

What can be changed
- Project metadata (`title`, `description`, `status`, `category`, `year`, links, image, tech stack).
- Featured selection via `featured: true`.

How to add/remove items
- Add/remove project objects in `PROJECTS`.
- Keep `slug` unique for route generation.

---

## 11. Individual Project Case Studies

File location
- `src/data/projects.ts` (`caseStudy` object per project)
- Rendered in route: `src/app/projects/[slug]/page.tsx`

Data/object/array to edit
- `caseStudy` fields per project:
  - overview/problem/whyItMatters
  - role/architecture/stack/implementation
  - engineeringDecisions/challenges/solutions
  - results/evaluation
  - metrics/diagram/screenshots
  - lessonsLearned/futureImprovements

What can be changed
- Full case study content and supporting visuals.

How to add/remove items
- Add/remove list entries in arrays (`metrics`, `screenshots`, etc.).
- Remove `caseStudy` from a project to hide deep case study sections for that project.

---

## 12. Experience

File location
- `src/data/experience.ts`

Data/object/array to edit
- `EXPERIENCE` array

What can be changed
- Company/organization, role, duration, location, responsibilities, technologies, achievements, impact.

How to add/remove items
- Add/remove objects in `EXPERIENCE`.
- Ordering in array controls timeline order.

---

## 13. Research

File location
- `src/data/research.ts`
- Home preview text tokens: `src/components/sections/ResearchPreview.tsx`

Data/object/array to edit
- `RESEARCH_HERO`
- `RESEARCH_PIPELINE_STEPS`
- `RESEARCH_OBJECTIVE`
- `RESEARCH_EXPERIMENTS`
- `RESEARCH_FAILURE_ANALYSIS`
- `RESEARCH_FUTURE_WORK`
- `RESEARCH_METRICS`

What can be changed
- Research heading and narrative.
- Pipeline stages and metric placeholders/final values.

How to add/remove items
- Add/remove objects in arrays (`RESEARCH_PIPELINE_STEPS`, `RESEARCH_METRICS`).

---

## 14. Blog / Articles

File location
- `src/data/articles.ts`
- Blog routes/pages: `src/app/blog/` (if present in project)

Data/object/array to edit
- `ARTICLES`
- `BLOG_FILTERS`

What can be changed
- Article list metadata and category filters.

How to add/remove items
- Add/remove article objects in `ARTICLES`.
- Add/remove category strings in `BLOG_FILTERS`.

---

## 15. Contact Information

File location
- `src/app/contact/page.tsx`
- `src/components/contact/ContactForm.tsx`

Data/object/array to edit
- `CONTACT_METHODS` array in `contact/page.tsx`
- Form behavior in `ContactForm.tsx`

What can be changed
- Email, location, response window, contact helper copy.
- Form submission logic and validations.

How to add/remove items
- Add/remove contact method objects in `CONTACT_METHODS`.
- Replace mock submit logic in `ContactForm.tsx` with real API integration.

---

## 16. Skills

File location
- `src/data/skills.ts`
- Also reflected in projects and experience data files

Data/object/array to edit
- `SKILL_CATEGORIES`
- Project `technologies` arrays in `src/data/projects.ts`
- Experience `technologies` arrays in `src/data/experience.ts`

What can be changed
- Services/skills narrative and technology tags.

How to add/remove items
- Add/remove categories, list items, and technology tags directly in arrays.

---

## 17. Images and Assets

File location
- Profile: `public/images/profile_img.png` (or `.jpg`)
- Projects: `public/images/projects/`
- Articles: `public/images/articles/`
- Resume: `public/resume.pdf`
- Metadata visuals: `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx`

Data/object/array to edit
- Asset paths in corresponding data files

What can be changed
- All image and file assets used by pages/cards/social previews.

How to add/remove items
- Add/remove files under `public/` and update path strings in data.

---

## 18. Colors, Typography, Spacing

File location
- `src/app/globals.css`

Data/object/array to edit
- `@theme inline` color + motion tokens
- Typography utility classes (`.type-display`, `.type-h1`, etc.)
- Layout utilities (`.container-page`, `.section-gap`)

What can be changed
- Full palette (black/amber identity), text scales, spacing rhythm.

How to add/remove items
- Adjust token values and utility class definitions directly in `globals.css`.

---

## 19. Animation Timing and Easing

File location
- Shared motion variants: `src/lib/animations.ts`
- Global CSS animation timings: `src/app/globals.css`

Data/object/array to edit
- `standardTransition`, `fastTransition`, `springTransition`, and variants in `animations.ts`
- CSS keyframes (`glow-trace`, `marquee-scroll`) and durations

What can be changed
- Transition durations, easing curves, and spring behavior.

How to add/remove items
- Edit transition objects or keyframe timings directly.

---

## 20. Navbar Orbit, Bubble Cursor, Profile Tilt, Border Glow, Hero Badge, Marquee Speed

### Navbar orbit
File location
- `src/components/layout/Navbar.tsx`

Data/object/array to edit
- Desktop nav indicator spans and `motion.span` transitions in the nav map

What can be changed
- Orbit sizes, border styles, underline color/width, rotation durations (`8.5s`, `6.2s`).

How to add/remove items
- Adjust the indicator spans per nav item template once; all links inherit behavior.

### Bubble cursor
File location
- `src/components/layout/BubbleCursor.tsx`
- Cursor hide rules: `src/app/globals.css` (`.cursor-bubble-active ...`)

Data/object/array to edit
- Constants and scale logic (`POSITION_LERP`, `DEFAULT_SIZE`, hover/click scale factors)

What can be changed
- Cursor size, inertia amount, hover intensity, glow style, and target selectors.

How to add/remove items
- Update constants and selector logic in `resolveKind()`.

### Profile tilt
File location
- `src/components/hero/Hero.tsx`

Data/object/array to edit
- Tilt values in `handlePortraitMove()` (`maxTilt`, shift multipliers)
- Spring settings for `useSpring`

What can be changed
- Degree of tilt, depth offsets, return feel, and ring parallax responsiveness.

How to add/remove items
- Adjust numerical multipliers; keep values subtle (recommended max around 3-6 deg).

### Border glow
File location
- `src/app/globals.css` (`.glow-border`, `.glow-border::before`, `.glow-border::after`)

Data/object/array to edit
- Gradient stop colors/opacity and animation durations

What can be changed
- Highlight strength, sweep speed, and static fallback in reduced motion.

How to add/remove items
- Apply/remove the `glow-border` class on major containers.

### Circular Hero badge
File location
- `src/components/ui/HeroBadge.tsx`

Data/object/array to edit
- `BADGE_TEXT`
- Ring and center motion durations

What can be changed
- Circular text content, center icon, pulse amount, and ring rotation speed.

How to add/remove items
- Replace `BADGE_TEXT` or center SVG icon paths.

### Marquee speed
File location
- `src/app/globals.css`

Data/object/array to edit
- `.marquee-track { animation: marquee-scroll 23s linear infinite; }`
- Reduced-motion override (`70s`)

What can be changed
- Scroll speed, hover pause behavior, and reduced-motion speed.

How to add/remove items
- Edit animation duration values.

---

## 21. Site Metadata and SEO

File location
- `src/lib/site.ts`
- `src/app/layout.tsx` metadata object

Data/object/array to edit
- `SITE_METADATA`
- `SITE_URL` or `NEXT_PUBLIC_SITE_URL`

What can be changed
- Site title, description, author metadata, social preview defaults.

How to add/remove items
- Update fields in `SITE_METADATA` and metadata blocks in `layout.tsx`.

---

## 22. Recommended Editing Workflow

1. Update content in `src/data/*.ts` first.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Validate desktop + mobile behavior before publishing.
