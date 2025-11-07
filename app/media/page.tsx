import type { Metadata } from 'next';
import { PageTransition } from '@/components/PageTransition';
import { SectionHeader } from '@/components/SectionHeader';
import { mediaItems } from '@/lib/media';

export const metadata: Metadata = {
  title: 'Media | ANIL RONGALA WEBSITE'
};

export default function MediaPage() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <SectionHeader
          title="Media Signals"
          subtitle="Talks, demos, and recorded walkthroughs from labs and live sessions."
        />
        <div className="grid gap-8 md:grid-cols-2">
          {mediaItems.map((item) => (
            <article
              key={item.title}
              className="neon-border flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <div className="aspect-video overflow-hidden rounded-xl border border-white/10">
                <iframe
                  src={item.youtubeUrl.replace('watch?v=', 'embed/')}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-slate-300">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
