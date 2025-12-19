"use client";
import type { Metadata } from 'next';
import { PageTransition } from '@/components/PageTransition';
import { SectionHeader } from '@/components/SectionHeader';
import { academics } from '@/lib/academics';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
  title: 'Academics | ANIL RONGALA WEBSITE'
};

export default function AcademicsPage() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <SectionHeader
          title="Academic Journey"
          subtitle="Formal education and research tracks building the foundation for silicon innovation."
        />
        <p className="max-w-2xl text-sm text-muted-foreground">
          This page documents coursework, research foundations, and academic milestones that shaped my technical focus.
        </p>
        <div className="space-y-8">
          {academics.map((entry) => (
            <motion.article
              key={entry.degree}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-8 shadow-lg transition-colors duration-500 backdrop-blur dark:shadow-[0_0_24px_rgba(34,211,238,0.2)]"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <h3 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">{entry.degree}</h3>
                <p className="text-sm text-[var(--accent-cyan)]">{entry.years}</p>
              </div>
              <p className="mt-3 text-sm text-slate-700 transition-colors duration-300 dark:text-slate-300">{entry.institution}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 transition-colors duration-300 dark:text-slate-300">{entry.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 transition-colors duration-300 dark:text-slate-300">
                {entry.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
