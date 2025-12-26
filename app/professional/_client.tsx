"use client";

import { professionalHistory } from "@/lib/professional";
import { motion } from "framer-motion";

export default function ProfessionalPage() {
  return (
    <div className="space-y-8">
      {professionalHistory.map((role) => (
        <motion.article
          key={role.role}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="rounded-2xl border bg-background/60 p-8 shadow-sm backdrop-blur transition hover:bg-background/70 hover:shadow-md"
        >
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-foreground">{role.role}</h3>
              <p className="text-sm text-muted-foreground">{role.organization}</p>
            </div>
            <p className="text-sm text-[var(--accent-cyan)]">
              {role.start} – {role.end}
            </p>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{role.location}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{role.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {role.techStack.map((tech) => (
              <span key={tech} className="rounded-full border px-2 py-1 text-xs text-muted-foreground">
                {tech}
              </span>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
