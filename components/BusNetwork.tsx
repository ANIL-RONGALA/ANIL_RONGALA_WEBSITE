'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';

export type BusId = 'axi' | 'ahb' | 'apb';
export type ModuleId = 'core' | 'cpu' | 'gpu' | 'ram' | 'ssd' | 'io' | 'sensor' | 'media';

export const BOARD_DIMENSIONS = {
  width: 1200,
  height: 920
} as const;

type ModuleAnchors = Record<ModuleId, { x: number; y: number }>;

type BusNetworkProps = {
  moduleAnchors: ModuleAnchors;
  busAssignments: Record<BusId, ModuleId[]>;
  onModulePulse: (moduleId: ModuleId, busId: BusId) => void;
};

type BusGroup = {
  id: BusId;
  lines: string[];
  connectors: string[];
  labels: Array<{ text: string; x: number; y: number }>;
  electrons: Array<{ id: string; path: string; duration: number; delay: number; target?: ModuleId }>;
};

const BUS_PULSE_DURATION: Record<BusId, number> = {
  axi: 6,
  ahb: 6.8,
  apb: 7.4
};

const ELECTRON_CLASS: Record<BusId, string> = {
  axi: 'bus-electron--axi',
  ahb: 'bus-electron--ahb',
  apb: 'bus-electron--apb'
};

const format = (value: number) => Number.parseFloat(value.toFixed(1));

