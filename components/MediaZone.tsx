'use client';

import { motion } from 'framer-motion';

import { VideoCard } from './VideoCard';

export type MediaZoneProps = {
  videos: { videoId: string; title: string }[];
  subtitle: string;
  variant: 'top' | 'bottom';
};

export function MediaZone({ videos, subtitle, variant }: MediaZoneProps) {
  return (
    <section className={`media-zone media-zone--${variant}`} aria-label={subtitle}>
      <div className="video-zone w-full max-w-7xl mx-auto px-6 py-10">
        <div className="media-zone__inner">
          <div className="media-zone__header-line">
            <span>MEDIA FEED // ACTIVE</span>
          </div>

          <div className="media-zone__grid">
            {videos.map((video) => (
              <motion.div
                key={video.videoId}
                initial={{ opacity: 0.6, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <VideoCard videoId={video.videoId} title={video.title} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
