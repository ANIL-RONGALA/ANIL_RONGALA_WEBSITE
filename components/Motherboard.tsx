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

const PANELS_TOP = [
  { videoId: 'dQw4w9WgXcQ', title: 'Media 1' },
  { videoId: 'jfKfPfyJRdk', title: 'Media 2' }
];

const PANELS_BOTTOM = [
  { videoId: '5qap5aO4i9A', title: 'Data Stream 1' },
  { videoId: 'DWcJFNfaw9c', title: 'Data Stream 2' }
];

type ModuleCardProps = {
  module: ModuleDefinition;
};

function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Link href={module.href} className="module-link group">
      <div className="module-shadow" />
      <motion.div
        initial={{ y: 0, scale: 1 }}
        whileHover={{
          y: -10,
          scale: 1.05,
          boxShadow: '0 0 40px rgba(0,255,255,0.45), 0 0 80px rgba(0,150,255,0.35)'
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
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
      <MediaZone videos={PANELS_TOP} subtitle="SATELLITE UPLINK" variant="top" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-10">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.05, 0.12, 0.05], filter: ['blur(1px)', 'blur(3px)', 'blur(1px)'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle at center, rgba(59,130,246,0.15), transparent 70%)' }}
        />
        <div className="motherboard-stage hidden lg:flex">
          <div className="pcb-wrapper">
            <div className="pcb-scaler">
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
          </div>
        </div>

        <div className="pcb-module-stack xl:hidden">
          {modules.map((module) => (
            <ModuleCard key={`stack-${module.id}`} module={module} />
          ))}
        </div>
      </div>

      <MediaZone videos={PANELS_BOTTOM} subtitle="QUANTUM DOWNLINK" variant="bottom" />
    </div>
  );
}
