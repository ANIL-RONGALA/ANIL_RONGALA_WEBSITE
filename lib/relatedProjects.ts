import { projects, Project } from "@/lib/projects";

const getTagScore = (currentTags: string[], candidateTags: string[]) => {
  const currentSet = new Set(currentTags.map((tag) => tag.toLowerCase()));
  return candidateTags.reduce((score, tag) => {
    return score + (currentSet.has(tag.toLowerCase()) ? 1 : 0);
  }, 0);
};

export const getRelatedProjects = (
  slug: string,
  limit = 3
): Project[] => {
  const current = projects.find((project) => project.slug === slug);
  if (!current) return [];

  return projects
    .filter((project) => project.slug !== slug)
    .map((project) => {
      const tagScore = getTagScore(current.tags, project.tags);
      const featuredBoost = project.featured ? 0.5 : 0;
      return { project, score: tagScore + featuredBoost };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.project.title.localeCompare(b.project.title);
    })
    .slice(0, limit)
    .map(({ project }) => project);
};
