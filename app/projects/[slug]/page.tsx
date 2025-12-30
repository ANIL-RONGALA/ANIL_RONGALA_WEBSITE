import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

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
      <section className="py-16 sm:py-20">
        <div className="space-y-4">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">Case Study</p>
          <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">{project.title}</h1>
          <p className="max-w-2xl text-muted-foreground">{project.oneLiner}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Problem</h2>
            <p className="text-sm text-muted-foreground">{project.problem}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Approach</h2>
            <p className="text-sm text-muted-foreground">{project.approach}</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Outcome</h2>
            <p className="text-sm text-muted-foreground">{project.outcome}</p>
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Proof</h2>
            <div className="flex flex-wrap gap-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
              {project.proof.map((item) => (
                <Link key={item.label} href={item.url} target="_blank" rel="noreferrer" className="hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
