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
              className="flex flex-col gap-4 rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 shadow-lg transition-colors duration-500 backdrop-blur dark:shadow-[0_0_24px_rgba(34,211,238,0.18)]"
            >
              <div className="aspect-video overflow-hidden rounded-xl border border-[var(--surface-border)]">
                <iframe
                  src={item.youtubeUrl.replace('watch?v=', 'embed/')}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">{item.title}</h3>
                <p className="text-sm text-slate-700 transition-colors duration-300 dark:text-slate-300">{item.description}</p>
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
  );
}
