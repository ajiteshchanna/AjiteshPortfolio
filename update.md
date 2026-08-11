# PORTFOLIO PLAN UPDATE

Owner: AJITESH CHANNA
Date: 2026-08-11
Status: Planning update only. No implementation changes in this document.

## 1) Purpose Of This Update

This update revises the implementation plan to explicitly enforce:
- Real profile image integration in Hero using images/profile_img.jpg
- Premium, smooth, purposeful animation architecture across the full site
- Mobile-first responsive design and testing as a hard quality gate
- Reduced-motion accessibility and animation performance safeguards

This update is based on the provided design direction and current codebase phase progression.

## 2) Non-Negotiable Requirements

### Profile image
- Use only the real image path: images/profile_img.jpg
- The image is a primary Hero visual anchor, not a decorative thumbnail
- Do not generate, synthesize, or substitute profile imagery
- Centralize this path in a single data/config source for future swap

Note on current workspace asset naming:
- Current file discovered: images/profile_img.jpeg
- Plan action: normalize to images/profile_img.jpg during implementation so runtime usage follows the required path exactly

### Motion quality
- Motion is a first-class product layer, not an afterthought
- Use Motion/Framer Motion for staged entry, transitions, and interaction feedback
- Motion must prioritize transform and opacity for performance
- Motion must respect prefers-reduced-motion globally
- Motion must never degrade usability, readability, keyboard flow, or scroll performance

### Mobile-first responsiveness
- Build layouts intentionally for phone-first constraints
- Scale up to tablet/laptop/desktop with deliberate composition changes
- Avoid desktop-compressed mobile layouts
- Prevent horizontal overflow at all breakpoints

## 3) Updated Visual Direction For Hero

Hero composition requirements (inspired by provided design):
- Split composition on large screens:
  - Left: identity text block, CTA cluster, trust/impact strip
  - Right: cinematic portrait module with layered geometry and depth
- Portrait presentation:
  - Major visual surface with controlled glow and masked framing
  - Optional soft radial backlight and restrained foreground accent shapes
  - Subtle depth/parallax tied to pointer or scroll only on capable devices
- Balance:
  - Portrait remains prominent while typography remains the dominant reading path
- Mobile transformation:
  - Stack portrait and copy into a strong vertical narrative
  - Keep portrait large and centered with safe crop and stable aspect ratio

## 4) Phase-By-Phase Plan Revisions

## PHASE 2 - Design System (Additions)

Additions:
- Add portrait tokens and image-surface tokens:
  - Portrait radius, border, shadow, glow, mask intensity, frame offsets
- Add motion tokens:
  - Duration tiers, easing curves, spring presets, reduced-motion variants
- Add responsive spacing/type tokens for mobile-first rhythm

Acceptance criteria updates:
- Design tokens include portrait and motion primitives
- All tokenized values are reusable and documented

## PHASE 3 - Global Layout And Navigation (Tightening)

Additions:
- Navigation motion refinement for desktop and mobile drawer
- Ensure touch target minimums and edge-safe spacing on narrow devices
- Verify drawer and navbar transitions remain smooth on low-power mobile

Acceptance criteria updates:
- Keyboard-safe mobile drawer with stable animated open/close
- No navigation overflow or clipped controls on common mobile widths

## PHASE 4 - Home And Hero (Major Revision)

Additions:
- Integrate real profile image using centralized path images/profile_img.jpg
- Build cinematic portrait module:
  - Layered geometric surfaces
  - Soft glow/backlight
  - Subtle mask/frame treatment
  - Controlled depth effect
- Hero motion sequence:
  - Staggered eyebrow, heading, body, CTA reveal
  - Cinematic profile-image entrance synchronized with text rhythm
- Mobile hero behavior:
  - Vertical composition with portrait prominence retained
  - CTA layout optimized for thumb reach and spacing

Acceptance criteria updates:
- Hero uses real profile image only
- Hero portrait is visually dominant but balanced with copy hierarchy
- Hero is intentionally composed for mobile/tablet/desktop
- Reduced-motion variant keeps hierarchy intact without heavy transforms

## PHASE 6 - Projects Architecture (Enhancement)

Additions:
- Ensure filter interactions include smooth layout transitions with clear state feedback
- Card hover motion should be subtle and fast, avoiding distracting bounce
- Mobile grid progression must remain legible and touch-friendly

Acceptance criteria updates:
- Filter changes are fluid and performant on mobile and desktop
- Card interactions feel premium and never hinder tap/click behavior

## PHASE 7 - Project Case Studies (Enhancement)

Additions:
- Keep transitions minimal and reading-focused in long-form pages
- Ensure screenshots/diagrams preserve readability on narrow widths
- Avoid decorative animation in dense technical content blocks

Acceptance criteria updates:
- Long-form case-study readability remains primary across devices

## PHASE 8 - Experience Page (Enhancement)

Additions:
- Timeline animations should communicate progression, not decoration
- Timeline must collapse cleanly to single-column mobile flow

