"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";

export type Video = {
  title: string;
  subtitle?: string;
  youtubeId: string;
  tags?: string[];
};

type VideoCardProps = {
  video: Video;
};

export function VideoCard({ video }: VideoCardProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const thumbnailUrl = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;

  const tags = video.tags?.slice(0, 4) ?? [];

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/60 shadow-sm backdrop-blur transition duration-200 hover:-translate-y-[1px] hover:bg-card/70 hover:shadow-md hover:border-[hsl(var(--accent)/0.45)]"
      >
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={video.title}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-foreground/10 to-foreground/40 dark:from-background/30 dark:via-background/10 dark:to-background/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[hsl(var(--accent)/0.35)] bg-[hsl(var(--accent)/0.18)] text-foreground shadow-lg transition-transform duration-200 group-hover:scale-105">
              ▶
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground line-clamp-2">{video.title}</h3>
            {video.subtitle ? (
              <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{video.subtitle}</p>
            ) : null}
          </div>
          {tags.length > 0 ? (
            <div className="mt-auto flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 dark:bg-background/80"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-xl bg-background shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setOpen(false)}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 absolute right-3 top-3 z-10 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-sm text-foreground transition duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:text-accent"
            >
              ✕
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
