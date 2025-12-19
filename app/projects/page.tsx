import type { Metadata } from 'next';
import { PageTransition } from '@/components/PageTransition';
import { PageShell } from '@/components/PageShell';
import { ProjectCard } from '@/components/ProjectCard';
import { SectionHeader } from '@/components/SectionHeader';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects | ANIL RONGALA WEBSITE'
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageTransition>
        <div className="space-y-10">
          <SectionHeader
            title="Projects"
            subtitle="Explore silicon, embedded, and verification builds with external repositories and demos."
          />
          <p className="max-w-2xl text-sm text-muted-foreground">
            This page gathers build-ready projects, demos, and repositories that show applied engineering outcomes.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </PageTransition>
    </PageShell>
  );
}
