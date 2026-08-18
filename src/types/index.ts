export type ProjectCategory =
  | "AI/ML"
  | "LLM/RAG"
  | "WEB APPS"
  | "AUTOMATION"
  | "DATA"
  | "CREATIVE TECH";

export interface ProjectCaseStudyMetric {
  label: string;
  value: string;
  note?: string;
  isPlaceholder?: boolean;
}

export interface ProjectCaseStudyDiagram {
  title: string;
  description?: string;
  nodes: string[];
}

export interface ProjectCaseStudyScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectCaseStudy {
  overview?: string;
  problem?: string;
  whyItMatters?: string;
  role?: string;
  architecture?: string;
  stack?: string;
  implementation?: string;
  engineeringDecisions?: string[];
  challenges?: string[];
  solutions?: string[];
  results?: string;
  evaluation?: string;
  lessonsLearned?: string[];
  futureImprovements?: string[];
  diagram?: ProjectCaseStudyDiagram;
  screenshots?: ProjectCaseStudyScreenshot[];
  metrics?: ProjectCaseStudyMetric[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  year: string;
  status: "Draft" | "In Progress" | "Completed";
  technologies: string[];
  image_true: boolean;
  images: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  featuredOrder?: number;
  architectureFlow?: string[];
  caseStudy?: ProjectCaseStudy;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  duration: string;
  location: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  impact?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
  mode?: string;
  flow?: string[];
  flowDirection?: "vertical" | "horizontal";
  items?: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category:
    | "AI"
    | "Engineering"
    | "RAG"
    | "LLMs"
    | "Automation"
    | "Creative Technology"
    | "Cinema";
  readingTime: string;
  date: string;
  coverImage: string;
}
