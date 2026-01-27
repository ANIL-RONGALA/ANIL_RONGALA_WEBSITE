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
            <p className="text-sm leading-relaxed text-foreground line-clamp-2">{item.description}</p>
            <Link
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="text-xs font-mono uppercase tracking-[0.2em] text-accent underline decoration-[hsl(var(--accent)/0.4)] underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              View proof
            </Link>
          </div>
        </MotionCard>
      ))}
    </div>
  );
}
