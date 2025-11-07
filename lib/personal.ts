export type PersonalProfile = {
  bio: string;
  interests: string[];
  values: string[];
  goals: string[];
};

export const personalProfile: PersonalProfile = {
  bio:
    'I am a digital design verification engineer crafting resilient silicon and embedded systems where reliability meets futuristic user experiences.',
  interests: [
    'FPGA/ASIC prototyping and timing closure',
    'SystemVerilog UVM methodology evangelism',
    'AI accelerators and edge intelligence hardware',
    'Robotics platforms that merge perception with control',
    'Designing immersive, sci-fi inspired interfaces'
  ],
  values: [
    'Curiosity that sparks new architectures',
    'Precision in verification and documentation',
    'Mentorship and collaborative lab culture',
    'Sustainable, human-centered engineering'
  ],
  goals: [
    'Lead verification teams delivering first-silicon success.',
    'Engineer adaptive compute fabrics for secure, intelligent systems.',
    'Amplify hardware education through open-source tooling and storytelling.'
  ]
};
