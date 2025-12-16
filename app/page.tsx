import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { siteConfig } from "@/lib/siteConfig";

const highlights = [
  {
    title: "AI + EDA",
    description: "Verification automation, RTL analysis"
  },
  {
    title: "Hardware Security",
    description: "Trustworthy design flows"
  },
  {
    title: "Systems + ML",
    description: "Models that ship, not papers only"
  }
];

const systemStatuses = [
  { label: "Build", value: "Stable" },
  { label: "Focus", value: "Content + Sections" },
  { label: "Next", value: "Projects / Media" },
  { label: "Deploy", value: "Vercel Preview" }
];

export default function HomePage() {
  return (
    <PageShell className="space-y-12">
      <div className="grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-start">
        <div className="space-y-8">
          <PageHeader
            eyebrow="DIGITAL NEURAL BOARD"
            title={`Welcome to the futuristic interface of ${siteConfig.ownerName}`}
            subtitle={siteConfig.tagline}
          />

          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-foreground px-5 py-2 text-sm text-background transition hover:opacity-90"
            >
              View Projects
            </Link>
            <Link
              href="/academics"
              className="rounded-full border px-5 py-2 text-sm transition hover:bg-muted"
            >
              See Academics
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="space-y-2 rounded-2xl border bg-background/60 p-4 shadow-sm backdrop-blur"
              >
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              This is the current staging version of my personal website. The focus right now is getting a clean,
              reliable build and deployment pipeline.
            </p>
            <p>
              Sections for projects, research, and experiments will be added and refined in future iterations.
            </p>
          </div>
        </div>

        <div className="space-y-5 rounded-2xl border bg-background/60 p-6 shadow-sm backdrop-blur">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">System Status</p>
            <h3 className="text-2xl font-semibold text-foreground">Operational</h3>
          </div>
          <div className="space-y-3">
            {systemStatuses.map((status) => (
              <div
                key={status.label}
                className="flex items-center justify-between rounded-xl bg-muted/50 px-3 py-2"
              >
                <span className="text-sm text-muted-foreground">{status.label}</span>
                <span className="text-xs rounded-full border px-2 py-1">{status.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
