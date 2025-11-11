'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { siteConfig } from '@/lib/siteConfig';

type ModuleId =
  | 'core'
  | 'cpu'
  | 'gpu'
  | 'ram'
  | 'ssd'
  | 'io'
  | 'sensor'
  | 'media';

type ModuleDefinition = {
  id: ModuleId;
  role: string;
  section: string;
  href: string;
};

const MODULES: ModuleDefinition[] = [
  { id: 'core', role: 'CORE MODULE', section: 'IDENTITY MATRIX', href: '/' },
  { id: 'cpu', role: 'CPU MODULE', section: 'PROJECTS', href: '/projects' },
  { id: 'ram', role: 'RAM MODULE', section: 'ACADEMICS', href: '/academics' },
  { id: 'ssd', role: 'SSD MODULE', section: 'ACHIEVEMENTS', href: '/achievements' },
  { id: 'gpu', role: 'GPU MODULE', section: 'RESEARCH & AI', href: '/projects' },
  { id: 'io', role: 'I/O MODULE', section: 'CONTACT', href: '/contact' },
  { id: 'sensor', role: 'SENSOR MODULE', section: 'PERSONAL LOG', href: '/personal' },
  { id: 'media', role: 'MEDIA MODULE', section: 'MEDIA HUB', href: '/media' }
];

type ModuleLayout = {
  top: string;
  left: string;
  width: number;
  height: number;
};

const MODULE_LAYOUT: Record<ModuleId, ModuleLayout> = {
  core: { top: '50%', left: '50%', width: 240, height: 240 },
  cpu: { top: '37.5%', left: '71.5%', width: 230, height: 220 },
  ram: { top: '21%', left: '74%', width: 210, height: 190 },
  ssd: { top: '69%', left: '72.5%', width: 230, height: 210 },
  gpu: { top: '69%', left: '30%', width: 230, height: 210 },
  io: { top: '53%', left: '28%', width: 220, height: 210 },
  sensor: { top: '27%', left: '24%', width: 210, height: 190 },
  media: { top: '80%', left: '50%', width: 250, height: 210 }
};

const VIDEO_INTERVAL = 13000;

const PANELS_TOP: [string, string, string][] = [
  ['K4TOrB7at0Y', 'lJIrF4YjHfQ', 'hHW1oY26kxQ'],
  ['5qap5aO4i9A', '2LhoCfjm8R4', 'DWcJFNfaw9c']
];

const PANELS_BOTTOM: [string, string, string][] = [
  ['f02mOEt11OQ', '9bZkp7q19f0', 'a3Z7zEc7AXQ'],
  ['P2sQWRrUyfM', 'kxopViU98Xo', 'Zp9tP-tQqpU']
];

type CircuitSpeed = 'fast' | 'medium' | 'slow';

type CircuitConnection = {
  id: string;
  start: ModuleId;
  end: ModuleId;
  type: string;
  speed: CircuitSpeed;
  d: string;
  labelPosition: { x: number; y: number };
  electrons?: number;
};

const CIRCUIT_CONNECTIONS: CircuitConnection[] = [
  {
    id: 'core-cpu',
    start: 'core',
    end: 'cpu',
    type: 'CXL LINK',
    speed: 'medium',
    d: 'M600 470 C712 430 810 382 890 340',
    labelPosition: { x: 760, y: 410 },
    electrons: 3
  },
  {
    id: 'cpu-ram',
    start: 'cpu',
    end: 'ram',
    type: 'DDR FABRIC',
    speed: 'fast',
    d: 'M890 340 C920 290 880 230 780 200',
    labelPosition: { x: 860, y: 270 }
  },
  {
    id: 'core-gpu',
    start: 'core',
    end: 'gpu',
    type: 'NVLINK',
    speed: 'medium',
    d: 'M600 470 C540 540 500 620 460 720',
    labelPosition: { x: 520, y: 610 }
  },
  {
    id: 'core-ssd',
    start: 'core',
    end: 'ssd',
    type: 'PCIE RAID',
    speed: 'medium',
    d: 'M600 470 C700 560 780 640 840 730',
    labelPosition: { x: 740, y: 640 }
  },
  {
    id: 'core-io',
    start: 'core',
    end: 'io',
    type: 'AXI BUS',
    speed: 'medium',
    d: 'M600 470 C520 450 430 430 360 500',
    labelPosition: { x: 470, y: 450 }
  },
  {
    id: 'io-sensor',
    start: 'io',
    end: 'sensor',
    type: 'I/O SENSOR LINK',
    speed: 'slow',
    d: 'M360 500 C330 420 340 330 380 250',
    labelPosition: { x: 340, y: 360 },
    electrons: 2
  },
  {
    id: 'core-media',
    start: 'core',
    end: 'media',
    type: 'FABRIC CHANNEL',
    speed: 'slow',
    d: 'M600 470 C600 620 600 730 600 820',
    labelPosition: { x: 612, y: 720 }
  }
];

