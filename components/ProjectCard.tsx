'use client';

import { Project } from '@/lib/projects';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

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
      className="flex h-full flex-col rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 shadow-lg transition-colors duration-500 backdrop-blur dark:shadow-[0_0_24px_rgba(34,211,238,0.2)]"
    >
      <div className="flex flex-1 flex-col">
        <h3 className="text-xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-slate-700 transition-colors duration-300 dark:text-slate-300">{project.oneLiner}</p>
        <p className="mt-3 text-sm text-slate-600 transition-colors duration-300 dark:text-slate-400">{project.outcome}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-200/50 px-3 py-1 text-xs font-mono text-blue-800 transition-colors duration-300 dark:bg-cyan-500/10 dark:text-cyan-200"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3">
          <Link
            href={project.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 transition-colors duration-300 hover:bg-blue-200 dark:bg-cyan-500/20 dark:text-cyan-100 dark:hover:bg-cyan-500/30"
          >
            <FaExternalLinkAlt className="text-xs" />
            View Project
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
