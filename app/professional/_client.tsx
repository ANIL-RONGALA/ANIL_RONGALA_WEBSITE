"use client";
import type { Metadata } from 'next';
import { PageTransition } from '@/components/PageTransition';
import { SectionHeader } from '@/components/SectionHeader';
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
        <SectionHeader
          title="Professional Experience"
          subtitle="Coverage-driven verification leadership, lab mentorship, and silicon-ready deliverables."
          action={
            <div className="flex flex-wrap gap-3">
              <Link
                href={siteConfig.resumeAcademicUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-4 py-2 text-xs font-semibold text-fuchsia-100 transition hover:bg-fuchsia-500/20"
              >
                Academic Résumé (PDF)
              </Link>
              <Link
                href={siteConfig.resumeIndustryUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-100 transition hover:bg-emerald-500/20"
              >
                Industry Résumé (PDF)
              </Link>
            </div>
          }
        />
        <div className="space-y-8">
          {professionalHistory.map((role) => (
            <motion.article
              key={role.role}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="neon-border rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{role.role}</h3>
                  <p className="text-sm text-slate-300">{role.organization}</p>
                </div>
                <p className="text-sm text-cyan-200">
                  {role.start} – {role.end}
                </p>
              </div>
              <p className="mt-3 text-sm text-slate-300">{role.location}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">{role.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {role.techStack.map((tech) => (
                  <span key={tech} className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-100">
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
