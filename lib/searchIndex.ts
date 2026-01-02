import { academics } from "@/lib/academics";
import { achievements } from "@/lib/achievements";
import { mediaItems } from "@/lib/media";
import { projects } from "@/lib/projects";

export type SearchIndexItem = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  type: "Project" | "Academic" | "Achievement" | "Media" | "Page";
  tags?: string[];
};

const staticPages: SearchIndexItem[] = [
  {
    id: "page-home",
    title: "Home",
    subtitle: "Overview and featured highlights",
    href: "/",
    type: "Page"
  },
  {
    id: "page-projects",
    title: "Projects",
    subtitle: "Engineering case studies",
    href: "/projects",
    type: "Page"
  },
  {
    id: "page-academics",
    title: "Academics",
    subtitle: "Education and research focus",
    href: "/academics",
    type: "Page"
  },
  {
    id: "page-professional",
    title: "Professional",
    subtitle: "Industry experience and leadership",
    href: "/professional",
    type: "Page"
  },
  {
    id: "page-achievements",
    title: "Achievements",
    subtitle: "Recognition highlights",
    href: "/achievements",
    type: "Page"
  },
  {
    id: "page-media",
    title: "Media",
    subtitle: "Recorded walkthroughs and demos",
    href: "/media",
    type: "Page"
  },
  {
    id: "page-contact",
    title: "Contact",
    subtitle: "Get in touch",
    href: "/contact",
    type: "Page"
  }
];

export function getSearchIndex(): SearchIndexItem[] {
  const projectItems: SearchIndexItem[] = projects.map((project) => ({
    id: `project-${project.slug}`,
    title: project.title,
    subtitle: project.oneLiner,
    href: `/projects/${project.slug}`,
    type: "Project",
    tags: project.tags
  }));

  const academicItems: SearchIndexItem[] = academics.map((entry, index) => ({
    id: `academic-${index}`,
    title: entry.degree,
    subtitle: `${entry.institution} · ${entry.years}`,
    href: "/academics",
    type: "Academic",
    tags: entry.highlights
  }));

  const achievementItems: SearchIndexItem[] = achievements.map((achievement, index) => ({
    id: `achievement-${index}`,
    title: achievement.title,
    subtitle: `${achievement.issuer} · ${achievement.year}`,
    href: achievement.link ?? "/achievements",
    type: "Achievement"
  }));

  const mediaIndexItems: SearchIndexItem[] = mediaItems.map((item, index) => ({
    id: `media-${index}`,
    title: item.title,
    subtitle: item.description,
    href: "/media",
    type: "Media",
    tags: item.tags
  }));

  return [...staticPages, ...projectItems, ...academicItems, ...achievementItems, ...mediaIndexItems];
}
