import { siteConfig } from "./siteConfig";

export type ProfileFocusArea = {
  title: string;
  description: string;
  tags: string[];
};

export type ProfileSkillGroup = {
  group: string;
  items: string[];
};

export type ProfileHighlight = {
  title: string;
  detail: string;
  proofUrl?: string;
};

export type ProfileTimelineItem = {
  yearOrDate: string;
  title: string;
  description: string;
  tags?: string[];
};

export type ProfileLinks = {
  github: string;
  linkedin: string;
  email: string;
  resumeAcademic: string;
  resumeIndustry: string;
};

export type ProfileData = {
  name: string;
  headline: string;
  summary: string;
  focusAreas: ProfileFocusArea[];
  skills: ProfileSkillGroup[];
  highlights: ProfileHighlight[];
  timeline: ProfileTimelineItem[];
  links: ProfileLinks;
};

export const profileData: ProfileData = {
  name: siteConfig.ownerName,
  headline: "VLSI verification engineer shaping AI-driven EDA and resilient silicon systems.",
  summary:
    "I build verification strategies that scale from RTL to system-level validation, blending UVM rigor with data-informed insight. My work centers on making complex hardware trustworthy, observable, and measurable so teams can ship first-silicon success with confidence.",
  focusAreas: [
    {
      title: "AI-augmented verification flows",
      description:
        "Designing verification harnesses that combine constraint-driven stimulus with ML-assisted coverage closure and anomaly detection.",
      tags: ["Coverage analytics", "Automation", "EDA tooling"]
    },
    {
      title: "Accelerator + edge compute systems",
      description:
        "Prototyping secure, power-aware hardware stacks where AI inference meets tight latency and reliability targets.",
      tags: ["FPGA", "ASIC", "Embedded ML"]
    },
    {
      title: "Verification leadership + mentoring",
      description:
        "Leading lab teams and coursework to translate theory into reusable verification playbooks and documentation.",
      tags: ["UVM", "Teaching", "Process"]
    }
  ],
  skills: [
    {
      group: "Languages & HDLs",
      items: ["SystemVerilog", "UVM", "Python", "C/C++", "Tcl", "MATLAB"]
    },
    {
      group: "Verification Tooling",
      items: ["Synopsys VCS", "QuestaSim", "Verdi", "Coverage closure", "Formal checks"]
    },
    {
      group: "ML & Data",
      items: ["PyTorch", "Scikit-learn", "EDA data pipelines", "Telemetry dashboards"]
    }
  ],
  highlights: [
    {
      title: "UVM-first silicon validation playbook",
      detail:
        "Built a reusable verification playbook for graduate labs that reduced ramp-up time and standardized coverage tracking.",
      proofUrl: siteConfig.resumeAcademicUrl
    },
    {
      title: "AI-driven EDA research",
      detail:
        "Developed datasets + scripts to explore ML-assisted error localization in RTL verification flows.",
      proofUrl: siteConfig.githubUrl
    },
    {
      title: "Mentor & lead teaching assistant",
      detail:
        "Supported advanced digital design courses with labs, office hours, and project reviews across cohorts."
    }
  ],
  timeline: [
    {
      yearOrDate: "2024",
      title: "Lead TA · University of Houston",
      description:
        "Guided verification labs, curated project rubrics, and mentored student teams across silicon validation topics.",
      tags: ["Teaching", "Verification"]
    },
    {
      yearOrDate: "2023",
      title: "Research focus: AI-driven EDA",
      description:
        "Explored ML-assisted error detection and coverage analytics for RTL and post-silicon validation.",
      tags: ["EDA", "ML"]
    },
    {
      yearOrDate: "2022",
      title: "RTL verification + FPGA prototyping",
      description:
        "Delivered verification environments and FPGA bring-up for accelerator prototypes and peripherals.",
      tags: ["FPGA", "UVM"]
    }
  ],
  links: {
    github: siteConfig.githubUrl,
    linkedin: siteConfig.linkedinUrl,
    email: siteConfig.email,
    resumeAcademic: siteConfig.resumeAcademicUrl,
    resumeIndustry: siteConfig.resumeIndustryUrl
  }
};
