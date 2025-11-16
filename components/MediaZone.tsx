'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export type MediaZoneProps = {
  panels: [string, string, string][];
  subtitle: string;
  variant: 'top' | 'bottom';
};

type VideoPanelProps = {
  videos: string[];
};

const transition = { duration: 0.8, ease: 'easeInOut' };

function VideoPanel({ videos }: VideoPanelProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 15000);

    return () => window.clearInterval(timer);
  }, [videos.length]);

  const activeVideo = videos[index];

  return (
    <div className="video-panel">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVideo}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={transition}
          className="video-panel__frame"
        >
          <iframe
            src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&mute=1&loop=1&playlist=${activeVideo}&controls=0&modestbranding=1&rel=0&playsinline=1`}
            title="autoplaying media panel"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            className="h-full w-full rounded-2xl border-0"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function MediaZone({ panels, subtitle, variant }: MediaZoneProps) {
  return (
    <section className={`media-zone media-zone--${variant} w-full pb-12`}>
      <div className="media-zone__inner">
        <div className="media-zone__header">
          <span className="media-zone__status">MEDIA FEED // ACTIVE</span>
          <span className="media-zone__subtitle">{subtitle}</span>
        </div>
        <div className="media-zone__grid">
          {panels.map((videos, index) => (
            <VideoPanel key={`${variant}-panel-${index}`} videos={videos} />
          ))}
        </div>
      </div>
    </section>
  );
}
