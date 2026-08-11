# Ajitesh Channa Portfolio

Premium, motion-forward personal portfolio built with Next.js App Router, TypeScript, and a data-driven content architecture.

## Overview

This project is designed to present AI engineering, projects, experience, and research in a clean, high-contrast visual system with purposeful animation and strong mobile responsiveness.

Current key traits:

- App Router architecture with static generation where appropriate
- Centralized content/data model under src/data
- Shared animation variants and reduced-motion fallbacks
- Reusable UI primitives and section-based composition
- SEO baseline with metadata, sitemap, and robots routes

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Zod
- Lucide Icons

## Project Structure

Core paths:

- src/app: routes, layout, metadata routes
- src/components: reusable and feature components
- src/data: centralized content objects and arrays
- src/lib: shared utilities, animation config, site metadata
- public: static assets served at root

## Local Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production build locally:

```bash
npm run start
```

Open http://localhost:3000 in your browser.

## Available Scripts

- npm run dev: start local development server
- npm run build: create production build
- npm run start: run production server
- npm run lint: run ESLint

## Content Editing

Most content is data-driven and should be edited in src/data instead of component files.

Typical updates:

- Navigation links: src/data/navigation.ts
- About content: src/data/about.ts
- Projects and case studies: src/data/projects.ts
- Experience timeline: src/data/experience.ts
- Research content: src/data/research.ts
- Skills and services: src/data/skills.ts
- Profile image source: src/data/profile.ts

For a detailed editor-focused guide, see change.md.

## Design and Motion Configuration

- Global tokens (color, typography, spacing): src/app/globals.css
- Motion variants and timing: src/lib/animations.ts
- Site metadata defaults: src/lib/site.ts

## Deployment

Recommended target: Vercel.

General flow:

1. Push repository to GitHub
2. Import project in Vercel
3. Set environment variables (including NEXT_PUBLIC_SITE_URL)
4. Deploy and verify routes, metadata, and performance

## Notes

- If lint appears to stall in your local environment, validate with build and type-check first, then troubleshoot ESLint process behavior separately.
