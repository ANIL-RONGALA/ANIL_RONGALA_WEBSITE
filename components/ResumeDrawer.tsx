"use client";

import { useCallback, useEffect, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { cx } from "@/components/ui/classNames";

const OPEN_EVENT = "open-resume-drawer";
const CLOSE_EVENT = "close-overlays";

const highlights = [
  "Verification & UVM coverage closure",
  "AI-driven EDA workflows",
  "Hardware-focused ML systems",
];

export function ResumeDrawer() {
  const [open, setOpen] = useState(false);

  const closeDrawer = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener(OPEN_EVENT, handleOpen as EventListener);
    window.addEventListener(CLOSE_EVENT, handleClose as EventListener);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener(OPEN_EVENT, handleOpen as EventListener);
      window.removeEventListener(CLOSE_EVENT, handleClose as EventListener);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={cx(
        "fixed inset-0 z-50 transition",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <button
        type="button"
        aria-label="Close resume drawer"
        onClick={closeDrawer}
        className={cx(
          "absolute inset-0 bg-foreground/40 transition-opacity dark:bg-background/70",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <aside
        className={cx(
          "absolute right-0 top-0 h-full w-full max-w-md translate-x-full border-l border-border/70 bg-card p-6 shadow-2xl transition-transform duration-300 sm:p-8",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Resume drawer"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Resume
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              Download & review
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Academic and industry versions available for quick review.
            </p>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition hover:border-[hsl(var(--accent)/0.45)] hover:text-foreground"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <a
            href={siteConfig.resumeAcademicUrl}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground transition hover:border-[hsl(var(--accent)/0.45)] hover:text-accent"
          >
            <span>Academic Resume</span>
            <span className="text-xs text-muted-foreground">Open →</span>
          </a>
          <a
            href={siteConfig.resumeIndustryUrl}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-4 py-3 text-sm text-foreground transition hover:border-[hsl(var(--accent)/0.45)] hover:text-accent"
          >
            <span>Industry Resume</span>
            <span className="text-xs text-muted-foreground">Open →</span>
          </a>
        </div>

        <div className="mt-6 rounded-2xl border border-border/60 bg-background/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Highlights
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={siteConfig.resumeAcademicUrl}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground transition hover:brightness-105 hover:neon-glow"
          >
            Download Academic
          </a>
          <a
            href={siteConfig.resumeIndustryUrl}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 rounded-full border border-border/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:border-[hsl(var(--accent)/0.45)] hover:text-foreground"
          >
            Download Industry
          </a>
        </div>
      </aside>
    </div>
  );
}
