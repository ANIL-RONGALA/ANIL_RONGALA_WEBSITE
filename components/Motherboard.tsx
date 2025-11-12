'use client';

import { useEffect, useMemo, useState } from 'react';
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

type ModuleLayout = {
  top: string;
  left: string;
  width: number;
  height: number;
};

const MODULE_LAYOUT: Record<ModuleId, ModuleLayout> = {
  core: { top: '45%', left: '50%', width: 240, height: 240 },
  cpu: { top: '38%', left: '72%', width: 220, height: 200 },
  gpu: { top: '55%', left: '72%', width: 220, height: 200 },
  ssd: { top: '72%', left: '72%', width: 220, height: 200 },
  ram: { top: '38%', left: '28%', width: 220, height: 200 },
  io: { top: '55%', left: '28%', width: 220, height: 200 },
  sensor: { top: '72%', left: '28%', width: 220, height: 200 },
  media: { top: '88%', left: '50%', width: 240, height: 200 }
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

const MODULE_PLACEMENT: Record<ModuleId, Placement> = Object.entries(MODULE_LAYOUT).reduce(
  (acc, [moduleId, layout]) => {
    const normalizedTop = Number.parseFloat(layout.top) / 100;
    const normalizedLeft = Number.parseFloat(layout.left) / 100;

    acc[moduleId as ModuleId] = {
      x: BOARD_DIMENSIONS.width * (Number.isFinite(normalizedLeft) ? normalizedLeft : 0),
      y: BOARD_DIMENSIONS.height * (Number.isFinite(normalizedTop) ? normalizedTop : 0)
    };

    return acc;
  },
  {} as Record<ModuleId, Placement>
);

const PANELS_TOP: [string, string, string][] = [
  ['ysz5S6PUM-U', 'aqz-KE-bpKQ', 'oHg5SJYRHA0'],
  ['jNQXAC9IVRw', 'M7lc1UVf-VE', 'dQw4w9WgXcQ']
];

const PANELS_BOTTOM: [string, string, string][] = [
  ['aqz-KE-bpKQ', 'ysz5S6PUM-U', 'M7lc1UVf-VE'],
  ['dQw4w9WgXcQ', 'oHg5SJYRHA0', 'jNQXAC9IVRw']
];

type VideoPanelProps = {
  videos: string[];
  label: string;
};

function VideoPanel({ videos, label }: VideoPanelProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [videos.length]);

  return (
    <div className="video-panel relative">
      <motion.div
        key={videos[index]}
        initial={{ opacity: 0, rotateY: -90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        exit={{ opacity: 0, rotateY: 90 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        className="absolute inset-0"
      >
        <iframe
          src={`https://www.youtube.com/embed/${videos[index]}?autoplay=1&mute=1&loop=1&playlist=${videos[index]}&controls=0&modestbranding=1&rel=0`}
          title={label}
          allow="autoplay; encrypted-media; fullscreen"
          className="w-full h-full rounded-2xl border-0"
        />
      </motion.div>
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-cyan-300 text-xs tracking-widest uppercase">
        {label}
      </span>
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
      <div className="media-zone__grid flex flex-row justify-center gap-8 flex-wrap md:flex-nowrap">
        {panels.map((videos, index) => (
          <div key={`${prefix}-${index}`} className="flex flex-col items-center">
            <VideoPanel videos={videos} label={`${prefix} ${index + 1}`} />
            <span className="mt-2 text-cyan-200/80 text-xs tracking-widest uppercase">
              {prefix} {index + 1}
            </span>
          </div>
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
              const layout = MODULE_LAYOUT[module.id];

              return (
                <div
                  key={module.id}
                  className="module-anchor"
                  style={{
                    top: layout.top,
                    left: layout.left,
                    width: `${layout.width}px`,
                    height: `${layout.height}px`
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
