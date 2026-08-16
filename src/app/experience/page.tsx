import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/experience";
import { EXPERIENCE } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "A timeline of the environments, internships, and independent engineering work that have shaped how I build — from transportation to enterprise analytics to AI systems.",
  alternates: {
    canonical: "/experience",
  },
  openGraph: {
    title: "Experience | Ajitesh Channa",
    description:
      "Professional and independent engineering journey across data visualization, AI systems, and creative technology.",
    url: "/experience",
  },
  twitter: {
    title: "Experience | Ajitesh Channa",
    description:
      "Professional and independent engineering journey across data visualization, AI systems, and creative technology.",
  },
};

export default function ExperiencePage() {
  return (
    <main>
      <section className="section-gap pb-0" aria-labelledby="experience-page-heading">
        <div className="container-page">
          <p className="type-label text-accent">Experience</p>
          <h1 id="experience-page-heading" className="mt-4 type-h1 text-fg max-w-4xl">
            Engineering in the Real World
          </h1>
          <p className="mt-5 type-body-lg text-fg-secondary max-w-3xl">
            From early exposure to transportation engineering to working with enterprise data and analytics,
            each experience has shaped how I approach problems, build systems, and work with technology.
          </p>
        </div>
      </section>

      <ExperienceTimeline items={EXPERIENCE} />
    </main>
  );
}
