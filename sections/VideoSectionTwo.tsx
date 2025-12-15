import { VideoSection } from "@/components/VideoSection";
import { videosResearch } from "@/lib/videos";

export function VideoSectionTwo() {
  return (
    <VideoSection
      title="Research"
      subtitle="Signals from ongoing explorations and experiments."
      videos={videosResearch}
    />
  );
}
