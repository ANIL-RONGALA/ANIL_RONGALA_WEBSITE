import type { Metadata } from 'next';
import { PageTransition } from '@/components/PageTransition';
import { PageHeader } from "@/components/PageHeader";
import { PageShell } from '@/components/PageShell';
import { mediaItems } from '@/lib/media';
import { VideoSection } from "@/components/VideoSection";

export const metadata: Metadata = {
  title: 'Media | ANIL RONGALA WEBSITE'
};

export default function MediaPage() {
  const videos = mediaItems.map((item) => ({
    title: item.title,
    subtitle: item.description,
    youtubeId: item.youtubeId,
    tags: item.tags
  }));

  return (
    <PageShell>
      <PageTransition>
        <div className="space-y-10">
          <PageHeader
            title="Media Signals"
            subtitle="Talks, demos, and recorded walkthroughs from labs and live sessions."
          />
          <VideoSection
            title="Recorded Sessions"
            subtitle="Talks, walkthroughs, and in-lab captures from recent work."
            videos={videos}
          />
        </div>
      </PageTransition>
    </PageShell>
  );
}
