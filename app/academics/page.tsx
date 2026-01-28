import type { Metadata } from "next";
import ClientAcademics from "./_client";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageTransition } from "@/components/PageTransition";
import { TableOfContents } from "@/components/TableOfContents";

export const metadata: Metadata = {
  title: "Academics | ANIL RONGALA WEBSITE",
};

export default function AcademicsPage() {
  const headings = [
    { id: "programs", title: "Programs", level: 2 },
    { id: "research-focus", title: "Research Focus", level: 2 },
  ];

  return (
    <Container>
      <Section
        eyebrow="ACADEMICS"
        title="Academic Journey"
        subtitle="Formal education and research tracks organized for quick reference and verification."
      >
        <PageTransition>
          <div className="grid gap-8 lg:grid-cols-[3fr,1fr] lg:items-start">
            <article id="academics" className="space-y-6">
              <p className="max-w-2xl text-sm text-muted-foreground">
                Coursework and research notes aligned with AI for hardware and verification.
              </p>
              <div className="space-y-4">
                <h2 id="programs" className="text-2xl font-semibold text-foreground">
                  Programs
                </h2>
                <ClientAcademics />
              </div>
              <div className="space-y-3">
                <h2 id="research-focus" className="text-2xl font-semibold text-foreground">
                  Research Focus
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Emphasis areas include AI-driven EDA, RTL verification strategy, and
                  reproducible hardware research with documented proof points.
                </p>
              </div>
            </article>
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>
        </PageTransition>
      </Section>
    </Container>
  );
}
