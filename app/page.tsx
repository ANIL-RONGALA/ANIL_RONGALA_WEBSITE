import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProofStrip } from "@/components/ProofStrip";
import { SystemConsole } from "@/components/SystemConsole";
import { siteConfig } from "@/lib/siteConfig";
import { Section } from "@/components/ui/Section";
import { Divider } from "@/components/ui/Divider";
import { MotionCard } from "@/components/ui/MotionCard";
import { PageTransition } from "@/components/PageTransition";

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

  const highlights = [
    {
      title: "Verification Depth",
      description: "UVM-driven coverage closure with proof-backed artifacts."
    },
    {
      title: "AI for Hardware",
      description: "Applied ML pipelines for verification and EDA workflow automation."
    },
    {
      title: "Interface Theme",
      description: "Dark neon styling with glassmorphism panels and a structured layout."
    }
  ];

  return (
    <Container>
      <Section className="pt-16 sm:pt-20">
        <PageTransition>
          <div className="grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-start">
            <div className="space-y-6">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                RESEARCH • ENGINEERING • SYSTEMS
              </p>
              <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
                Research-focused{" "}
                <span className="gradient-accent bg-clip-text text-transparent">engineering</span> portfolio.
              </h1>
              <p className="max-w-2xl text-base text-muted-foreground">
                VLSI, RTL verification, AI-driven EDA, and applied ML — organized as a clean, structured interface.
              </p>
              <p className="max-w-2xl text-sm text-muted-foreground">
                Projects link to repos/demos; media highlights talks and builds.
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/projects" variant="primary">
                  Selected Work
                </ButtonLink>
                <ButtonLink href="/academics" variant="secondary">
                  Research & Academics
                </ButtonLink>
                <ButtonLink href="/contact" variant="ghost">
                  Contact
                </ButtonLink>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">System Highlights</p>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {highlights.map((item) => (
                    <MotionCard key={item.title} className="p-4">
                      <p className="text-sm font-semibold text-foreground">{item.title}</p>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-3">{item.description}</p>
                    </MotionCard>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute -top-6 right-2 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
              <SystemConsole />
            </div>
          </div>
        </PageTransition>
      </Section>

      <Divider className="my-4 sm:my-6" />

      <Section
        eyebrow="PROOF"
        title="Proof Points"
        subtitle="Direct evidence across repositories, research context, and collaboration access."
      >
        <ProofStrip items={proofItems} />
      </Section>
    </Container>
  );
}
