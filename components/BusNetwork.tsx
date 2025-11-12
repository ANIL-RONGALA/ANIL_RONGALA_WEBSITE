'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

export type BusId = 'axi' | 'ahb' | 'apb';
export type ModuleId = 'core' | 'cpu' | 'gpu' | 'ram' | 'ssd' | 'io' | 'sensor' | 'media';

export const BOARD_DIMENSIONS = {
  width: 1120,
  height: 640
} as const;

type ModuleAnchors = Record<ModuleId, { x: number; y: number }>;

type BusNetworkProps = {
  moduleAnchors: ModuleAnchors;
};

type BusGroup = {
  id: BusId;
  polylines: Array<{ points: string; delay?: number }>;
  electrons: Array<{ path: string; duration: number; delay: number }>;
  label: { text: string; x: number; y: number };
};

const OFFSET_DISTANCE_KEY = '--offset-distance';

const toPoints = (points: Array<[number, number]>) => points.map(([x, y]) => `${x},${y}`).join(' ');

const toPath = (points: Array<[number, number]>) =>
  points.reduce((acc, [x, y], index) => (index === 0 ? `M${x} ${y}` : `${acc} L${x} ${y}`), '');

const offsetPoints = (points: Array<[number, number]>, dx: number, dy: number) =>
  points.map(([x, y]) => [x + dx, y + dy] as [number, number]);

export function BusNetwork({ moduleAnchors }: BusNetworkProps) {
  const groups = useMemo<BusGroup[]>(() => {
    const core = moduleAnchors.core;
    const cpu = moduleAnchors.cpu;
    const ssd = moduleAnchors.ssd;
    const gpu = moduleAnchors.gpu;
    const io = moduleAnchors.io;
    const ram = moduleAnchors.ram;
    const media = moduleAnchors.media;
    const sensor = moduleAnchors.sensor;

    const axiMain: Array<[number, number]> = [
      [core.x, core.y],
      [cpu.x - 110, core.y],
      [cpu.x - 110, cpu.y],
      [cpu.x, cpu.y],
      [cpu.x, ssd.y],
      [ssd.x, ssd.y],
      [gpu.x, ssd.y],
      [gpu.x, gpu.y]
    ];

    const ahbMain: Array<[number, number]> = [
      [core.x, core.y],
      [core.x, ram.y - 120],
      [ram.x, ram.y - 120],
      [ram.x, ram.y],
      [gpu.x, ram.y],
      [gpu.x, gpu.y]
    ];

    const apbMain: Array<[number, number]> = [
      [core.x, core.y],
      [core.x, io.y - 80],
      [io.x, io.y - 80],
      [io.x, io.y],
      [media.x, io.y],
      [media.x, media.y],
      [sensor.x, media.y],
      [sensor.x, sensor.y]
    ];

    return [
      {
        id: 'axi',
        polylines: [
          { points: toPoints(axiMain) },
          { points: toPoints(offsetPoints(axiMain, 0, -6)), delay: 0.2 },
          { points: toPoints(offsetPoints(axiMain, 0, 6)), delay: 0.4 }
        ],
        electrons: [
          { path: toPath(axiMain), duration: 7.2, delay: 0.3 },
          { path: toPath(offsetPoints(axiMain, 0, 6)), duration: 7.8, delay: 1.4 }
        ],
        label: { text: 'AXI', x: (cpu.x + ssd.x) / 2, y: ssd.y - 36 }
      },
      {
        id: 'ahb',
        polylines: [
          { points: toPoints(ahbMain) },
          { points: toPoints(offsetPoints(ahbMain, -6, 0)), delay: 0.25 }
        ],
        electrons: [
          { path: toPath(ahbMain), duration: 6.6, delay: 0.6 },
          { path: toPath(offsetPoints(ahbMain, -6, 0)), duration: 7.1, delay: 1.6 }
        ],
        label: { text: 'AHB', x: ram.x + 40, y: ram.y - 130 }
      },
      {
        id: 'apb',
        polylines: [
          { points: toPoints(apbMain) },
          { points: toPoints(offsetPoints(apbMain, 0, 6)), delay: 0.2 }
        ],
        electrons: [
          { path: toPath(apbMain), duration: 7.4, delay: 0.5 },
          { path: toPath(offsetPoints(apbMain, 0, 6)), duration: 8.1, delay: 1.8 }
        ],
        label: { text: 'APB', x: media.x + 48, y: media.y + 48 }
      }
    ];
  }, [moduleAnchors]);

  return (
    <svg
      className="bus-network"
      viewBox={`0 0 ${BOARD_DIMENSIONS.width} ${BOARD_DIMENSIONS.height}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      {groups.map((group) => (
        <g key={group.id} className={`bus-group bus-group--${group.id}`}>
          {group.polylines.map((line, index) => (
            <polyline
              key={`${group.id}-line-${index}`}
              points={line.points}
              className={`bus-line bus-${group.id}`}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animationDelay: `${line.delay ?? 0}s` }}
            />
          ))}

          <text x={group.label.x} y={group.label.y} className="bus-label">
            {group.label.text}
          </text>

          {group.electrons.map((electron, index) => (
            <motion.circle
              key={`${group.id}-electron-${index}`}
              r={3}
              className={`bus-electron bus-${group.id}`}
              style={{ offsetPath: `path('${electron.path}')`, offsetDistance: 'var(--offset-distance)' }}
              initial={{ [OFFSET_DISTANCE_KEY]: '0%' }}
              animate={{ [OFFSET_DISTANCE_KEY]: '100%' }}
              transition={{ duration: electron.duration, delay: electron.delay, ease: 'linear', repeat: Infinity }}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
