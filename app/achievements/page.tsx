import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { SectionHeader } from "@/components/SectionHeader";
import { achievements } from "@/lib/achievements";

export const metadata: Metadata = {
  title: "Achievements | ANIL RONGALA WEBSITE",
};

export default function AchievementsPage() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <SectionHeader
          title="Achievements"
          subtitle="Recognition across research showcases, competitions, and verification excellence."
        />
        <div className="grid gap-8 sm:grid-cols-2">
          {achievements.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-8 shadow-lg transition-colors duration-500 backdrop-blur dark:shadow-[0_0_24px_rgba(34,211,238,0.18)]"
            >
              <h3 className="text-lg font-bold text-[var(--accent-cyan)]">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-700 transition-colors duration-300 dark:text-gray-300">{item.description}</p>
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
  );
}
