'use client';

import { motion } from 'framer-motion';

type BoardPosition = {
  top: string;
  left: string;
  width?: string;
};

function extractYouTubeId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.replace('/', '');
    }
    const idFromQuery = parsed.searchParams.get('v');
    if (idFromQuery) {
      return idFromQuery;
    }
    const segments = parsed.pathname.split('/');
    return segments.pop() ?? null;
  } catch (error) {
    return null;
  }
}

export type AdBoardProps = {
  youtubeUrl: string;
  title: string;
  position: BoardPosition;
  rotation?: number;
  isActive?: boolean;
};

export function AdBoard({ youtubeUrl, title, position, rotation = 0, isActive = true }: AdBoardProps) {
  const videoId = extractYouTubeId(youtubeUrl);
  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&rel=0`;
  const floatDuration = isActive ? 16 : 12;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: isActive ? 0.95 : 0.4,
        scale: isActive ? 1 : 0.96,
        y: isActive ? [-10, 10, -10] : [-4, 4, -4]
      }}
      transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
      className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{
        top: position.top,
        left: position.left,
        width: position.width ?? '260px',
        rotate: `${rotation}deg`
      }}
    >
      <div className="relative overflow-hidden rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-2 shadow-xl transition-colors duration-500 backdrop-blur dark:shadow-[0_0_30px_rgba(34,211,238,0.35)]">
        <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-cyan-500/30 via-transparent to-fuchsia-500/30 opacity-60 blur-2xl" />
        <div className="relative overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-white/85 transition-colors duration-500 dark:bg-black/70">
          <div className="relative aspect-video">
            <iframe
              className="absolute inset-0 h-full w-full origin-center scale-105 opacity-90 transition duration-700 ease-out group-hover:opacity-100"
              src={embedUrl}
              title={title}
              allow="autoplay; encrypted-media"
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </div>
        <div className="mt-3 text-[11px] uppercase tracking-[0.25em] text-[var(--accent-cyan)]">{title}</div>
      </div>
    </motion.div>
  );
}
