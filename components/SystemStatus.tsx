const statuses = [
  { label: "Build", value: "Stable" },
  { label: "Focus", value: "Research + Engineering" },
  { label: "Current Phase", value: "Content & Experiments" },
  { label: "Deployment", value: "Vercel (Preview)" },
  { label: "Next Milestone", value: "Projects + Media" }
];

export function SystemStatus() {
  return (
    <section className="space-y-5 rounded-2xl border bg-background/60 p-6 shadow-sm backdrop-blur">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">System Status</p>
        <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">Operational Snapshot</h2>
      </div>
      <div className="space-y-3">
        {statuses.map((status) => (
          <div key={status.label} className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">{status.label}</span>
            <span className="rounded-full border px-2 py-1 text-xs text-foreground">
              {status.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
