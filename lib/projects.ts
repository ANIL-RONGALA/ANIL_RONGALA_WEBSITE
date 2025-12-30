export type ProjectProof = {
  label: string;
  url: string;
};

export type Project = {
  slug: string;
  title: string;
  oneLiner: string;
  problem: string;
  approach: string;
  outcome: string;
  tags: string[];
  externalUrl: string;
  proof: ProjectProof[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "fpga-secure-hmi",
    title: "FPGA-Driven Secure Human–Machine Interface Platform",
    oneLiner: "Cyclone V FPGA system for authenticated control and persistent state.",
    problem:
      "Embedded operator workflows needed authenticated access and resilient state retention without adding latency.",
    approach:
      "Designed a multi-module FPGA system with ROM-backed authentication, RAM persistence, and entropy-driven FSM control.",
    outcome:
      "Delivered a verification-ready hardware stack with documented control flows and demo walkthroughs.",
    tags: ["FPGA", "SystemVerilog", "Security", "Embedded"],
    externalUrl: "https://github.com/ANIL-RONGALA",
    proof: [
      { label: "Repo", url: "https://github.com/ANIL-RONGALA" },
      { label: "Demo", url: "https://www.youtube.com/watch?v=ysz5S6PUM-U" }
    ],
    featured: true
  },
  {
    slug: "alu-uvm-verification",
    title: "Coverage-Driven ALU Verification Framework",
    oneLiner: "UVM environment focused on functional coverage closure for a 32-bit ALU.",
    problem:
      "ALU validation required repeatable coverage closure and traceable assertions before integration.",
    approach:
      "Built constrained-random stimulus, coverage cross bins, and a scoreboard predictor aligned with sign-off flows.",
    outcome:
      "Produced a reusable verification harness with documented tests and walkthroughs.",
    tags: ["SystemVerilog", "UVM", "Verification"],
    externalUrl: "https://github.com/ANIL-RONGALA",
    proof: [
      { label: "Repo", url: "https://github.com/ANIL-RONGALA" },
      { label: "Demo", url: "https://www.youtube.com/watch?v=oHg5SJYRHA0" }
    ],
    featured: true
  },
  {
    slug: "systolic-accelerator",
    title: "Systolic-Array Neural-Network Accelerator",
    oneLiner: "Scalable PE array for matrix-multiply workloads with a Python golden model.",
    problem:
      "Neural compute needed a hardware-friendly dataflow that balanced throughput and FPGA resource budgets.",
    approach:
      "Architected a modular systolic array and verified it against a Python golden reference model.",
    outcome:
      "Produced a performance-focused architecture with reproducible verification artifacts.",
    tags: ["AI Hardware", "SystemVerilog", "High-Performance"],
    externalUrl: "https://github.com/ANIL-RONGALA",
    proof: [
      { label: "Repo", url: "https://github.com/ANIL-RONGALA" },
      { label: "Talk", url: "https://www.youtube.com/watch?v=jNQXAC9IVRw" }
    ],
    featured: false
  },
  {
    slug: "uart-uvm-controller",
    title: "UART Controller with Register-Model Verification",
    oneLiner: "USART/UART controller validated with a UVM register abstraction layer.",
    problem:
      "Peripheral firmware teams needed a validated UART core with deterministic interrupt handling.",
    approach:
      "Implemented register abstraction layers, callback sequences, and golden predictors for edge-case coverage.",
    outcome:
      "Shipped a testbench-backed controller with documented regression evidence.",
    tags: ["UART", "FPGA", "Verification"],
    externalUrl: "https://github.com/ANIL-RONGALA",
    proof: [
      { label: "Repo", url: "https://github.com/ANIL-RONGALA" },
      { label: "Demo", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" }
    ],
    featured: false
  }
];
