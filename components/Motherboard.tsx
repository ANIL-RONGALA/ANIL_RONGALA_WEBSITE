'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { BusNetwork, BOARD_DIMENSIONS, type ModuleId } from './BusNetwork';

type ModuleDefinition = {
  id: ModuleId;
  title: string;
  section: string;
  href: string;
};

type Placement = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

const MODULES: ModuleDefinition[] = [
  { id: 'core', title: 'Core Module', section: 'Identity Matrix', href: '/' },
  { id: 'cpu', title: 'CPU Module', section: 'Projects', href: '/projects' },
  { id: 'gpu', title: 'GPU Module', section: 'Research & AI', href: '/projects' },
  { id: 'ram', title: 'RAM Module', section: 'Academics', href: '/academics' },
  { id: 'ssd', title: 'SSD Module', section: 'Achievements', href: '/achievements' },
  { id: 'io', title: 'I/O Module', section: 'Contact', href: '/contact' },
  { id: 'sensor', title: 'Sensor Module', section: 'Personal Log', href: '/personal' },
  { id: 'media', title: 'Media Module', section: 'Media Hub', href: '/media' }
];

const MODULE_PLACEMENT: Record<ModuleId, Placement> = {
  core: { x: 560, y: 150 },
  cpu: { x: 870, y: 320 },
  gpu: { x: 560, y: 320 },
  ram: { x: 250, y: 510 },
  ssd: { x: 870, y: 150 },
  io: { x: 250, y: 320 },
  sensor: { x: 560, y: 510 },
  media: { x: 870, y: 510 }
};

const MODULE_SIZE: Record<ModuleId, Size> = MODULES.reduce(
  (acc, module) => {
    acc[module.id] = { width: 208, height: 132 };
    return acc;
  },
  {} as Record<ModuleId, Size>
);

const PANELS_TOP: [string, string, string][] = [
  ['K4TOrB7at0Y', 'lJIrF4YjHfQ', 'hHW1oY26kxQ'],
  ['5qap5aO4i9A', '2LhoCfjm8R4', 'DWcJFNfaw9c']
];

const PANELS_BOTTOM: [string, string, string][] = [
  ['f02mOEt11OQ', '9bZkp7q19f0', 'a3Z7zEc7AXQ'],
  ['P2sQWRrUyfM', 'kxopViU98Xo', 'Zp9tP-tQqpU']
];

type VideoPanelProps = {
  videos: string[];
  label: string;
};

function VideoPanel({ videos, label }: VideoPanelProps) {
  const current = useMemo(() => videos[0], [videos]);

  return (
    <div className="video-panel">
      <div className="video-panel-inner">
        <iframe
          src={`https://www.youtube.com/embed/${current}?rel=0&modestbranding=1&controls=0`}
          title={`${label} feed`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <span className="video-panel-label">{label}</span>
    </div>
  );
}

type MediaZoneProps = {
  panels: [string, string, string][];
  prefix: string;
  subtitle: string;
  variant: 'top' | 'bottom';
};

function MediaZone({ panels, prefix, subtitle, variant }: MediaZoneProps) {
  return (
    <section className={`media-zone media-zone--${variant}`}>
      <div className="media-zone__header">
        <span className="media-zone__status">MEDIA FEED // ACTIVE</span>
        <span className="media-zone__subtitle">{subtitle}</span>
      </div>
      <div className="media-zone__grid">
        {panels.map((videos, index) => (
          <VideoPanel key={`${prefix}-${index}`} videos={videos} label={`${prefix} ${index + 1}`} />
        ))}
      </div>
    </section>
  );
}

type ModuleCardProps = {
  module: ModuleDefinition;
};

function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Link href={module.href} className="module-link group">
      <div className="module-shadow" />
      <motion.div
        whileHover={{ y: -6, scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="module-card"
      >
        <span className="module-card__subtitle">{module.section}</span>
        <span className="module-card__title">{module.title}</span>
        <div className="module-card__divider" />
        <span className="module-card__port">ROUTE {module.href === '/' ? 'ROOT' : module.href}</span>
      </motion.div>
    </Link>
  );
}

export function Motherboard() {
  const modules = useMemo(() => MODULES, []);

  const moduleAnchors = useMemo(
    () =>
      modules.reduce((acc, module) => {
        const placement = MODULE_PLACEMENT[module.id];
        acc[module.id] = placement;
        return acc;
      }, {} as Record<ModuleId, Placement>),
    [modules]
  );

  return (
    <div className="motherboard-layout">
      <MediaZone panels={PANELS_TOP} prefix="MEDIA CHANNEL" subtitle="SATELLITE UPLINK" variant="top" />

      <div className="motherboard-stage">
        <div
          className="pcb-layer"
          style={{ width: `${BOARD_DIMENSIONS.width}px`, height: `${BOARD_DIMENSIONS.height}px` }}
        >
          <div className="pcb-grid" />
          <BusNetwork moduleAnchors={moduleAnchors} />

          <div className="pcb-modules">
            {modules.map((module) => {
              const placement = MODULE_PLACEMENT[module.id];
              const size = MODULE_SIZE[module.id];

              return (
                <div
                  key={module.id}
                  className="module-anchor"
                  style={{
                    top: placement.y,
                    left: placement.x,
                    width: `${size.width}px`,
                    height: `${size.height}px`
                  }}
                >
                  <ModuleCard module={module} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <MediaZone panels={PANELS_BOTTOM} prefix="DATA STREAM" subtitle="QUANTUM DOWNLINK" variant="bottom" />

      <div className="pcb-module-stack md:hidden">
        {modules.map((module) => (
          <ModuleCard key={`stack-${module.id}`} module={module} />
        ))}
      </div>
    </div>
  );
}
