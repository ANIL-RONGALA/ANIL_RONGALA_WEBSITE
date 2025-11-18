import { VideoBlock, type VideoBlockProps } from "./VideoBlock";

export type VideoSectionProps = VideoBlockProps & {
  kicker: string;
  subtitle: string;
};

export function VideoSection({ kicker, title, subtitle, displays }: VideoSectionProps) {
  return (
    <section className="relative w-full px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-pink-200/30 via-white/0 to-transparent blur-3xl dark:from-purple-900/30 dark:via-slate-900/10" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-pink-600 dark:text-cyan-300">{kicker}</p>
        <h2 className="text-3xl font-bold text-slate-900 transition-colors duration-500 dark:text-white md:text-4xl">{title}</h2>
        <p className="max-w-3xl text-sm text-slate-700 transition-colors duration-500 dark:text-slate-300 md:text-base">{subtitle}</p>
        <VideoBlock title={title} displays={displays} />
      </div>
    </section>
  );
}
