'use client';

import { motion } from 'framer-motion';

import { boardSections } from '@/lib/boardSections';
import { mediaItems } from '@/lib/media';
import { siteConfig } from '@/lib/siteConfig';

import { AdBoard } from './AdBoard';
import { Chip } from './Chip';
import { CircuitPaths } from './CircuitPaths';

const containerVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 }
};

const particleConfigs = [
  { top: '18%', left: '12%', x: 120, y: -20, delay: 0 },
  { top: '72%', left: '18%', x: 150, y: -50, delay: 0.4 },
  { top: '28%', left: '82%', x: -140, y: 30, delay: 0.8 },
  { top: '68%', left: '78%', x: -120, y: -60, delay: 1.2 },
  { top: '8%', left: '48%', x: 0, y: 120, delay: 1.6 },
  { top: '86%', left: '50%', x: 0, y: -160, delay: 2 }
];

const adPlacements = [
  'hidden lg:block absolute left-6 top-16 rotate-[-5deg]',
  'hidden md:block absolute right-6 top-28 rotate-6',
  'hidden xl:block absolute left-1/2 bottom-14 -translate-x-1/2 rotate-3'
];

const featuredBoards = mediaItems.slice(0, 3);

export function Motherboard() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-10"
    >
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-slate-900/70 to-slate-950/90 p-10 shadow-[0_0_60px_rgba(34,211,238,0.2)]">
        <div className="absolute inset-0 -z-40 grid grid-cols-12 grid-rows-6 opacity-10">
          {Array.from({ length: 72 }).map((_, index) => (
            <div key={index} className="border border-cyan-400/30" />
          ))}
        </div>
        <video
          className="pointer-events-none absolute inset-0 -z-30 h-full w-full rounded-3xl object-cover opacity-30 mix-blend-screen"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://cdn.coverr.co/videos/coverr-digital-circuit-board-4642/1080p.mp4" type="video/mp4" />
        </video>
        <div
          className="pointer-events-none absolute inset-0 -z-20 rounded-3xl opacity-80"
          style={{
            background:
              'radial-gradient(circle at 20% 20%, rgba(56,189,248,0.22), transparent 45%), radial-gradient(circle at 80% 30%, rgba(236,72,153,0.18), transparent 55%), radial-gradient(circle at 50% 80%, rgba(45,212,191,0.18), transparent 60%)'
          }}
        />
        <div className="absolute inset-0 -z-10 animate-[pulse_6s_ease-in-out_infinite] bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10" />
        <CircuitPaths />
        {particleConfigs.map((particle, index) => (
          <motion.span
            key={index}
            className="pointer-events-none absolute z-10 h-1.5 w-1.5 rounded-full"
            style={{
              top: particle.top,
              left: particle.left,
              background: 'rgba(255,255,255,0.9)',
              boxShadow: '0 0 12px rgba(56,189,248,0.6)'
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: particle.x, y: particle.y, opacity: [0, 1, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: particle.delay, repeatDelay: 1.2, ease: 'easeInOut' }}
          />
        ))}

        {featuredBoards.map((media, index) => (
          <AdBoard
            key={media.youtubeUrl}
            youtubeUrl={media.youtubeUrl}
            title={media.title}
            className={`${adPlacements[index] ?? 'hidden lg:block absolute right-10 bottom-10 rotate-[-4deg]'}`}
          />
        ))}

        <div className="relative z-20 mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-4">
            {boardSections.slice(0, 2).map((section) => (
              <Chip key={section.id} {...section} />
            ))}
          </div>
          <div className="relative flex flex-col items-center justify-center gap-6">
            <div className="relative h-36 w-36 rounded-2xl border border-cyan-300/40 bg-gradient-to-br from-cyan-500/30 via-slate-900/70 to-slate-950/80 p-4 text-center shadow-[0_0_40px_rgba(34,211,238,0.4)]">
              <div className="absolute inset-1 rounded-2xl border border-white/10 opacity-60" />
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

        <div className="relative z-20 mt-10 flex w-full flex-wrap items-center justify-center gap-6 text-sm text-slate-300">
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
