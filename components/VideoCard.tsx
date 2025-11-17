'use client';

import clsx from 'clsx';
import { useCallback } from 'react';

type VideoCardProps = {
  videoId: string;
  title: string;
  className?: string;
};

export function VideoCard({ videoId, title, className }: VideoCardProps) {
  const handleClick = useCallback(() => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  }, [videoId]);

  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      onClick={handleClick}
      role="button"
      aria-label={`Play ${title}`}
      className={clsx(
        'video-card cursor-pointer rounded-2xl overflow-hidden relative group',
        'bg-gradient-to-br from-fuchsia-500/20 via-cyan-400/15 to-indigo-500/20',
        'border border-white/10 dark:border-cyan-200/10 shadow-xl',
        className
      )}
    >
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />

      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="play-button text-white text-4xl group-hover:scale-125 transition-transform">
          ▶
        </div>
      </div>
    </div>
  );
}
