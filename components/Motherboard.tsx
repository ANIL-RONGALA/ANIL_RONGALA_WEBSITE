'use client';

import { useEffect, useMemo, useState, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

import { boardSections } from '@/lib/boardSections';
import { mediaItems } from '@/lib/media';
import { siteConfig } from '@/lib/siteConfig';

import { AdBoard } from './AdBoard';
import { BusNetwork, type BusPath } from './BusNetwork';
import { Chip } from './Chip';

const chipLayout: Record<
  string,
  {
    top: string;
    left: string;
    width: string;
    height: string;
    className?: string;
  }
> = {
  cpu: { top: '48%', left: '50%', width: '220px', height: '220px' },
  gpu: { top: '72%', left: '26%', width: '190px', height: '190px', className: 'rotate-[-6deg]' },
  ram: { top: '26%', left: '74%', width: '180px', height: '170px', className: 'rotate-[4deg]' },
  ssd: { top: '68%', left: '78%', width: '185px', height: '185px', className: 'rotate-[3deg]' },
  media: { top: '82%', left: '54%', width: '180px', height: '170px', className: 'rotate-[-2deg]' },
  sensor: { top: '24%', left: '28%', width: '175px', height: '175px', className: 'rotate-[2deg]' },
  io: { top: '52%', left: '18%', width: '150px', height: '200px', className: 'rotate-[-5deg]' }
};

const busPaths: BusPath[] = [
  { id: 'cpu-gpu', from: 'cpu', to: 'gpu', d: 'M600 430 C540 520 430 600 320 650' },
  { id: 'cpu-ram', from: 'cpu', to: 'ram', d: 'M600 430 C690 360 780 300 880 250' },
  { id: 'cpu-ssd', from: 'cpu', to: 'ssd', d: 'M600 430 C710 480 810 560 900 640' },
  { id: 'cpu-sensor', from: 'cpu', to: 'sensor', d: 'M600 430 C520 360 430 300 320 220' },
  { id: 'cpu-io', from: 'cpu', to: 'io', d: 'M600 430 C520 430 360 430 200 450' },
  { id: 'cpu-media', from: 'cpu', to: 'media', d: 'M600 430 C600 560 610 670 620 760' },
  { id: 'gpu-media', from: 'gpu', to: 'media', d: 'M320 650 C420 700 520 740 620 760' }
];

type AdSlot = { top: string; left: string; width?: string; rotation?: number };

const adBoardSlots: AdSlot[] = [
  { top: '32%', left: '42%', width: '240px', rotation: -6 },
  { top: '46%', left: '72%', width: '260px', rotation: 5 },
  { top: '66%', left: '46%', width: '230px', rotation: 8 }
];

const backgroundHorizontal = [120, 240, 360, 500, 640, 780];
const backgroundVertical = [160, 320, 480, 640, 800, 960];

export function Motherboard() {
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [adIndex, setAdIndex] = useState(0);
  const totalMedia = mediaItems.length;

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const tiltX = useSpring(rotateX, { stiffness: 80, damping: 16, restDelta: 0.01 });
  const tiltY = useSpring(rotateY, { stiffness: 80, damping: 16, restDelta: 0.01 });

  useEffect(() => {
    if (!totalMedia) return;
    const interval = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % totalMedia);
    }, 15000);
    return () => clearInterval(interval);
  }, [totalMedia]);

  const activeMedia = useMemo(() => {
    if (!totalMedia) return [];
    return adBoardSlots.map((_, slotIndex) => mediaItems[(adIndex + slotIndex) % totalMedia]);
  }, [adIndex, totalMedia]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width;
    const offsetY = (event.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - offsetY) * 10);
    rotateY.set((offsetX - 0.5) * 12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-6xl justify-center">
      <div className="w-full" style={{ perspective: 1600 }}>
        <motion.div
          className="relative w-full h-[900px] overflow-hidden rounded-[48px] border border-cyan-500/40 bg-[#04070d] shadow-[0_0_160px_rgba(34,211,238,0.25)]"
          style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <video
            className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover opacity-15 blur-[2px]"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="https://cdn.coverr.co/videos/coverr-digital-circuit-board-4642/1080p.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,_#0d1b2a_0%,_#020409_65%,_#000000_100%)]" />
          <motion.svg
            viewBox="0 0 1200 900"
            className="absolute inset-0 -z-10 h-full w-full opacity-25"
            preserveAspectRatio="xMidYMid slice"
            animate={{ x: ['0%', '2%', '0%'], y: ['0%', '-2%', '0%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          >
            <g stroke="rgba(51, 65, 85, 0.35)" strokeWidth="1" strokeDasharray="4 18">
              {backgroundHorizontal.map((y) => (
                <line key={`h-${y}`} x1="0" x2="1200" y1={y} y2={y} />
              ))}
              {backgroundVertical.map((x) => (
                <line key={`v-${x}`} x1={x} x2={x} y1="0" y2="900" />
              ))}
            </g>
            <g stroke="rgba(148, 163, 184, 0.15)" strokeWidth="2" strokeLinecap="round">
              <rect x="420" y="160" width="360" height="220" rx="32" />
              <rect x="180" y="520" width="300" height="220" rx="26" />
              <rect x="760" y="480" width="260" height="220" rx="30" />
            </g>
          </motion.svg>

          <BusNetwork paths={busPaths} activeChip={activeChip} />

          <motion.div
            className="absolute z-10 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl border border-cyan-300/40 bg-cyan-500/10 p-4 text-center backdrop-blur"
            style={{ top: '30%', left: '50%' }}
            animate={{ opacity: [0.5, 0.9, 0.5], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="space-y-1 text-cyan-100">
              <span className="block text-[9px] uppercase tracking-[0.45em] text-cyan-100/80">Core</span>
              <span className="block text-sm font-semibold text-white">{siteConfig.ownerName}</span>
              <span className="block text-[10px] leading-tight text-cyan-100/70">{siteConfig.tagline}</span>
            </div>
          </motion.div>

          {boardSections.map((section) => {
            const layout = chipLayout[section.id];
            if (!layout) return null;
            return (
              <Chip
                key={section.id}
                {...section}
                className={layout.className}
                style={{
                  top: layout.top,
                  left: layout.left,
                  width: layout.width,
                  height: layout.height
                }}
                onHoverStart={() => setActiveChip(section.id)}
                onHoverEnd={() => setActiveChip(null)}
              />
            );
          })}

          {activeMedia.map((media, index) => (
            <AdBoard
              key={`${media.youtubeUrl}-${index}`}
              youtubeUrl={media.youtubeUrl}
              title={media.title}
              position={adBoardSlots[index]}
              rotation={adBoardSlots[index]?.rotation ?? 0}
              isActive={index === 0}
            />
          ))}

          <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-wrap items-center justify-center gap-6 text-xs text-cyan-100/80">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-ping rounded-full bg-cyan-400" />
              <span>Signal integrity nominal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span>Thermals stable</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-400" />
              <span>Bandwidth primed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
