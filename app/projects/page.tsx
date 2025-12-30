import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { projects } from "@/lib/projects";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

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
        subtitle="Case studies with direct proof links to repositories, demos, and research artifacts."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <article
              key={project.slug}
              className="flex h-full flex-col rounded-2xl border border-border/60 bg-background/60 p-6 shadow-sm backdrop-blur transition hover:bg-background/70 hover:shadow-md"
            >
              <div className="flex-1 space-y-3">
                <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.oneLiner}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                {project.proof.slice(0, 3).map((item) => (
                  <Link key={item.label} href={item.url} target="_blank" rel="noreferrer" className="hover:text-foreground">
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-5">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm font-semibold text-foreground hover:text-primary"
                >
                  Read case study →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        className="border-t border-border/60"
        title="All Projects"
        subtitle="Every build includes a documented problem statement, approach, outcome, and proof set."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="flex h-full flex-col rounded-2xl border border-border/60 bg-background/60 p-6 shadow-sm backdrop-blur transition hover:bg-background/70 hover:shadow-md"
            >
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.oneLiner}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                {project.proof.slice(0, 3).map((item) => (
                  <Link key={item.label} href={item.url} target="_blank" rel="noreferrer" className="hover:text-foreground">
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-5">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm font-semibold text-foreground hover:text-primary"
                >
                  Read case study →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </Container>
  );
}
