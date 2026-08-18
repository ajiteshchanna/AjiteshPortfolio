import type { Metadata } from "next";
import {
  AboutBeyondSystem,
  AboutHero,
  AboutHowIBuild,
  AboutInterests,
  AboutPhilosophy,
  AboutTimeline,
  AboutVisualStatement,
} from "@/components/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Ajitesh Channa's engineering philosophy, technical interests, and creative approach to building meaningful systems.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Ajitesh Channa",
    description:
      "Engineering philosophy, technical interests, and creative identity behind Ajitesh Channa's work.",
    url: "/about",
  },
  twitter: {
    title: "About | Ajitesh Channa",
    description:
      "Engineering philosophy, technical interests, and creative identity behind Ajitesh Channa's work.",
  },
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutHowIBuild />
      <AboutPhilosophy />
      <AboutInterests />
      <AboutTimeline />
      <AboutBeyondSystem />
      <AboutVisualStatement />
    </main>
  );
}
