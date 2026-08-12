import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/hero/Hero";
import { SITE_URL } from "@/lib/site";

const WhatIDoAccordion = dynamic(
  () => import("@/components/sections/WhatIDoAccordion").then((module) => module.WhatIDoAccordion),
);

const FeaturedProjects = dynamic(
  () => import("@/components/sections/FeaturedProjects").then((module) => module.FeaturedProjects),
);

const AboutPreview = dynamic(
  () => import("@/components/sections/AboutPreview").then((module) => module.AboutPreview),
);

const ExperiencePreview = dynamic(
  () => import("@/components/sections/ExperiencePreview").then((module) => module.ExperiencePreview),
);

const ResearchPreview = dynamic(
  () => import("@/components/sections/ResearchPreview").then((module) => module.ResearchPreview),
);

const ContactCTA = dynamic(
  () => import("@/components/sections/ContactCTA").then((module) => module.ContactCTA),
);

const SystemMonitor = dynamic(
  () => import("@/components/sections/SystemMonitor").then((module) => module.SystemMonitor),
);

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ajitesh Channa",
  jobTitle: "AI Engineer and Creative Technologist",
  url: SITE_URL,
  sameAs: [
    "https://github.com/ajiteshchanna",
    "https://linkedin.com/in/ajiteshchanna",
  ],
  knowsAbout: [
    "Artificial intelligence",
    "Retrieval augmented generation",
    "Automation engineering",
    "Data systems",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ajitesh Channa Portfolio",
  url: SITE_URL,
};

export const metadata: Metadata = {
  title: "Home",
  description:
    "AI engineer and creative technologist portfolio focused on practical systems, case studies, and research-led engineering.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ajitesh Channa | AI Engineer and Creative Technologist",
    description:
      "Explore AI systems, automation projects, and engineering case studies by Ajitesh Channa.",
    url: "/",
  },
  twitter: {
    title: "Ajitesh Channa | AI Engineer and Creative Technologist",
    description:
      "Explore AI systems, automation projects, and engineering case studies by Ajitesh Channa.",
  },
};

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Hero />
      <WhatIDoAccordion />
      <FeaturedProjects />
      <AboutPreview />
      <ExperiencePreview />
      <ResearchPreview />
      <SystemMonitor />
      <ContactCTA />
    </main>
  );
}
