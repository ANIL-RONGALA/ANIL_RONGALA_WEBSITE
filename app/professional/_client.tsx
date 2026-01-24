"use client";

import { professionalHistory } from "@/lib/professional";
import { MotionCard } from "@/components/ui/MotionCard";
import { Badge } from "@/components/ui/Badge";

export default function ProfessionalPage() {
  return (
    <div className="space-y-8">
      {professionalHistory.map((role) => (
        <MotionCard key={role.role} className="p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-body">{role.role}</h3>
              <p className="text-sm leading-relaxed text-muted">{role.organization}</p>
            </div>
            <p className="text-sm neon-text">
              {role.start} – {role.end}
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{role.location}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{role.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {role.techStack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </MotionCard>
      ))}
    </div>
  );
}
