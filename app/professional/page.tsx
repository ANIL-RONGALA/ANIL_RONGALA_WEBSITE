import type { Metadata } from "next";
import ClientProfessional from "./_client";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageTransition } from "@/components/PageTransition";
import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Professional | ANIL RONGALA WEBSITE",
};

export default function ProfessionalPage() {
  return (
    <Container>
      <Section
        eyebrow="PROFESSIONAL"
        title="Professional Experience"
        subtitle="Verification leadership, lab mentorship, and documented deliverables with supporting evidence."
      >
        <PageTransition>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Link
                href={siteConfig.resumeAcademicUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border/60 px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-muted"
              >
                Request Academic Résumé
              </Link>
              <Link
                href={siteConfig.resumeIndustryUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border/60 px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-muted"
              >
                Request Industry Résumé
              </Link>
            </div>
            <p className="max-w-2xl text-sm text-muted-foreground">
              This page highlights roles, responsibilities, and shipped outcomes from industry and lab experience.
            </p>
            <ClientProfessional />
          </div>
        </PageTransition>
      </Section>
    </Container>
  );
}
