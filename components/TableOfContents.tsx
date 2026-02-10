"use client";

import { useEffect, useMemo, useState } from "react";
import { cx } from "@/components/ui/classNames";

type HeadingItem = {
  id: string;
  title: string;
  level: number;
};

type TableOfContentsProps = {
  headings: HeadingItem[];
};

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const items = useMemo(
    () => headings.filter((heading) => heading.id),
    [headings]
  );

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "0% 0% -70% 0%", threshold: [0.1, 0.4, 0.7] }
    );

    items.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav
      className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm"
      aria-label="Table of contents"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        On this page
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((heading) => (
          <li key={heading.id}>
            <button
              type="button"
              onClick={() => {
                const element = document.getElementById(heading.id);
                element?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={cx(
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 flex w-full items-center rounded-full px-3 py-2 text-left text-muted-foreground transition hover:text-foreground",
                activeId === heading.id
                  ? "bg-[hsl(var(--accent)/0.12)] text-foreground"
                  : "",
                heading.level > 2 ? "text-xs" : ""
              )}
            >
              <span
                className={cx(
                  "mr-2 inline-flex h-2 w-2 rounded-full",
                  activeId === heading.id ? "bg-accent" : "bg-border"
                )}
              />
              {heading.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
