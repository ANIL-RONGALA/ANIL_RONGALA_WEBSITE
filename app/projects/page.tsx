import type { Metadata } from 'next';
import { PageTransition } from '@/components/PageTransition';
import { ProjectCard } from '@/components/ProjectCard';
import { SectionHeader } from '@/components/SectionHeader';
import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects | ANIL RONGALA WEBSITE'
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <SectionHeader
          title="Projects"
          subtitle="Explore silicon, embedded, and verification builds with external repositories and demos."
        />
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
