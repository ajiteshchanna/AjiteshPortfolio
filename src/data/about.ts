export interface AboutTimelineItem {
  id: string;
  period: string;
  title: string;
  description: string;
}

export const ABOUT_INTRO = {
  eyebrow: "About",
  title: "Engineering Depth, Creative Intent",
  lead:
    "I am an AI engineer and creative technologist focused on building systems that are robust in production and meaningful in human terms.",
  summary:
    "My work combines applied AI, product engineering, and narrative thinking to turn difficult problems into usable, scalable solutions.",
};

export const ABOUT_PERSPECTIVES = [
  {
    id: "philosophy",
    title: "Engineering Philosophy",
    body:
      "I prefer clear architecture over clever shortcuts. I build with iteration in mind: small validated steps, measurable outcomes, and systems that can be maintained by teams over time.",
  },
  {
    id: "motivation",
    title: "What Drives Me",
    body:
      "I am motivated by problems where technology can reduce friction in real lives. The goal is not novelty for its own sake, but clarity, reliability, and impact.",
  },
] as const;

export const ABOUT_TECHNICAL_INTERESTS = [
  "LLM and RAG system design",
  "Offline and privacy-conscious AI workflows",
  "Evaluation-driven model integration",
  "Frontend architecture for complex products",
] as const;

export const ABOUT_EDUCATION = [
  "B.Tech in Computer Science and Engineering",
  "Continuous self-study in AI systems, data engineering, and product architecture",
] as const;

export const ABOUT_CREATIVE_INTERESTS = [
  "Cinema as a systems language of emotion and structure",
  "Visual storytelling through digital interfaces",
  "Designing interactions that feel calm under complexity",
] as const;

export const ABOUT_CURRENT_FOCUS = [
  "Building SecureDocAI with retrieval-first architecture",
  "Strengthening portfolio case studies with implementation depth",
  "Developing production-ready AI and automation workflows",
] as const;

export const ABOUT_TIMELINE: AboutTimelineItem[] = [
  {
    id: "foundation",
    period: "Early Foundation",
    title: "From Curiosity to Structured Problem Solving",
    description:
      "Started with a curiosity for how digital systems work and gradually moved into formal engineering methods and disciplined implementation habits.",
  },
  {
    id: "industry-exposure",
    period: "Industry Exposure",
    title: "Learning in Real Operational Contexts",
    description:
      "Contributed in internship and deployment environments where reliability, communication, and execution quality mattered as much as raw technical ability.",
  },
  {
    id: "ai-shift",
    period: "AI Focus",
    title: "Shifting Toward Intelligent Systems",
    description:
      "Moved deeper into AI engineering, especially retrieval systems, document intelligence, and practical model integration for real use cases.",
  },
  {
    id: "present",
    period: "Present",
    title: "Builder Mode",
    description:
      "Currently focused on shipping thoughtful AI products that balance technical rigor with clear user experience and long-term maintainability.",
  },
];
