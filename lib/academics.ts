export type AcademicEntry = {
  degree: string;
  institution: string;
  years: string;
  description: string;
  highlights: string[];
  link?: string;
};

export const academics: AcademicEntry[] = [
  {
    degree: 'M.S. Electrical Engineering – Embedded & Computer Systems',
    institution: 'University of Houston',
    years: 'Aug 2023 – May 2025 (Dean’s List Merit)',
    description:
      'Graduate focus on digital design verification, embedded platforms, and high-speed VLSI systems with applied lab leadership.',
    highlights: [
      'Led TA team supporting 350+ students across hardware verification courses.',
      'Developed TI TM4C123 robotics labs with Bluetooth-enabled control firmware.',
      'Delivered mixed-signal design projects emphasizing low-power optimization.'
    ]
  },
  {
    degree: 'B.Tech Electrical & Electronics Engineering',
    institution: 'Jawaharlal Nehru Technological University',
    years: '2018 – 2022',
    description:
      'Undergraduate research on power electronics, embedded control, and hands-on competitive design challenges.',
    highlights: [
      'Core member of electric bike team certified by Asian E-Bike Challenge.',
      'Designed chess-playing robotic arm integrating MATLAB vision and Arduino control.',
      'Built multi-threaded C++ ray tracer for photorealistic rendering studies.'
    ]
  }
];
