'use client';

import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

import { boardSections } from '@/lib/boardSections';
import { mediaItems } from '@/lib/media';
import { siteConfig } from '@/lib/siteConfig';

import { AdBoard } from './AdBoard';
import { BusNetwork, type BusPath } from './BusNetwork';
import { Chip } from './Chip';

type ChipLayout = {
  top: string;
  left: string;
  width: string;
  height: string;
  className?: string;
};

const chipLayout: Record<string, ChipLayout> = {
  core: { top: '35%', left: '50%', width: '230px', height: '230px', className: 'rotate-[-2deg]' },
  cpu: { top: '52%', left: '45%', width: '240px', height: '240px', className: 'rotate-[1.5deg]' },
  gpu: { top: '72%', left: '25%', width: '210px', height: '210px', className: 'rotate-[-4deg]' },
  ram: { top: '26%', left: '70%', width: '220px', height: '190px', className: 'rotate-[3deg]' },
  ssd: { top: '64%', left: '72%', width: '210px', height: '190px', className: 'rotate-[2deg]' },
  media: { top: '78%', left: '50%', width: '220px', height: '190px', className: 'rotate-[-1deg]' },
  sensor: { top: '26%', left: '26%', width: '205px', height: '190px', className: 'rotate-[2deg]' },
  io: { top: '50%', left: '12%', width: '180px', height: '220px', className: 'rotate-[-5deg]' }
};

type AdSlot = { top: string; left: string; width?: string; rotation?: number };

const adBoardSlots: AdSlot[] = [
  { top: '32%', left: '42%', width: '260px', rotation: -6 },
  { top: '58%', left: '66%', width: '240px', rotation: 5 },
  { top: '68%', left: '44%', width: '230px', rotation: 9 }
];

const chipOrder = ['core', 'cpu', 'gpu', 'ram', 'ssd', 'sensor', 'io', 'media'];

const busPaths: BusPath[] = [
  {
    id: 'cxl-cpu-gpu',
    type: 'cxl',
    chips: ['cpu', 'gpu'],
    d: 'M540 468 C470 540 390 600 300 630',
    label: { text: 'CXL Link', x: 400, y: 560 }
  },
  {
    id: 'cxl-gpu-ram',
    type: 'cxl',
    chips: ['gpu', 'ram'],
    d: 'M300 630 C420 540 640 360 840 240',
    label: { text: 'CXL Fabric', x: 560, y: 440 }
  },
  {
    id: 'ddr-cpu-ram',
    type: 'ddr',
    chips: ['cpu', 'ram'],
    d: 'M540 468 C640 420 730 340 840 250',
    label: { text: 'DDR Channel', x: 690, y: 360 }
  },
  {
    id: 'pcie-cpu-ssd',
    type: 'pcie',
    chips: ['cpu', 'ssd'],
    d: 'M540 468 C620 500 720 540 840 585',
    label: { text: 'PCIe Gen5', x: 700, y: 535 }
  },
  {
    id: 'pcie-ssd-media',
    type: 'pcie',
    chips: ['ssd', 'media'],
    d: 'M840 585 C760 640 680 675 600 690',
    label: { text: 'Media Pipe', x: 710, y: 640 }
  },
  {
    id: 'axi-cpu-sensor',
    type: 'axi',
    chips: ['cpu', 'sensor'],
    d: 'M540 468 C480 400 400 320 300 250',
    label: { text: 'AXI Bus', x: 420, y: 350 }
  },
  {
    id: 'axi-sensor-io',
    type: 'axi',
    chips: ['sensor', 'io'],
    d: 'M300 250 C220 320 180 380 130 450',
    label: { text: 'Peripheral Link', x: 210, y: 360 }
  },
  {
    id: 'ahb-cpu-media',
    type: 'ahb',
    chips: ['cpu', 'media'],
    d: 'M540 468 C550 560 560 630 600 690',
    label: { text: 'AHB/Peripheral', x: 560, y: 600 }
  },
  {
    id: 'core-cpu-sync',
    type: 'sync',
    chips: ['core', 'cpu'],
    d: 'M600 315 C580 360 560 410 540 468',
    label: { text: 'Clock Mesh', x: 580, y: 380 }
  }
];

