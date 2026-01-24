"use client";

import { useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { ProfileFocusArea, ProfileSkillGroup, ProfileTimelineItem } from "@/lib/profile";
import { cx } from "@/components/ui/classNames";

const TAB_LABELS = ["Focus", "Skills", "Timeline"] as const;

type TabKey = (typeof TAB_LABELS)[number];

type ProfileTabsProps = {
  focusAreas: ProfileFocusArea[];
  skills: ProfileSkillGroup[];
  timeline: ProfileTimelineItem[];
};

export function ProfileTabs({ focusAreas, skills, timeline }: ProfileTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeTab = TAB_LABELS[activeIndex];

  const content = useMemo(() => {
    if (activeTab === "Focus") {
      return (
        <div className="grid gap-4 md:grid-cols-2">
          {focusAreas.map((area) => (
            <div key={area.title} className="rounded-2xl border border-border/70 bg-background/40 p-4">
              <h4 className="line-clamp-2 text-sm font-semibold text-body">{area.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{area.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {area.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/70 bg-muted/40 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wide text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === "Skills") {
      return (
        <div className="space-y-4">
          {skills.map((group) => (
            <div key={group.group} className="rounded-2xl border border-border/70 bg-background/40 p-4">
              <h4 className="text-sm font-semibold text-body">{group.group}</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border/70 bg-muted/40 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wide text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {timeline.map((item) => (
          <div key={`${item.yearOrDate}-${item.title}`} className="rounded-2xl border border-border/70 bg-background/40 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="line-clamp-2 text-sm font-semibold text-body">{item.title}</h4>
              <span className="text-xs font-mono uppercase tracking-wide text-muted">
                {item.yearOrDate}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{item.description}</p>
            {item.tags ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border/70 bg-muted/40 px-2.5 py-0.5 text-[11px] font-mono uppercase tracking-wide text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }, [activeTab, focusAreas, skills, timeline]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (activeIndex + direction + TAB_LABELS.length) % TAB_LABELS.length;
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="space-y-5">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Profile sections"
        onKeyDown={handleKeyDown}
      >
        {TAB_LABELS.map((tab, index) => (
          <button
            key={tab}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`profile-tab-panel-${tab.toLowerCase()}`}
            className={cx(
              "ring-accent neon-ring rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition duration-200",
              index === activeIndex
                ? "border-[hsl(var(--accent)/0.45)] bg-[hsl(var(--accent)/0.1)] neon-text"
                : "border-border/60 text-muted hover:bg-muted/40 hover:text-foreground"
            )}
            onClick={() => setActiveIndex(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`profile-tab-panel-${activeTab.toLowerCase()}`} className="min-h-[240px]">
        {content}
      </div>
    </div>
  );
}
