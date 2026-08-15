import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "predictive-maintenance-lab",
    slug: "predictive-maintenance-lab",
    title: "Predictive Maintenance Lab",
    description:
      "A machine-learning experimentation setup for identifying equipment risk patterns using operational sensor traces.",
    category: "AI/ML",
    year: "2024",
    status: "Completed",
    technologies: ["Python", "scikit-learn", "Pandas", "Jupyter"],
    image: "/images/projects/predictive-maintenance-lab.jpg",
    github: "",
    featured: false,
  },
  {
    id: "securedocai",
    slug: "securedocai",
    title: "SecureDocAI",
    description:
      "An offline-first document intelligence system for retrieval, summarization, and evidence-aware question answering.",
    category: "LLM/RAG",
    year: "2026",
    status: "In Progress",
    technologies: ["Python", "FAISS", "Transformers", "FastAPI", "Docker"],
    image: "/images/projects/securedocai.jpg",
    github: "",
    demo: "",
    featured: true,
    caseStudy: {
      overview:
        "SecureDocAI explores how privacy-sensitive documents can be queried locally using retrieval workflows and compact language models without cloud dependency.",
      problem:
        "Knowledge workers handling sensitive documents often need answer retrieval, but cloud-hosted systems can violate policy or trust boundaries.",
      whyItMatters:
        "A private-by-default assistant unlocks faster decision making while preserving compliance and data ownership in restricted environments.",
      role:
        "Designed retrieval architecture, implemented document ingestion flow, and iterated on answer quality strategy.",
      architecture:
        "Pipeline: document parsing, OCR fallback, semantic chunking, embedding indexing in FAISS, retrieval layer, and offline response generation.",
      stack: "Python, FAISS, sentence-transformers, FastAPI, Docker",
      implementation:
        "Built ingestion modules with traceable metadata and a retrieval layer tuned for relevance and citation support. Added modular service boundaries for testing each stage independently.",
      engineeringDecisions: [
        "Prioritized local model compatibility before advanced generation features.",
        "Used vector index snapshots to make iteration reproducible across experiments.",
        "Separated retrieval scoring from response rendering to improve debuggability.",
      ],
      challenges: [
        "Uneven OCR quality across document formats.",
        "Retrieval drift when chunk sizes were too broad.",
        "Balancing latency with answer depth on consumer hardware.",
      ],
      solutions: [
        "Added OCR fallback and preprocessing normalization.",
        "Introduced chunk overlap and metadata-aware retrieval filters.",
        "Applied staged retrieval with capped context windows.",
      ],
      results:
        "The system now returns grounded answers with source context, making internal document lookup significantly more actionable for early testing scenarios.",
      evaluation:
        "Evaluation is currently based on curated question sets and relevance review. Quantitative benchmarking is planned with a larger validation corpus.",
      metrics: [
        {
          label: "Answer grounding score",
          value: "TODO",
          note: "Pending formal retrieval evaluation baseline.",
          isPlaceholder: true,
        },
        {
          label: "Median retrieval latency",
          value: "TODO",
          note: "Will be captured after final model and index lock.",
          isPlaceholder: true,
        },
      ],
      diagram: {
        title: "SecureDocAI Architecture",
        description: "End-to-end offline document intelligence pipeline.",
        nodes: [
          "Documents",
          "Parsing",
          "OCR",
          "Chunking",
          "Embeddings",
          "FAISS",
          "Retrieval",
          "Offline LLM",
          "Answer",
          "Evaluation",
        ],
      },
      screenshots: [
        {
          src: "/images/projects/securedocai-workflow.png",
          alt: "SecureDocAI workflow view with ingestion and retrieval stages",
          caption: "Workflow panel used during retrieval pipeline verification.",
        },
      ],
      lessonsLearned: [
        "Retrieval quality is often a larger lever than model size.",
        "Traceability fields are essential for debugging hallucination-like behavior.",
      ],
      futureImprovements: [
        "Add reranking stage for improved top-k relevance.",
        "Introduce multilingual document support.",
        "Automate regression checks for retrieval quality changes.",
      ],
    },
  },
  {
    id: "operations-data-observatory",
    slug: "operations-data-observatory",
    title: "Operations Data Observatory",
    description:
      "A data-oriented monitoring layer that consolidates process metrics into actionable trend views for faster review cycles.",
    category: "DATA",
    year: "2025",
    status: "In Progress",
    technologies: ["SQL", "Power BI", "Python", "ETL"],
    image: "/images/projects/operations-data-observatory.jpg",
    github: "",
    featured: false,
  },
  {
    id: "metro-ops-automation",
    slug: "metro-ops-automation",
    title: "Metro Operations Automation",
    description:
      "A workflow automation toolkit for reducing manual coordination overhead in transportation operations reporting.",
    category: "AUTOMATION",
    year: "2025",
    status: "Completed",
    technologies: ["Python", "Pandas", "Power BI", "SQL"],
    image: "/images/projects/metro-ops-automation.jpg",
    github: "",
    featured: true,
    caseStudy: {
      overview:
        "Metro Operations Automation reduced repetitive reporting effort by turning manual workflow steps into repeatable scripts and structured outputs.",
      problem:
        "Operations teams were spending substantial time assembling recurring reports from scattered raw inputs.",
      whyItMatters:
        "Reducing manual overhead improves both speed and consistency in environments where timing and reliability matter.",
      role:
        "Built automation scripts, shaped report schemas, and aligned output format with stakeholder review cycles.",
      architecture:
        "Input acquisition, data cleaning, transformation logic, validation checks, and scheduled report export.",
      stack: "Python, Pandas, SQL, Power BI",
      implementation:
        "Implemented modular scripts for extraction and transformation, then connected outputs to dashboard artifacts for downstream consumption.",
      engineeringDecisions: [
        "Kept transformation steps deterministic for repeatability.",
        "Added intermediate validation to catch schema drift early.",
      ],
      challenges: [
        "Input file structures changed across cycles.",
        "Maintaining trust in automated output quality.",
      ],
      solutions: [
        "Added schema checks and graceful fallback handlers.",
        "Introduced review snapshots for auditing outputs.",
      ],
      results:
        "Improved reporting consistency and reduced manual compilation steps in recurring operations workflows.",
      evaluation:
        "Evaluated via process-time comparison and stakeholder review confidence over multiple reporting cycles.",
      metrics: [
        {
          label: "Reporting cycle time reduction",
          value: "TODO",
          note: "Awaiting consolidated baseline from historical logs.",
          isPlaceholder: true,
        },
      ],
      screenshots: [
        {
          src: "/images/projects/metro-ops-dashboard.png",
          alt: "Metro operations reporting dashboard interface",
          caption: "Operational dashboard fed by automated report pipeline.",
        },
      ],
      lessonsLearned: [
        "Automation succeeds when validation is first-class.",
        "Readable outputs are as important as raw execution speed.",
      ],
      futureImprovements: [
        "Add anomaly alerting for unusual report shifts.",
        "Extend pipeline to support additional operations segments.",
      ],
    },
  },
  {
    id: "portfolio-platform",
    slug: "portfolio-platform",
    title: "Portfolio Platform",
    description:
      "A motion-forward personal platform designed as both a narrative surface and a modular engineering playground.",
    category: "WEB APPS",
    year: "2026",
    status: "In Progress",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    image: "/images/projects/portfolio-platform.jpg",
    github: "https://github.com/ajiteshchanna",
    featured: true,
    caseStudy: {
      overview:
        "A narrative-first portfolio platform built as both a presentation layer and an extensible product architecture foundation.",
      problem:
        "Most portfolio templates flatten technical depth, making it hard to communicate systems thinking and implementation quality.",
      whyItMatters:
        "A strong engineering narrative improves trust and helps collaborators quickly understand capability and decision quality.",
      role:
        "Owned end-to-end design and implementation from architecture, data modeling, and component system to motion strategy.",
      architecture:
        "App Router with typed data modules, composable section components, reusable UI primitives, and centralized motion tokens.",
      stack: "Next.js, TypeScript, Tailwind CSS, Framer Motion",
      implementation:
        "Implemented phased delivery with strict type safety and reusable component boundaries, then layered progressive motion and responsive behavior.",
      engineeringDecisions: [
        "Chose data-first content modules to avoid repetitive hardcoded markup.",
        "Built semantic utility typography classes for consistent visual hierarchy.",
        "Separated route-level composition from feature-specific components.",
      ],
      challenges: [
        "Balancing premium motion with readability and performance.",
        "Maintaining consistency while iterating rapidly across phases.",
      ],
      solutions: [
        "Introduced reduced-motion fallbacks for every animated entry path.",
        "Centralized animation variants to keep interaction behavior coherent.",
      ],
      results:
        "Produced a modular platform that can scale into richer case studies, research storytelling, and editorial content without structural rework.",
      evaluation:
        "Validated through build quality gates, route-level checks, and phase-by-phase architecture reviews.",
      metrics: [
        {
          label: "Lighthouse performance",
          value: "TODO",
          note: "To be measured in Phase 14 performance pass.",
          isPlaceholder: true,
        },
      ],
      screenshots: [
        {
          src: "/images/projects/portfolio-home.png",
          alt: "Portfolio homepage hero and section flow",
          caption: "Home route with narrative hierarchy and interaction rhythm.",
        },
      ],
      lessonsLearned: [
        "Intentional content architecture reduces future rework.",
        "Micro-interactions are most effective when they reinforce hierarchy.",
      ],
      futureImprovements: [
        "Add structured benchmarking for content discovery and navigation flow.",
        "Expand visual documentation for architecture decisions.",
      ],
    },
  },
  {
    id: "cinema-insights",
    slug: "cinema-insights",
    title: "Cinema Insights Engine",
    description:
      "An exploratory data and storytelling interface for studying patterns in film language, genres, and audience interpretation.",
    category: "CREATIVE TECH",
    year: "2024",
    status: "Draft",
    technologies: ["Python", "Plotly", "React"],
    image: "/images/projects/cinema-insights.jpg",
    github: "",
    featured: false,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);
