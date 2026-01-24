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
            className="rounded-full border border-border/70 bg-muted/40 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wide text-muted"
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
        <p className="text-sm leading-relaxed text-muted line-clamp-3">{highlight.detail}</p>
        {highlight.proofUrl ? (
          <div className="flex items-center">
            <a
              href={highlight.proofUrl}
              target="_blank"
              rel="noreferrer"
              className="group ring-accent neon-ring relative inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-[11px] font-mono uppercase tracking-wide text-muted transition duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:bg-muted hover:neon-text"
            >
              Proof
              <span className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-full border border-border/70 bg-background/80 px-2 py-1 text-[11px] text-muted opacity-0 transition group-hover:opacity-100">
                Open Proof
              </span>
            </a>
          </div>
        ) : null}
      </div>
    )
  }));

  return (
    <Container>
      <Section
        eyebrow="PERSONAL"
        title="Profile"
        subtitle="Personal context behind the engineering log, values, and long-term goals."
      >
        <div className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted">{profileData.name}</p>
                <h3 className="line-clamp-2 text-2xl font-semibold tracking-tight text-body sm:text-3xl">
                  {profileData.headline}
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-muted line-clamp-3">{profileData.summary}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.focusAreas.slice(0, 3).map((area) => (
                  <span
                    key={area.title}
                    className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-[11px] font-mono uppercase tracking-wide text-muted"
                  >
                    {area.title}
                  </span>
                ))}
              </div>
            </div>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-body">Profile Console</h4>
                <span className="text-xs font-mono uppercase tracking-wide text-muted">status</span>
              </div>
              <div className="mt-4 space-y-3 text-sm text-muted">
                <div className="flex items-center justify-between border-b border-border/60 pb-2 font-mono text-xs uppercase tracking-wide">
                  <span>Focus</span>
                  <span className="text-body">AI-driven EDA / RTL verification</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/60 pb-2 font-mono text-xs uppercase tracking-wide">
                  <span>Base</span>
                  <span className="text-body">University of Houston</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/60 pb-2 font-mono text-xs uppercase tracking-wide">
                  <span>Role</span>
                  <span className="text-body">Lead TA</span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wide">
                  <span>Availability</span>
                  <span className="text-body">Open to PhD / RA</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Domains", detail: "VLSI / Verification / ML" },
              { title: "Tooling", detail: "SystemVerilog, UVM, Python" },
              { title: "Output", detail: "Projects, Demos, Reports" }
            ].map((item) => (
              <Card key={item.title} className="p-4">
                <p className="text-xs font-mono uppercase tracking-wide text-muted">{item.title}</p>
                <p className="mt-2 text-sm font-semibold text-body">{item.detail}</p>
              </Card>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-body">Summary</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{profileData.summary}</p>
              </Card>
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-body">Focus & Growth</h3>
                  <span className="text-xs font-mono uppercase tracking-wide text-muted">interactive</span>
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
                <h3 className="text-lg font-semibold text-body">Quick Links</h3>
                <div className="mt-4 space-y-3">
                  <CopyField label="Email" value={profileData.links.email} href={`mailto:${profileData.links.email}`} />
                  <CopyField label="GitHub" value={profileData.links.github} href={profileData.links.github} />
                  <CopyField label="LinkedIn" value={profileData.links.linkedin} href={profileData.links.linkedin} />
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Link
                      href={profileData.links.resumeAcademic}
                      className="ring-accent neon-ring rounded-2xl border border-border/70 bg-background/40 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-body transition duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:bg-muted/70 hover:neon-text"
                    >
                      Academic Resume
                    </Link>
                    <Link
                      href={profileData.links.resumeIndustry}
                      className="ring-accent neon-ring rounded-2xl border border-border/70 bg-background/40 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-body transition duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:bg-muted/70 hover:neon-text"
                    >
                      Industry Resume
                    </Link>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-body">Skill Matrix</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">Grouped tooling to keep projects moving fast.</p>
                <div className="mt-4">
                  <Accordion items={skillItems} defaultOpenIds={profileData.skills[0] ? [profileData.skills[0].group] : []} />
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-body">Highlights</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">Recent milestones and proof points.</p>
                <div className="mt-4">
                  <Accordion items={highlightItems} />
                </div>
              </Card>
            </div>
          </div>

          <Card className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-body">Explore more</h3>
              <p className="text-sm leading-relaxed text-muted">
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
