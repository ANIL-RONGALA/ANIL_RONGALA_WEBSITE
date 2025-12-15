export type Video = {
  title: string;
  subtitle?: string;
  youtubeId: string;
  tags?: string[];
};

export const videosProjects: Video[] = [
  {
    title: "FPGA Control Surface Demo",
    subtitle: "Interactive overlays for live hardware telemetry.",
    youtubeId: "dQw4w9WgXcQ",
    tags: ["FPGA", "Telemetry", "Demo", "UX"]
  },
  {
    title: "EDA Automation Walkthrough",
    subtitle: "CLI-first flows to accelerate verification sweeps.",
    youtubeId: "jNQXAC9IVRw",
    tags: ["EDA", "Automation", "Scripts"]
  },
  {
    title: "Systems Prototyping",
    subtitle: "Building resilient pipelines for lab deployments.",
    youtubeId: "ysz5S6PUM-U",
    tags: ["Systems", "Deployments", "Prototyping"]
  }
];

export const videosResearch: Video[] = [
  {
    title: "Signal Processing Experiments",
    subtitle: "Noise shaping and inference on constrained devices.",
    youtubeId: "aqz-KE-bpKQ",
    tags: ["Research", "DSP", "Edge"]
  },
  {
    title: "Model Compression",
    subtitle: "Quantization trials across custom accelerators.",
    youtubeId: "oHg5SJYRHA0",
    tags: ["Compression", "ML", "Accelerators"]
  },
  {
    title: "Visualization Pipeline",
    subtitle: "High-fidelity renders of circuit traces and flows.",
    youtubeId: "FHTbsZEJspU",
    tags: ["Visualization", "Rendering", "EDA"]
  }
];
