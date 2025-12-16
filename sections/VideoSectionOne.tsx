import { VideoSection } from "@/components/VideoSection";
import { videosProjects } from "@/lib/videos";

export function VideoSectionOne() {
  return (
    <VideoSection
      title="Projects"
      subtitle="Hands-on work across ML, EDA, and systems."
      videos={videosProjects}
    />
  );
}
