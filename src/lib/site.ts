const DEFAULT_SITE_URL = "https://ajiteshchanna.com";

function resolveSiteUrl(): string {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!candidate) {
    return DEFAULT_SITE_URL;
  }

  try {
    const parsed = new URL(candidate);
    return parsed.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = resolveSiteUrl();

export const SITE_METADATA = {
  name: "Ajitesh Channa Portfolio",
  title: "Ajitesh Channa - AI Engineer and Creative Technologist",
  description:
    "Portfolio of Ajitesh Channa featuring AI engineering, research systems, automation work, and technical storytelling.",
  author: "Ajitesh Channa",
  ogImageAlt: "Ajitesh Channa portfolio preview",
};
