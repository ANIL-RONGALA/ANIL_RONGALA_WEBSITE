'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { boardSections } from '@/lib/boardSections';
import { siteConfig } from '@/lib/siteConfig';

import { BusNetwork, BOARD_DIMENSIONS, type BusId } from './BusNetwork';

type ModuleId = 'core' | 'cpu' | 'gpu' | 'ram' | 'ssd' | 'io' | 'sensor' | 'media';

type Module = {
  id: ModuleId;
  title: string;
  subtitle: string;
  href: string;
  position: { x: number; y: number };
};

type ModulePulseState = {
  active: boolean;
  strong: boolean;
};

const MODULE_IDS: ModuleId[] = ['core', 'cpu', 'gpu', 'ram', 'ssd', 'io', 'sensor', 'media'];

const MODULE_POSITIONS: Record<ModuleId, { x: number; y: number }> = {
  cpu: { x: 24, y: 30 },
  gpu: { x: 50, y: 26 },
  ssd: { x: 76, y: 30 },
  core: { x: 50, y: 55 },
  ram: { x: 32, y: 55 },
  io: { x: 24, y: 78 },
  sensor: { x: 50, y: 82 },
  media: { x: 76, y: 78 }
};

const BUS_ASSIGNMENTS: Record<BusId, ModuleId[]> = {
  axi: ['core', 'cpu', 'gpu', 'ssd'],
  ahb: ['core', 'ram', 'gpu'],
  apb: ['core', 'io', 'sensor', 'media']
};

const BUS_PULSE_LOOPS: Array<{ bus: BusId; cadence: number; modules: ModuleId[] }> = [
  { bus: 'axi', cadence: 5400, modules: ['core', 'cpu', 'gpu', 'ssd'] },
  { bus: 'ahb', cadence: 6200, modules: ['core', 'ram', 'gpu'] },
  { bus: 'apb', cadence: 7100, modules: ['core', 'io', 'sensor', 'media'] }
];

const PANELS_TOP: [string, string, string][] = [
  ['K4TOrB7at0Y', 'lJIrF4YjHfQ', 'hHW1oY26kxQ'],
  ['5qap5aO4i9A', '2LhoCfjm8R4', 'DWcJFNfaw9c']
];

const PANELS_BOTTOM: [string, string, string][] = [
  ['f02mOEt11OQ', '9bZkp7q19f0', 'a3Z7zEc7AXQ'],
  ['P2sQWRrUyfM', 'kxopViU98Xo', 'Zp9tP-tQqpU']
];

const STATUS_ITEMS = [
  { id: 'signal', label: 'SIGNAL INTEGRITY', value: 'NOMINAL' },
  { id: 'thermal', label: 'THERMALS', value: 'STABLE' },
  { id: 'bandwidth', label: 'BANDWIDTH', value: 'PRIMED' }
];

const createInitialPulseState = (): Record<ModuleId, ModulePulseState> =>
  MODULE_IDS.reduce((acc, moduleId) => {
    acc[moduleId] = { active: false, strong: false };
    return acc;
  }, {} as Record<ModuleId, ModulePulseState>);

