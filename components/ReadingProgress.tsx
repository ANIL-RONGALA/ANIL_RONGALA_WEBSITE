"use client";

import { useEffect, useState } from "react";

type ReadingProgressProps = {
  targetId?: string;
};

export function ReadingProgress({ targetId = "case-study" }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number | null = null;

    const updateProgress = () => {
      const target = document.getElementById(targetId);
      if (!target) {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        setProgress(Math.min(100, Math.max(0, nextProgress)));
        return;
      }

      const rect = target.getBoundingClientRect();
      const offsetTop = window.scrollY + rect.top;
      const totalHeight = target.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY - offsetTop;
      const nextProgress = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        updateProgress();
        frame = null;
      });
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-transparent">
      <div
        className="h-full bg-accent transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