export function Motherboard() {
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [adIndex, setAdIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const totalMedia = mediaItems.length;
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const tiltX = useSpring(rotateX, { stiffness: 80, damping: 16, restDelta: 0.01 });
  const tiltY = useSpring(rotateY, { stiffness: 80, damping: 16, restDelta: 0.01 });

  useEffect(() => {
    const updateMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateMobile();
    window.addEventListener('resize', updateMobile);
    return () => window.removeEventListener('resize', updateMobile);
  }, []);

  useEffect(() => {
    if (!totalMedia) return;
    const interval = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % totalMedia);
    }, 15000);
    return () => clearInterval(interval);
  }, [totalMedia]);

  useEffect(() => () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  }, []);

  const activeMedia = useMemo(() => {
    if (!totalMedia) return [];
    return adBoardSlots.map((_, slotIndex) => mediaItems[(adIndex + slotIndex) % totalMedia]);
  }, [adIndex, totalMedia]);

  const sections = useMemo(() => {
    const map = new Map(boardSections.map((section) => [section.id, section]));
    return chipOrder
      .map((id) => map.get(id))
      .filter((section): section is (typeof boardSections)[number] => Boolean(section));
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width;
    const offsetY = (event.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - offsetY) * 8);
    rotateY.set((offsetX - 0.5) * 10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleHoverStart = (id: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setActiveChip(id);
  };

  const handleHoverEnd = (id: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveChip((current) => (current === id ? null : current));
    }, 2000);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-6xl justify-center">
      <div className="w-full" style={{ perspective: 1600 }}>
        <motion.div
          className="relative h-[900px] w-full overflow-hidden rounded-[52px] border border-cyan-500/20 bg-gradient-to-br from-[#050505] via-[#06080a] to-[#0a0a0a] shadow-[0_40px_160px_rgba(0,255,255,0.12)]"
          style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <video
            className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover opacity-10 blur-[3px]"
            src="/videos/anil-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.18)_0%,_rgba(3,9,16,0.8)_45%,_#030303_100%)]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(94,234,212,0.05)_0%,transparent_40%),linear-gradient(315deg,rgba(217,119,6,0.04)_0%,transparent_55%)]" />
          <motion.svg
            viewBox="0 0 1200 900"
            className="absolute inset-0 -z-5 h-full w-full opacity-35"
            preserveAspectRatio="xMidYMid slice"
            animate={{ x: ['0%', '1.8%', '0%'], y: ['0%', '-1.2%', '0%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          >
            <g stroke="rgba(148, 163, 184, 0.12)" strokeWidth="1.2" strokeDasharray="2 18">
              {[120, 240, 360, 480, 600, 720, 840].map((y) => (
                <line key={`h-${y}`} x1="0" x2="1200" y1={y} y2={y} />
              ))}
              {[140, 320, 520, 720, 900, 1080].map((x) => (
                <line key={`v-${x}`} x1={x} x2={x} y1="0" y2="900" />
              ))}
            </g>
            <g stroke="rgba(203, 213, 225, 0.14)" strokeWidth="2.2" strokeLinecap="round">
              <path d="M160 120 h880 v660 h-880 z" fill="none" />
              <rect x="480" y="180" width="240" height="180" rx="24" />
              <rect x="220" y="520" width="280" height="220" rx="26" />
            </g>
          </motion.svg>
          <div className="pointer-events-none absolute inset-0 -z-4 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.15),_transparent_60%)]" />
          <div className="pointer-events-none absolute inset-6 -z-3 rounded-[46px] border border-cyan-500/30 opacity-50" />
          <div className="pointer-events-none absolute inset-0 -z-2 rounded-[52px] shadow-[0_0_120px_rgba(0,255,255,0.12)_inset]" />

          <BusNetwork paths={busPaths} activeChip={activeChip} showElectrons={!isMobile} />

          <motion.div
            className="absolute left-1/2 top-[16%] z-10 flex w-[320px] -translate-x-1/2 items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-slate-200/80 backdrop-blur"
            animate={{ opacity: [0.4, 0.9, 0.4], y: [-6, 4, -6] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>Neural mainboard</span>
            <span>{siteConfig.ownerName}</span>
          </motion.div>

          {sections.map((section) => {
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
                onHoverStart={() => handleHoverStart(section.id)}
                onHoverEnd={() => handleHoverEnd(section.id)}
              />
            );
          })}

          <div className="hidden lg:block">
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
          </div>

          <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-[0.3em] text-cyan-100/70">
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
