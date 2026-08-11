import type { Article } from "@/types";

export const ARTICLES: Article[] = [
  {
    id: "responsible-llm-rollouts",
    slug: "responsible-llm-rollouts",
    title: "Responsible LLM Rollouts in Real Teams",
    excerpt:
      "A practical approach to introducing LLM features with guardrails, traceability, and cross-team trust.",
    category: "LLMs",
    readingTime: "7 min",
    date: "2026-08-02",
    coverImage: "/images/articles/responsible-llm-rollouts.jpg",
  },
  {
    id: "automation-playbooks",
    slug: "automation-playbooks",
    title: "Automation Playbooks That Actually Stick",
    excerpt:
      "Why automation efforts fail in operations and how to design workflows that remain maintainable after handoff.",
    category: "Automation",
    readingTime: "5 min",
    date: "2026-07-24",
    coverImage: "/images/articles/automation-playbooks.jpg",
  },
  {
    id: "creative-tech-interfaces",
    slug: "creative-tech-interfaces",
    title: "Creative Technology Without Interface Noise",
    excerpt:
      "Balancing visual experimentation with legibility so expressive interfaces stay useful under pressure.",
    category: "Creative Technology",
    readingTime: "6 min",
    date: "2026-07-09",
    coverImage: "/images/articles/creative-tech-interfaces.jpg",
  },
  {
    id: "ai-systems-pragmatism",
    slug: "ai-systems-pragmatism",
    title: "AI Systems Pragmatism Over Hype",
    excerpt:
      "A field guide to choosing architecture tradeoffs when deploying AI features in resource-constrained settings.",
    category: "AI",
    readingTime: "8 min",
    date: "2026-06-26",
    coverImage: "/images/articles/ai-systems-pragmatism.jpg",
  },
  {
    id: "rag-evaluation-notes",
    slug: "rag-evaluation-notes",
    title: "What Actually Makes a RAG System Useful",
    excerpt:
      "A practical breakdown of retrieval quality, grounding checks, and evaluation habits that matter more than benchmark hype.",
    category: "RAG",
    readingTime: "8 min",
    date: "2026-07-18",
    coverImage: "/images/articles/rag-evaluation-notes.jpg",
  },
  {
    id: "building-quiet-interfaces",
    slug: "building-quiet-interfaces",
    title: "Building Quiet Interfaces for Complex Systems",
    excerpt:
      "How to design interfaces that stay clear under complexity by shaping hierarchy, rhythm, and interaction intent.",
    category: "Engineering",
    readingTime: "6 min",
    date: "2026-06-03",
    coverImage: "/images/articles/building-quiet-interfaces.jpg",
  },
  {
    id: "cinema-and-computation",
    slug: "cinema-and-computation",
    title: "Cinema, Computation, and the Craft of Meaning",
    excerpt:
      "Exploring the overlap between narrative structure and machine-assisted analysis of visual storytelling.",
    category: "Cinema",
    readingTime: "9 min",
    date: "2026-05-12",
    coverImage: "/images/articles/cinema-and-computation.jpg",
  },
];

export const BLOG_FILTERS: Array<Article["category"] | "All"> = [
  "All",
  "AI",
  "Engineering",
  "RAG",
  "LLMs",
  "Automation",
  "Creative Technology",
  "Cinema",
];
