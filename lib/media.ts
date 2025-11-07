export type MediaItem = {
  title: string;
  youtubeUrl: string;
  description: string;
  tags: string[];
};

export const mediaItems: MediaItem[] = [
  {
    title: 'FPGA Secure Interface Walkthrough',
    youtubeUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    description: 'Exploring authentication flow, entropy generation, and RAM persistence in the secure HMI platform.',
    tags: ['FPGA', 'Security', 'Demo']
  },
  {
    title: 'SystemVerilog UVM Coverage Strategy',
    youtubeUrl: 'https://www.youtube.com/watch?v=oHg5SJYRHA0',
    description: 'Deep dive into constraint random tests, coverage groups, and scoreboard design for ALU verification.',
    tags: ['Verification', 'SystemVerilog', 'Tutorial']
  },
  {
    title: 'Systolic Array Accelerator Architecture',
    youtubeUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
    description: 'Breakdown of PE tiling, dataflow orchestration, and FPGA resource balancing for neural compute.',
    tags: ['AI Hardware', 'Architecture', 'Research']
  }
];
