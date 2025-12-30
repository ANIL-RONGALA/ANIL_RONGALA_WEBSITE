import Link from "next/link";

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
        <div key={item.title} className="rounded-2xl border border-border/60 bg-background/60 p-4 shadow-sm backdrop-blur">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">{item.title}</p>
            <p className="text-sm text-foreground/90">{item.description}</p>
            <Link
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="text-xs font-mono uppercase tracking-[0.2em] text-primary hover:text-primary/80"
            >
              View proof
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
