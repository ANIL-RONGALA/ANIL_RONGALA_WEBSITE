export type Achievement = {
  title: string;
  issuer: string;
  year: string;
  description: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    title: 'High-Speed D-Flip-Flop Designs for Low-Power Applications',
    issuer: 'University of Houston Research Symposium',
    year: '2024',
    description:
      'Engineered CMOS, pass-transistor, and semi-dynamic flip-flops surpassing 1.8 GHz with a 20% power reduction for VLSI systems.'
  },
  {
    title: 'Asian E-Bike Challenge Certification',
    issuer: 'Asian E-Bike Challenge',
    year: '2022',
    description:
      'Served on core technical team delivering a competition-ready electric bike across endurance, braking, and torque trials.'
  },
  {
    title: 'Coverage-Driven Verification Excellence',
    issuer: 'University of Houston Digital Design Lab',
    year: '2025',
    description:
      'Recognized for building UVM environments that achieved >95% functional coverage on advanced ALU verification flows.'
  }
];