export function BusNetwork({ moduleAnchors, busAssignments, onModulePulse }: BusNetworkProps) {
  const groups = useMemo<BusGroup[]>(() => {
    const { core, cpu, gpu, ssd, ram, io, sensor, media } = moduleAnchors;

    const axiOffsets = [-12, -6, 0, 6, 12];
    const axiStartX = core.x - 180;
    const axiStartY = core.y - 70;
    const axiVerticalX = cpu.x + (ssd.x - cpu.x) * 0.18;
    const axiTopY = gpu.y - 40;
    const axiEndX = ssd.x + 140;

    const axiLines = axiOffsets.map((offset) => {
      const shiftX = offset * 0.45;
      const shiftY = offset;
      return `M${format(axiStartX + shiftX)} ${format(axiStartY + shiftY)} H${format(axiVerticalX + shiftX)} V${format(axiTopY + shiftY)} H${format(axiEndX + shiftX)}`;
    });

    const axiConnectors = [
      `M${format(core.x - 14)} ${format(core.y)} V${format(axiStartY - 4)}`,
      `M${format(core.x + 16)} ${format(core.y)} V${format(axiStartY + 8)}`,
      `M${format(cpu.x - 12)} ${format(cpu.y)} V${format(axiStartY - 2)}`,
      `M${format(cpu.x + 18)} ${format(cpu.y)} V${format(axiStartY + 6)}`,
      `M${format(axiVerticalX)} ${format(axiTopY)} H${format(gpu.x)} V${format(gpu.y)}`,
      `M${format(axiVerticalX + 16)} ${format(axiTopY + 6)} H${format(gpu.x + 18)} V${format(gpu.y + 8)}`,
      `M${format(axiEndX)} ${format(axiTopY)} V${format(ssd.y)} H${format(ssd.x)}`,
      `M${format(axiEndX + 14)} ${format(axiTopY + 6)} V${format(ssd.y + 10)} H${format(ssd.x + 22)}`
    ];

    const axiElectrons: BusGroup['electrons'] = [
      {
        id: 'axi-core-cpu',
        path: `M${format(core.x)} ${format(core.y)} V${format(axiStartY)} H${format(cpu.x)}`,
        duration: 6,
        delay: 0.3,
        target: 'cpu'
      },
      {
        id: 'axi-core-gpu',
        path: `M${format(core.x - 6)} ${format(core.y)} V${format(axiStartY - 8)} H${format(axiVerticalX)} V${format(axiTopY)} H${format(gpu.x)} V${format(gpu.y)}`,
        duration: 6.8,
        delay: 1.1,
        target: 'gpu'
      },
      {
        id: 'axi-core-ssd',
        path: `M${format(core.x + 12)} ${format(core.y)} V${format(axiStartY + 10)} H${format(axiEndX)} V${format(ssd.y)} H${format(ssd.x)}`,
        duration: 7.1,
        delay: 2.4,
        target: 'ssd'
      }
    ];

    const ahbOffsets = [-9, -3, 3, 9];
    const ahbStartX = ram.x - 200;
    const ahbStartY = ram.y - 20;
    const ahbVerticalX = core.x + (gpu.x - core.x) * 0.18;
    const ahbTopY = Math.min(ram.y - 90, core.y - 150);
    const ahbEndX = gpu.x + 120;

    const ahbLines = ahbOffsets.map((offset) => {
      const shiftX = offset * 0.35;
      const shiftY = offset;
      return `M${format(ahbStartX + shiftX)} ${format(ahbStartY + shiftY)} H${format(ahbVerticalX + shiftX)} V${format(ahbTopY + shiftY)} H${format(ahbEndX + shiftX)}`;
    });

    const ahbConnectors = [
      `M${format(ram.x)} ${format(ram.y)} V${format(ahbStartY + 2)}`,
      `M${format(ram.x + 16)} ${format(ram.y + 6)} V${format(ahbStartY + 10)}`,
      `M${format(core.x - 12)} ${format(core.y)} V${format(ahbStartY - 4)}`,
      `M${format(core.x + 10)} ${format(core.y)} V${format(ahbStartY + 6)}`,
      `M${format(ahbVerticalX)} ${format(ahbTopY)} H${format(core.x)} V${format(core.y)}`,
      `M${format(ahbEndX)} ${format(ahbTopY)} V${format(gpu.y)} H${format(gpu.x)}`,
      `M${format(ahbEndX + 12)} ${format(ahbTopY + 6)} V${format(gpu.y + 10)} H${format(gpu.x + 18)}`
    ];

    const ahbElectrons: BusGroup['electrons'] = [
      {
        id: 'ahb-core-ram',
        path: `M${format(core.x)} ${format(core.y)} V${format(ahbStartY)} H${format(ram.x)} V${format(ram.y)}`,
        duration: 6.6,
        delay: 0.5,
        target: 'ram'
      },
      {
        id: 'ahb-core-gpu',
        path: `M${format(core.x - 10)} ${format(core.y)} V${format(ahbStartY - 8)} H${format(ahbEndX)} V${format(gpu.y)} H${format(gpu.x)}`,
        duration: 7,
        delay: 1.7,
        target: 'gpu'
      }
    ];

    const apbOffsets = [-6, 0, 6];
    const apbStartX = core.x + 60;
    const apbStartY = core.y + 120;
    const apbSensorX = sensor.x + 42;
    const apbSensorY = sensor.y + 80;
    const apbIoX = io.x - 40;
    const apbLowerY = media.y + 60;
    const apbEndX = media.x - 26;

    const apbLines = apbOffsets.map((offset) => {
      const shiftX = offset * 0.35;
      const shiftY = offset;
      return `M${format(apbStartX + shiftX)} ${format(apbStartY + shiftY)} H${format(apbSensorX + shiftX)} V${format(apbSensorY + shiftY)} H${format(apbIoX + shiftX)} V${format(apbLowerY + shiftY)} H${format(apbEndX + shiftX)}`;
    });

    const apbConnectors = [
      `M${format(core.x)} ${format(core.y)} V${format(apbStartY - 6)}`,
      `M${format(core.x + 18)} ${format(core.y)} V${format(apbStartY + 6)}`,
      `M${format(io.x)} ${format(io.y)} V${format(apbStartY + 2)}`,
      `M${format(sensor.x)} ${format(sensor.y)} H${format(apbSensorX)} V${format(apbSensorY)}`,
      `M${format(sensor.x + 20)} ${format(sensor.y + 10)} H${format(apbSensorX + 16)} V${format(apbSensorY + 12)}`,
      `M${format(media.x)} ${format(media.y)} V${format(apbLowerY)}`,
      `M${format(media.x + 22)} ${format(media.y + 8)} V${format(apbLowerY + 12)}`
    ];

    const apbElectrons: BusGroup['electrons'] = [
      {
        id: 'apb-core-io',
        path: `M${format(core.x)} ${format(core.y)} V${format(apbStartY)} H${format(io.x)} V${format(io.y)}`,
        duration: 7.2,
        delay: 0.6,
        target: 'io'
      },
      {
        id: 'apb-core-sensor',
        path: `M${format(core.x - 12)} ${format(core.y)} V${format(apbStartY - 10)} H${format(apbSensorX)} V${format(sensor.y)}`,
        duration: 7.6,
        delay: 1.6,
        target: 'sensor'
      },
      {
        id: 'apb-core-media',
        path: `M${format(core.x + 14)} ${format(core.y)} V${format(apbStartY + 12)} H${format(apbEndX)} V${format(media.y)}`,
        duration: 8,
        delay: 2.6,
        target: 'media'
      }
    ];

    return [
      {
        id: 'axi',
        lines: axiLines,
        connectors: axiConnectors,
        electrons: axiElectrons,
        labels: [
          { text: 'AXI BUS', x: format((axiVerticalX + axiEndX) / 2), y: format(axiTopY - 18) },
          { text: 'CXL', x: format((core.x + cpu.x) / 2), y: format(axiStartY - 22) },
          { text: 'NVLINK', x: format((gpu.x + axiVerticalX) / 2), y: format(axiTopY - 8) },
          { text: 'PCIe RAID', x: format(axiEndX - 36), y: format(axiTopY + 36) }
        ]
      },
      {
        id: 'ahb',
        lines: ahbLines,
        connectors: ahbConnectors,
        electrons: ahbElectrons,
        labels: [
          { text: 'AHB BUS', x: format((ahbVerticalX + ahbEndX) / 2), y: format(ahbTopY - 16) },
          { text: 'FABRIC LINK', x: format((core.x + ram.x) / 2), y: format(ahbStartY - 20) }
        ]
      },
      {
        id: 'apb',
        lines: apbLines,
        connectors: apbConnectors,
        electrons: apbElectrons,
        labels: [
          { text: 'APB BUS', x: format((apbIoX + apbEndX) / 2), y: format(apbLowerY + 24) },
          { text: 'SENSOR ARRAY', x: format((sensor.x + apbSensorX) / 2), y: format(apbSensorY - 14) }
        ]
      }
    ];
  }, [moduleAnchors]);

  useEffect(() => {
    const timers: Array<{ kind: 'timeout' | 'interval'; id: ReturnType<typeof setTimeout> }> = [];

    (Object.entries(busAssignments) as Array<[BusId, ModuleId[]]>).forEach(([busId, modules]) => {
      const duration = BUS_PULSE_DURATION[busId];
      const targets = modules.filter((moduleId) => moduleId !== 'core');

      targets.forEach((moduleId, index) => {
        const delaySeconds = targets.length > 0 ? (duration / targets.length) * index : 0;
        const kickoff = setTimeout(() => {
          onModulePulse(moduleId, busId);
          const loop = setInterval(() => onModulePulse(moduleId, busId), duration * 1000);
          timers.push({ kind: 'interval', id: loop });
        }, delaySeconds * 1000);

        timers.push({ kind: 'timeout', id: kickoff });
      });
    });

    return () => {
      timers.forEach(({ kind, id }) => {
        if (kind === 'interval') {
          clearInterval(id);
        } else {
          clearTimeout(id);
        }
      });
    };
  }, [busAssignments, onModulePulse]);

  return (
    <svg
      className="bus-layer bus-network absolute inset-0 h-full w-full pointer-events-none z-10"
      viewBox={`0 0 ${BOARD_DIMENSIONS.width} ${BOARD_DIMENSIONS.height}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      {groups.map((group) => (
        <g key={group.id} className={`bus-group bus-group--${group.id}`}>
          {group.lines.map((d, index) => (
            <path
              key={`${group.id}-line-${index}`}
              d={d}
              className={`bus-line bus-${group.id}`}
              style={{ animationDelay: `${index * 0.65}s` }}
            />
          ))}

          {group.connectors.map((d, index) => (
            <path
              key={`${group.id}-connector-${index}`}
              d={d}
              className={`bus-line bus-${group.id} bus-line--connector`}
              style={{ animationDelay: `${0.4 * index}s` }}
            />
          ))}

          {group.labels.map((label, index) => (
            <text key={`${group.id}-label-${index}`} x={label.x} y={label.y} className="bus-label">
              {label.text}
            </text>
          ))}

          {group.electrons.map((electron) => (
            <motion.circle
              key={electron.id}
              r={3}
              className={`bus-electron ${ELECTRON_CLASS[group.id]}`}
              style={{ offsetPath: `path('${electron.path}')` }}
              initial={{ offsetDistance: '0%' }}
              animate={{ offsetDistance: '100%' }}
              transition={{
                duration: electron.duration,
                delay: electron.delay,
                ease: 'linear',
                repeat: Infinity
              }}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
