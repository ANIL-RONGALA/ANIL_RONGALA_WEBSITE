import type { Metadata } from 'next';
import { PageTransition } from '@/components/PageTransition';
import { SectionHeader } from '@/components/SectionHeader';
import { personalProfile } from '@/lib/personal';

export const metadata: Metadata = {
  title: 'Personal | ANIL RONGALA WEBSITE'
};

export default function PersonalPage() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <SectionHeader
          title="Inside the Lab"
          subtitle="A warmer pulse of the engineer guiding circuits, teams, and storytelling."
        />
        <div className="grid gap-8 rounded-3xl border border-amber-500/20 bg-amber-500/10 p-8 text-left backdrop-blur md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">Bio</h3>
            <p className="text-sm leading-relaxed text-amber-100/80">{personalProfile.bio}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">Values</h3>
            <ul className="space-y-2 text-sm text-amber-100/80">
              {personalProfile.values.map((value) => (
                <li key={value} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300" />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="neon-border rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-xl font-semibold text-white">Interests</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              {personalProfile.interests.map((interest) => (
                <li key={interest} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>{interest}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="neon-border rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-xl font-semibold text-white">Goals</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
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
  );
}
