export interface AboutTimelineItem {
  id: string;
  period: string;
  title: string;
  description: string;
}

export interface AboutBeyondSystemEntry {
  title: string;
  subtitle?: string;
  label?: string;
  description?: string;
}

export interface AboutBeyondSystemItem {
  number: string;
  category: string;
  entries: AboutBeyondSystemEntry[];
}

export interface AboutBeyondSystemSection {
  eyebrow: string;
  title: string;
  items: AboutBeyondSystemItem[];
}

export const ABOUT_INTRO = {
  eyebrow: "About",
  title: "Engineering Depth, Creative Intent",
  lead:
    "I'm an AI engineer and creative technologist interested in building intelligent systems that are technically rigorous, useful in practice, and thoughtfully designed.",
  summary:
    "My work sits at the intersection of artificial intelligence, software engineering, data, and storytelling. I enjoy going deep into a problem — understanding how a system should work, building it, testing it, and finding ways to make the experience around it feel simple.",
};

export const ABOUT_PERSPECTIVES = [
  {
    id: "philosophy",
    title: "Engineering Philosophy",
    body:
      "I prefer understanding the system before optimizing the solution. I build with clear architecture, small validated iterations, and measurable outcomes — because good engineering should remain understandable, testable, and maintainable.",
  },
  {
    id: "motivation",
    title: "What Drives Me",
    body:
      "I'm drawn to problems where technology can turn complexity into clarity. I care less about building something simply because it is technically impressive, and more about whether it solves a real problem and creates something people can actually use.",
  },
] as const;

export const ABOUT_TECHNICAL_INTERESTS = [
  "AI Engineering & Generative AI",
  "LLM and RAG system design",
  "Document intelligence and retrieval",
  "AI agents and intelligent workflows",
  "Data-driven product engineering",
  "Full-stack AI applications",
] as const;

export const ABOUT_EDUCATION = [
  "B.Tech in Artificial Intelligence & Data Science",
  "Gati Shakti Vishwavidyalaya, Vadodara",
  "Specialization in Transportation & Logistics",
  "Building a foundation across AI, data, software engineering, and real-world transportation systems.",
] as const;

export const ABOUT_CREATIVE_INTERESTS = [
  "Storytelling through cinema and writing",
  "Screenwriting and narrative design",
  "AI × Film & Media",
  "Visual storytelling and digital experiences",
  "Exploring the intersection of technology and human emotion",
] as const;

export const ABOUT_CURRENT_FOCUS = [
  "Building deeper expertise in AI engineering",
  "Developing retrieval-first and agentic AI systems",
  "Turning research experiments into usable products",
  "Strengthening production-grade software engineering",
  "Exploring AI applications across creative and media industries",
] as const;

export const ABOUT_TIMELINE: AboutTimelineItem[] = [
  {
    id: "foundation",
    period: "The Foundation",
    title: "From Curiosity to Engineering",
    description:
      "Started by exploring how software and digital systems work, gradually developing a stronger foundation in programming, data, and problem solving through academic projects and experimentation.",
  },
  {
    id: "real-world-exposure",
    period: "Real-World Exposure",
    title: "Learning Beyond the Classroom",
    description:
      "Internships and real-world projects introduced me to the difference between building something that works and building something that can actually be used, maintained, communicated, and improved.",
  },
  {
    id: "ai-shift",
    period: "The AI Shift",
    title: "From Building Software to Building Intelligence",
    description:
      "Moved deeper into artificial intelligence, exploring machine learning, NLP, retrieval systems, generative AI, and intelligent workflows — with a growing focus on understanding systems rather than simply using models.",
  },
  {
    id: "builder",
    period: "The Builder",
    title: "Turning Experiments Into Systems",
    description:
      "Began building more ambitious systems across document intelligence, AI agents, recommendation engines, automation, and full-stack applications — focusing increasingly on architecture, evaluation, and real-world usability.",
  },
  {
    id: "creative-thread",
    period: "The Creative Thread",
    title: "Where Technology Meets Storytelling",
    description:
      "Alongside engineering, I kept returning to writing, cinema, and storytelling. That creative practice changed how I think about technology — not only as something to engineer, but as something that can communicate, create emotion, and shape experiences.",
  },
  {
    id: "now",
    period: "Now",
    title: "Building at the Intersection",
    description:
      "Today, I'm focused on becoming a stronger AI engineer while exploring the intersection of intelligent systems, product engineering, and creative technology — building things that are technically deep, practically useful, and distinctly human.",
  },
];

export const ABOUT_BEYOND_SYSTEM: AboutBeyondSystemSection = {
  eyebrow: "BEYOND THE SYSTEM",
  title: "The work, people, and experiences that shaped how I build.",
  items: [
    {
      number: "01",
      category: "LEADERSHIP",
      entries: [
        {
          title: "Co-Coordinator - Drama Club, GSV",
          description:
            "Coordinated and directed stage plays and reel-film activities, working across creative teams to bring performances from concept to execution.",
        },
        {
          title: "Co-Coordinator Public Relations- Literary Club, GSV",
          description:
            "Managed public relations activities for the Literary Club, coordinating with media and promoting events, ensuring effective communication and engagement on social media handle of Literary Club GSV.",
        },
        {
          title: "Organizing Team - Hult Prize GSV",
          description:
            "Contributed to the organizing team for the campus edition of the Hult Prize, supporting event coordination, logistics, and participant engagement.",
        },
      ],
    },
    {
      number: "02",
      category: "RECOGNITION",
      entries: [
        {
          title: "ET GenAI Hackathon",
          label: "SEMI-FINALIST",
          description: "Advanced to the semi-final round of the Economic Times GenAI Hackathon.",
        },
        {
          title: "Indian Air Force Workshop",
          label: "40+ PARTICIPANTS",
          description:
            "Conducted a Power BI training workshop for 40+ Indian Air Force officers, focusing on data visualization and analytical dashboard development for strategic decision-making.",
        },
      ],
    },
    {
      number: "03",
      category: "LEARNING",
      entries: [
        {
          title: "NVIDIA",
          subtitle: "Fundamentals of Deep Learning",
        },
        {
          title: "NVIDIA",
          subtitle: "Computer Vision for Industrial Inspection - 2025",
        },
        {
          title: "IBM",
          subtitle: "AI Fundamentals",
        },
        {
          title: "IBM",
          subtitle: "Prompt Engineering for Everyone",
        },
      ],
    },
  ],
};
