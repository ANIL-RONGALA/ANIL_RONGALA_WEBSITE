'use client';

import { Project } from '@/lib/projects';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaExternalLinkAlt, FaYoutube } from 'react-icons/fa';

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
      className="neon-border flex h-full flex-col rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur"
    >
      {project.image ? (
        <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl border border-white/10">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col">
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-slate-300">{project.shortDescription}</p>
        <p className="mt-3 text-sm text-slate-400">{project.longDescription}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-3">
          <Link
            href={project.externalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/30"
          >
            <FaExternalLinkAlt className="text-xs" />
            View Project
          </Link>
          {project.youtubeUrl ? (
            <Link
              href={project.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-red-400/50 px-4 py-2 text-sm text-red-200 transition hover:bg-red-500/10"
            >
              <FaYoutube /> Watch Demo
            </Link>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
