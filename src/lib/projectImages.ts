import type { Project, ProjectCaseStudyScreenshot } from "@/types";

const KNOWN_PROJECT_IMAGE_PATHS = new Set<string>([]);

function isRenderableImagePath(path: string): boolean {
  const normalizedPath = path.trim();
  return normalizedPath.length > 0
    && normalizedPath.startsWith("/")
    && KNOWN_PROJECT_IMAGE_PATHS.has(normalizedPath);
}

export function getProjectImages(project: Pick<Project, "image_true" | "images">): string[] {
  if (!project.image_true) {
    return [];
  }

  return project.images.filter(isRenderableImagePath);
}

export function getProjectScreenshots(project: Project): ProjectCaseStudyScreenshot[] {
  const images = getProjectImages(project);
  if (images.length === 0) {
    return [];
  }

  const screenshotMetadata = new Map(
    (project.caseStudy?.screenshots ?? [])
      .filter((screenshot) => isRenderableImagePath(screenshot.src))
      .map((screenshot) => [screenshot.src, screenshot]),
  );

  return images.map((src, index) => {
    const screenshot = screenshotMetadata.get(src);

    if (screenshot) {
      return screenshot;
    }

    return {
      src,
      alt: `${project.title} screenshot ${index + 1}`,
    };
  });
}