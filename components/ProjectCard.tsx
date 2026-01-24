'use client';

import { Project } from '@/lib/projects';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { Badge } from '@/components/ui/Badge';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex h-full flex-col rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 shadow-lg transition duration-300 backdrop-blur hover:border-[hsl(var(--accent)/0.45)] hover:neon-glow"
    >
      <div className="flex flex-1 flex-col">
        <h3 className="text-xl font-semibold text-body">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.oneLiner}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.outcome}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3">
          <Link
            href={project.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="ring-accent neon-ring inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent)/0.35)] bg-[hsl(var(--accent)/0.12)] px-4 py-2 text-sm font-medium text-body transition duration-200 hover:border-[hsl(var(--accent)/0.5)] hover:bg-[hsl(var(--accent)/0.18)] hover:neon-text hover:neon-glow"
          >
            <FaExternalLinkAlt className="text-xs" />
            View Project
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
