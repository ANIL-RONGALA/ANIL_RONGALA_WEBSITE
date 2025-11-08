'use client';

import { motion } from 'framer-motion';

function extractYouTubeId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.replace('/', '');
    }
    if (parsed.searchParams.get('v')) {
      return parsed.searchParams.get('v');
    }
    const segments = parsed.pathname.split('/');
    return segments[segments.length - 1];
  } catch (error) {
    return null;
  }
}

export type AdBoardProps = {
  youtubeUrl: string;
  title: string;
  className?: string;
};

export function AdBoard({ youtubeUrl, title, className }: AdBoardProps) {
  const videoId = extractYouTubeId(youtubeUrl);
  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&rel=0`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 0.95, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`group relative w-48 overflow-hidden rounded-2xl border border-cyan-400/30 bg-white/5 p-2 backdrop-blur ${className ?? ''}`}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/20 via-transparent to-fuchsia-500/20 opacity-80 blur-2xl" />
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-[0_0_25px_rgba(34,211,238,0.35)]">
        <iframe
          className="h-28 w-full origin-center scale-105 opacity-90 transition duration-500 ease-out group-hover:opacity-100"
          src={embedUrl}
          title={title}
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
        />
      </div>
      <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-cyan-100/80">{title}</div>
    </motion.div>
  );
}
