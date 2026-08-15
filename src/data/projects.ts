import type { Project } from "@/types";

export const PROJECTS: Project[] = [
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
    github: "https://github.com/ajiteshchanna/SecureDocExperiments",
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
    id: "spidey-store",
    slug: "spidey-store",
    title: "Spidey Store",
    description:
      "An AI-powered conversational commerce platform that translates natural-language shopping intent into structured product retrieval and recommendations.",
    category: "AI/ML",
    year: "",
    status: "In Progress",
    technologies: [
      "Python",
      "FastAPI",
      "Pydantic AI",
      "MongoDB Atlas",
      "Groq",
      "Qwen 2.5 32B",
      "Pydantic",
      "Logfire",
      "Vanilla JavaScript",
      "CSS",
    ],
    image: "",
    github: "https://github.com/ajiteshchanna/Spidey-Store",
    demo: "",
    featured: false,
    caseStudy: {
      overview:
        "Spidey Store demonstrates conversational shopping by mapping free-form user queries to structured MongoDB filters and dynamic recommendations.",
      problem:
        "Traditional e-commerce search often fails for semantic requests like style, color, and budget combinations expressed in natural language.",
      whyItMatters:
        "Conversational retrieval makes discovery faster and more intuitive by preserving context across turns instead of forcing users through rigid filters.",
      role:
        "Built an end-to-end AI shopping assistant with multi-turn memory, retrieval orchestration, and a recommendation workflow.",
      architecture:
        "Decoupled FastAPI orchestration from retrieval and recommendation services: ProductSearchFilters -> ProductFilterNormalizer -> MongoQueryBuilder -> ProductSearchService, with a separate RecommendationService and SimilarityScorer.",
      stack:
        "Python 3.10+, FastAPI, Pydantic AI, MongoDB Atlas, Groq (Qwen 2.5 32B), Pydantic v2, Logfire, Vanilla JS, CSS",
      implementation:
        "Implemented Text2NoSQL filter extraction, colloquial term normalization, and modular query execution to support context-aware product search and recommendation flows.",
      engineeringDecisions: [
        "Separated AI orchestration from retrieval and recommendation modules to keep the system extensible.",
        "Used schema-enforced filter extraction to convert unstructured chat into validated query inputs.",
        "Added observability with Logfire for tracing latency, database calls, and LLM tool behavior.",
      ],
      challenges: [
        "Interpreting ambiguous natural-language shopping intent reliably.",
        "Maintaining context continuity across multi-turn queries.",
        "Normalizing colloquial terms into canonical catalog attributes.",
      ],
      solutions: [
        "Built a structured retrieval pipeline with filter parsing, normalization, and query-building stages.",
        "Introduced a memory layer and context merger to persist session constraints across turns.",
        "Implemented content-based recommendation scoring across category, color, price, and ratings.",
      ],
      results:
        "Delivers context-aware conversational shopping and includes one-click seeding of 500+ products for rapid end-to-end testing.",
      evaluation:
        "Behavior is validated through interactive chat flows, structured retrieval outputs, and recommendation response checks documented in the API workflow.",
      metrics: [
        {
          label: "Seed dataset size",
          value: "500+ products",
        },
      ],
      diagram: {
        title: "Spidey Store Architecture",
        description:
          "AI orchestration, structured retrieval, recommendation scoring, and MongoDB-backed product discovery flow.",
        nodes: [
          "Frontend",
          "FastAPI",
          "Pydantic AI Agent",
          "Memory Layer",
          "ProductSearchFilters",
          "ProductFilterNormalizer",
          "MongoQueryBuilder",
          "ProductSearchService",
          "RecommendationService",
          "SimilarityScorer",
          "MongoDB Atlas",
        ],
      },
      lessonsLearned: [
        "Natural-language shopping benefits from strict schema mapping before query execution.",
        "Conversation memory materially improves multi-turn retrieval relevance.",
      ],
      futureImprovements: [
        "Hybrid lexical plus vector search integration.",
        "Image-based product search workflows.",
        "Voice-driven shopping input.",
        "Authentication for persistent preference profiles.",
        "Redis-backed distributed session caching.",
      ],
    },
  },
  {
    id: "attendanceiq",
    slug: "attendanceiq",
    title: "AttendanceIQ",
    description:
      "A full-stack attendance management platform with OTP-based verification, session-aware validation, analytics dashboards, and CSV export workflows.",
    category: "WEB APPS",
    year: "",
    status: "In Progress",
    technologies: [
      "Python 3.11+",
      "FastAPI",
      "Uvicorn",
      "Supabase",
      "PostgreSQL",
      "Pandas",
      "Pydantic Settings",
      "React 18",
      "Vite 5",
      "Tailwind CSS",
      "Axios",
      "Recharts",
      "Framer Motion",
      "JWT",
      "SMTP",
    ],
    image: "",
    github: "https://github.com/ajiteshchanna/smart-attendance-system",
    demo: "",
    featured: false,
    caseStudy: {
      overview:
        "AttendanceIQ streamlines classroom and lab attendance with class/session controls, OTP email verification, and reporting workflows.",
      problem:
        "Manual attendance processes are error-prone and make it difficult to enforce enrollment, prevent duplicates, and generate reliable reports.",
      whyItMatters:
        "A validated attendance pipeline improves data integrity for academic operations while reducing administrative overhead.",
      role:
        "Built a full-stack platform across backend APIs, frontend dashboards, and attendance verification workflows.",
      architecture:
        "Layered architecture: React frontend -> FastAPI routers -> service layer -> repository layer -> Supabase PostgreSQL, with SMTP integration for OTP delivery and optional GitHub export integration.",
      stack:
        "FastAPI, Supabase PostgreSQL, React, Vite, Tailwind CSS, Axios, Recharts, Framer Motion, JWT auth, SMTP",
      implementation:
        "Implemented class management, attendance session lifecycle handling, OTP request/verify endpoints, enrollment-aware checks, duplicate prevention per session, analytics views, and CSV export paths.",
      engineeringDecisions: [
        "Used a router -> service -> repository separation to keep business rules testable and scoped.",
        "Modeled attendance with session-aware validation to enforce active-window and per-session constraints.",
        "Applied OTP verification over email before attendance write operations to improve identity assurance.",
      ],
      challenges: [
        "Maintaining strict validation across class open state, session status, enrollment, and duplicate limits.",
        "Handling OTP expiry and delivery dependencies within the attendance flow.",
        "Keeping attendance data exportable for downstream reporting needs.",
      ],
      solutions: [
        "Introduced a deterministic request-otp -> verify-otp pipeline with guardrails at each stage.",
        "Used session-scoped code validation and enrollment checks before OTP generation.",
        "Added analytics matrix endpoints and CSV export workflows for operational reporting.",
      ],
      results:
        "Delivers an end-to-end attendance workflow from class open/close control through OTP-verified marking and report generation.",
      evaluation:
        "Validated via documented API workflows for attendance request/verification, session lifecycle handling, and analytics/export routes.",
      diagram: {
        title: "AttendanceIQ System Flow",
        description:
          "Frontend, FastAPI layers, data persistence, and integrations used in OTP-based attendance operations.",
        nodes: [
          "Student/Admin UI",
          "React Frontend",
          "FastAPI Routers",
          "Service Layer",
          "Repository Layer",
          "Supabase PostgreSQL",
          "SMTP Email Server",
          "GitHub Export",
        ],
      },
      lessonsLearned: [
        "Session-aware constraints are essential for preventing duplicate and invalid attendance writes.",
        "Clear layering improves maintainability for rule-heavy backend workflows.",
      ],
      futureImprovements: [
        "Expand operational observability for OTP delivery and verification failures.",
        "Harden export automation paths for broader reporting integrations.",
      ],
    },
  },
  {
    id: "project-scaffold-agent",
    slug: "project-scaffold-agent",
    title: "Project Scaffold Agent",
    description:
      "A CLI utility that generates nested project structures from JSON or YAML configs with dry-run safety and overwrite protection.",
    category: "AUTOMATION",
    year: "",
    status: "In Progress",
    technologies: ["Python", "JSON", "YAML", "PyPI", "CLI"],
    image: "",
    github: "https://github.com/ajiteshchanna/project-scaffold-agent",
    demo: "",
    featured: false,
    caseStudy: {
      overview:
        "Project Scaffold Agent automates project bootstrapping by converting declarative structure files into real folder and file trees.",
      problem:
        "Manual creation of nested directories and starter files is repetitive and error-prone during project setup.",
      whyItMatters:
        "Standardized scaffolding improves setup speed and consistency across hackathons, templates, and multi-service projects.",
      role:
        "Designed and implemented a modular CLI workflow for parsing, validation, preview, and file-system execution.",
      architecture:
        "Module split: main.py for CLI orchestration, parser.py for JSON/YAML ingestion, validator.py for safety checks, executor.py for file operations, and utils.py for shared helpers.",
      stack: "Python, JSON, YAML, PyPI packaging, CLI",
      implementation:
        "Implemented recursive folder/file generation, dry-run simulation, tree preview output, and force-gated overwrite behavior for safer execution.",
      engineeringDecisions: [
        "Kept parser, validator, and executor responsibilities separate to support future extensibility.",
        "Added dry-run mode to verify operations before touching the filesystem.",
        "Required an explicit force flag for overwrite scenarios to reduce destructive mistakes.",
      ],
      challenges: [
        "Handling deeply nested structures from multiple config formats consistently.",
        "Balancing automation speed with safeguards for existing directories.",
        "Keeping CLI output understandable before execution.",
      ],
      solutions: [
        "Unified JSON and YAML parsing into a shared internal structure model.",
        "Introduced tree preview and dry-run paths for preflight validation.",
        "Applied explicit overwrite protection with a force-flag gate.",
      ],
      results:
        "Provides a reusable pip-installable scaffolding tool that automates project structure creation with safety controls.",
      evaluation:
        "Verified through configuration-driven scaffold generation, dry-run simulations, and overwrite-protection flows.",
      lessonsLearned: [
        "Declarative scaffolding benefits from strict validation before execution.",
        "Safety flags are essential in developer automation tools that modify the filesystem.",
      ],
      futureImprovements: [
        "Template variable injection for dynamic placeholder replacement.",
        "Natural-language project description parsing.",
        "Boilerplate code generation and LLM planning integration.",
      ],
    },
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);
