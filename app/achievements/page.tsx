import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { achievements } from "@/lib/achievements";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { MotionCard } from "@/components/ui/MotionCard";

export const metadata: Metadata = {
  title: "Achievements | ANIL RONGALA WEBSITE",
};

export default function AchievementsPage() {
  return (
    <Container>
      <Section
        eyebrow="HIGHLIGHTS"
        title="Achievements"
        subtitle="Recognition highlights with direct links to documented evidence."
      >
        <PageTransition>
          <div className="space-y-8">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Measurable outcomes: milestones, awards, and high-impact deliverables.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((item) => (
                <MotionCard key={item.title} className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-foreground line-clamp-2">{item.title}</h3>
                    <Badge className="border-border/60 text-[0.65rem] uppercase tracking-[0.2em]">
                      {item.year}
                    </Badge>
                  </div>
                  <p className="mt-2 truncate text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    {item.issuer}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{item.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge className="border-border/60">{item.issuer}</Badge>
                    </div>
                    {item.link ? (
                      <Link
                        href={item.link}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 text-sm font-semibold text-foreground transition-colors duration-200 hover:text-accent hover:underline"
                      >
                        Open →
                      </Link>
                    ) : null}
                  </div>
                </MotionCard>
              ))}
            </div>
          </div>
        </PageTransition>
      </Section>
    </Container>
  );
}
