'use client';

import { motion } from 'framer-motion';

export type BusPath = {
  id: string;
  from: string;
  to: string;
  d: string;
};

export type BusNetworkProps = {
  paths: BusPath[];
  activeChip: string | null;
};

export function BusNetwork({ paths, activeChip }: BusNetworkProps) {
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
        const pathId = `${path.id}-guide`;
        const isActive = activeChip === path.from || activeChip === path.to;
        const dashDuration = isActive ? 3.6 : 7.2;
        const electronDuration = isActive ? 4.2 : 7.5;
        const electronOffset = isActive ? 0.7 : 1.2;

        return (
          <g key={path.id} className="pointer-events-none">
            <path id={pathId} d={path.d} fill="none" />
            <motion.path
              d={path.d}
              stroke={isActive ? 'rgba(165, 243, 252, 0.85)' : 'rgba(34, 211, 238, 0.4)'}
              strokeWidth={isActive ? 5.5 : 4}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#bus-glow)"
              animate={{ opacity: isActive ? [0.45, 0.9, 0.45] : [0.2, 0.35, 0.2] }}
              transition={{ duration: isActive ? 1.8 : 3.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.path
              d={path.d}
              stroke={isActive ? 'rgba(34, 211, 238, 0.95)' : 'rgba(34, 211, 238, 0.4)'}
              strokeWidth={isActive ? 2.6 : 2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray="18 12"
              animate={{ strokeDashoffset: [0, -180] }}
              transition={{ duration: dashDuration, repeat: Infinity, ease: 'linear' }}
            />
            {[0, 1].map((index) => (
              <circle
                key={`${path.id}-electron-${index}`}
                r={isActive ? 3.6 : 3}
                fill="#5eead4"
                opacity={isActive ? 0.95 : 0.6}
              >
                <animateMotion
                  dur={`${electronDuration}s`}
                  repeatCount="indefinite"
                  begin={`${index * electronOffset}s`}
                  keyPoints="0;1"
                  keyTimes="0;1"
                >
                  <mpath xlinkHref={`#${pathId}`} />
                </animateMotion>
              </circle>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
