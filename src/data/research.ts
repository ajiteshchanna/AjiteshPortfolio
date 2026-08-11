export interface ResearchMetric {
  label: string;
  value: string;
  note?: string;
  isPlaceholder?: boolean;
}

export interface ResearchSection {
  title: string;
  body: string;
}

export interface ResearchPipelineStep {
  id: string;
  label: string;
  detail: string;
}

export const RESEARCH_HERO = {
  eyebrow: "Research",
  title: "SecureDocAI: Private Document Intelligence",
  lead:
    "A research-driven effort focused on retrieval-first question answering for sensitive document environments.",
  summary:
    "The goal is to build a practical, offline-capable architecture where answers remain grounded, traceable, and policy-aligned.",
};

export const RESEARCH_PIPELINE_STEPS: ResearchPipelineStep[] = [
  {
    id: "documents",
    label: "Documents",
    detail: "Source reports, notes, and procedural text are collected with context metadata.",
  },
  {
    id: "parsing",
    label: "Parsing",
    detail: "Document structure is extracted and normalized for downstream processing.",
  },
  {
    id: "ocr",
    label: "OCR",
    detail: "Image-based pages are converted to searchable text where extraction fails.",
  },
  {
    id: "chunking",
    label: "Chunking",
    detail: "Text is segmented into context windows that preserve semantic continuity.",
  },
  {
    id: "embeddings",
    label: "Embeddings",
    detail: "Chunks are transformed into vector representations for similarity retrieval.",
  },
  {
    id: "faiss",
    label: "FAISS",
    detail: "Vectors are indexed for low-latency local semantic search.",
  },
  {
    id: "retrieval",
    label: "Retrieval",
    detail: "Top-ranked context is selected with metadata-aware filtering.",
  },
  {
    id: "offline-llm",
    label: "Offline LLM",
    detail: "A local model generates responses conditioned on retrieved context.",
  },
  {
    id: "answer",
    label: "Answer",
    detail: "Responses are structured for readability and source-grounding checks.",
  },
  {
    id: "evaluation",
    label: "Evaluation",
    detail: "Outputs are reviewed for relevance, grounding, and consistency.",
  },
];

export const RESEARCH_OBJECTIVE: ResearchSection = {
  title: "Objective",
  body:
    "Design a private-by-default retrieval and answering workflow for teams that cannot rely on external cloud AI services for sensitive document analysis.",
};

export const RESEARCH_EXPERIMENTS: ResearchSection = {
  title: "Experiments",
  body:
    "Experiments focused on chunk sizing, overlap behavior, retrieval depth, and prompt constraints to improve answer grounding while preserving response speed in local deployment conditions.",
};

export const RESEARCH_FAILURE_ANALYSIS: ResearchSection = {
  title: "Failure Analysis",
  body:
    "Observed failure modes include OCR noise propagation, weak retrieval under sparse phrasing, and occasional response overgeneralization when evidence context is under-specified.",
};

export const RESEARCH_FUTURE_WORK: ResearchSection = {
  title: "Future Work",
  body:
    "Planned work includes reranking integration, multilingual document support, automated retrieval regression checks, and stronger citation-level confidence tracing.",
};

export const RESEARCH_METRICS: ResearchMetric[] = [
  {
    label: "Grounded answer rate",
    value: "TODO",
    note: "Pending validated benchmark suite definition.",
    isPlaceholder: true,
  },
  {
    label: "Retrieval latency (median)",
    value: "TODO",
    note: "To be measured after final index and model configuration lock.",
    isPlaceholder: true,
  },
  {
    label: "Citation consistency",
    value: "TODO",
    note: "Requires rubric finalization for multi-document answers.",
    isPlaceholder: true,
  },
];
