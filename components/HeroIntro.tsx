'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/siteConfig';

export function HeroIntro() {
  return (
    <section className="relative mx-auto flex max-w-5xl flex-col gap-3 px-4 pt-10 text-center md:pt-14">
      <motion.span
        className="text-[11px] uppercase tracking-[0.4em] text-sky-400/70 dark:text-cyan-300/80"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        AI-DRIVEN HARDWARE • EDA • VERIFICATION
      </motion.span>

      <motion.h1
        className="text-2xl font-semibold tracking-[0.18em] text-slate-800/90 dark:text-sky-50 md:text-[1.9rem]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Neural Motherboard of{' '}
        <span className="bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          {siteConfig.ownerName}
        </span>
      </motion.h1>

      <motion.p
        className="mx-auto max-w-2xl text-xs leading-relaxed text-slate-500 dark:text-slate-300/80"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Projects, academics, publications and personal logs wired into one interactive board. Every module is a live access port to
        my work in AI, VLSI, verification and embedded systems.
      </motion.p>
    </section>
  );
}
