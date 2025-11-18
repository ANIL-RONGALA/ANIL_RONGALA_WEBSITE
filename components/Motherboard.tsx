'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FaBroadcastTower,
  FaCube,
  FaMemory,
  FaMicrochip,
  FaNetworkWired,
  FaPlayCircle,
  FaSatelliteDish,
  FaSdCard
} from 'react-icons/fa';

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
  bootDelay: number;
};

const MODULE_LAYOUT: Record<ModuleId, ModuleLayout> = {
  core: { top: '50%', left: '50%', width: 240, height: 220, bootDelay: 0.05 },
  cpu: { top: '20%', left: '77%', width: 220, height: 180, bootDelay: 0.12 },
  gpu: { top: '50%', left: '77%', width: 220, height: 180, bootDelay: 0.18 },
  ssd: { top: '80%', left: '77%', width: 220, height: 180, bootDelay: 0.28 },
  ram: { top: '20%', left: '23%', width: 220, height: 180, bootDelay: 0.24 },
  io: { top: '50%', left: '23%', width: 220, height: 180, bootDelay: 0.32 },
  sensor: { top: '80%', left: '23%', width: 220, height: 180, bootDelay: 0.36 },
  media: { top: '84%', left: '50%', width: 320, height: 190, bootDelay: 0.4 }
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
  isActive?: boolean;
  isStrong?: boolean;
};

function ModuleCard({ module }: ModuleCardProps) {
  const isGpu = module.id === 'gpu';
  const ICONS: Record<ModuleId, JSX.Element> = {
    core: <FaCube className="h-6 w-6" />,
    cpu: <FaMicrochip className="h-6 w-6" />,
    gpu: <FaBroadcastTower className="h-6 w-6" />,
    ram: <FaMemory className="h-6 w-6" />,
    ssd: <FaSdCard className="h-6 w-6" />,
    io: <FaNetworkWired className="h-6 w-6" />,
    sensor: <FaSatelliteDish className="h-6 w-6" />,
    media: <FaPlayCircle className="h-6 w-6" />
  };
  const cardClassName = [
    'module-card floating-module w-full max-w-[360px] aspect-square md:h-[200px] md:w-[220px] md:max-w-none lg:h-full lg:w-full lg:aspect-auto'
  ];

  return (
    <Link href={module.href} className="module-link group block">
      <div className="module-shadow" />
      <motion.div
        initial={{ y: 0, scale: 1 }}
        whileHover={{
          y: -10,
          scale: 1.05,
          rotateX: 6,
          rotateY: -6,
          boxShadow: '0 32px 80px rgba(15,23,42,0.55)'
        }}
        whileTap={{ scale: 0.99, rotateX: 0, rotateY: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className={cardClassName.join(' ')}
        style={{ perspective: 1200 }}
      >
        <span className="module-card__subtitle">{module.section}</span>
        <div className="flex items-center justify-center gap-2 text-[color:var(--module-title)]">
          <span className="text-cyan-300 drop-shadow">{ICONS[module.id]}</span>
          <span className="module-card__title text-[0.7rem] tracking-[0.34em]">{module.title}</span>
        </div>
        <div className="module-card__divider" />
        <span className="module-card__port">ROUTE {module.href === '/' ? 'ROOT' : module.href}</span>

        {isGpu && (
          <div className="gpu-fan">
            <div className="gpu-fan-blades" />
          </div>
        )}
      </motion.div>
    </Link>
  );
}

export function Motherboard() {
  const modules = useMemo(() => MODULES, []);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const parallaxGlow = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const pulseStates = useMemo(
    () =>
      modules.reduce(
        (acc, module) => {
          acc[module.id] = { active: true, strong: false };
          return acc;
        },
        {} as Record<ModuleId, { active: boolean; strong: boolean }>
      ),
    [modules]
  );

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

      <motion.div
        className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-10"
        style={{ y: parallaxY, scale: parallaxGlow }}
      >
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
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.96, filter: 'blur(6px)' }}
                          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0)' }}
                          transition={{ duration: 0.8, delay: layout.bootDelay }}
                          className="genz-holo genz-glitch-on-hover"
                        >
                          <ModuleCard
                            module={module}
                            isActive={pulseStates[module.id].active}
                            isStrong={pulseStates[module.id].strong}
                          />
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pcb-module-stack xl:hidden">
          {modules.map((module) => {
            const layout = MODULE_LAYOUT[module.id];

            return (
              <motion.div
                key={`stack-${module.id}`}
                initial={{ opacity: 0, y: 20, scale: 0.96, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0)' }}
                transition={{ duration: 0.8, delay: layout.bootDelay }}
                className="genz-holo genz-glitch-on-hover"
              >
                <ModuleCard
                  module={module}
                  isActive={pulseStates[module.id].active}
                  isStrong={pulseStates[module.id].strong}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <MediaZone videos={PANELS_BOTTOM} subtitle="QUANTUM DOWNLINK" variant="bottom" />
    </div>
  );
}
