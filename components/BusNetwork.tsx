'use client';

import { motion } from 'framer-motion';

type BusType = 'cxl' | 'pcie' | 'axi' | 'ddr' | 'ahb' | 'sync';

const BUS_STYLE: Record<BusType, { stroke: string; glow: string; width: number; dash: string; duration: number; electron: string; label: string }> = {
  cxl: {
    stroke: 'rgba(0, 245, 255, 0.65)',
    glow: 'rgba(0, 245, 255, 0.55)',
    width: 8,
    dash: '26 16',
    duration: 4,
    electron: '#8dfdff',
    label: '#9ffaff'
  },
  pcie: {
    stroke: 'rgba(255, 102, 255, 0.55)',
    glow: 'rgba(255, 102, 255, 0.45)',
    width: 7,
    dash: '22 14',
    duration: 4.6,
    electron: '#ffb3ff',
    label: '#ffd6ff'
  },
  axi: {
    stroke: 'rgba(34, 197, 94, 0.55)',
    glow: 'rgba(34, 197, 94, 0.45)',
    width: 6,
    dash: '20 12',
    duration: 5,
    electron: '#6ee7b7',
    label: '#bbf7d0'
  },
  ddr: {
    stroke: 'rgba(14, 165, 233, 0.65)',
    glow: 'rgba(14, 165, 233, 0.55)',
    width: 7.5,
    dash: '24 14',
    duration: 3.6,
    electron: '#bae6fd',
    label: '#e0f2fe'
  },
  ahb: {
    stroke: 'rgba(226, 232, 240, 0.55)',
    glow: 'rgba(226, 232, 240, 0.45)',
    width: 5.5,
    dash: '18 12',
    duration: 5.4,
    electron: '#f8fafc',
    label: '#f8fafc'
  },
  sync: {
    stroke: 'rgba(59, 130, 246, 0.65)',
    glow: 'rgba(59, 130, 246, 0.5)',
    width: 5.5,
    dash: '16 10',
    duration: 4.8,
    electron: '#bfdbfe',
    label: '#bfdbfe'
  }
};

export type BusPath = {
  id: string;
  type: BusType;
  chips: string[];
  d: string;
  label?: { text: string; x: number; y: number };
};

export type BusNetworkProps = {
  paths: BusPath[];
  activeChip: string | null;
  showElectrons?: boolean;
};

export function BusNetwork({ paths, activeChip, showElectrons = true }: BusNetworkProps) {
  return (
    <svg
      viewBox="0 0 1200 900"
      className="absolute inset-0 z-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="bus-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {paths.map((path) => {
        const style = BUS_STYLE[path.type];
        const pathId = `${path.id}-guide`;
        const isActive = activeChip ? path.chips.includes(activeChip) : false;
        const dashDuration = isActive ? style.duration : style.duration * 1.8;
        const electronDuration = isActive ? style.duration * 1.2 : style.duration * 2.1;
        const electronOffset = isActive ? style.duration / 3 : style.duration / 1.8;
        const electronCount = showElectrons ? (path.type === 'cxl' ? 3 : 2) : 0;

        return (
          <g key={path.id} className="pointer-events-none">
            <path id={pathId} d={path.d} fill="none" />
            <motion.path
              d={path.d}
              stroke={style.stroke}
              strokeWidth={isActive ? style.width * 1.2 : style.width}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#bus-glow)"
              animate={{ opacity: isActive ? [0.6, 1, 0.6] : [0.25, 0.45, 0.25] }}
              transition={{ duration: isActive ? 1.6 : 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d={path.d}
              stroke={style.glow}
              strokeWidth={isActive ? style.width * 0.55 : style.width * 0.45}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray={style.dash}
              animate={{ strokeDashoffset: [0, -180] }}
              transition={{ duration: dashDuration, repeat: Infinity, ease: 'linear' }}
            />
            {Array.from({ length: electronCount }).map((_, index) => (
              <circle
                key={`${path.id}-electron-${index}`}
                r={isActive ? 4 : 3}
                fill={style.electron}
                opacity={isActive ? 0.95 : 0.6}
              >
                <animateMotion
                  dur={`${electronDuration}s`}
                  repeatCount="indefinite"
                  begin={`${index * (electronOffset / Math.max(electronCount, 1))}s`}
                  keyPoints="0;1"
                  keyTimes="0;1"
                >
                  <mpath xlinkHref={`#${pathId}`} />
                </animateMotion>
              </circle>
            ))}
            {path.label ? (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0.65 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <rect
                  x={path.label.x - 54}
                  y={path.label.y - 18}
                  width={108}
                  height={28}
                  rx={14}
                  fill="rgba(10, 12, 14, 0.75)"
                  stroke={`${style.label}77`}
                  strokeWidth={1}
                  filter="url(#bus-glow)"
                />
                <text
                  x={path.label.x}
                  y={path.label.y + 3}
                  textAnchor="middle"
                  fontSize="12"
                  letterSpacing="4"
                  fill={style.label}
                >
                  {path.label.text.toUpperCase()}
                </text>
              </motion.g>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
