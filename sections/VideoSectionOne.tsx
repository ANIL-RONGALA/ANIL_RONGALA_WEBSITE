import { VideoBlock } from "@/components/videos/VideoBlock";
import type { VideoItem } from "@/components/videos/VideoDisplay";

const displayAVideos: VideoItem[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "Cybernetic Pulse",
    watchUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "jfKfPfyJRdk",
    title: "Lo-Fi Command Center",
    watchUrl: "https://www.youtube.com/watch?v=jfKfPfyJRdk"
  },
  {
    id: "5qap5aO4i9A",
    title: "Quantum Chill Stream",
    watchUrl: "https://www.youtube.com/watch?v=5qap5aO4i9A"
  }
];

const displayBVideos: VideoItem[] = [
  {
    id: "DWcJFNfaw9c",
    title: "Deep Space Signal",
    watchUrl: "https://www.youtube.com/watch?v=DWcJFNfaw9c"
  },
  {
    id: "lTRiuFIWV54",
    title: "Synthwave Radar",
    watchUrl: "https://www.youtube.com/watch?v=lTRiuFIWV54"
  },
  {
    id: "hHW1oY26kxQ",
    title: "Nocturnal Ops",
    watchUrl: "https://www.youtube.com/watch?v=hHW1oY26kxQ"
  }
];

export function VideoSectionOne() {
  return (
    <section className="video-section">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#728aff]">Section 01</p>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">Orbiting Broadcasts</h2>
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 md:text-base">
          Twin feeds cycling through lab highlights, research transmissions, and neon-coded ambient scenes.
        </p>
      </div>
      <VideoBlock videosA={displayAVideos} videosB={displayBVideos} />
    </section>
  );
}
