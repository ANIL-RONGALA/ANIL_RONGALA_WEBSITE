import type { Metadata } from "next";
import ClientAcademics from "./_client";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Academics | ANIL RONGALA WEBSITE",
};

export default function AcademicsPage() {
  return (
    <Container>
      <Section
        eyebrow="ACADEMICS"
        title="Academic Journey"
        subtitle="Formal education and research tracks with evidence links and documented coursework."
      >
        <PageTransition>
          <div className="space-y-6">
            <p className="max-w-2xl text-sm text-muted-foreground">
              This page documents coursework, research foundations, and academic milestones that shaped my technical focus.
            </p>
            <ClientAcademics />
          </div>
        </PageTransition>
      </Section>
    </Container>
  );
}
