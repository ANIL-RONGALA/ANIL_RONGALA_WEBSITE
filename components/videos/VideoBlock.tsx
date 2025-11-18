import { VideoDisplay, type VideoDisplayProps } from "./VideoDisplay";

export type VideoBlockProps = {
  title: string;
  displays: [VideoDisplayProps, VideoDisplayProps];
};

export function VideoBlock({ title, displays }: VideoBlockProps) {
  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-[28px] border border-white/30 bg-gradient-to-b from-white/70 via-white/30 to-blue-50/40 p-8 shadow-[0_25px_80px_rgba(59,130,246,0.25)] backdrop-blur-lg transition duration-700 dark:border-white/10 dark:from-slate-900/70 dark:via-slate-900/60 dark:to-purple-900/40 dark:shadow-[0_30px_90px_rgba(124,58,237,0.35)]">
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_15%_10%,rgba(236,72,153,0.18),transparent_35%),radial-gradient(circle_at_85%_0%,rgba(6,182,212,0.14),transparent_30%),radial-gradient(circle_at_30%_80%,rgba(59,130,246,0.18),transparent_35%)] opacity-90 blur-2xl" />
      <div className="relative z-10 flex flex-col gap-6 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-pink-500 dark:text-cyan-300">Hyperlinked Relay</p>
        <h3 className="text-3xl font-bold text-slate-900 transition-colors duration-500 dark:text-white">{title}</h3>
      </div>
      <div className="relative z-10 flex flex-col gap-6">
        <VideoDisplay {...displays[0]} />
        <VideoDisplay {...displays[1]} />
      </div>
    </div>
  );
}
