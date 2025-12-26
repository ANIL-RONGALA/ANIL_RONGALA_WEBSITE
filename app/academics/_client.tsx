"use client";

import { academics } from "@/lib/academics";
import { motion } from "framer-motion";

export default function AcademicsPage() {
  return (
    <div className="space-y-8">
      {academics.map((entry) => (
        <motion.article
          key={entry.degree}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="rounded-2xl border bg-background/60 p-8 shadow-sm backdrop-blur transition hover:bg-background/70 hover:shadow-md"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <h3 className="text-2xl font-semibold text-foreground">{entry.degree}</h3>
            <p className="text-sm text-[var(--accent-cyan)]">{entry.years}</p>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{entry.institution}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {entry.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)]" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  );
}
