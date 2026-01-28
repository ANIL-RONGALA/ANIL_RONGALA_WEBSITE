"use client";

import { useEffect, useState } from "react";
import { cx } from "@/components/ui/classNames";

type CopyButtonProps = {
  text: string;
  label: string;
  className?: string;
};

export function CopyButton({ text, label, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cx(
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:border-[hsl(var(--accent)/0.45)] hover:text-foreground",
        copied ? "border-[hsl(var(--accent)/0.6)] text-foreground" : "",
        className
      )}
      aria-live="polite"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
