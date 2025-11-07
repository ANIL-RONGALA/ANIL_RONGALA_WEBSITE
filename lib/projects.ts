export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  image?: string;
  externalUrl: string;
  youtubeUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'fpga-secure-hmi',
    title: 'FPGA-Driven Secure Human–Machine Interface Platform',
    shortDescription:
      'A Cyclone V FPGA design integrating authentication, adaptive control, and persistent on-chip memory.',
    longDescription:
      'Architected a 30+ module FPGA system with ROM-backed authentication, RAM persistence, and entropy-driven FSM control for secure operator workflows.',
    tags: ['FPGA', 'SystemVerilog', 'Security', 'Embedded'],
    externalUrl: 'https://github.com/ANIL-RONGALA',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    slug: 'alu-uvm-verification',
    title: 'Coverage-Driven ALU Verification Framework',
    shortDescription: 'SystemVerilog UVM environment closing functional coverage to 95%+ for a 32-bit ALU.',
    longDescription:
      'Developed adaptive stimulus with constrained randomization, coverage cross bins, and scoreboard predictions to mirror silicon sign-off workflows.',
    tags: ['SystemVerilog', 'UVM', 'Verification'],
    externalUrl: 'https://github.com/ANIL-RONGALA',
    youtubeUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U'
  },
  {
    slug: 'systolic-accelerator',
    title: 'Systolic-Array Neural-Network Accelerator',
    shortDescription:
      'Scalable matrix-multiply accelerator with PE arrays verified against a Python golden model.',
    longDescription:
      'Designed a modular systolic array for neural compute, optimizing tile-based data reuse and memory bandwidth for FPGA deployment.',
    tags: ['AI Hardware', 'SystemVerilog', 'High-Performance'],
    externalUrl: 'https://github.com/ANIL-RONGALA'
  },
  {
    slug: 'uart-uvm-controller',
    title: 'UART Controller with Full Register-Model Verification',
    shortDescription:
      'Implemented USART/UART controller and UVM register-level testbench achieving 100% coverage.',
    longDescription:
      'Engineered register abstraction layers, callback-based sequences, and golden predictor models to validate interrupts and error handling paths.',
    tags: ['UART', 'FPGA', 'Verification'],
    externalUrl: 'https://github.com/ANIL-RONGALA'
  }
];
