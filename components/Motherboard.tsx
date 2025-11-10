'use client';

import { useEffect, useMemo, useState } from 'react';
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

type CircuitDefinition = {
  id: string;
  d: string;
  label: string;
  labelPosition: { x: number; y: number };
  duration: number;
};

const CIRCUIT_PATHS: CircuitDefinition[] = [
  {
    id: 'cxl-link',
    d: 'M600 450 C740 360 820 360 860 340 C940 300 960 520 860 620 C720 660 520 660 380 620',
    label: 'CXL LINK',
    labelPosition: { x: 760, y: 370 },
    duration: 14
  },
  {
    id: 'axi-bus',
    d: 'M600 450 C700 340 780 280 860 220',
    label: 'AXI BUS',
    labelPosition: { x: 760, y: 260 },
    duration: 9
  },
  {
    id: 'ahb-pcie',
    d: 'M600 450 C520 460 440 500 340 520 C240 520 240 360 260 260',
    label: 'AHB / PCIe',
    labelPosition: { x: 310, y: 360 },
    duration: 11
  },
  {
    id: 'fabric-channel',
    d: 'M600 450 C600 560 600 640 600 720',
    label: 'FABRIC CHANNEL',
    labelPosition: { x: 612, y: 640 },
    duration: 10
  }
];

const STATUS_ITEMS = [
  { id: 'signal', label: 'SIGNAL INTEGRITY', value: 'NOMINAL' },
  { id: 'thermal', label: 'THERMALS', value: 'STABLE' },
  { id: 'bandwidth', label: 'BANDWIDTH', value: 'PRIMED' }
];

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

function ModuleCard({ module }: { module: ModuleDefinition }) {
  return (
    <Link href={module.href} className="module-link group block">
      <div className="module-shadow" />
      <motion.div
        whileHover={{ y: -8, boxShadow: '0 28px 70px rgba(34,211,238,0.35)', filter: 'brightness(1.08)' }}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
        className="module-card"
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

  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
      <MediaZone panels={PANELS_TOP} prefix="MEDIA CHANNEL" subtitle="ORBITAL BROADCAST UPLINK" />

      <div className="relative mt-10 overflow-hidden rounded-[52px] border border-cyan-500/30 bg-slate-950/80 shadow-[0_50px_140px_rgba(6,182,212,0.2)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(45,212,191,0.14),_transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(30,64,175,0.24),transparent_45%),linear-gradient(245deg,rgba(59,130,246,0.18),transparent_55%)] opacity-80" />

        <div className="relative mx-auto h-[920px] w-full max-w-6xl overflow-hidden rounded-[48px] border border-cyan-500/40 bg-slate-950/60 backdrop-blur-xl">
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

          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1200 920" preserveAspectRatio="none">
            <defs>
              <linearGradient id="traceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34,211,238,0.92)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.7)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g className="opacity-80">
              <rect x="110" y="90" width="980" height="700" rx="56" className="circuit-frame" />
              {CIRCUIT_PATHS.map((circuit) => (
                <g key={circuit.id}>
                  <path id={circuit.id} d={circuit.d} className="circuit-line" filter="url(#glow)" />
                  <circle className="circuit-electron" r="5.5">
                    <animateMotion dur={`${circuit.duration}s`} repeatCount="indefinite" rotate="auto">
                      <mpath xlinkHref={`#${circuit.id}`} />
                    </animateMotion>
                  </circle>
                  <circle className="circuit-electron circuit-electron--trail" r="4">
                    <animateMotion
                      dur={`${(circuit.duration * 1.2).toFixed(2)}s`}
                      repeatCount="indefinite"
                      begin={`-${(circuit.duration / 2).toFixed(2)}s`}
                      rotate="auto"
                    >
                      <mpath xlinkHref={`#${circuit.id}`} />
                    </animateMotion>
                  </circle>
                  <text x={circuit.labelPosition.x} y={circuit.labelPosition.y} className="circuit-label">
                    {circuit.label}
                  </text>
                </g>
              ))}
            </g>
          </svg>

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
                  <ModuleCard module={module} />
                </div>
              );
            })}
          </div>

          <div className="relative z-30 px-6 pb-28 pt-24 md:hidden">
            <div className="grid gap-6">
              {modules.map((module) => (
                <ModuleCard key={`stacked-${module.id}`} module={module} />
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
