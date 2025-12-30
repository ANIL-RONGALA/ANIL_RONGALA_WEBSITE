export type Achievement = {
  title: string;
  issuer: string;
  year: string;
  description: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    title: "Secure HMI FPGA Platform (Research Showcase)",
    issuer: "Verification & Security Track",
    year: "2024",
    description:
      "Documented an authenticated FPGA control stack with persistent state management and reproducible demo evidence.",
    link: "/projects/fpga-secure-hmi"
  },
  {
    title: "Coverage-Driven ALU Verification (Lab Excellence)",
    issuer: "Digital Design Lab",
    year: "2025",
    description:
      "Established a UVM-based verification harness with traceable coverage closure artifacts.",
    link: "/projects/alu-uvm-verification"
  },
  {
    title: "Systolic-Array Accelerator Architecture (Research Preview)",
    issuer: "AI Hardware Systems",
    year: "2024",
    description:
      "Produced a modular accelerator design backed by reproducible architecture demos.",
    link: "/projects/systolic-accelerator"
  }
];
