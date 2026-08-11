import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/experience";
import { EXPERIENCE } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "A timeline of professional engineering contributions focused on reliability, reporting automation, and measurable operations outcomes.",
  alternates: {
    canonical: "/experience",
  },
  openGraph: {
    title: "Experience | Ajitesh Channa",
    description:
      "Professional journey covering internship and deployment-impact engineering work.",
    url: "/experience",
  },
  twitter: {
    title: "Experience | Ajitesh Channa",
    description:
      "Professional journey covering internship and deployment-impact engineering work.",
  },
};

export default function ExperiencePage() {
  return (
    <main>
      <section className="section-gap pb-0" aria-labelledby="experience-page-heading">
        <div className="container-page">
          <p className="type-label text-accent">Experience</p>
          <h1 id="experience-page-heading" className="mt-4 type-h1 text-fg max-w-4xl">
            Professional Journey and Outcomes
          </h1>
          <p className="mt-5 type-body-lg text-fg-secondary max-w-3xl">
            A focused timeline of engineering contributions across internship and deployment contexts,
            with emphasis on execution quality, reliability, and measurable workflow improvements.
          </p>
        </div>
      </section>

      <ExperienceTimeline items={EXPERIENCE} />
    </main>
  );
}
