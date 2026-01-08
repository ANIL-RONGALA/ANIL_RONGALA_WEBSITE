"use client";

import { useEffect, useState } from "react";
import { cx } from "@/components/ui/classNames";

type CopyFieldProps = {
  label: string;
  value: string;
  href?: string;
};

export function CopyField({ label, value, href }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-border/70 bg-background/40 p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-mono uppercase tracking-wide text-muted-foreground">{label}</span>
        <button
          type="button"
          className={cx(
            "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition",
            copied ? "border-transparent bg-muted text-foreground" : "border-border/70 text-muted-foreground hover:bg-muted"
          )}
          onClick={handleCopy}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="break-all text-sm text-foreground transition hover:text-accent"
        >
          {value}
        </a>
      ) : (
        <span className="break-all text-sm text-foreground">{value}</span>
      )}
    </div>
  );
}