Acceptance criteria updates:
- Timeline remains readable, navigable, and smooth on mobile

## PHASE 9 - Research Page (Enhancement)

Additions:
- Pipeline animation should communicate sequence and causality
- Mobile pipeline layout must remain understandable without horizontal scroll
- Reduced-motion mode must retain architecture clarity without animated dependency

Acceptance criteria updates:
- Pipeline is readable and structurally clear in both motion and reduced-motion modes

## PHASE 10 - Blog Page (Enhancement)

Additions:
- Add subtle tab/filter transitions and card micro-interactions
- Keep editorial rhythm intact across breakpoints

Acceptance criteria updates:
- Blog interactions feel smooth and consistent with site-wide motion language

## PHASE 11 - Contact Page (Enhancement)

Additions:
- Smooth focus and submit-state transitions with no input jitter
- Maintain large touch targets and clear spacing on mobile

Acceptance criteria updates:
- Form interactions are polished, fast, and accessible on all screen sizes

## PHASE 12 - Animation And Motion Pass (Expanded)

Additions:
- Formal motion architecture audit checklist:
  - Page transitions
  - Hero stagger and portrait entrance
  - Section reveal thresholds
  - Card hover and icon/button micro-interactions
  - Navigation and menu transitions
  - Tabs, filters, and timeline transitions
  - Research pipeline sequence
- Standardize easing/spring families and duration bands
- Remove or downgrade any motion that does not improve hierarchy or feedback

Acceptance criteria updates:
- Motion language is coherent, premium, restrained, and performance-safe

## PHASE 13 - Responsive And Accessibility Pass (Expanded)

Additions:
- Mandatory breakpoint/orientation sweep:
  - 320, 360, 390, 412, 480, 768, 1024, 1280, 1440+
  - Portrait and landscape mobile checks
- Explicit overflow checks for all major sections
- Touch target audit for all interactive controls
- Keyboard and focus walkthrough for navigation, filters, form, and dialogs
- Reduced-motion walkthrough for all animated flows

Acceptance criteria updates:
- No critical responsive or accessibility defects
- No horizontal overflow in production routes

## PHASE 14 - Performance Optimization (Expanded)

Additions:
- Image optimization for portrait and media-rich surfaces:
  - next/image usage
  - responsive sizes
  - safe quality settings
  - preloading only for true above-the-fold assets
- Animation performance safeguards:
  - transform/opacity-only policy where possible
  - avoid expensive paint/layout properties
  - avoid scroll-linked jank
- Mobile-first performance profiling in realistic throttled conditions

Acceptance criteria updates:
- Motion remains smooth on mobile while preserving quality
- Image strategy improves LCP and avoids oversized payloads

## PHASE 16 - Testing And QA (Expanded)

Additions:
- Dedicated responsive QA matrix with pass/fail records
- Dedicated motion QA matrix (normal and reduced-motion)
- CTA/link integrity sweep including dynamic routes
- Console/runtime error sweep in dev and production build

Acceptance criteria updates:
- No critical defects in responsiveness, motion behavior, or accessibility
- Lint/type/build gates pass (or documented environment limitation with mitigation)

## PHASE 18 - Final Polish (Constrained)

Additions:
- Optional cinematic polish only if performance and accessibility budgets remain healthy
- Profile image polish can include mild grain/glow only when tested for readability and perf

Acceptance criteria updates:
- Final polish enhances identity without introducing visual noise or performance debt

## 5) New Cross-Cutting Architecture Requirements

### Asset centralization
- Add one source of truth for portrait image path with required default:
  - images/profile_img.jpg
- Components must consume this source, not hardcoded scattered strings

### Motion architecture contract
- Define shared variant library by category:
  - route, hero, reveal, cards, nav, timeline, pipeline, tabs, micro-interactions
- Include reduced-motion companion variants for each major category

### Mobile-first layout contract
- Start from narrow-screen composition first
- Expand with breakpoint-specific structure changes, not only scale changes

## 6) QA And Validation Gates To Add

For each relevant phase, include explicit checks:
- Responsive visual check at defined widths and orientations
- Keyboard-only flow
- Reduced-motion flow
- Interaction smoothness under mobile constraints
- No horizontal overflow
- Build and type gates

## 7) Definition Of Done Addendum

The site is not complete unless all are true:
- Hero uses real profile image from images/profile_img.jpg
- Portrait is premium, cinematic, and responsive across breakpoints
- Motion system is cohesive, smooth, and reduced-motion compliant
- Mobile experience feels intentionally designed, not compressed desktop
- Responsive and animation QA artifacts are complete with no critical issues
- Performance remains strong with image and motion optimization in place

## 8) Next Step After Plan Approval

After your approval of this updated plan:
- Implementation begins with phased execution of these revisions
- Priority order:
  1) Hero/profile image integration and tokenization
  2) Motion architecture consolidation
  3) Mobile-first responsive refinements
  4) QA matrix execution and defect closure
