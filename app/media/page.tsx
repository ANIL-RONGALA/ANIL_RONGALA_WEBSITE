import type { Metadata } from 'next';
import { PageTransition } from '@/components/PageTransition';
import { PageShell } from '@/components/PageShell';
import { SectionHeader } from '@/components/SectionHeader';
import { mediaItems } from '@/lib/media';
import { VideoCard } from '@/components/VideoCard';

export const metadata: Metadata = {
  title: 'Media | ANIL RONGALA WEBSITE'
};

export default function MediaPage() {
  return (
    <PageShell>
      <PageTransition>
        <div className="space-y-10">
          <SectionHeader
            title="Media Signals"
            subtitle="Talks, demos, and recorded walkthroughs from labs and live sessions."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {mediaItems.map((item) => (
              <article
                key={item.title}
                className="flex h-full flex-col gap-4 rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 shadow-lg transition-colors duration-500 backdrop-blur dark:shadow-[0_0_24px_rgba(34,211,238,0.18)]"
              >
                <VideoCard video={{ title: item.title, youtubeId: item.youtubeId }} />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">{item.title}</h3>
                  <p className="flex-1 text-sm text-slate-700 transition-colors duration-300 dark:text-slate-300">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 transition-colors duration-300 dark:bg-cyan-500/20 dark:text-cyan-100"
                      >
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
    </PageShell>
  );
}
