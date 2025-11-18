"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Video = {
  id: string;
  title: string;
};

type VideoPlaylistProps = {
  videos: Video[];
};

export default function VideoPlaylist({ videos }: VideoPlaylistProps) {
  const [index, setIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!videos.length || !autoRotate) return undefined;

    const t = setInterval(() => {
      setPreviousIndex((prev) => index);
      setIndex((prev) => (prev + 1) % videos.length);
      setShowFront((prev) => !prev);
    }, 15000);

    return () => clearInterval(t);
  }, [videos.length, autoRotate, index]);

  if (!videos.length) return null;

  const activeVideo = videos[index];
  const lastVideo = videos[previousIndex] ?? activeVideo;

  return (
    <motion.div
      className="video-panel-shell genz-panel relative cursor-pointer"
      whileHover={{ rotateX: 4, rotateY: -4, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 180, damping: 14 }}
      onClick={() => window.open(`https://www.youtube.com/watch?v=${activeVideo.id}`, "_blank")}
    >
      <button
        className="autoplay-toggle"
        onClick={(event) => {
          event.stopPropagation();
          setAutoRotate((prev) => !prev);
        }}
        type="button"
      >
        {autoRotate ? "AUTO ON" : "AUTO OFF"}
      </button>

      <div className="neon-border" aria-hidden />
      <div className="frame-overlay" aria-hidden />

      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={activeVideo.id + String(showFront)}
          src={`https://img.youtube.com/vi/${activeVideo.id}/hqdefault.jpg`}
          alt={activeVideo.title}
          className="h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: showFront ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
        <motion.img
          key={lastVideo.id + String(!showFront)}
          src={`https://img.youtube.com/vi/${lastVideo.id}/hqdefault.jpg`}
          alt={lastVideo.title}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 1 }}
          animate={{ opacity: showFront ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/35 backdrop-blur-sm transition-all duration-300" />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="genz-play text-5xl font-bold text-white"
        >
          ▶
        </motion.div>
      </div>
    </motion.div>
  );
}