function ModuleCard({
  module,
  isActive,
  isStrong,
  onHover,
  onLeave
}: {
  module: Module;
  isActive: boolean;
  isStrong: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const cardClassName = ['module-card'];
  if (isActive) {
    cardClassName.push('module-card--pulse');
  }
  if (isStrong) {
    cardClassName.push('module-card--surge');
  }

  return (
    <Link
      href={module.href}
      className="module-link"
      onMouseEnter={onHover}
      onFocus={onHover}
      onMouseLeave={onLeave}
      onBlur={onLeave}
    >
      <div className="module-shadow" />
      <motion.div
        whileHover={{ translateY: -4, scale: 1.03, boxShadow: '0 0 20px rgba(34,211,238,0.55)' }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className={cardClassName.join(' ')}
      >
        <span className="module-card__title">{module.title}</span>
        <span className="module-card__subtitle">{module.subtitle}</span>
        <span className="module-card__port">ACCESS PORT</span>
        <div className="module-card__glow" />
      </motion.div>
    </Link>
  );
}

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
    }, 13000);

    return () => clearInterval(timer);
  }, [back, front, videos.length]);

  const currentFront = videos[front % videos.length];
  const currentBack = videos[back % videos.length];

  return (
    <div className="video-panel">
      <motion.div className="video-panel-inner" animate={{ rotateY: showFront ? 0 : 180 }} transition={{ duration: 1.1 }}>
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

export function Motherboard() {
  const modules = useMemo<Module[]>(() => {
    return boardSections
      .filter((section) => (MODULE_IDS as string[]).includes(section.id))
      .map((section) => ({
        id: section.id as ModuleId,
        title: section.label,
        subtitle: section.subtitle,
        href: section.href,
        position: MODULE_POSITIONS[section.id as ModuleId]
      }));
  }, []);

  const moduleCoordinates = useMemo(
    () =>
      modules.reduce<Record<ModuleId, { x: number; y: number }>>((acc, module) => {
        acc[module.id] = {
          x: (module.position.x / 100) * BOARD_DIMENSIONS.width,
          y: (module.position.y / 100) * BOARD_DIMENSIONS.height
        };
        return acc;
      }, {} as Record<ModuleId, { x: number; y: number }>),
    [modules]
  );

  const [modulePulseState, setModulePulseState] = useState<Record<ModuleId, ModulePulseState>>(createInitialPulseState);
  const [hoveredModule, setHoveredModule] = useState<ModuleId | null>(null);
  const [pulseHighlights, setPulseHighlights] = useState<Set<BusId>>(new Set());
  const moduleReleaseTimers = useRef<Record<ModuleId, ReturnType<typeof setTimeout> | null>>(
    MODULE_IDS.reduce((acc, moduleId) => {
      acc[moduleId] = null;
      return acc;
    }, {} as Record<ModuleId, ReturnType<typeof setTimeout> | null>)
  );
  const busTimers = useRef<Record<BusId, ReturnType<typeof setTimeout> | null>>(
    (['axi', 'ahb', 'apb'] as BusId[]).reduce((acc, bus) => {
      acc[bus] = null;
      return acc;
    }, {} as Record<BusId, ReturnType<typeof setTimeout> | null>)
  );
  const sequenceTimers = useRef<Record<BusId, ReturnType<typeof setTimeout>[]>>({
    axi: [],
    ahb: [],
    apb: []
  });
  const [parallax, setParallax] = useState(0);

  const moduleToBuses = useMemo(() => {
    const mapping = MODULE_IDS.reduce<Record<ModuleId, BusId[]>>((acc, moduleId) => {
      acc[moduleId] = [];
      return acc;
    }, {} as Record<ModuleId, BusId[]>);

    (Object.entries(BUS_ASSIGNMENTS) as Array<[BusId, ModuleId[]]>).forEach(([bus, moduleIds]) => {
      moduleIds.forEach((moduleId) => {
        if (!mapping[moduleId].includes(bus)) {
          mapping[moduleId].push(bus);
        }
      });
    });

    return mapping;
  }, []);

  const triggerModulePulse = useCallback((moduleId: ModuleId, strong = false) => {
    setModulePulseState((previous) => ({
      ...previous,
      [moduleId]: { active: true, strong }
    }));

    const timers = moduleReleaseTimers.current;
    if (timers[moduleId]) {
      clearTimeout(timers[moduleId]!);
    }

    timers[moduleId] = setTimeout(() => {
      setModulePulseState((previous) => ({
        ...previous,
        [moduleId]: { active: false, strong: false }
      }));
      timers[moduleId] = null;
    }, strong ? 840 : 620);
  }, []);

  const triggerBusHighlight = useCallback((bus: BusId, duration: number) => {
    setPulseHighlights((previous) => {
      const next = new Set(previous);
      next.add(bus);
      return next;
    });

    const timers = busTimers.current;
    if (timers[bus]) {
      clearTimeout(timers[bus]!);
    }

    timers[bus] = setTimeout(() => {
      setPulseHighlights((previous) => {
        const next = new Set(previous);
        next.delete(bus);
        return next;
      });
      timers[bus] = null;
    }, duration);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setParallax(window.scrollY * 0.035);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    triggerModulePulse('core', true);

    const heartbeat = setInterval(() => {
      triggerModulePulse('core', true);
      triggerBusHighlight('ahb', 1600);
    }, 3600);

    return () => clearInterval(heartbeat);
  }, [triggerBusHighlight, triggerModulePulse]);

  useEffect(() => {
    const intervals = BUS_PULSE_LOOPS.map(({ bus, cadence, modules: route }) => {
      const runSequence = () => {
        triggerBusHighlight(bus, 2200);
        if (sequenceTimers.current[bus]?.length) {
          sequenceTimers.current[bus].forEach((timer) => clearTimeout(timer));
          sequenceTimers.current[bus] = [];
        }
        route.forEach((moduleId, index) => {
          const timeout = setTimeout(() => {
            triggerModulePulse(moduleId, moduleId === 'core' || bus === 'axi');
          }, index * 320);
          sequenceTimers.current[bus].push(timeout);
        });
      };

      runSequence();
      return setInterval(runSequence, cadence);
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
      (Object.keys(sequenceTimers.current) as BusId[]).forEach((bus) => {
        sequenceTimers.current[bus].forEach((timer) => clearTimeout(timer));
        sequenceTimers.current[bus] = [];
      });
      Object.values(moduleReleaseTimers.current).forEach((timer) => {
        if (timer) {
          clearTimeout(timer);
        }
      });
      Object.values(busTimers.current).forEach((timer) => {
        if (timer) {
          clearTimeout(timer);
        }
      });
    };
  }, [triggerBusHighlight, triggerModulePulse]);

  const activeModules = useMemo(
    () => Object.entries(modulePulseState).filter(([, state]) => state.active).map(([moduleId]) => moduleId),
    [modulePulseState]
  );

  const highlightedBuses = useMemo(() => {
    const combined = new Set(pulseHighlights);
    if (hoveredModule) {
      moduleToBuses[hoveredModule].forEach((bus) => combined.add(bus));
    }
    return combined;
  }, [hoveredModule, moduleToBuses, pulseHighlights]);

  return (
    <div className="pcb-wrapper">
      <MediaZone panels={PANELS_TOP} prefix="MEDIA CHANNEL" subtitle="ORBITAL BROADCAST UPLINK" />

      <section className="pcb-board">
        <div className="pcb-surface">
          <div className="pcb-grid" />
          <motion.div className="pcb-bus-layer" style={{ transform: `translateY(${-(parallax * 0.4)}px)` }}>
            <BusNetwork
              coordinates={moduleCoordinates}
              busAssignments={BUS_ASSIGNMENTS}
              highlightedBuses={highlightedBuses}
              activeModules={activeModules}
            />
          </motion.div>

          <motion.div className="pcb-glow-layer" style={{ transform: `translateY(${parallax * 0.2}px)` }} />

          <div className="pcb-module-layer hidden md:block">
            {modules.map((module) => (
              <div
                key={module.id}
                className="module-anchor"
                style={{ left: `${module.position.x}%`, top: `${module.position.y}%` }}
              >
                <ModuleCard
                  module={module}
                  isActive={modulePulseState[module.id].active}
                  isStrong={modulePulseState[module.id].strong}
                  onHover={() => {
                    setHoveredModule(module.id);
                    triggerModulePulse(module.id, true);
                  }}
                  onLeave={() => setHoveredModule((current) => (current === module.id ? null : current))}
                />
              </div>
            ))}
          </div>

          <div className="pcb-module-stack md:hidden">
            {modules.map((module) => (
              <ModuleCard
                key={`stacked-${module.id}`}
                module={module}
                isActive={modulePulseState[module.id].active}
                isStrong={modulePulseState[module.id].strong}
                onHover={() => triggerModulePulse(module.id, true)}
                onLeave={() => undefined}
              />
            ))}
          </div>

          <div className="pcb-header">
            <span>Neural Board //</span>
            <span>{siteConfig.ownerName}</span>
          </div>

          <div className="pcb-status-strip">
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
      </section>

      <MediaZone panels={PANELS_BOTTOM} prefix="DATA STREAM" subtitle="QUANTUM DOWNLINK" />
    </div>
  );
}
