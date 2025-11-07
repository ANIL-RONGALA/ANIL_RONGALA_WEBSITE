export type BoardSection = {
  id: string;
  label: string;
  subtitle: string;
  href: string;
  color: string;
};

export const boardSections: BoardSection[] = [
  {
    id: 'cpu',
    label: 'CPU',
    subtitle: 'Projects',
    href: '/projects',
    color: '#ffb347'
  },
  {
    id: 'gpu',
    label: 'GPU',
    subtitle: 'Research & AI',
    href: '/professional',
    color: '#ff6bff'
  },
  {
    id: 'ram',
    label: 'RAM',
    subtitle: 'Academics',
    href: '/academics',
    color: '#00ffaa'
  },
  {
    id: 'ssd',
    label: 'SSD',
    subtitle: 'Achievements',
    href: '/achievements',
    color: '#ffd93b'
  },
  {
    id: 'media',
    label: 'MEDIA',
    subtitle: 'YouTube & Talks',
    href: '/media',
    color: '#ff4b4b'
  },
  {
    id: 'sensor',
    label: 'SENSOR',
    subtitle: 'Personal',
    href: '/personal',
    color: '#e0e7ff'
  },
  {
    id: 'io',
    label: 'I/O',
    subtitle: 'Contact',
    href: '/contact',
    color: '#00c3ff'
  }
];