const STATUS_ITEMS = [
  { id: 'signal', label: 'SIGNAL INTEGRITY', value: 'NOMINAL' },
  { id: 'thermal', label: 'THERMALS', value: 'STABLE' },
  { id: 'bandwidth', label: 'BANDWIDTH', value: 'PRIMED' }
];

type ModulePulseState = {
  active: boolean;
  strong: boolean;
};

const SPEED_DURATION: Record<CircuitSpeed, number> = {
  fast: 5.2,
  medium: 7.4,
  slow: 10.2
};

const ELECTRONS_PER_SPEED: Record<CircuitSpeed, number> = {
  fast: 3,
  medium: 2,
  slow: 2
};

const createPulseState = (): Record<ModuleId, ModulePulseState> =>
  MODULES.reduce((acc, module) => {
    acc[module.id] = { active: false, strong: false };
    return acc;
  }, {} as Record<ModuleId, ModulePulseState>);

type CircuitLineProps = {
  connection: CircuitConnection;
  onSurge: (module: ModuleId, strong?: boolean) => void;
};

function CircuitLine({ connection, onSurge }: CircuitLineProps) {
  const { d, id, start, end, speed, type, labelPosition } = connection;
  const duration = SPEED_DURATION[speed];
  const electronCount = connection.electrons ?? ELECTRONS_PER_SPEED[speed];

  useEffect(() => {
    const intervalTimers: ReturnType<typeof setInterval>[] = [];
    const startTimers: ReturnType<typeof setTimeout>[] = [];
    const arrivalTimers: ReturnType<typeof setTimeout>[] = [];

    const schedulePulse = (delaySeconds: number) => {
      const kickoff = setTimeout(() => {
        const startStrong = speed === 'fast' || start === 'core';
        const endStrong = speed === 'fast' || end === 'core';

        onSurge(start, startStrong);
        const arrival = setTimeout(() => onSurge(end, endStrong), duration * 0.92 * 1000);
        arrivalTimers.push(arrival);

        const interval = setInterval(() => {
          onSurge(start, startStrong);
          const endTimer = setTimeout(() => onSurge(end, endStrong), duration * 0.92 * 1000);
          arrivalTimers.push(endTimer);
        }, duration * 1000);

        intervalTimers.push(interval);
      }, delaySeconds * 1000);

      startTimers.push(kickoff);
    };

    for (let index = 0; index < electronCount; index += 1) {
      const stagger = (duration / electronCount) * index;
      schedulePulse(stagger);
    }

    return () => {
      startTimers.forEach((timer) => clearTimeout(timer));
      intervalTimers.forEach((timer) => clearInterval(timer));
      arrivalTimers.forEach((timer) => clearTimeout(timer));
    };
  }, [duration, electronCount, end, onSurge, speed, start]);

  return (
    <g className="circuit-line-group" aria-hidden>
      <motion.path
        id={id}
        d={d}
        className={`circuit-line circuit-line--${speed}`}
        stroke="#00ffff"
        strokeWidth={2}
        strokeOpacity={0.8}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {Array.from({ length: electronCount }).map((_, index) => (
        <motion.circle
          key={`${id}-electron-${index}`}
          r={index % 2 === 0 ? 3 : 2.4}
          className={`circuit-electron ${index % 2 === 1 ? 'circuit-electron--secondary' : ''}`}
          fill="url(#electronGradient)"
          style={{ offsetPath: `path('${d}')`, offsetRotate: 'auto' }}
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{
            duration,
            repeat: Infinity,
            ease: 'linear',
            delay: (duration / electronCount) * index
          }}
        />
      ))}

      <text x={labelPosition.x} y={labelPosition.y} className="circuit-label">
        {type}
      </text>
    </g>
  );
}

type CircuitNetworkProps = {
  connections: CircuitConnection[];
  onSurge: (module: ModuleId, strong?: boolean) => void;
};

function CircuitNetwork({ connections, onSurge }: CircuitNetworkProps) {
  return (
    <svg
      className="circuit-network pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 920"
      preserveAspectRatio="none"
    >
      <defs>
        <radialGradient id="electronGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#00ffff" stopOpacity="0.6" />
        </radialGradient>
      </defs>
      <rect x="110" y="90" width="980" height="700" rx="56" className="circuit-frame" />
      <g>
        {connections.map((connection) => (
          <CircuitLine key={connection.id} connection={connection} onSurge={onSurge} />
        ))}
      </g>
    </svg>
  );
}

type VideoPanelProps = {
  videos: string[];
  label: string;
};

