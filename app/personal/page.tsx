import type { Metadata } from 'next';
import { PageTransition } from '@/components/PageTransition';
import { PageShell } from '@/components/PageShell';
import { SectionHeader } from '@/components/SectionHeader';
import { personalProfile } from '@/lib/personal';

export const metadata: Metadata = {
  title: 'Personal | ANIL RONGALA WEBSITE'
};

export default function PersonalPage() {
  return (
    <PageShell>
      <PageTransition>
        <div className="space-y-10">
          <SectionHeader
            title="Inside the Lab"
            subtitle="A warmer pulse of the engineer guiding circuits, teams, and storytelling."
          />
          <div className="grid grid-cols-1 gap-6 rounded-3xl border border-amber-200 bg-amber-50 p-8 text-left transition-colors duration-500 backdrop-blur md:grid-cols-2 dark:border-amber-500/20 dark:bg-amber-500/10">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">Bio</h3>
              <p className="text-sm leading-relaxed text-amber-800 transition-colors duration-300 dark:text-amber-100/80">{personalProfile.bio}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">Values</h3>
              <ul className="space-y-2 text-sm text-amber-800 transition-colors duration-300 dark:text-amber-100/80">
                {personalProfile.values.map((value) => (
                  <li key={value} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400 dark:bg-amber-300" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 transition-colors duration-500 backdrop-blur">
              <h3 className="text-xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">Interests</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 transition-colors duration-300 dark:text-slate-300">
                {personalProfile.interests.map((interest) => (
                  <li key={interest} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>{interest}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 transition-colors duration-500 backdrop-blur">
              <h3 className="text-xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">Goals</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 transition-colors duration-300 dark:text-slate-300">
                {personalProfile.goals.map((goal) => (
                  <li key={goal} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PageTransition>
    </PageShell>
  );
}
