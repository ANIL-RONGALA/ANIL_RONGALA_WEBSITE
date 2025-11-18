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
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8f7bff]">
          <span className="rounded-full bg-white/60 px-3 py-1 text-[11px] font-bold text-[#5c7cfa] shadow-sm backdrop-blur dark:bg-white/10 dark:text-cyan-100">
            {label}
          </span>
          <span className="text-slate-700/80 dark:text-white/70">Now Streaming</span>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/40 shadow-[0_0_40px_rgba(255,170,240,0.45)] backdrop-blur-xl dark:border-white/10">
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
                style={{ background: "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.25), transparent 55%)" }}
              />
              <iframe
                src={embedUrl}
                title={current.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="relative z-10 h-full w-full rounded-3xl object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-transparent opacity-50 dark:from-slate-900/60 dark:via-slate-900/30" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-800 transition-colors duration-500 dark:text-slate-200">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.15em] text-[#ff9ae0] dark:text-cyan-300">Featured</span>
            <span className="text-base font-semibold text-slate-900 dark:text-white">{current.title}</span>
          </div>
          <motion.span
            className="rounded-full bg-[#728aff]/15 px-3 py-1 text-[11px] font-semibold text-[#728aff] shadow-inner backdrop-blur dark:bg-cyan-500/20 dark:text-cyan-100"
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
