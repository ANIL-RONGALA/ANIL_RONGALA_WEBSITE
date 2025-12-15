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
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
        {subtitle ? <p className="text-base text-muted-foreground">{subtitle}</p> : null}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video.youtubeId} video={video} />
        ))}
      </div>
    </section>
  );
}
