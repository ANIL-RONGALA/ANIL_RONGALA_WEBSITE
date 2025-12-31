import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { achievements } from "@/lib/achievements";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Achievements | ANIL RONGALA WEBSITE",
};

export default function AchievementsPage() {
  return (
    <Container>
      <Section
        eyebrow="HIGHLIGHTS"
        title="Achievements"
        subtitle="Recognition highlights with direct links to documented case-study evidence."
      >
        <PageTransition>
          <div className="space-y-8">
            <p className="max-w-2xl text-sm text-muted-foreground">
              This page highlights measurable outcomes across research, competitions, and verification work.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {achievements.map((item) => (
                <div
                  key={item.title}
                  className="flex h-full flex-col rounded-2xl border bg-background/60 p-6 shadow-sm backdrop-blur transition hover:bg-background/70 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-foreground line-clamp-2">{item.title}</h3>
                  <p className="mt-1 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    {item.issuer} · {item.year}
                  </p>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.description}</p>
                  {item.link ? (
                    <Link href={item.link} className="mt-4 inline-flex">
                      <Badge className="border-border/60">View</Badge>
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </PageTransition>
      </Section>
    </Container>
  );
}
