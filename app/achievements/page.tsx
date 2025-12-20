import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from "@/components/PageShell";
import { achievements } from "@/lib/achievements";

export const metadata: Metadata = {
  title: "Achievements | ANIL RONGALA WEBSITE",
};

export default function AchievementsPage() {
  return (
    <PageShell>
      <PageTransition>
        <div className="space-y-10">
          <PageHeader
            title="Achievements"
            subtitle="Recognition across research showcases, competitions, and verification excellence."
          />
          <p className="max-w-2xl text-sm text-muted-foreground">
            This page highlights measurable outcomes across research, competitions, and verification work.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {achievements.map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col rounded-2xl border bg-background/60 p-6 shadow-sm backdrop-blur"
              >
                <h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.description}</p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent-cyan)] transition-colors duration-300 hover:text-[var(--accent-pink)]"
                  >
                    View
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </PageTransition>
    </PageShell>
  );
}
