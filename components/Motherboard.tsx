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
  core: { top: '43%', left: '50%', width: 240, height: 240 },
  cpu: { top: '38%', left: '72%', width: 230, height: 210 },
  gpu: { top: '42%', left: '30%', width: 230, height: 210 },
  ram: { top: '26%', left: '72%', width: 210, height: 190 },
  ssd: { top: '56%', left: '75%', width: 230, height: 210 },
  io: { top: '46%', left: '24%', width: 220, height: 210 },
  sensor: { top: '59%', left: '50%', width: 230, height: 210 },
  media: { top: '68%', left: '50%', width: 250, height: 210 }
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

const ROTATION_INTERVAL_MS = 15 * 60 * 1000;
const FADE_DURATION_MS = 1000;

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

const extractYouTubeId = (source: string) => {
  if (/^[A-Za-z0-9_-]{11}$/.test(source)) {
    return source;
  }

  try {
    const url = new URL(source);
    if (url.hostname === 'youtu.be') {
      return url.pathname.slice(1);
    }

    const videoParam = url.searchParams.get('v');
    if (videoParam) {
      return videoParam;
    }

    const pathSegments = url.pathname.split('/');
    return pathSegments[pathSegments.length - 1] ?? source;
  } catch (error) {
    return source;
  }
};

function VideoPanel({ videos, label }: VideoPanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);

  useEffect(() => {
    setActiveIndex(0);
    setExitingIndex(null);
  }, [videos]);

  useEffect(() => {
    if (videos.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const nextIndex = (current + 1) % videos.length;
        setExitingIndex(current);
        return nextIndex;
      });
    }, ROTATION_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [videos.length]);

  useEffect(() => {
    if (exitingIndex === null) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setExitingIndex(null), FADE_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [exitingIndex]);

  return (
    <div className="video-panel">
      <div className="video-panel-viewport">
        {videos.map((source, index) => {
          const isActive = index === activeIndex;
          const isExiting = index === exitingIndex;
          const videoId = extractYouTubeId(source);

          return (
            <iframe
              key={`${label}-${videoId}-${index}`}
              className={`video-panel-media${isActive ? ' video-panel-media--active' : ''}${
                isExiting ? ' video-panel-media--exiting' : ''
              }`}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`}
              title={`${label} feed`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          );
        })}
      </div>
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
