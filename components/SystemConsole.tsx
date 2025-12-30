import { Badge } from "@/components/ui/Badge";

const lines = [
  { label: "STATUS", value: "ACTIVE" },
  { label: "FOCUS", value: "AI-EDA / RTL Verification" },
  { label: "CURRENT", value: "Portfolio hardening" },
  { label: "NEXT", value: "Case studies + demos" },
  { label: "DEPLOY", value: "Vercel" },
  { label: "UPDATED", value: "2025-02-12" }
];

export function SystemConsole() {
  return (
    <aside className="rounded-2xl border border-border/60 bg-background/60 p-6 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">System Console</p>
        <Badge className="border-border/60 text-foreground/80">Live</Badge>
      </div>
      <div className="mt-6 space-y-3 text-sm">
        {lines.map((line) => (
          <div key={line.label} className="flex items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
            <span>{line.label}</span>
            <span className="text-foreground/90">{line.value}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
