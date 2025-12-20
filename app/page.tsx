import Link from "next/link";
import { FocusAreas } from "@/components/FocusAreas";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { RecentWork } from "@/components/RecentWork";
import { SystemStatus } from "@/components/SystemStatus";

export default function HomePage() {
  return (
    <PageShell>
      <div className="space-y-12">
        <div className="space-y-8">
          <PageHeader
            eyebrow="RESEARCH • ENGINEERING • SYSTEMS"
            title="Engineering intelligent systems — from silicon to algorithms"
            subtitle="A curated interface of my work in VLSI, AI-driven EDA, verification, and applied machine learning."
          />

          <p className="max-w-2xl text-sm text-muted-foreground">
            This site documents projects, research experiments, and engineering decisions — not marketing demos.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-full bg-foreground px-5 py-2 text-sm text-background transition hover:opacity-90"
            >
              Engineering Projects
            </Link>
            <Link
              href="/academics"
              className="rounded-full border px-5 py-2 text-sm transition hover:bg-muted"
            >
              Research & Academics
            </Link>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-start">
          <div className="space-y-10">
            <FocusAreas />
            <RecentWork />
          </div>
          <SystemStatus />
        </div>
      </div>
    </PageShell>
  );
}
