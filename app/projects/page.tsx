import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { projects } from "@/lib/projects";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Divider } from "@/components/ui/Divider";
import { MotionCard } from "@/components/ui/MotionCard";

export const metadata: Metadata = {
  title: "Projects | ANIL RONGALA WEBSITE"
};

export default function ProjectsPage() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <Container>
      <Section
        eyebrow="PROJECTS"
        title="Selected Work"
        subtitle="Case studies with direct links to repositories, demos, and research artifacts."
      >
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted">
          External links point to GitHub repos or hosted demos. Each entry is a compact case-study.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <MotionCard key={project.slug} className="flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold text-body line-clamp-2">{project.title}</h3>
                <Badge className="border-border/60 text-[0.65rem] uppercase tracking-[0.2em]">Featured</Badge>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-3">{project.oneLiner}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted">
                  {project.proof.slice(0, 2).map((item) => (
                    <Link
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="ring-accent neon-ring text-body transition-colors duration-200 hover:neon-text hover:underline"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="ring-accent neon-ring text-sm font-semibold text-body transition-colors duration-200 hover:neon-text hover:underline"
                >
                  Open →
                </Link>
              </div>
            </MotionCard>
          ))}
        </div>
      </Section>

      <Divider className="my-4 sm:my-6" />

      <Section
        title="All Projects"
        subtitle="Every build includes a documented problem statement, approach, outcome, and proof set."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <MotionCard key={project.slug} className="flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-body line-clamp-2">{project.title}</h3>
                <Badge className="border-border/60 text-[0.65rem] uppercase tracking-[0.2em]">Case Study</Badge>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted line-clamp-3">{project.oneLiner}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted">
                  {project.proof.slice(0, 2).map((item) => (
                    <Link
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="ring-accent neon-ring text-body transition-colors duration-200 hover:neon-text hover:underline"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="ring-accent neon-ring text-sm font-semibold text-body transition-colors duration-200 hover:neon-text hover:underline"
                >
                  Open →
                </Link>
              </div>
            </MotionCard>
          ))}
        </div>
      </Section>
    </Container>
  );
}
