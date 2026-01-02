"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Project } from "@/lib/projects";
import { MotionCard } from "@/components/ui/MotionCard";
import { Badge } from "@/components/ui/Badge";
import { cx } from "@/components/ui/classNames";

type ProjectsExplorerProps = {
  projects: Project[];
};

type SortMode = "featured" | "az";

export function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortMode, setSortMode] = useState<SortMode>("featured");

  const tags = useMemo(() => {
    const allTags = projects.flatMap((project) => project.tags);
    return Array.from(new Set(allTags)).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const matchesQuery = (project: Project) => {
      if (!normalized) {
        return true;
      }

      const target = [project.title, project.oneLiner, ...project.tags].join(" ").toLowerCase();
      return target.includes(normalized);
    };

    const matchesTags = (project: Project) => {
      if (selectedTags.length === 0) {
        return true;
      }

      return selectedTags.some((tag) => project.tags.includes(tag));
    };

    const filtered = projects.filter((project) => matchesQuery(project) && matchesTags(project));

    if (sortMode === "az") {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    return [...filtered].sort((a, b) => {
      if (a.featured === b.featured) {
        return a.title.localeCompare(b.title);
      }

      return a.featured ? -1 : 1;
    });
  }, [projects, query, selectedTags, sortMode]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-background/50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <label className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Search</label>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, tags, outcomes..."
            className="mt-2 w-full rounded-xl border border-border/60 bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition focus:border-foreground/60"
          />
        </div>
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          <span>Sort</span>
          <select
            value={sortMode}
            onChange={(event) => setSortMode(event.target.value as SortMode)}
            className="rounded-xl border border-border/60 bg-background/80 px-3 py-2 text-xs text-foreground"
          >
            <option value="featured">Featured first</option>
            <option value="az">A–Z</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={cx(
              "rounded-full border px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] transition",
              selectedTags.includes(tag)
                ? "border-foreground/60 bg-foreground/10 text-foreground"
                : "border-border/60 text-muted-foreground hover:border-foreground/40"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        <span>
          Showing {filteredProjects.length} of {projects.length}
        </span>
        {selectedTags.length > 0 ? (
          <button
            type="button"
            onClick={() => setSelectedTags([])}
            className="text-foreground transition hover:text-primary"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <MotionCard key={project.slug} className="flex h-full flex-col p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold text-foreground line-clamp-2">{project.title}</h3>
              {project.featured ? (
                <Badge className="border-border/60 text-[0.65rem] uppercase tracking-[0.2em]">Featured</Badge>
              ) : null}
            </div>
            <p className="mt-3 flex-1 text-sm text-muted-foreground line-clamp-3">{project.oneLiner}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                {project.proof.map((item) => (
                  <Link
                    key={item.label}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="text-sm font-semibold text-foreground hover:text-primary"
              >
                Read case study →
              </Link>
            </div>
          </MotionCard>
        ))}
      </div>
    </div>
  );
}
