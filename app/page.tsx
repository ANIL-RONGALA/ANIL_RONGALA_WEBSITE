import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProofStrip } from "@/components/ProofStrip";
import { SystemConsole } from "@/components/SystemConsole";
import { siteConfig } from "@/lib/siteConfig";
import { Section } from "@/components/ui/Section";
import { Divider } from "@/components/ui/Divider";
import { MotionCard } from "@/components/ui/MotionCard";
import { PageTransition } from "@/components/PageTransition";
import { now } from "@/lib/now";
import Link from "next/link";

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

  const systemChips = [
    { label: "Signal", value: now.status },
    { label: "Mode", value: now.focus[0] },
    { label: "Session", value: `Updated ${now.updated}` }
  ];

  const exploreLinks = [
    { title: "Projects", href: "/projects", hint: "case studies + proof links" },
    { title: "Academics", href: "/academics", hint: "notes + structure" },
    { title: "Professional", href: "/professional", hint: "teaching + lab" },
    { title: "Media", href: "/media", hint: "demos + talks" }
  ];

  return (
    <Container>
      <Section className="pt-16 sm:pt-20">
        <PageTransition>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
            <div className="min-w-0 space-y-6">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                RESEARCH • ENGINEERING • SYSTEMS
              </p>
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <span className="rounded-full border border-border/60 bg-card px-3 py-1 text-foreground">
                  Now: {now.status}
                </span>
                <span className="rounded-full border border-border/60 bg-background/60 px-3 py-1">
                  Updated {now.updated}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                {systemChips.map((chip) => (
                  <span
                    key={chip.label}
                    className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-[10px] text-foreground/80"
                  >
                    {chip.label}: {chip.value}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Research-focused{" "}
                <span className="neon-accent">engineering</span> portfolio.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                VLSI, RTL verification, AI-driven EDA, and applied ML — organized as a clean, structured interface.
              </p>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
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
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">{item.description}</p>
                    </MotionCard>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative w-full max-w-[420px] space-y-4 lg:justify-self-end">
              <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-6 right-2 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
              </div>
              <SystemConsole />
              <div className="group rounded-2xl border border-border/70 bg-card/60 p-5 shadow-sm transition duration-300 hover:border-[hsl(var(--accent)/0.45)] hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Explore</h3>
                  <span className="text-xs font-mono uppercase text-muted-foreground">quick links</span>
                </div>
                <div className="mt-4 space-y-3">
                  {exploreLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className="group/link flex items-center justify-between rounded-xl border border-border/60 bg-background/50 px-3 py-2 text-sm text-foreground transition duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:bg-muted/40"
                    >
                      <div>
                        <p className="font-semibold">{link.title}</p>
                        <p className="text-xs text-muted-foreground">{link.hint}</p>
                      </div>
                      <span className="text-xs text-muted-foreground transition duration-200 group-hover/link:translate-x-1 group-hover/link:text-accent">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
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
