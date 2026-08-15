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
];

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);
