import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { personalProfile } from "@/lib/personal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { MotionCard } from "@/components/ui/MotionCard";

export const metadata: Metadata = {
  title: 'Personal | ANIL RONGALA WEBSITE'
};

export default function PersonalPage() {
  return (
    <Container>
      <Section
        eyebrow="PERSONAL"
        title="Inside the Lab"
        subtitle="Personal context behind the engineering log, values, and long-term goals."
      >
        <PageTransition>
          <div className="space-y-8">
            <MotionCard className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">Bio</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{personalProfile.bio}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">Values</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {personalProfile.values.map((value) => (
                    <li key={value} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)]" />
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionCard>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <MotionCard className="h-full p-6">
                <h3 className="text-xl font-semibold text-foreground">Interests</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {personalProfile.interests.map((interest) => (
                    <li key={interest} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)]" />
                      <span>{interest}</span>
                    </li>
                  ))}
                </ul>
              </MotionCard>
              <MotionCard className="h-full p-6">
                <h3 className="text-xl font-semibold text-foreground">Goals</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {personalProfile.goals.map((goal) => (
                    <li key={goal} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)]" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </MotionCard>
            </div>
          </div>
        </PageTransition>
      </Section>
    </Container>
  );
}
