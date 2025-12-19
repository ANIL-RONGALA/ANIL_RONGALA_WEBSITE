const focusAreas = [
  {
    title: "AI-Driven EDA",
    description: "ML for verification, bug detection, and design-space exploration.",
    tags: ["ML", "EDA", "Verification"]
  },
  {
    title: "VLSI & RTL Systems",
    description: "Digital design, timing-aware logic, coverage-driven validation.",
    tags: ["RTL", "UVM", "PPA"]
  },
  {
    title: "Hardware Security",
    description: "Trust, structure-aware analysis, and vulnerability detection.",
    tags: ["Security", "Netlists", "Trust"]
  },
  {
    title: "Applied ML Systems",
    description: "Models that integrate with real engineering workflows.",
    tags: ["PyTorch", "Systems", "Data"]
  }
];

export function FocusAreas() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-foreground">Focus Areas</h2>
        <p className="text-sm text-muted-foreground">
          Four technical lanes that anchor my research and engineering work.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {focusAreas.map((area) => (
          <div
            key={area.title}
            className="space-y-3 rounded-2xl border bg-background/60 p-4 shadow-sm backdrop-blur"
          >
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground">{area.title}</h3>
              <p className="text-sm text-muted-foreground">{area.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {area.tags.map((tag) => (
                <span key={tag} className="rounded-full border px-2 py-1 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