function VideoPanel({ videos, label }: VideoPanelProps) {
  const [showFront, setShowFront] = useState(true);
  const [frontIndex, setFrontIndex] = useState(0);
  const [backIndex, setBackIndex] = useState(videos.length > 1 ? 1 : 0);

  useEffect(() => {
    if (videos.length <= 1) return;

    const interval = setInterval(() => {
      setShowFront((current) => {
        if (current) {
          setBackIndex((frontIndex + 1) % videos.length);
        } else {
          setFrontIndex((backIndex + 1) % videos.length);
        }
        return !current;
      });
    }, VIDEO_INTERVAL);

    return () => clearInterval(interval);
  }, [backIndex, frontIndex, videos.length]);

  const currentFront = videos[frontIndex % videos.length];
  const currentBack = videos[backIndex % videos.length];

  return (
    <div className="video-panel">
      <motion.div
        className="video-panel-inner"
        animate={{ rotateY: showFront ? 0 : 180 }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
      >
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

function ModuleCard({
  module,
  isActive,
  isStrong
}: {
  module: ModuleDefinition;
  isActive: boolean;
  isStrong: boolean;
}) {
  const cardClassName = ['module-card'];
  if (isActive) {
    cardClassName.push('module-card--pulse');
  }
  if (isStrong) {
    cardClassName.push('module-card--surge');
  }

  return (
    <Link href={module.href} className="module-link group block">
      <div className="module-shadow" />
      <motion.div
        whileHover={{ y: -8, boxShadow: '0 28px 70px rgba(34,211,238,0.35)', filter: 'brightness(1.08)' }}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
        className={cardClassName.join(' ')}
      >
        <span className="module-card__role">{module.role}</span>
        <div className="module-slot" />
        <span className="module-card__port">ACCESS PORT</span>
        <span className="module-card__section">{module.section}</span>
        <div className="module-card__glow" />
      </motion.div>
    </Link>
  );
}

export function Motherboard() {
  const modules = useMemo(() => MODULES, []);
  const [pulseStates, setPulseStates] = useState<Record<ModuleId, ModulePulseState>>(() => createPulseState());
  const pulseTimeouts = useRef<Record<ModuleId, ReturnType<typeof setTimeout> | null>>(
    MODULES.reduce((acc, module) => {
      acc[module.id] = null;
      return acc;
    }, {} as Record<ModuleId, ReturnType<typeof setTimeout> | null>)
  );

  const triggerModulePulse = useCallback(
    (moduleId: ModuleId, strong = false) => {
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
      }, strong ? 820 : 620);
    },
    []
  );

  useEffect(() => {
    const heartbeat = setInterval(() => {
      triggerModulePulse('core', true);
    }, 3600);

    return () => clearInterval(heartbeat);
  }, [triggerModulePulse]);

  useEffect(() => {
    triggerModulePulse('core', true);

    return () => {
      Object.values(pulseTimeouts.current).forEach((timer) => {
        if (timer) {
          clearTimeout(timer);
        }
      });
    };
  }, [triggerModulePulse]);

  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
      <MediaZone panels={PANELS_TOP} prefix="MEDIA CHANNEL" subtitle="ORBITAL BROADCAST UPLINK" />

      <div className="relative mt-10 min-h-[920px] overflow-visible rounded-[52px] border border-cyan-500/30 bg-slate-950/80 shadow-[0_50px_140px_rgba(6,182,212,0.2)] md:min-h-[1080px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(45,212,191,0.14),_transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(30,64,175,0.24),transparent_45%),linear-gradient(245deg,rgba(59,130,246,0.18),transparent_55%)] opacity-80" />

        <div className="relative mx-auto min-h-[920px] w-full max-w-6xl overflow-visible rounded-[48px] border border-cyan-500/40 bg-slate-950/60 backdrop-blur-xl md:min-h-[1080px]">
          <div className="radar-pulse radar-pulse--primary" />
          <div className="radar-pulse radar-pulse--secondary" />

          <div className="absolute inset-0">
            <div className="heat-halo heat-halo--cpu" />
            <div className="heat-halo heat-halo--gpu" />
            <div className="heat-halo heat-halo--ssd" />
          </div>

          <div className="absolute left-1/2 top-[6%] z-30 -translate-x-1/2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-6 py-2 text-[11px] uppercase tracking-[0.4em] text-cyan-100/80 backdrop-blur">
            Neural Board // {siteConfig.ownerName}
          </div>

          <CircuitNetwork connections={CIRCUIT_CONNECTIONS} onSurge={triggerModulePulse} />

          <div className="absolute inset-0 hidden md:block">
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

          <div className="relative z-30 max-h-screen overflow-y-auto px-6 pb-28 pt-24 md:hidden">
            <div className="grid gap-6">
              {modules.map((module) => (
                <ModuleCard
                  key={`stacked-${module.id}`}
                  module={module}
                  isActive={pulseStates[module.id].active}
                  isStrong={pulseStates[module.id].strong}
                />
              ))}
            </div>
          </div>

          <div className="info-strip">
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
  );
}
