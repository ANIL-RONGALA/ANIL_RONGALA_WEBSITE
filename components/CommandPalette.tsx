"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { getSearchIndex, SearchIndexItem } from "@/lib/searchIndex";
import { Badge } from "@/components/ui/Badge";
import { cx } from "@/components/ui/classNames";

const shortcutHint = "⌘K";

export function CommandPalette() {
  const router = useRouter();
  const items = useMemo(() => getSearchIndex(), []);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isCommand = event.metaKey || event.ctrlKey;

      if (isCommand && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleOpenEvent = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return items;
    }

    return items.filter((item) => {
      const text = [item.title, item.subtitle, item.type, ...(item.tags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return text.includes(normalized);
    });
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleNavigate = (item: SearchIndexItem | undefined) => {
    if (!item) {
      return;
    }

    setIsOpen(false);
    router.push(item.href);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filteredItems.length - 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }

    if (event.key === "Enter") {
      event.preventDefault();
      handleNavigate(filteredItems[activeIndex]);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <div className="w-full max-w-2xl rounded-2xl border border-border/60 bg-background/70 p-4 shadow-xl backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            Command Palette
          </label>
          <Badge className="border-border/60 text-[0.65rem] uppercase tracking-[0.2em]">
            {shortcutHint}
          </Badge>
        </div>
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Search projects, pages, achievements..."
          className="mt-3 w-full rounded-xl border border-border/60 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition focus:border-foreground/60"
        />
        <div className="mt-4 max-h-[60vh] space-y-2 overflow-y-auto pr-1">
          {filteredItems.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/60 px-4 py-6 text-center text-sm text-muted-foreground">
              No results. Try a different query.
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item)}
                className={cx(
                  "flex w-full items-center justify-between gap-4 rounded-xl border border-transparent px-4 py-3 text-left transition hover:border-border/60",
                  index === activeIndex
                    ? "border-border/70 bg-background/80 text-foreground"
                    : "text-muted-foreground"
                )}
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  {item.subtitle ? (
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{item.subtitle}</p>
                  ) : null}
                </div>
                <Badge className="border-border/60 text-[0.6rem] uppercase tracking-[0.2em]">
                  {item.type}
                </Badge>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
