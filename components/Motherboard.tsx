'use client';

import { motion } from 'framer-motion';
import { boardSections } from '@/lib/boardSections';
import { siteConfig } from '@/lib/siteConfig';
import { Chip } from './Chip';

const containerVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 }
};

export function Motherboard() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-10"
    >
      <div className="relative flex w-full flex-col items-center justify-center rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-slate-900/60 to-slate-950/80 p-10 shadow-[0_0_60px_rgba(34,211,238,0.15)]">
        <div className="absolute inset-0 -z-10 rounded-3xl opacity-70" style={{
          background: 'radial-gradient(circle at 20% 20%, rgba(56,189,248,0.2), transparent 45%), radial-gradient(circle at 80% 30%, rgba(236,72,153,0.18), transparent 55%)'
        }} />
        <div className="absolute inset-0 -z-20 grid grid-cols-12 grid-rows-6 opacity-10">
          {Array.from({ length: 72 }).map((_, index) => (
            <div key={index} className="border border-cyan-400/30" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-4">
            {boardSections.slice(0, 2).map((section) => (
              <Chip key={section.id} {...section} />
            ))}
          </div>
          <div className="relative flex flex-col items-center justify-center gap-6">
            <div className="h-32 w-32 rounded-2xl border border-cyan-300/40 bg-gradient-to-br from-cyan-500/30 via-slate-900/70 to-slate-950/80 p-4 text-center shadow-[0_0_40px_rgba(34,211,238,0.4)]">
              <div className="flex h-full flex-col items-center justify-center gap-1">
                <span className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">Core</span>
                <span className="text-lg font-semibold text-white">{siteConfig.ownerName}</span>
                <span className="text-[10px] text-cyan-100/70">{siteConfig.tagline}</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              {boardSections.slice(2, 5).map((section) => (
                <Chip key={section.id} {...section} />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            {boardSections.slice(5).map((section) => (
              <Chip key={section.id} {...section} />
            ))}
          </div>
        </div>
        <div className="mt-10 flex w-full flex-wrap items-center justify-center gap-6 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-ping rounded-full bg-cyan-400" />
            <span>Signal integrity nominal</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-400" />
            <span>Thermals stable</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span>Bandwidth ready</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
