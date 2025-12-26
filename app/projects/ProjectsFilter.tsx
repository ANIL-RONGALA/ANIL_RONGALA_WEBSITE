"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/projects";
import Link from "next/link";

type ProjectsFilterProps = {
  projects: Project[];
};

export function ProjectsFilter({ projects }: ProjectsFilterProps) {
  const tags = useMemo(() => {
    const uniqueTags = new Set<string>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => uniqueTags.add(tag));
    });
    return ["All", ...Array.from(uniqueTags)];
  }, [projects]);

  const [activeTag, setActiveTag] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeTag === "All") {
      return projects;
    }
    return projects.filter((project) => project.tags.includes(activeTag));
  }, [activeTag, projects]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isActive = tag === activeTag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={[
                "rounded-full border px-3 py-1 text-xs transition",
                isActive ? "border-foreground/20 bg-foreground text-background" : "border-border/60 text-muted-foreground hover:bg-muted"
              ].join(" ")}
              aria-pressed={isActive}
            >
              {tag}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <article
            key={project.slug}
            className="flex h-full flex-col rounded-2xl border bg-background/60 p-6 shadow-sm backdrop-blur transition hover:bg-background/70 hover:shadow-md"
          >
            <div className="flex-1 space-y-3">
              <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
              <p className="text-sm text-muted-foreground">{project.shortDescription}</p>
              <p className="text-sm text-muted-foreground">{project.longDescription}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border px-2 py-1 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-5">
              <Link
                href={project.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-border/60 px-4 py-2 text-sm transition hover:bg-muted"
              >
                Open Repo
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
