import { Motherboard } from '@/components/Motherboard';
import { AdCarousel } from '@/components/AdCarousel';
import { SectionHeader } from '@/components/SectionHeader';
import VideoPlaylist from '@/components/VideoPlaylist';
import { siteConfig } from '@/lib/siteConfig';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col items-center gap-12 text-center">
        <div className="max-w-4xl space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent-cyan)]">Digital Neural Board</p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 transition-colors duration-300 dark:text-white md:text-5xl">
            Welcome to the futuristic interface of {siteConfig.ownerName}
          </h1>
          <p className="text-base text-slate-700 transition-colors duration-300 dark:text-slate-300 md:text-lg">
            {siteConfig.tagline} Navigate through the chips to explore projects, research, achievements, and more.
          </p>
        </div>
        <Motherboard />
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={siteConfig.githubUrl as string}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-blue-300 bg-blue-50 px-6 py-3 text-sm font-semibold text-blue-700 transition-colors duration-300 hover:bg-blue-100 dark:border-cyan-500/40 dark:bg-cyan-500/10 dark:text-cyan-100 dark:hover:bg-cyan-500/20"
          >
            GitHub
          </Link>
          <Link
            href={siteConfig.resumeAcademicUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-pink-300 bg-pink-50 px-6 py-3 text-sm font-semibold text-pink-700 transition-colors duration-300 hover:bg-pink-100 dark:border-fuchsia-500/40 dark:bg-fuchsia-500/10 dark:text-fuchsia-100 dark:hover:bg-fuchsia-500/20"
          >
            Academic Résumé
          </Link>
          <Link
            href={siteConfig.resumeIndustryUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-emerald-300 bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-700 transition-colors duration-300 hover:bg-emerald-100 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-100 dark:hover:bg-emerald-500/20"
          >
            Industry Résumé
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          title="Featured Signals"
          subtitle="Watch rolling updates from labs, talks, and research demos."
        />
        <AdCarousel />
      </section>

      <section className="video-zone w-full max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 gap-10 md:grid-cols-2">
        <VideoPlaylist
          videos={[
            { id: 'dQw4w9WgXcQ', title: 'Media 1' },
            { id: 'jfKfPfyJRdk', title: 'Media 1 Alt' },
            { id: '5qap5aO4i9A', title: 'Media 1 Chill' },
          ]}
        />

        <VideoPlaylist
          videos={[
            { id: 'DWcJFNfaw9c', title: 'Media 2' },
            { id: 'lTRiuFIWV54', title: 'Media 2 Alt' },
            { id: 'hHW1oY26kxQ', title: 'Media 2 Chill' },
          ]}
        />
      </section>

      <section className="grid gap-8 rounded-3xl border border-[var(--surface-border)] bg-[var(--surface-soft)] p-10 text-left transition-colors duration-500 backdrop-blur md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">Mission</h2>
          <p className="text-sm leading-relaxed text-slate-700 transition-colors duration-300 dark:text-slate-300">
            I architect compute systems that behave like living circuits—resilient, adaptive, and secure. From FPGA prototypes
            to AI accelerators, each project pushes toward measurable coverage closure and human-centered outcomes.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 transition-colors duration-300 dark:text-white">Current Focus</h2>
          <p className="text-sm leading-relaxed text-slate-700 transition-colors duration-300 dark:text-slate-300">
            Advancing verification frameworks, accelerating neural compute architectures, and teaching the next wave of
            hardware innovators through immersive lab experiences.
          </p>
        </div>
      </section>
    </div>
  );
}
