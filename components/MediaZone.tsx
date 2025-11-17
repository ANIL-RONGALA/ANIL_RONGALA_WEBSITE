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

  const currentVideo = videos[index] ?? videos[0];

  return (
    <div className="video-panel">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVideo}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={transition}
          className="video-panel__frame"
        >
          <iframe
            src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&mute=1&loop=1&playlist=${currentVideo}&playsinline=1&controls=0&modestbranding=1&rel=0&enablejsapi=1`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-xl"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function MediaZone({ panels, subtitle, variant }: MediaZoneProps) {
  return (
    <section className={`media-zone media-zone--${variant} max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8`} aria-label={subtitle}>
      <div className="media-zone__inner">
        <div className="media-zone__header-line">
          <span>MEDIA FEED // ACTIVE</span>
        </div>

        <div className="media-zone__grid">
          {panels.map((videos, index) => (
            <VideoPanel key={index} videos={videos} />
          ))}
        </div>
      </div>
    </section>
  );
}
