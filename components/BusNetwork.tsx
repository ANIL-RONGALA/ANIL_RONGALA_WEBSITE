'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

export type BusId = 'axi' | 'ahb' | 'apb';
export type ModuleId = 'core' | 'cpu' | 'gpu' | 'ram' | 'ssd' | 'io' | 'sensor' | 'media';

export const BOARD_DIMENSIONS = {
  width: 1080,
  height: 620
} as const;

type ModuleAnchors = Record<ModuleId, { x: number; y: number }>;

type BusNetworkProps = {
  moduleAnchors: ModuleAnchors;
};

type PathDefinition = {
  points: Array<[number, number]>;
  duration?: number;
  delay?: number;
};

type ElectronDefinition = {
  points: Array<[number, number]>;
  duration: number;
  delay: number;
};

type BusGroup = {
  id: BusId;
  paths: PathDefinition[];
  electrons: ElectronDefinition[];
  label: { text: string; x: number; y: number };
};

const STROKE_WIDTH: Record<BusId, number> = {
  axi: 3,
  ahb: 2.2,
  apb: 1.6
};

const STROKE_OPACITY: Record<BusId, number> = {
  axi: 0.85,
  ahb: 0.8,
  apb: 0.75
};

const toPath = (points: Array<[number, number]>) =>
  points.reduce((acc, [x, y], index) => (index === 0 ? `M${x} ${y}` : `${acc} L${x} ${y}`), '');

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

    const CORE_HALF_WIDTH = 120;
    const CORE_HALF_HEIGHT = 110;
    const MODULE_HALF_WIDTH = 110;
    const MODULE_HALF_HEIGHT = 90;
    const MEDIA_HALF_HEIGHT = 95;
    const RAIL_MARGIN = 32;
    const BRANCH_MARGIN = 28;

    const leftRail = core.x - CORE_HALF_WIDTH - RAIL_MARGIN;
    const rightRail = core.x + CORE_HALF_WIDTH + RAIL_MARGIN;
    const topLane = Math.max(24, ram.y - MODULE_HALF_HEIGHT - BRANCH_MARGIN);
    const bottomLane = Math.min(BOARD_DIMENSIONS.height - 36, sensor.y + MODULE_HALF_HEIGHT + BRANCH_MARGIN);
    const mediaLane = Math.min(media.y - MEDIA_HALF_HEIGHT - 24, bottomLane - 32);
    const upperBridgeY = core.y - CORE_HALF_HEIGHT - 32;
    const lowerBridgeY = core.y + CORE_HALF_HEIGHT + 32;
    const innerLeft = ram.x + MODULE_HALF_WIDTH + 20;
    const innerRight = gpu.x - MODULE_HALF_WIDTH - 20;
    const mediaTop = media.y - MEDIA_HALF_HEIGHT;

    const axiPaths: PathDefinition[] = [
      { points: [[rightRail, topLane], [rightRail, bottomLane]], duration: 7.2 },
      { points: [[rightRail + 10, topLane + 32], [rightRail + 10, bottomLane - 32]], duration: 7.6, delay: 0.45 },
      { points: [[rightRail - 12, topLane + 18], [rightRail - 12, bottomLane - 56]], duration: 6.9, delay: 0.85 },
      { points: [[core.x + CORE_HALF_WIDTH, core.y], [rightRail, core.y]], duration: 6.1, delay: 0.2 },
      { points: [[core.x + CORE_HALF_WIDTH, upperBridgeY], [rightRail - 18, upperBridgeY], [rightRail - 18, core.y - 36]], duration: 6.5, delay: 0.6 },
      {
        points: [
          [rightRail, topLane + 4],
          [cpu.x + MODULE_HALF_WIDTH + 24, topLane + 4],
          [cpu.x + MODULE_HALF_WIDTH + 24, cpu.y - MODULE_HALF_HEIGHT - 8]
        ],
        duration: 6,
        delay: 1.1
      },
      {
        points: [
          [rightRail, gpu.y - MODULE_HALF_HEIGHT - 18],
          [gpu.x, gpu.y - MODULE_HALF_HEIGHT - 18],
          [gpu.x, gpu.y - MODULE_HALF_HEIGHT - 6]
        ],
        duration: 6.3,
        delay: 1.6
      },
      {
        points: [
          [rightRail - 18, gpu.y - MODULE_HALF_HEIGHT - 18],
          [gpu.x - MODULE_HALF_WIDTH - 24, gpu.y - MODULE_HALF_HEIGHT - 18],
          [gpu.x - MODULE_HALF_WIDTH - 24, gpu.y + MODULE_HALF_HEIGHT + 18],
          [core.x + CORE_HALF_WIDTH + 18, gpu.y + MODULE_HALF_HEIGHT + 18],
          [core.x + CORE_HALF_WIDTH + 18, core.y - 48]
        ],
        duration: 6.7,
        delay: 2.1
      },
      {
        points: [
          [rightRail, ssd.y + MODULE_HALF_HEIGHT + 12],
          [ssd.x, ssd.y + MODULE_HALF_HEIGHT + 12],
          [ssd.x, ssd.y + MODULE_HALF_HEIGHT + 4]
        ],
        duration: 7,
        delay: 2.6
      },
      {
        points: [
          [rightRail - 6, mediaLane],
          [media.x + 160, mediaLane],
          [media.x + 160, mediaTop]
        ],
        duration: 6.9,
        delay: 3
      }
    ];

    const axiElectrons: ElectronDefinition[] = [
      { points: [[rightRail, topLane], [rightRail, bottomLane]], duration: 7.4, delay: 0.3 },
      {
        points: [
          [rightRail, topLane + 4],
          [cpu.x + MODULE_HALF_WIDTH + 24, topLane + 4],
          [cpu.x + MODULE_HALF_WIDTH + 24, cpu.y - MODULE_HALF_HEIGHT - 8]
        ],
        duration: 6.2,
        delay: 1.2
      },
      {
        points: [
          [rightRail, gpu.y - MODULE_HALF_HEIGHT - 18],
          [gpu.x, gpu.y - MODULE_HALF_HEIGHT - 18],
          [gpu.x, gpu.y - MODULE_HALF_HEIGHT - 6]
        ],
        duration: 6.6,
        delay: 2.1
      },
      {
        points: [
          [rightRail - 6, mediaLane],
          [media.x + 160, mediaLane],
          [media.x + 160, mediaTop]
        ],
        duration: 6.9,
        delay: 2.9
      }
    ];

    const ahbPaths: PathDefinition[] = [
      { points: [[leftRail, topLane], [leftRail, bottomLane]], duration: 7.1 },
      { points: [[leftRail - 12, topLane + 30], [leftRail - 12, bottomLane - 36]], duration: 7.5, delay: 0.4 },
      { points: [[leftRail + 12, topLane + 18], [leftRail + 12, bottomLane - 52]], duration: 6.8, delay: 0.8 },
      { points: [[core.x - CORE_HALF_WIDTH, core.y], [leftRail, core.y]], duration: 6, delay: 0.2 },
      { points: [[core.x - CORE_HALF_WIDTH, upperBridgeY], [leftRail + 18, upperBridgeY], [leftRail + 18, core.y - 40]], duration: 6.4, delay: 0.6 },
      {
        points: [
          [leftRail, topLane + 4],
          [ram.x - MODULE_HALF_WIDTH - 24, topLane + 4],
          [ram.x - MODULE_HALF_WIDTH - 24, ram.y - MODULE_HALF_HEIGHT - 8]
        ],
        duration: 6.1,
        delay: 1.1
      },
      {
        points: [
          [leftRail, topLane + 4],
          [ram.x - MODULE_HALF_WIDTH - 60, topLane + 4],
          [ram.x - MODULE_HALF_WIDTH - 60, io.y - MODULE_HALF_HEIGHT - 10],
          [io.x - MODULE_HALF_WIDTH - 16, io.y - MODULE_HALF_HEIGHT - 10],
          [io.x - MODULE_HALF_WIDTH - 16, io.y + MODULE_HALF_HEIGHT + 14]
        ],
        duration: 6.6,
        delay: 1.7
      },
      {
        points: [
          [core.x - CORE_HALF_WIDTH - 24, ram.y - MODULE_HALF_HEIGHT - 10],
          [ram.x + MODULE_HALF_WIDTH + 20, ram.y - MODULE_HALF_HEIGHT - 10],
          [ram.x + MODULE_HALF_WIDTH + 20, ram.y + MODULE_HALF_HEIGHT + 16],
          [core.x - CORE_HALF_WIDTH - 24, ram.y + MODULE_HALF_HEIGHT + 16]
        ],
        duration: 6.8,
        delay: 2.1
      },
      {
        points: [
          [core.x - CORE_HALF_WIDTH, lowerBridgeY],
          [leftRail + 16, lowerBridgeY],
          [leftRail + 16, sensor.y + MODULE_HALF_HEIGHT + 24]
        ],
        duration: 6.9,
        delay: 2.6
      },
      {
        points: [
          [leftRail, sensor.y + MODULE_HALF_HEIGHT + 12],
          [sensor.x - MODULE_HALF_WIDTH - 24, sensor.y + MODULE_HALF_HEIGHT + 12],
          [sensor.x - MODULE_HALF_WIDTH - 24, sensor.y + MODULE_HALF_HEIGHT + 4]
        ],
        duration: 7.2,
        delay: 3.1
      }
    ];

    const ahbElectrons: ElectronDefinition[] = [
      { points: [[leftRail, topLane], [leftRail, bottomLane]], duration: 7.3, delay: 0.5 },
      {
        points: [
          [leftRail, topLane + 4],
          [ram.x - MODULE_HALF_WIDTH - 24, topLane + 4],
          [ram.x - MODULE_HALF_WIDTH - 24, ram.y - MODULE_HALF_HEIGHT - 8]
        ],
        duration: 6.4,
        delay: 1.3
      },
      {
        points: [
          [leftRail, topLane + 4],
          [ram.x - MODULE_HALF_WIDTH - 60, topLane + 4],
          [ram.x - MODULE_HALF_WIDTH - 60, io.y - MODULE_HALF_HEIGHT - 10],
          [io.x - MODULE_HALF_WIDTH - 16, io.y - MODULE_HALF_HEIGHT - 10],
          [io.x - MODULE_HALF_WIDTH - 16, io.y + MODULE_HALF_HEIGHT + 14]
        ],
        duration: 6.9,
        delay: 2.1
      },
      {
        points: [
          [leftRail, sensor.y + MODULE_HALF_HEIGHT + 12],
          [sensor.x - MODULE_HALF_WIDTH - 24, sensor.y + MODULE_HALF_HEIGHT + 12],
          [sensor.x - MODULE_HALF_WIDTH - 24, sensor.y + MODULE_HALF_HEIGHT + 4]
        ],
        duration: 7.4,
        delay: 3
      }
    ];

    const apbPaths: PathDefinition[] = [
      {
        points: [
          [innerLeft, upperBridgeY - 28],
          [core.x, upperBridgeY - 28],
          [innerRight, upperBridgeY - 28]
        ],
        duration: 6.4,
        delay: 0.2
      },
      {
        points: [
          [core.x - CORE_HALF_WIDTH, core.y - 56],
          [core.x - CORE_HALF_WIDTH - 26, core.y - 56],
          [core.x - CORE_HALF_WIDTH - 26, ram.y + MODULE_HALF_HEIGHT + 18],
          [ram.x + MODULE_HALF_WIDTH + 14, ram.y + MODULE_HALF_HEIGHT + 18]
        ],
        duration: 6.7,
        delay: 0.8
      },
      {
        points: [
          [core.x + CORE_HALF_WIDTH, core.y + 56],
          [core.x + CORE_HALF_WIDTH + 26, core.y + 56],
          [core.x + CORE_HALF_WIDTH + 26, gpu.y + MODULE_HALF_HEIGHT + 18],
          [gpu.x - MODULE_HALF_WIDTH - 14, gpu.y + MODULE_HALF_HEIGHT + 18]
        ],
        duration: 6.7,
        delay: 1.2
      },
      {
        points: [
          [ram.x + MODULE_HALF_WIDTH + 24, sensor.y + MODULE_HALF_HEIGHT + 16],
          [core.x, sensor.y + MODULE_HALF_HEIGHT + 16],
          [ssd.x - MODULE_HALF_WIDTH - 24, sensor.y + MODULE_HALF_HEIGHT + 16]
        ],
        duration: 7.1,
        delay: 1.8
      },
      {
        points: [[media.x - 160, mediaTop], [media.x + 160, mediaTop]],
        duration: 6.2,
        delay: 2.4
      },
      {
        points: [
          [sensor.x, sensor.y + MODULE_HALF_HEIGHT + 12],
          [media.x, sensor.y + MODULE_HALF_HEIGHT + 12],
          [media.x, media.y + MEDIA_HALF_HEIGHT]
        ],
        duration: 7.3,
        delay: 2.9
      },
      {
        points: [[media.x - 120, mediaTop], [media.x - 120, media.y + MEDIA_HALF_HEIGHT]],
        duration: 6.6,
        delay: 3.4
      },
      {
        points: [[media.x + 120, mediaTop], [media.x + 120, media.y + MEDIA_HALF_HEIGHT]],
        duration: 6.6,
        delay: 3.8
      }
    ];

    const apbElectrons: ElectronDefinition[] = [
      {
        points: [
          [innerLeft, upperBridgeY - 28],
          [core.x, upperBridgeY - 28],
          [innerRight, upperBridgeY - 28]
        ],
        duration: 6.6,
        delay: 0.6
      },
      {
        points: [
          [core.x - CORE_HALF_WIDTH, core.y - 56],
          [core.x - CORE_HALF_WIDTH - 26, core.y - 56],
          [core.x - CORE_HALF_WIDTH - 26, ram.y + MODULE_HALF_HEIGHT + 18],
          [ram.x + MODULE_HALF_WIDTH + 14, ram.y + MODULE_HALF_HEIGHT + 18]
        ],
        duration: 6.9,
        delay: 1.4
      },
      {
        points: [
          [core.x + CORE_HALF_WIDTH, core.y + 56],
          [core.x + CORE_HALF_WIDTH + 26, core.y + 56],
          [core.x + CORE_HALF_WIDTH + 26, gpu.y + MODULE_HALF_HEIGHT + 18],
          [gpu.x - MODULE_HALF_WIDTH - 14, gpu.y + MODULE_HALF_HEIGHT + 18]
        ],
        duration: 7.1,
        delay: 2
      },
      {
        points: [
          [ram.x + MODULE_HALF_WIDTH + 24, sensor.y + MODULE_HALF_HEIGHT + 16],
          [core.x, sensor.y + MODULE_HALF_HEIGHT + 16],
          [ssd.x - MODULE_HALF_WIDTH - 24, sensor.y + MODULE_HALF_HEIGHT + 16]
        ],
        duration: 7.4,
        delay: 2.6
      },
      {
        points: [[media.x, mediaTop], [media.x, media.y + MEDIA_HALF_HEIGHT]],
        duration: 6.8,
        delay: 3.2
      }
    ];

    return [
      {
        id: 'axi',
        paths: axiPaths,
        electrons: axiElectrons,
        label: { text: 'AXI', x: rightRail + 52, y: upperBridgeY - 28 }
      },
      {
        id: 'ahb',
        paths: ahbPaths,
        electrons: ahbElectrons,
        label: { text: 'AHB', x: leftRail - 58, y: upperBridgeY - 28 }
      },
      {
        id: 'apb',
        paths: apbPaths,
        electrons: apbElectrons,
        label: { text: 'APB', x: core.x, y: mediaTop - 28 }
      }
    ];
  }, [moduleAnchors]);

  return (
    <svg
      className="bus-network"
      viewBox={`0 0 ${BOARD_DIMENSIONS.width} ${BOARD_DIMENSIONS.height}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {groups.map((group) => (
        <g key={group.id} className={`bus-group bus-group--${group.id}`}>
          {group.paths.map((path, index) => (
            <motion.path
              key={`${group.id}-path-${index}`}
              d={toPath(path.points)}
              className={`bus-line bus-${group.id}`}
              strokeWidth={STROKE_WIDTH[group.id]}
              strokeOpacity={STROKE_OPACITY[group.id]}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                animationDelay: `${path.delay ?? 0}s`,
                animationDuration: `${path.duration ?? 6}s`
              }}
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
              style={{
                offsetPath: `path('${toPath(electron.points)}')`,
                animationDelay: `${electron.delay}s`,
                animationDuration: `${electron.duration}s`
              }}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
