'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

export type BusId = 'axi' | 'ahb' | 'apb';

export const BOARD_DIMENSIONS = {
  width: 1200,
  height: 860
} as const;

const BUS_LAYOUT: Record<BusId, { topRatio: number; height: number; margin: number; dash: string; electrons: number; duration: number }> = {
  axi: { topRatio: 0.2, height: 52, margin: 140, dash: '20 26', electrons: 4, duration: 6 },
  ahb: { topRatio: 0.48, height: 50, margin: 120, dash: '18 24', electrons: 3, duration: 7.2 },
  apb: { topRatio: 0.74, height: 44, margin: 110, dash: '16 22', electrons: 3, duration: 8.4 }
};

const BUS_CLASS: Record<BusId, string> = {
  axi: 'bus-axi',
  ahb: 'bus-ahb',
  apb: 'bus-apb'
};

type Coordinates = Record<string, { x: number; y: number }>;

type BusNetworkProps = {
  coordinates: Coordinates;
  busAssignments: Record<BusId, string[]>;
  highlightedBuses: Set<BusId>;
  activeModules: string[];
};

type BusSegment = {
  id: BusId;
  trunk: string;
  branches: Array<{ moduleId: string; path: string }>;
  height: number;
  dash: string;
  electrons: number;
  duration: number;
  highlighted: boolean;
};

const electronRadius: Record<BusId, number> = {
  axi: 5,
  ahb: 4,
  apb: 3.5
};

export function BusNetwork({ coordinates, busAssignments, highlightedBuses, activeModules }: BusNetworkProps) {
  const segments = useMemo(() => {
    return (Object.entries(busAssignments) as Array<[BusId, string[]]>).map(([id, moduleIds]) => {
      const layout = BUS_LAYOUT[id];
      const top = BOARD_DIMENSIONS.height * layout.topRatio;
      const bottom = top + layout.height;

      const tapPoints = moduleIds
        .map((moduleId) => ({ moduleId, point: coordinates[moduleId] }))
        .filter((entry): entry is { moduleId: string; point: { x: number; y: number } } => Boolean(entry.point));

      if (tapPoints.length === 0) {
        return null;
      }

      const xs = tapPoints.map((entry) => entry.point.x);
      const left = Math.min(...xs) - layout.margin;
      const right = Math.max(...xs) + layout.margin;
      const trunk = `M${left} ${top} H${right} V${bottom} H${left} Z`;

      const branches = tapPoints.map(({ moduleId, point }) => {
        const anchor = point.y >= bottom ? bottom : point.y <= top ? top : point.y;
        const offset = point.y >= bottom ? point.y - 18 : point.y <= top ? point.y + 18 : point.y;
        const vertical = point.y >= bottom || point.y <= top ? `V${offset}` : '';
        const terminalY = point.y;
        const path = `M${point.x} ${anchor} ${vertical} L${point.x} ${terminalY}`;

        return { moduleId, path };
      });

      return {
        id,
        trunk,
        branches,
        height: layout.height,
        dash: layout.dash,
        electrons: layout.electrons,
        duration: layout.duration,
        highlighted: highlightedBuses.has(id)
      } satisfies BusSegment;
    })
      .filter((segment): segment is BusSegment => Boolean(segment));
  }, [busAssignments, coordinates, highlightedBuses]);

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${BOARD_DIMENSIONS.width} ${BOARD_DIMENSIONS.height}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {segments.map((segment) => {
        const activeOnBus = new Set(activeModules);
        const busClass = BUS_CLASS[segment.id];
        const electronDuration = segment.highlighted ? segment.duration * 0.6 : segment.duration;

        return (
          <g key={segment.id} className="bus-group">
            <path
              d={segment.trunk}
              className={`bus-line ${busClass}`}
              strokeDasharray={segment.dash}
              data-highlighted={segment.highlighted}
            />

            {segment.branches.map(({ moduleId, path }) => (
              <path
                key={`${segment.id}-${moduleId}-branch`}
                d={path}
                className={`bus-branch ${busClass}`}
                data-active={activeOnBus.has(moduleId)}
              />
            ))}

            {Array.from({ length: segment.electrons }).map((_, index) => {
              const delay = (electronDuration / segment.electrons) * index;
              return (
                <motion.circle
                  key={`${segment.id}-electron-${index}-${segment.highlighted ? 'fast' : 'base'}`}
                  className={`electron electron--${segment.id}`}
                  r={electronRadius[segment.id]}
                  style={{ offsetPath: `path("${segment.trunk}")` }}
                  initial={{ offsetDistance: '0%' }}
                  animate={{ offsetDistance: '100%' }}
                  transition={{
                    duration: electronDuration,
                    ease: 'linear',
                    repeat: Infinity,
                    delay
                  }}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
