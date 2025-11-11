'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { BusNetwork, BOARD_DIMENSIONS, type BusId, type ModuleId } from './BusNetwork';

type ModuleDefinition = {
  id: ModuleId;
  title: string;
  section: string;
  href: string;
};

type ModulePulseState = {
  active: boolean;
  strong: boolean;
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

const MODULE_LAYOUT: Record<ModuleId, { top: number; left: number; width: number; height: number }> = {
  core: { top: 430, left: 600, width: 220, height: 210 },
  cpu: { top: 420, left: 860, width: 190, height: 170 },
  gpu: { top: 250, left: 820, width: 190, height: 170 },
  ssd: { top: 420, left: 1040, width: 190, height: 170 },
  ram: { top: 250, left: 420, width: 190, height: 170 },
  io: { top: 540, left: 340, width: 190, height: 170 },
  sensor: { top: 640, left: 520, width: 190, height: 170 },
  media: { top: 660, left: 260, width: 190, height: 170 }
};

const BUS_ASSIGNMENTS: Record<BusId, ModuleId[]> = {
  axi: ['core', 'cpu', 'gpu', 'ssd'],
  ahb: ['core', 'ram', 'gpu'],
  apb: ['core', 'io', 'sensor', 'media']
};

const STRONG_BUSES: ReadonlySet<BusId> = new Set(['axi']);

const STATUS_ITEMS = [
  { id: 'signal', label: 'SIGNAL INTEGRITY', value: 'NOMINAL' },
  { id: 'thermal', label: 'THERMALS', value: 'STABLE' },
  { id: 'bandwidth', label: 'BANDWIDTH', value: 'PRIMED' }
] as const;

const PANELS_TOP: [string, string, string][] = [
  ['K4TOrB7at0Y', 'lJIrF4YjHfQ', 'hHW1oY26kxQ'],
  ['5qap5aO4i9A', '2LhoCfjm8R4', 'DWcJFNfaw9c']
];

const PANELS_BOTTOM: [string, string, string][] = [
  ['f02mOEt11OQ', '9bZkp7q19f0', 'a3Z7zEc7AXQ'],
  ['P2sQWRrUyfM', 'kxopViU98Xo', 'Zp9tP-tQqpU']
];

const MODULE_IDS: ModuleId[] = MODULES.map((module) => module.id);

const createPulseState = (): Record<ModuleId, ModulePulseState> =>
  MODULES.reduce((acc, module) => {
    acc[module.id] = { active: false, strong: false };
    return acc;
  }, {} as Record<ModuleId, ModulePulseState>);

type VideoPanelProps = {
  videos: string[];
  label: string;
};

function VideoPanel({ videos, label }: VideoPanelProps) {
  const [front, setFront] = useState(0);
  const [back, setBack] = useState(videos.length > 1 ? 1 : 0);
  const [showFront, setShowFront] = useState(true);

  useEffect(() => {
    if (videos.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setShowFront((current) => {
        if (current) {
          setBack((front + 1) % videos.length);
        } else {
          setFront((back + 1) % videos.length);
        }
        return !current;
      });
    }, 13500);

    return () => clearInterval(timer);
  }, [back, front, videos.length]);

  const currentFront = videos[front % videos.length];
  const currentBack = videos[back % videos.length];

  return (
    <div className="video-panel">
      <motion.div className="video-panel-inner" animate={{ rotateY: showFront ? 0 : 180 }} transition={{ duration: 1.05 }}>
        <div className="video-panel-face video-panel-face--front">
          <iframe
            key={`front-${currentFront}`}
            src={`https://www.youtube.com/embed/${currentFront}?rel=0&modestbranding=1&controls=0`}
            title={`${label} feed`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="video-panel-face video-panel-face--back">
          <iframe
            key={`back-${currentBack}`}
            src={`https://www.youtube.com/embed/${currentBack}?rel=0&modestbranding=1&controls=0`}
            title={`${label} feed`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>
      <span className="video-panel-label">{label}</span>
    </div>
  );
}

type MediaZoneProps = {
  panels: [string, string, string][];
  prefix: string;
  subtitle: string;
};

function MediaZone({ panels, prefix, subtitle }: MediaZoneProps) {
  return (
    <section className="media-zone">
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
  isActive: boolean;
  isStrong: boolean;
};

function ModuleCard({ module, isActive, isStrong }: ModuleCardProps) {
  const classes = ['module-card'];

  if (isActive) {
    classes.push('module-card--pulse');
  }
  if (isStrong) {
    classes.push('module-card--surge');
  }

  return (
    <Link href={module.href} className="module-link group">
      <div className="module-shadow" />
      <motion.div
        whileHover={{ y: -6, scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 240, damping: 24 }}
        className={classes.join(' ')}
      >
        <span className="module-card__title">{module.title}</span>
        <span className="module-card__subtitle">{module.section}</span>
        <div className="module-card__divider" />
        <span className="module-card__port">ROUTE {module.href === '/' ? 'ROOT' : module.href}</span>
        <div className="module-card__glow" />
      </motion.div>
    </Link>
  );
}

export function Motherboard() {
  const modules = useMemo(() => MODULES, []);
  const [pulseStates, setPulseStates] = useState<Record<ModuleId, ModulePulseState>>(() => createPulseState());
  const pulseTimeouts = useRef<Record<ModuleId, ReturnType<typeof setTimeout> | null>>(
    MODULE_IDS.reduce((acc, id) => {
      acc[id] = null;
      return acc;
    }, {} as Record<ModuleId, ReturnType<typeof setTimeout> | null>)
  );

  const moduleAnchors = useMemo(
    () =>
      modules.reduce((acc, module) => {
        const layout = MODULE_LAYOUT[module.id];
        acc[module.id] = { x: layout.left, y: layout.top };
        return acc;
      }, {} as Record<ModuleId, { x: number; y: number }>),
    [modules]
  );

  const triggerModulePulse = useCallback((moduleId: ModuleId, strong = false) => {
    setPulseStates((previous) => ({
      ...previous,
      [moduleId]: { active: true, strong }
    }));

    const timers = pulseTimeouts.current;
    if (timers[moduleId]) {
      clearTimeout(timers[moduleId]!);
    }

    timers[moduleId] = setTimeout(() => {
      setPulseStates((previous) => ({
        ...previous,
        [moduleId]: { active: false, strong: false }
      }));
      timers[moduleId] = null;
    }, strong ? 900 : 620);
  }, []);

  useEffect(() => {
    const handle = setInterval(() => triggerModulePulse('core', true), 4200);
    triggerModulePulse('core', true);
    return () => clearInterval(handle);
  }, [triggerModulePulse]);

  useEffect(() => {
    return () => {
      Object.values(pulseTimeouts.current).forEach((timer) => {
        if (timer) {
          clearTimeout(timer);
        }
      });
    };
  }, []);

  const handleModulePulse = useCallback(
    (moduleId: ModuleId, busId: BusId) => {
      triggerModulePulse('core', STRONG_BUSES.has(busId));
      triggerModulePulse(moduleId, STRONG_BUSES.has(busId));
    },
    [triggerModulePulse]
  );

  return (
    <div className="pcb-wrapper">
      <div className="pcb-board pcb-grid relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12 overflow-visible">
        <MediaZone panels={PANELS_TOP} prefix="MEDIA CHANNEL" subtitle="SATELLITE UPLINK" />

        <div className="relative mt-10">
          <div
            className="pcb-surface relative hidden overflow-visible rounded-[48px] border border-cyan-400/40 bg-slate-950/70 shadow-[0_0_80px_rgba(34,211,238,0.3)] backdrop-blur-xl md:block"
            style={{ width: '100%', maxWidth: `${BOARD_DIMENSIONS.width}px` }}
          >
            <div className="pcb-grid-layer absolute inset-0" />
            <div className="pcb-halo absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.2),transparent_70%)]" />

            <BusNetwork moduleAnchors={moduleAnchors} busAssignments={BUS_ASSIGNMENTS} onModulePulse={handleModulePulse} />

            <div className="relative z-20">
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
                    <ModuleCard
                      module={module}
                      isActive={pulseStates[module.id].active}
                      isStrong={pulseStates[module.id].strong}
                    />
                  </div>
                );
              })}
            </div>

            <div className="info-strip pcb-status-strip absolute bottom-6 left-1/2 z-30 -translate-x-1/2">
              {STATUS_ITEMS.map((status) => (
                <div key={status.id} className="status-indicator">
                  <span className={`status-led status-led--${status.id}`} />
                  <span className="status-text">
                    {status.label}: <span className="status-text__value">{status.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <div className="pcb-module-stack">
              {modules.map((module) => (
                <ModuleCard
                  key={`stack-${module.id}`}
                  module={module}
                  isActive={pulseStates[module.id].active}
                  isStrong={pulseStates[module.id].strong}
                />
              ))}
            </div>

            <div className="pcb-status-strip mt-6">
              {STATUS_ITEMS.map((status) => (
                <div key={status.id} className="status-indicator">
                  <span className={`status-led status-led--${status.id}`} />
                  <span className="status-text">
                    {status.label}: <span className="status-text__value">{status.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <MediaZone panels={PANELS_BOTTOM} prefix="DATA STREAM" subtitle="QUANTUM DOWNLINK" />
      </div>
    </div>
  );
}
