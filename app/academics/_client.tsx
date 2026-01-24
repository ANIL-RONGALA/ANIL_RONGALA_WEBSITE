"use client";

import { academics } from "@/lib/academics";
import { Badge } from "@/components/ui/Badge";
import { MotionCard } from "@/components/ui/MotionCard";
import Link from "next/link";

export default function AcademicsPage() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {academics.map((entry) => (
        <MotionCard key={entry.degree} className="flex h-full flex-col p-8">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-2xl font-semibold text-body line-clamp-2">{entry.degree}</h3>
              <Badge className="border-border/60 text-[0.65rem] uppercase tracking-[0.2em]">
                {entry.years}
              </Badge>
            </div>
            <p className="text-sm leading-relaxed text-muted line-clamp-2">{entry.institution}</p>
            <p className="text-sm leading-relaxed text-muted line-clamp-3">{entry.description}</p>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {entry.highlights.slice(0, 2).map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {entry.proof.map((item) => (
                <Badge key={item.label} className="border-border/60">
                  {item.label}
                </Badge>
              ))}
            </div>
            {entry.proof[0] ? (
              <Link
                href={entry.proof[0].url}
                target="_blank"
                rel="noreferrer"
                className="ring-accent neon-ring text-sm font-semibold text-body transition-colors duration-200 hover:neon-text hover:underline"
              >
                Open →
              </Link>
            ) : null}
          </div>
        </MotionCard>
      ))}
    </div>
  );
}
