export type ProfessionalEntry = {
  role: string;
  organization: string;
  location: string;
  start: string;
  end: string;
  description: string;
  techStack: string[];
};

export const professionalHistory: ProfessionalEntry[] = [
  {
    role: 'TA Manager & Teaching Assistant',
    organization: 'University of Houston',
    location: 'Houston, TX',
    start: 'Jan 2025',
    end: 'Present',
    description:
      'Lead SystemVerilog UVM verification labs, coordinate embedded systems support, and streamline academic hardware workflows.',
    techStack: ['SystemVerilog', 'UVM', 'TI TM4C123', 'Python', 'FPGA Toolchains']
  },
  {
    role: 'Digital Design & Verification Engineer (Projects)',
    organization: 'Independent / Academic Labs',
    location: 'Austin, TX & Remote',
    start: '2019',
    end: '2024',
    description:
      'Delivered FPGA, ASIC, and mixed-signal prototypes with emphasis on coverage closure, timing closure, and silicon-ready sign-off.',
    techStack: ['Verilog', 'SystemVerilog', 'Cadence Xcelium', 'Synopsys VCS', 'MATLAB', 'Python']
  }
];
