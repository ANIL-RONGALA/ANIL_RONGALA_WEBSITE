import Link from "next/link";
import { MotionCard } from "@/components/ui/MotionCard";

export type ProofItem = {
  title: string;
  description: string;
  href: string;
  external?: boolean;
};

type ProofStripProps = {
  items: ProofItem[];
};

export function ProofStrip({ items }: ProofStripProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <MotionCard key={item.title} className="p-4">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">{item.title}</p>
            <p className="text-sm leading-relaxed text-body line-clamp-2">{item.description}</p>
            <Link
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="text-xs font-mono uppercase tracking-[0.2em] neon-text neon-underline ring-accent neon-ring"
            >
              View proof
            </Link>
          </div>
        </MotionCard>
      ))}
    </div>
  );
}
