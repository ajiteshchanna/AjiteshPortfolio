import type { SkillCategory } from "@/types";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "ai-systems",
    title: "AI Systems Design",
    description:
      "I design intelligent systems around retrieval, reasoning, evaluation, and reliable outputs — from document intelligence and RAG pipelines to LLM-powered workflows and agentic systems.",
    mode: "AI / ML",
    tags: ["RAG", "LLM", "AGENTS", "EVALUATION"],
    flow: ["DOCUMENTS", "RETRIEVAL", "CONTEXT", "LLM", "ANSWER"],
    flowDirection: "vertical",
  },
  {
    id: "product-engineering",
    title: "Product Engineering",
    description:
      "I turn technical ideas into usable digital products, combining thoughtful interfaces, reliable APIs, data systems, and purposeful interaction design.",
    mode: "PRODUCT",
    tags: ["REACT", "NEXT.JS", "API", "DATABASE", "UI"],
    flow: ["IDEA", "REACT", "NEXT.JS", "API", "DATABASE", "PRODUCT"],
    flowDirection: "horizontal",
  },
  {
    id: "automation-data",
    title: "Automation and Data",
    description:
      "I build automation and data workflows that reduce repetitive effort, improve reliability, and turn raw information into useful operational outputs.",
    mode: "AUTOMATION",
    tags: ["PYTHON", "DATA", "VALIDATION", "AUTOMATION", "ANALYTICS"],
    flow: ["DATA", "VALIDATION", "AUTOMATION", "REPORT", "ACTION"],
    flowDirection: "vertical",
  },
  {
    id: "creative-technology",
    title: "Creative Technology",
    description:
      "I combine engineering with storytelling, design, and experimentation to create digital experiences that are technically thoughtful and emotionally engaging.",
    mode: "CREATIVE",
    tags: ["STORY", "DESIGN", "TECHNOLOGY", "EXPERIENCE"],
    flow: ["IDEA", "STORY", "DESIGN", "TECHNOLOGY", "EXPERIENCE"],
    flowDirection: "vertical",
  },
];
