import { VideoBlock } from "@/components/videos/VideoBlock";
import type { VideoItem } from "@/components/videos/VideoDisplay";

const displayAVideos: VideoItem[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "Nanobot Orchestra",
    watchUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "O-ZPSX_j2kc",
    title: "Aurora Systems",
    watchUrl: "https://www.youtube.com/watch?v=O-ZPSX_j2kc"
  },
  {
    id: "FHTbsZEJspU",
    title: "Glitchwave Beacon",
    watchUrl: "https://www.youtube.com/watch?v=FHTbsZEJspU"
  }
];

const displayBVideos: VideoItem[] = [
  {
    id: "5NV6Rdv1a3I",
    title: "Hyperdrive Relay",
    watchUrl: "https://www.youtube.com/watch?v=5NV6Rdv1a3I"
  },
  {
    id: "Kx8g4edIX2s",
    title: "Prismatic Uplink",
    watchUrl: "https://www.youtube.com/watch?v=Kx8g4edIX2s"
  },
  {
    id: "WPni755-Krg",
    title: "Circuit Serenade",
    watchUrl: "https://www.youtube.com/watch?v=WPni755-Krg"
  }
];

export function VideoSectionTwo() {
  return (
    <section className="video-section">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#728aff]">Section 02</p>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">Pulse Field Archives</h2>
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 md:text-base">
          Dual displays channeling kinetic remixes, live synth labs, and archival transmissions.
        </p>
      </div>
      <VideoBlock videosA={displayAVideos} videosB={displayBVideos} />
    </section>
  );
}
