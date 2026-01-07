"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { cx } from "@/components/ui/classNames";

export type AccordionItem = {
  id: string;
  title: string;
  body: ReactNode;
  meta?: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
  defaultOpenIds?: string[];
};

export function Accordion({ items, className, defaultOpenIds = [] }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenIds);

  const toggle = (id: string) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <div className={cx("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div key={item.id} className="rounded-2xl border border-border/70 bg-background/40">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
            >
              <div>
                <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                {item.meta ? <div className="mt-1 text-xs text-muted-foreground">{item.meta}</div> : null}
              </div>
              <span
                className={cx(
                  "flex h-7 w-7 items-center justify-center rounded-full border border-border/70 text-xs font-semibold text-muted-foreground transition",
                  isOpen ? "bg-muted/60 text-foreground" : "bg-background/40"
                )}
                aria-hidden="true"
              >
                {isOpen ? "–" : "+"}
              </span>
            </button>
            <div
              className={cx(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 pb-4 text-sm text-muted-foreground">{item.body}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
