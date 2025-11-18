import { VideoSection } from "@/components/videos/VideoSection";
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
    <VideoSection
      kicker="Section 01"
      title="Orbiting Broadcasts"
      subtitle="Twin feeds cycling through lab highlights, research transmissions, and neon-coded ambient scenes."
      displays={[
        { label: "Display A", videos: displayAVideos },
        { label: "Display B", videos: displayBVideos }
      ]}
    />
  );
}
