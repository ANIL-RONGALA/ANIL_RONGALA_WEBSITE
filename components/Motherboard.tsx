'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { BusNetwork, BOARD_DIMENSIONS, type ModuleId } from './BusNetwork';
import { MediaZone } from './MediaZone';

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
  core: { top: '50%', left: '50%', width: 240, height: 220 },
  cpu: { top: '20%', left: '77%', width: 220, height: 180 },
  gpu: { top: '50%', left: '77%', width: 220, height: 180 },
  ssd: { top: '80%', left: '77%', width: 220, height: 180 },
  ram: { top: '20%', left: '23%', width: 220, height: 180 },
  io: { top: '50%', left: '23%', width: 220, height: 180 },
  sensor: { top: '80%', left: '23%', width: 220, height: 180 },
  media: { top: '84%', left: '50%', width: 320, height: 190 }
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
        className="module-card w-full max-w-[360px] aspect-square md:h-[200px] md:w-[220px] md:max-w-none lg:h-full lg:w-full lg:aspect-auto"
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
      <MediaZone panels={PANELS_TOP} subtitle="SATELLITE UPLINK" variant="top" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-10">
        <div className="motherboard-stage hidden xl:flex">
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

        <div className="pcb-module-stack xl:hidden">
          {modules.map((module) => (
            <ModuleCard key={`stack-${module.id}`} module={module} />
          ))}
        </div>
      </div>

      <MediaZone panels={PANELS_BOTTOM} subtitle="QUANTUM DOWNLINK" variant="bottom" />
    </div>
  );
}
