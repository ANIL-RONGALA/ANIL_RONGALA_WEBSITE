import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { projects } from "@/lib/projects";

const focusAreas = [
  {
    title: "AI-EDA",
    description: "ML-driven verification, bug detection, and design-space exploration workflows.",
    tags: ["ML", "EDA", "Verification"]
  },
  {
    title: "VLSI / RTL",
    description: "Timing-aware digital design, coverage closure, and power/performance trade-offs.",
    tags: ["RTL", "UVM", "PPA"]
  },
  {
    title: "Hardware Security",
    description: "Trust analysis, netlist-level validation, and silicon-safe threat modeling.",
    tags: ["Security", "Netlists", "Trust"]
  },
  {
    title: "Applied ML",
    description: "Model systems that plug directly into engineering workflows and tooling.",
    tags: ["PyTorch", "Systems", "Data"]
  }
];

const systemStatus = [
  { label: "Build", value: "FPGA + RTL stack" },
  { label: "Focus", value: "Verification automation" },
  { label: "Phase", value: "Design-space iteration" },
  { label: "Deploy", value: "Lab + prototype demos" },
  { label: "Next Milestone", value: "ML-guided closure" }
];

export default function HomePage() {
  const featuredProjects = projects.slice(0, 6);

  return (
    <Container>
      <Section className="pt-16 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              RESEARCH • ENGINEERING • SYSTEMS
            </p>
            <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
              Engineering intelligent systems — from silicon to algorithms
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              Designing verification-first silicon workflows, AI-assisted EDA tooling, and applied ML systems that ship.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/projects" variant="primary">
                Engineering Projects
              </ButtonLink>
              <ButtonLink href="/academics" variant="secondary">
                Research & Academics
              </ButtonLink>
            </div>
          </div>
          <Card className="glass space-y-5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">System Status</h2>
              <Badge className="border-border/60 text-foreground/80">Active</Badge>
            </div>
            <div className="space-y-3">
              {systemStatus.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <Badge className="border-border/50 text-foreground/90">{item.value}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section
        className="border-t border-border/60"
        title="Focus Areas"
        subtitle="Four technical lanes guiding current research, prototyping, and verification strategy."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((area) => (
            <Card key={area.title} className="h-full p-6">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">{area.title}</h3>
                <p className="text-sm text-muted-foreground">{area.description}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {area.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        className="border-t border-border/60"
        title="Featured Projects"
        subtitle="Selected builds that reflect how I structure silicon, verification, and ML systems."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <Card key={project.slug} className="flex h-full flex-col p-6">
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.shortDescription}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <div className="mt-5">
                <ButtonLink
                  href={project.externalUrl}
                  variant="ghost"
                  target="_blank"
                  rel="noreferrer"
                  className="border border-border/60"
                >
                  View GitHub
                </ButtonLink>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </Container>
  );
}
