import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { Divider } from "@/components/ui/Divider";

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

  if (!project) {
    notFound();
  }

  return (
    <Container>
      <Section
        className="pt-16 sm:pt-20"
        eyebrow="Case Study"
        title={project.title}
        subtitle={project.oneLiner}
      >
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </Section>

      <Divider className="my-4 sm:my-6" />

      <Section className="pt-0">
        <div className="grid gap-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Problem</h2>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">{project.problem}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Approach</h2>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">{project.approach}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Outcome</h2>
            <p className="max-w-2xl leading-relaxed text-muted-foreground">{project.outcome}</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Proof</h2>
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
        </div>
      </Section>
    </Container>
  );
}
