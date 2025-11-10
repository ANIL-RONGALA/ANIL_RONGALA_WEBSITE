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
  core: { top: '50%', left: '50%', width: 230, height: 230 },
  cpu: { top: '38%', left: '68%', width: 220, height: 220 },
  ram: { top: '22%', left: '77%', width: 200, height: 180 },
  ssd: { top: '66%', left: '74%', width: 210, height: 190 },
  gpu: { top: '64%', left: '28%', width: 220, height: 200 },
  io: { top: '52%', left: '20%', width: 200, height: 210 },
  sensor: { top: '26%', left: '32%', width: 200, height: 180 },
  media: { top: '80%', left: '50%', width: 230, height: 190 }
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

export function Motherboard() {
  const modules = useMemo(() => MODULES, []);

  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-12">
      <div className="relative overflow-hidden rounded-[48px] border border-cyan-500/30 bg-slate-950/80 shadow-[0_40px_120px_rgba(6,182,212,0.18)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(45,212,191,0.14),_transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(30,64,175,0.24),transparent_45%),linear-gradient(245deg,rgba(59,130,246,0.18),transparent_55%)] opacity-80" />

        <div className="relative mx-auto h-[860px] w-full max-w-6xl overflow-hidden rounded-[44px] border border-cyan-500/40 bg-slate-950/60 backdrop-blur-md">
          <div className="radar-pulse radar-pulse--primary" />
          <div className="radar-pulse radar-pulse--secondary" />

          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1200 860" preserveAspectRatio="none">
            <defs>
              <linearGradient id="traceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(34,211,238,0.8)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0.6)" />
              </linearGradient>
            </defs>
            <g className="opacity-70">
              <rect x="120" y="80" width="960" height="620" rx="48" className="circuit-trace circuit-trace--bold" />
              <path d="M360 160 H840" className="circuit-trace" />
              <path d="M360 160 V700" className="circuit-trace" />
              <path d="M480 340 H720" className="circuit-trace" />
              <path d="M600 320 L780 320" className="circuit-trace" />
              <path d="M480 520 H760" className="circuit-trace" />
              <path d="M320 480 L520 320" className="circuit-trace" />
              <path d="M280 320 L280 520 L420 640" className="circuit-trace" />
              <path d="M760 520 L900 620" className="circuit-trace" />
              <path d="M520 440 L640 260" className="circuit-trace" />
              <text x="640" y="305" className="circuit-label">CXL FABRIC</text>
              <text x="660" y="560" className="circuit-label">AXI BUS</text>
              <text x="320" y="360" className="circuit-label">AHB / PCIe</text>
              <text x="880" y="450" className="circuit-label">CXL LINK</text>
            </g>
          </svg>

          <div className="electron electron--ring" />
          <div className="electron electron--core" />
          <div className="electron electron--lateral" />

          <div className="absolute left-1/2 top-[9%] z-20 w-[84%] -translate-x-1/2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {PANELS_TOP.map((videos, index) => (
                <VideoPanel key={`top-${index}`} videos={videos} label={`MEDIA CHANNEL ${index + 1}`} />
              ))}
            </div>
          </div>

          <div className="absolute bottom-[9%] left-1/2 z-20 w-[84%] -translate-x-1/2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {PANELS_BOTTOM.map((videos, index) => (
                <VideoPanel key={`bottom-${index}`} videos={videos} label={`DATA STREAM ${index + 1}`} />
              ))}
            </div>
          </div>

          <div className="absolute inset-0">
            <div className="heat-halo heat-halo--cpu" />
            <div className="heat-halo heat-halo--gpu" />
            <div className="heat-halo heat-halo--ssd" />
          </div>

          <div className="absolute inset-0">
            {modules.map((module) => {
              const layout = MODULE_LAYOUT[module.id];
              return (
                <Link
                  key={module.id}
                  href={module.href}
                  className="group"
                  style={{
                    position: 'absolute',
                    top: layout.top,
                    left: layout.left,
                    width: layout.width,
                    height: layout.height,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(34,211,238,0.35)' }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                    className="relative flex h-full w-full flex-col justify-between rounded-[26px] border border-cyan-400/30 bg-[linear-gradient(145deg,rgba(13,27,44,0.92),rgba(9,19,30,0.86))] p-5 text-xs tracking-[0.32em] text-cyan-100/80 backdrop-blur"
                  >
                    <span className="text-[11px] uppercase text-cyan-100/90">{module.role}</span>
                    <div className="module-slot" />
                    <span className="text-[10px] uppercase text-slate-300/70">ACCESS PORT</span>
                    <span className="text-[13px] font-semibold tracking-[0.24em] text-cyan-100/95">{module.section}</span>
                    <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-white/5 opacity-50 transition-opacity duration-300 group-hover:opacity-80" />
                    <div className="pointer-events-none absolute inset-0 rounded-[26px] shadow-[0_0_35px_rgba(45,212,191,0.32)_inset] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="absolute left-1/2 top-[4.5%] z-30 -translate-x-1/2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-6 py-2 text-[11px] uppercase tracking-[0.4em] text-cyan-100/80 backdrop-blur">
            Neural Board // {siteConfig.ownerName}
          </div>

          <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-10 text-[11px] uppercase tracking-[0.38em] text-cyan-100/70">
            <div className="status-indicator">
              <span className="status-led status-led--signal" />
              <span>SIGNAL INTEGRITY: NOMINAL</span>
            </div>
            <div className="status-indicator">
              <span className="status-led status-led--thermal" />
              <span>THERMALS: STABLE</span>
            </div>
            <div className="status-indicator">
              <span className="status-led status-led--bandwidth" />
              <span>BANDWIDTH: PRIMED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
