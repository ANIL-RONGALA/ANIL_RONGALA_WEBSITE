"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type VideoItem = {
  id: string;
  title: string;
  watchUrl: string;
};

export type VideoDisplayProps = {
  label: string;
  videos: VideoItem[];
};

export function VideoDisplay({ label, videos }: VideoDisplayProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % videos.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [videos.length]);

  const current = videos[index];
  const embedUrl = `https://www.youtube.com/embed/${current.id}?autoplay=1&mute=1&loop=1&controls=0&playlist=${current.id}`;

  return (
    <motion.div
      className="video-display-shell"
      style={{ perspective: 1400 }}
      whileHover={{ rotateX: 3, rotateY: -3, y: -8 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      onClick={() => window.open(current.watchUrl, "_blank")}
    >
      <div className="video-display-glow" />
      <div className="video-display-overlay" />
      <div className="relative z-10 flex flex-col gap-4 p-4">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          <span className="ring-accent neon-ring rounded-full border border-[hsl(var(--accent)/0.35)] bg-[hsl(var(--accent)/0.12)] px-3 py-1 text-[11px] font-bold neon-text shadow-sm backdrop-blur">
            {label}
          </span>
          <span className="text-muted">Now Streaming</span>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/60 shadow-lg backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="relative aspect-video"
            >
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "radial-gradient(circle at 50% 20%, hsl(var(--accent) / 0.18), transparent 55%)" }}
              />
              <iframe
                src={embedUrl}
                title={current.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="relative z-10 h-full w-full rounded-3xl object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[hsl(var(--accent)/0.16)] via-transparent to-transparent opacity-60" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between text-sm text-body transition-colors duration-500">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.15em] neon-text">Featured</span>
            <span className="text-base font-semibold text-body">{current.title}</span>
          </div>
          <motion.span
            className="ring-accent neon-ring rounded-full border border-[hsl(var(--accent)/0.35)] bg-[hsl(var(--accent)/0.12)] px-3 py-1 text-[11px] font-semibold neon-text shadow-inner backdrop-blur"
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            LIVE
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
