export type ChipAnimation =
  | 'cpu'
  | 'gpu'
  | 'ram'
  | 'ssd'
  | 'media'
  | 'sensor'
  | 'io'
  | 'core';

export type BoardSection = {
  id: string;
  label: string;
  subtitle: string;
  href: string;
  color: string;
  animation: ChipAnimation;
  iconUrl?: string;
  videoUrl?: string;
};

export const boardSections: BoardSection[] = [
  {
    id: 'core',
    label: 'CORE',
    subtitle: 'Identity Matrix',
    href: '/',
    color: '#00f5ff',
    animation: 'core',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-digital-core-9722/1080p.mp4'
  },
  {
    id: 'cpu',
    label: 'CPU',
    subtitle: 'Projects',
    href: '/projects',
    color: '#ffb347',
    animation: 'cpu',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-rotating-cpu-8255/1080p.mp4'
  },
  {
    id: 'gpu',
    label: 'GPU',
    subtitle: 'Research & AI',
    href: '/professional',
    color: '#ff66ff',
    animation: 'gpu',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-glowing-vr-chip-7503/1080p.mp4'
  },
  {
    id: 'ram',
    label: 'RAM',
    subtitle: 'Academics',
    href: '/academics',
    color: '#00ffff',
    animation: 'ram',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-matrix-code-7802/1080p.mp4'
  },
  {
    id: 'ssd',
    label: 'SSD',
    subtitle: 'Achievements',
    href: '/achievements',
    color: '#ffd93b',
    animation: 'ssd',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-cyber-lines-5479/1080p.mp4'
  },
  {
    id: 'media',
    label: 'MEDIA',
    subtitle: 'YouTube & Talks',
    href: '/media',
    color: '#ff4b4b',
    animation: 'media',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-waveform-visualizer-5841/1080p.mp4'
  },
  {
    id: 'sensor',
    label: 'SENSOR',
    subtitle: 'Personal',
    href: '/personal',
    color: '#e0e7ff',
    animation: 'sensor',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-blue-heartbeat-7642/1080p.mp4'
  },
  {
    id: 'io',
    label: 'I/O',
    subtitle: 'Contact',
    href: '/contact',
    color: '#00ccff',
    animation: 'io',
    videoUrl: 'https://cdn.coverr.co/videos/coverr-data-cables-6684/1080p.mp4'
  }
];
