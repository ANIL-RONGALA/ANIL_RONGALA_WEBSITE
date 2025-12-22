"use client";
import type { Metadata } from 'next';
import { PageTransition } from '@/components/PageTransition';
import { PageHeader } from "@/components/PageHeader";
import { professionalHistory } from '@/lib/professional';
import { siteConfig } from '@/lib/siteConfig';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Professional | ANIL RONGALA WEBSITE'
};

export default function ProfessionalPage() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <PageHeader
          title="Professional Experience"
          subtitle="Coverage-driven verification leadership, lab mentorship, and silicon-ready deliverables."
        />
        <div className="flex flex-wrap gap-3">
          <Link
            href={siteConfig.resumeAcademicUrl}
            className="rounded-full border border-pink-300 bg-pink-50 px-4 py-2 text-xs font-semibold text-pink-700 transition-colors duration-300 hover:bg-pink-100 dark:border-fuchsia-500/40 dark:bg-fuchsia-500/10 dark:text-fuchsia-100 dark:hover:bg-fuchsia-500/20"
          >
            Request Academic Résumé
          </Link>
          <Link
            href={siteConfig.resumeIndustryUrl}
            className="rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700 transition-colors duration-300 hover:bg-emerald-100 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-100 dark:hover:bg-emerald-500/20"
          >
            Request Industry Résumé
          </Link>
        </div>
        <p className="max-w-2xl text-sm text-muted-foreground">
          This page highlights roles, responsibilities, and shipped outcomes from industry and lab experience.
        </p>
        <div className="space-y-8">
          {professionalHistory.map((role) => (
            <motion.article
              key={role.role}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-8 shadow-lg transition-colors duration-500 backdrop-blur dark:shadow-[0_0_24px_rgba(34,211,238,0.2)]"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">{role.role}</h3>
                  <p className="text-sm text-slate-700 transition-colors duration-300 dark:text-slate-300">{role.organization}</p>
                </div>
                <p className="text-sm text-[var(--accent-cyan)]">
                  {role.start} – {role.end}
                </p>
              </div>
              <p className="mt-3 text-sm text-slate-700 transition-colors duration-300 dark:text-slate-300">{role.location}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-700 transition-colors duration-300 dark:text-slate-300">{role.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {role.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 transition-colors duration-300 dark:bg-cyan-500/20 dark:text-cyan-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
