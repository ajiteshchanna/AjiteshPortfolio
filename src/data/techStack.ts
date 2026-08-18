export type TechCategory = "AI / ML" | "FRONTEND" | "BACKEND" | "DATA / ANALYTICS" | "ENGINEERING";

export interface TechStackItem {
  name: string;
  category: TechCategory;
  description: string;
}

export const TECH_STACK_ITEMS: TechStackItem[] = [
  {
    name: "Python",
    category: "AI / ML",
    description: "Core language I use for applied AI systems, automation, and data-heavy engineering work.",
  },
  {
    name: "JavaScript",
    category: "FRONTEND",
    description: "A flexible runtime layer I use for interactive interfaces and production web experiences.",
  },
  {
    name: "TypeScript",
    category: "FRONTEND",
    description: "My default choice for safer UI architecture, shared contracts, and maintainable product code.",
  },
  {
    name: "React",
    category: "FRONTEND",
    description: "The component model behind most of the interfaces and tools I design for the web.",
  },
  {
    name: "Next.js",
    category: "FRONTEND",
    description: "The framework I use to ship fast, structured products with strong rendering and routing primitives.",
  },
  {
    name: "FastAPI",
    category: "BACKEND",
    description: "A clean backend framework I rely on for APIs, automation services, and AI endpoints.",
  },
  {
    name: "Node.js",
    category: "BACKEND",
    description: "Useful for integration layers, tooling, and full-stack application runtime work.",
  },
  {
    name: "PostgreSQL",
    category: "BACKEND",
    description: "My go-to relational database for structured product data, analytics, and durable systems.",
  },
  {
    name: "MongoDB",
    category: "BACKEND",
    description: "A practical document store for flexible schemas, prototypes, and evolving application data.",
  },
  {
    name: "Supabase",
    category: "BACKEND",
    description: "A fast way to pair auth, storage, and data services with modern application workflows.",
  },
  {
    name: "Power BI",
    category: "DATA / ANALYTICS",
    description: "Used to turn raw metrics into operational dashboards and decision-ready reporting.",
  },
  {
    name: "Pandas",
    category: "DATA / ANALYTICS",
    description: "My main toolkit for data cleaning, feature shaping, and analytical workflow design.",
  },
  {
    name: "NumPy",
    category: "DATA / ANALYTICS",
    description: "A foundational layer for numerical computing, vectorized processing, and model preparation.",
  },
  {
    name: "Scikit-learn",
    category: "AI / ML",
    description: "Reliable for classical machine learning pipelines, experiments, and evaluation loops.",
  },
  {
    name: "FAISS",
    category: "AI / ML",
    description: "The vector search engine I use when retrieval speed and scale matter in AI workflows.",
  },
  {
    name: "Transformers",
    category: "AI / ML",
    description: "Essential for working with modern language models, embeddings, and multimodal capabilities.",
  },
  {
    name: "LangGraph",
    category: "AI / ML",
    description: "Helpful for orchestrating stateful agent flows and more deliberate model-driven systems.",
  },
  {
    name: "LLM / GenAI",
    category: "AI / ML",
    description: "The layer where I design assistants, reasoning flows, and practical generative product features.",
  },
  {
    name: "RAG",
    category: "AI / ML",
    description: "A core pattern I use to ground model outputs in search, context, and proprietary knowledge.",
  },
  {
    name: "Docker",
    category: "ENGINEERING",
    description: "Keeps local development, deployment targets, and service environments consistent.",
  },
  {
    name: "Git",
    category: "ENGINEERING",
    description: "The version control backbone for iterative delivery, reviewable changes, and collaboration.",
  },
  {
    name: "GitHub",
    category: "ENGINEERING",
    description: "Where I manage code review, automation, project flow, and shared engineering context.",
  },
  {
    name: "Tailwind CSS",
    category: "FRONTEND",
    description: "Useful for building custom interfaces quickly while keeping the visual system disciplined.",
  },
];