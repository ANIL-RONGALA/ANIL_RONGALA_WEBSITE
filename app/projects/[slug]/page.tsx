import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { Divider } from "@/components/ui/Divider";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TableOfContents } from "@/components/TableOfContents";
import { CopyButton } from "@/components/ui/CopyButton";
import { getRelatedProjects } from "@/lib/relatedProjects";
import { ProjectCard } from "@/components/ProjectCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    return { title: "Project | ANIL RONGALA WEBSITE" };
  }

  return {
    title: `${project.title} | ANIL RONGALA WEBSITE`,
    description: project.oneLiner
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((item) => item.slug === params.slug);
  const relatedProjects = getRelatedProjects(params.slug, 3);
  const headings = [
    { id: "problem", title: "Problem", level: 2 },
    { id: "approach", title: "Approach", level: 2 },
    { id: "outcome", title: "Outcome", level: 2 },
    { id: "proof", title: "Proof", level: 2 },
  ];

  if (!project) {
    notFound();
  }

  return (
    <Container>
      <ReadingProgress />
      <Section
        className="pt-16 sm:pt-20"
        eyebrow="Case Study"
        title={project.title}
        subtitle={project.oneLiner}
      >
        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
          <CopyButton
            text={`https://anil-rongala.vercel.app/projects/${project.slug}`}
            label="Copy link"
          />
        </div>
      </Section>

      <Divider className="my-4 sm:my-6" />

      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[3fr,1fr] lg:items-start">
          <article id="case-study" className="space-y-8">
            <div className="space-y-2">
              <h2 id="problem" className="text-2xl font-semibold text-foreground sm:text-3xl">
                Problem
              </h2>
              <p className="max-w-2xl leading-relaxed text-muted-foreground">
                {project.problem}
              </p>
            </div>
            <div className="space-y-2">
              <h2 id="approach" className="text-2xl font-semibold text-foreground sm:text-3xl">
                Approach
              </h2>
              <p className="max-w-2xl leading-relaxed text-muted-foreground">
                {project.approach}
              </p>
            </div>
            <div className="space-y-2">
              <h2 id="outcome" className="text-2xl font-semibold text-foreground sm:text-3xl">
                Outcome
              </h2>
              <p className="max-w-2xl leading-relaxed text-muted-foreground">
                {project.outcome}
              </p>
            </div>
            <div className="space-y-3">
              <h2 id="proof" className="text-2xl font-semibold text-foreground sm:text-3xl">
                Proof
              </h2>
              <div className="flex flex-wrap gap-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                {project.proof.map((item) => (
                  <Link
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 text-foreground transition-colors duration-200 hover:text-accent hover:underline"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </article>
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <TableOfContents headings={headings} />
              <div className="rounded-2xl border border-border/70 bg-card p-5 text-xs text-muted-foreground">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Share
                </p>
                <p className="mt-3 text-sm text-foreground">
                  Send this case study to collaborators or reviewers.
                </p>
                <CopyButton
                  className="mt-4 w-full justify-center"
                  text={`https://anil-rongala.vercel.app/projects/${project.slug}`}
                  label="Copy link"
                />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {relatedProjects.length ? (
        <>
          <Divider className="my-4 sm:my-6" />
          <Section
            eyebrow="Related"
            title="Related Projects"
            subtitle="More case studies with overlapping focus areas."
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((item) => (
                <ProjectCard key={item.slug} project={item} />
              ))}
            </div>
          </Section>
        </>
      ) : null}
    </Container>
  );
}
