import { VideoSection } from "@/components/videos/VideoSection";
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
    <VideoSection
      kicker="Section 02"
      title="Pulse Field Archives"
      subtitle="Dual displays channeling kinetic remixes, live synth labs, and archival transmissions."
      displays={[
        { label: "Display A", videos: displayAVideos },
        { label: "Display B", videos: displayBVideos }
      ]}
    />
  );
}
