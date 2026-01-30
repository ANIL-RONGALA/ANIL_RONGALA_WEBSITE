import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProfileTabs } from "@/components/profile/ProfileTabs";
import { Accordion } from "@/components/profile/Accordion";
import { CopyField } from "@/components/profile/CopyField";
import { profileData } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Personal | ANIL RONGALA WEBSITE"
};

export default function PersonalPage() {
  const skillItems = profileData.skills.map((group) => ({
    id: group.group,
    title: group.group,
    body: (
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border/70 bg-muted/40 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wide text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    )
  }));

  const highlightItems = profileData.highlights.map((highlight) => ({
    id: highlight.title,
    title: highlight.title,
    body: (
      <div className="space-y-3">
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{highlight.detail}</p>
        {highlight.proofUrl ? (
          <div className="flex items-center">
            <a
              href={highlight.proofUrl}
              target="_blank"
              rel="noreferrer"
              className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 relative inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-[11px] font-mono uppercase tracking-wide text-muted-foreground transition duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:bg-muted hover:text-accent"
            >
              Proof
              <span className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-full border border-border/70 bg-background/80 px-2 py-1 text-[11px] text-muted-foreground opacity-0 transition group-hover:opacity-100">
                Open Proof
              </span>
            </a>
          </div>
        ) : null}
      </div>
    )
  }));

  const profilePanels = [
    {
      title: "Domains",
      detail: "VLSI / Verification / ML",
      hoverDetail: "Signal: cross-domain validation."
    },
    {
      title: "Tooling",
      detail: "SystemVerilog, UVM, Python",
      hoverDetail: "Proof: reusable lab playbooks."
    },
    {
      title: "Output",
      detail: "Projects, Demos, Reports",
      hoverDetail: "Detail: project-linked artifacts."
    }
  ];

  return (
    <Container>
      <Section
        eyebrow="PERSONAL"
        title="Profile"
        subtitle="Personal context behind the engineering log, values, and long-term goals."
      >
        <div className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)]">
            <Card className="group relative overflow-hidden p-6">
              <span className="pointer-events-none absolute left-0 top-0 h-[2px] w-full -translate-x-full bg-[hsl(var(--accent)/0.5)] opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              <div className="space-y-3">
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">{profileData.name}</p>
                <h3 className="line-clamp-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {profileData.headline}
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground line-clamp-3">{profileData.summary}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {profileData.focusAreas.slice(0, 3).map((area) => (
                  <span
                    key={area.title}
                    className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-[11px] font-mono uppercase tracking-wide text-muted-foreground"
                  >
                    {area.title}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs font-mono uppercase tracking-wide text-muted-foreground opacity-0 transition duration-300 group-hover:opacity-100">
                Detail: {profileData.focusAreas[0]?.title}
              </p>
            </Card>
            <Card className="group relative overflow-hidden p-6">
              <span className="pointer-events-none absolute left-0 top-0 h-[2px] w-full -translate-x-full bg-[hsl(var(--accent)/0.5)] opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">System Panel</h4>
                <span className="text-xs font-mono uppercase tracking-wide text-muted-foreground">dossier</span>
              </div>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center justify-between border-b border-border/60 pb-2 font-mono text-xs uppercase tracking-wide">
                  <span>Focus</span>
                  <span className="text-foreground">{profileData.focusAreas[0]?.title}</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/60 pb-2 font-mono text-xs uppercase tracking-wide">
                  <span>Status</span>
                  <span className="text-foreground">Open to PhD / RA</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/60 pb-2 font-mono text-xs uppercase tracking-wide">
                  <span>Base</span>
                  <span className="text-foreground">University of Houston</span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wide">
                  <span>Contact</span>
                  <span className="text-foreground">{profileData.links.email}</span>
                </div>
              </div>
              <p className="mt-4 text-xs font-mono uppercase tracking-wide text-muted-foreground opacity-0 transition duration-300 group-hover:opacity-100">
                Signal: Verified portfolio links.
              </p>
            </Card>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {profilePanels.map((item) => (
              <Card key={item.title} className="group relative overflow-hidden p-4">
                <span className="pointer-events-none absolute left-0 top-0 h-[2px] w-full -translate-x-full bg-[hsl(var(--accent)/0.5)] opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">{item.title}</p>
                <p className="mt-2 text-sm font-semibold text-foreground">{item.detail}</p>
                <p className="mt-2 text-xs font-mono uppercase tracking-wide text-muted-foreground opacity-0 transition duration-300 group-hover:opacity-100">
                  {item.hoverDetail}
                </p>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Focus / Skills / Timeline</h3>
                  <span className="text-xs font-mono uppercase tracking-wide text-muted-foreground">interactive</span>
                </div>
                <div className="mt-4">
                  <ProfileTabs
                    focusAreas={profileData.focusAreas}
                    skills={profileData.skills}
                    timeline={profileData.timeline}
                  />
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
                <div className="mt-4 space-y-3">
                  <CopyField label="Email" value={profileData.links.email} href={`mailto:${profileData.links.email}`} />
                  <CopyField label="GitHub" value={profileData.links.github} href={profileData.links.github} />
                  <CopyField label="LinkedIn" value={profileData.links.linkedin} href={profileData.links.linkedin} />
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Link
                      href={profileData.links.resumeAcademic}
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-2xl border border-border/70 bg-background/40 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-foreground transition duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:bg-muted/70 hover:text-accent"
                    >
                      Academic Resume
                    </Link>
                    <Link
                      href={profileData.links.resumeIndustry}
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-2xl border border-border/70 bg-background/40 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-foreground transition duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:bg-muted/70 hover:text-accent"
                    >
                      Industry Resume
                    </Link>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground">Skill Matrix</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Grouped tooling to keep projects moving fast.</p>
                <div className="mt-4">
                  <Accordion items={skillItems} defaultOpenIds={profileData.skills[0] ? [profileData.skills[0].group] : []} />
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground">Highlights</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Recent milestones and proof points.</p>
                <div className="mt-4">
                  <Accordion items={highlightItems} />
                </div>
              </Card>
            </div>
          </div>

          <Card className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Explore more</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Dive into project work or start a conversation about research collaboration.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/projects" variant="primary">
                View Projects
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact
              </ButtonLink>
              <ButtonLink href={profileData.links.github} variant="ghost" target="_blank" rel="noreferrer">
                Open GitHub
              </ButtonLink>
            </div>
          </Card>
        </div>
      </Section>
    </Container>
  );
}
