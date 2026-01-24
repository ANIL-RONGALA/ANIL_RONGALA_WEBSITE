'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { siteConfig } from '@/lib/siteConfig';

function ParticleField({ count, speed }: { count: number; speed: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, index) => ({
        id: index,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        duration: speed + Math.random() * 1.2
      })),
    [count, speed]
  );

  return (
    <div className="hero-particles" aria-hidden>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="particle"
          style={{ left: `${particle.left}%`, top: `${particle.top}%` }}
          animate={{ y: [0, -8, 6], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: particle.duration, delay: particle.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export function HeroIntro() {
  return (
    <section className="relative mx-auto flex max-w-5xl flex-col gap-3 px-4 pt-12 text-center md:pt-14">
      <div className="hero-wave-grid" aria-hidden />
      <ParticleField count={40} speed={0.4} />

      <motion.span
        className="text-[11px] uppercase tracking-[0.4em] text-muted"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        AI-DRIVEN HARDWARE • EDA • VERIFICATION
      </motion.span>

      <motion.h1
        className="text-4xl font-semibold tracking-tight text-body sm:text-5xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Engineering Logbook for{" "}
        <span className="neon-text neon-underline">
          {siteConfig.ownerName}
        </span>
      </motion.h1>

      <motion.p
        className="mx-auto max-w-2xl text-sm leading-relaxed text-muted"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Projects, academics, publications, and personal logs organized into a structured interface. Every section links directly to
        work in AI, VLSI, verification, and embedded systems.
      </motion.p>
    </section>
  );
}
