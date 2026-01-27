import { Badge } from "@/components/ui/Badge";

const lines = [
  { label: "Build", value: "Active" },
  { label: "Focus", value: "AI for Hardware / RTL Verification" },
  { label: "Current", value: "Research portfolio updates" },
  { label: "Next", value: "Case studies + demos" },
  { label: "Deploy", value: "Vercel" },
  { label: "Updated", value: "2025-02-12" }
];

export function SystemConsole() {
  return (
    <aside className="relative overflow-hidden rounded-2xl border border-border/60 bg-background/60 p-6 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">System Status</p>
        <Badge className="border-border/60 text-foreground">Live</Badge>
      </div>
      <div className="mt-6 space-y-3">
        {lines.map((line) => (
          <div key={line.label} className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="w-20 font-mono uppercase tracking-[0.2em]">{line.label}</span>
            <span className="flex-1 border-b border-dashed border-border/60" />
            <span className="rounded-full border border-border/60 px-2 py-1 text-[0.7rem] text-foreground">
              {line.value}
            </span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-6 bottom-3 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </aside>
  );
}
