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

  useEffect(() => {
    if (!videos.length) return undefined;

    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 15000);

    return () => clearInterval(t);
  }, [videos.length]);

  if (!videos.length) return null;

  return (
    <div
      className="genz-panel relative overflow-hidden cursor-pointer rounded-3xl"
      onClick={() =>
        window.open(`https://www.youtube.com/watch?v=${videos[index].id}`, "_blank")
      }
    >
      <AnimatePresence>
        <motion.img
          key={videos[index].id}
          src={`https://img.youtube.com/vi/${videos[index].id}/hqdefault.jpg`}
          alt={videos[index].title}
          className="h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="genz-play text-5xl font-bold text-white"
        >
          ▶
        </motion.div>
      </div>
    </div>
  );
}
