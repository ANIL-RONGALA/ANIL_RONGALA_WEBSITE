import { VideoDisplay, type VideoItem } from "./VideoDisplay";

export type VideoBlockProps = {
  videosA: VideoItem[];
  videosB: VideoItem[];
  labelA?: string;
  labelB?: string;
};

export function VideoBlock({ videosA, videosB, labelA = "Display A", labelB = "Display B" }: VideoBlockProps) {
  return (
    <div className="video-block-grid">
      <VideoDisplay label={labelA} videos={videosA} />
      <VideoDisplay label={labelB} videos={videosB} />
    </div>
  );
}
