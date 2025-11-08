import type { Metadata } from 'next';
import PageTransition from '@/components/PageTransition';
import { SectionHeader } from '@/components/SectionHeader';
import { achievements } from '@/lib/achievements';

export const metadata: Metadata = {
  title: 'Achievements | ANIL RONGALA WEBSITE'
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
            <div key={item.title} className="neon-border rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-cyan-200">
                  {item.issuer} · {item.year}
                </p>
                <p className="text-sm leading-relaxed text-slate-300">{item.description}</p>
                {item.link ? (
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200 hover:text-cyan-100"
                  >
                    View Details
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
