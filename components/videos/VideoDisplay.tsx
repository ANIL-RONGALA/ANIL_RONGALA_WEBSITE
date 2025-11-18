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
  const embedUrl = `https://www.youtube.com/embed/${current.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${current.id}`;

  return (
    <div
      className="group relative w-full cursor-pointer overflow-hidden rounded-[24px] border border-white/30 bg-gradient-to-br from-pink-100/70 via-white/60 to-blue-100/50 shadow-[0_0_40px_rgba(236,72,153,0.25),0_0_60px_rgba(59,130,246,0.25)] transition-transform duration-500 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(124,58,237,0.35),0_0_70px_rgba(6,182,212,0.35)] dark:border-white/10 dark:from-purple-500/20 dark:via-slate-900/60 dark:to-cyan-500/20"
      style={{ transform: "perspective(1200px)" }}
      onClick={() => window.open(current.watchUrl, "_blank")}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(236,72,153,0.2),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(34,211,238,0.18),transparent_50%)] opacity-90 blur-xl transition duration-700 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent dark:from-slate-900/20 dark:via-slate-900/40 dark:to-cyan-500/5" />
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08), transparent 55%)" }}
      />

      <div className="relative p-4">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-pink-600 drop-shadow-sm transition-colors duration-500 dark:text-cyan-200">
          <span className="rounded-full bg-white/60 px-3 py-1 text-[11px] font-bold text-pink-700 shadow-sm backdrop-blur dark:bg-white/10 dark:text-cyan-100">
            {label}
          </span>
          <span className="text-slate-700/80 dark:text-white/70">Neon Relay</span>
        </div>

        <div className="mt-4 overflow-hidden rounded-3xl border border-white/40 shadow-[0_20px_60px_rgba(59,130,246,0.25)] backdrop-blur-md dark:border-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="relative aspect-video"
              style={{ transform: "perspective(1400px)" }}
            >
              <iframe
                src={embedUrl}
                title={current.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full rounded-3xl object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/30 via-slate-900/10 to-transparent opacity-80 transition duration-700 group-hover:opacity-60 dark:from-slate-900/50 dark:via-slate-900/20" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-800 transition-colors duration-500 dark:text-slate-200">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.15em] text-pink-600 dark:text-cyan-300">Now Streaming</span>
            <span className="text-base font-semibold text-slate-900 dark:text-white">{current.title}</span>
          </div>
          <motion.span
            className="rounded-full bg-pink-500/20 px-3 py-1 text-[11px] font-semibold text-pink-700 shadow-inner backdrop-blur dark:bg-cyan-500/20 dark:text-cyan-100"
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            LIVE
          </motion.span>
        </div>
      </div>
    </div>
  );
}
