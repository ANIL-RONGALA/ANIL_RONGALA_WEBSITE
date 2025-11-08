import { Motherboard } from '@/components/Motherboard';
import { AdCarousel } from '@/components/AdCarousel';
import { SectionHeader } from '@/components/SectionHeader';
import { siteConfig } from '@/lib/siteConfig';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col items-center gap-12 text-center">
        <div className="max-w-4xl space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Digital Neural Board</p>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Welcome to the futuristic interface of {siteConfig.ownerName}
          </h1>
          <p className="text-base text-slate-300 md:text-lg">
            {siteConfig.tagline} Navigate through the chips to explore projects, research, achievements, and more.
          </p>
        </div>
        <Motherboard />
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cyan-500/40 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20"
          >
            GitHub
          </Link>
          <Link
            href={siteConfig.resumeAcademicUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-fuchsia-500/40 bg-fuchsia-500/10 px-6 py-3 text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-500/20"
          >
            Academic Résumé
          </Link>
          <Link
            href={siteConfig.resumeIndustryUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/20"
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

      <section className="grid gap-8 rounded-3xl border border-white/5 bg-white/5 p-10 text-left backdrop-blur md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Mission</h2>
          <p className="text-sm leading-relaxed text-slate-300">
            I architect compute systems that behave like living circuits—resilient, adaptive, and secure. From FPGA prototypes
            to AI accelerators, each project pushes toward measurable coverage closure and human-centered outcomes.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Current Focus</h2>
          <p className="text-sm leading-relaxed text-slate-300">
            Advancing verification frameworks, accelerating neural compute architectures, and teaching the next wave of
            hardware innovators through immersive lab experiences.
          </p>
        </div>
      </section>
    </div>
  );
}
