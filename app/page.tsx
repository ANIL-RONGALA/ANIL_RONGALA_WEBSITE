import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProofStrip } from "@/components/ProofStrip";
import { SystemConsole } from "@/components/SystemConsole";
import { siteConfig } from "@/lib/siteConfig";

export default function HomePage() {
  const proofItems = [
    {
      title: "Code",
      description: "Primary repos, verification harnesses, and ML tooling.",
      href: siteConfig.githubUrl,
      external: true
    },
    {
      title: "Research",
      description: "Academic focus, coursework evidence, and credentials.",
      href: "/academics"
    },
    {
      title: "Contact",
      description: "Direct line for collaboration or technical review.",
      href: "/contact"
    }
  ];

  return (
    <Container>
      <section className="pt-16 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
              RESEARCH / ENGINEERING / SYSTEMS
            </p>
            <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
              Engineering intelligent systems.
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              VLSI • AI-driven EDA • verification • applied ML — documented with proof, not hype.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/projects" variant="primary">
                Selected Work
              </ButtonLink>
              <ButtonLink href="/academics" variant="secondary">
                Research & Academics
              </ButtonLink>
            </div>
          </div>
          <SystemConsole />
        </div>
        <div className="mt-10 border-t border-border/60 pt-8">
          <ProofStrip items={proofItems} />
        </div>
      </section>
    </Container>
  );
}
