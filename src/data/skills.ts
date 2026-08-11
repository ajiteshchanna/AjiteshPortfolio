import type { SkillCategory } from "@/types";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "ai-systems",
    title: "AI Systems Design",
    items: [
      "LLM-powered assistants and retrieval workflows",
      "RAG architecture with embedding strategy and evaluation loops",
      "Offline-first AI prototypes for privacy-sensitive contexts",
      "Prompt pipelines with guardrails, structured outputs, and observability",
    ],
  },
  {
    id: "product-engineering",
    title: "Product Engineering",
    items: [
      "React and Next.js interfaces with purposeful motion",
      "TypeScript-first architecture and reusable component systems",
      "API integration patterns, data shaping, and reliability practices",
      "Performance-minded implementation with progressive enhancement",
    ],
  },
  {
    id: "automation-data",
    title: "Automation and Data",
    items: [
      "Workflow automation for repetitive business tasks",
      "Data pipelines and dashboards for operational visibility",
      "Scripting for document processing and report generation",
      "Practical analytics that support decisions, not noise",
    ],
  },
  {
    id: "creative-technology",
    title: "Creative Technology",
    items: [
      "Narrative-led digital experiences",
      "Human-centered interaction concepts",
      "Technical storytelling through visual systems",
      "Experiments where design and engineering reinforce each other",
    ],
  },
];
