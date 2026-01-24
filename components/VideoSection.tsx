import { VideoCard } from "@/components/VideoCard";

type Video = {
  title: string;
  subtitle?: string;
  youtubeId: string;
  tags?: string[];
};

type VideoSectionProps = {
  title: string;
  subtitle?: string;
  videos: Video[];
};

export function VideoSection({ title, subtitle, videos }: VideoSectionProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-body sm:text-3xl">{title}</h2>
        {subtitle ? <p className="max-w-2xl leading-relaxed text-muted">{subtitle}</p> : null}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video.youtubeId} video={video} />
        ))}
      </div>
    </section>
  );
}
