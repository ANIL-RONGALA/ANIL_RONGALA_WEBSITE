import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { mediaItems } from "@/lib/media";
import { VideoSection } from "@/components/VideoSection";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Media | ANIL RONGALA WEBSITE"
};

export default function MediaPage() {
  const videos = mediaItems.map((item) => ({
    title: item.title,
    subtitle: item.description,
    youtubeId: item.youtubeId,
    tags: item.tags
  }));

  return (
    <Container>
      <Section
        eyebrow="MEDIA"
        title="Media Signals"
        subtitle="Talks, demos, and recorded walkthroughs with direct video proof."
      >
        <PageTransition>
          <VideoSection
            title="Recorded Sessions"
            subtitle="Talks, walkthroughs, and in-lab captures from recent work."
            videos={videos}
          />
        </PageTransition>
      </Section>
    </Container>
  );
}
