import Link from "next/link";

const recentWork = [
  {
    title: "Coverage-Driven UVM Verification of ALU",
    type: "Verification",
    description: "SystemVerilog/UVM coverage strategy with regression-ready testbench structure.",
    href: "#"
  },
  {
    title: "High-Speed Low-Power Flip-Flop Design",
    type: "VLSI",
    description: "Timing-aware exploration of clocking, power gating, and stability trade-offs.",
    href: "#"
  },
  {
    title: "Exploring ML Models for RTL Bug Classification",
    type: "Research",
    description: "Feature-driven model comparisons for labeling RTL bug categories.",
    href: "#"
  }
];

export function RecentWork() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-body sm:text-3xl">Recent Work</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">
          A running log of verification, research, and hardware design experiments.
        </p>
      </div>
      <div className="space-y-4 border-l-2 border-muted pl-4">
        {recentWork.map((item) => (
          <div key={item.title} className="space-y-1">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={item.href}
                className="ring-accent neon-ring text-sm font-semibold text-body transition-colors duration-200 hover:neon-text hover:underline"
              >
                {item.title}
              </Link>
              <span className="text-xs uppercase tracking-[0.2em] text-muted">
                {item.type}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
