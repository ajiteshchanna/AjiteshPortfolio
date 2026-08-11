import type { ExperienceItem } from "@/types";

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "siemens-internship",
    organization: "Siemens",
    role: "Engineering Intern",
    duration: "2025",
    location: "India",
    responsibilities: [
      "Supported engineering analysis and reporting workflows used by internal teams.",
      "Contributed implementation improvements to internal tooling and data preparation routines.",
      "Collaborated with cross-functional stakeholders to translate requirements into reliable deliverables.",
    ],
    technologies: ["Python", "Power BI", "SQL"],
    achievements: [
      "Delivered maintainable scripts for recurring technical tasks and report preparation.",
      "Improved operational signal visibility through clearer dashboard outputs.",
    ],
    impact:
      "Contributed to faster turnaround in routine engineering insight cycles by reducing repeated manual reporting effort.",
  },
  {
    id: "dmrc-deployment",
    organization: "DMRC Deployment Context",
    role: "Systems Deployment Contributor",
    duration: "2025",
    location: "India",
    responsibilities: [
      "Worked on deployment-related technical coordination in a rail operations environment.",
      "Assisted with reliability-focused implementation and deployment documentation tasks.",
    ],
    technologies: ["Automation", "Monitoring", "Documentation"],
    achievements: [
      "Helped maintain consistency across deployment process steps and handover checkpoints.",
      "Reduced friction in repeatable operational workflows through clearer process structure.",
    ],
    impact:
      "Supported smoother execution in a high-dependency operations context by improving process clarity and deployment coordination.",
  },
];
