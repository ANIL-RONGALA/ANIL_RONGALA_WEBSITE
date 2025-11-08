'use client';

import { motion } from 'framer-motion';

const circuitPaths = [
  'M60 40 H540',
  'M60 120 Q300 20 540 120',
  'M60 200 Q180 260 300 200 T540 200',
  'M60 280 Q220 320 300 280 T540 280',
  'M180 40 V320',
  'M300 0 V360',
  'M420 40 V320'
];

const pulseKeyframes = [
  {
    delay: 0,
    cx: [80, 180, 300, 420, 520],
    cy: [40, 40, 40, 40, 40]
  },
  {
    delay: 0.6,
    cx: [80, 180, 300, 420, 520],
    cy: [110, 70, 40, 90, 120]
  },
  {
    delay: 1.2,
    cx: [80, 180, 260, 340, 420, 520],
    cy: [200, 220, 210, 190, 200, 200]
  },
  {
    delay: 1.6,
    cx: [80, 160, 240, 320, 400, 520],
    cy: [280, 300, 290, 270, 280, 280]
  }
];

export function CircuitPaths() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 600 360"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="circuit-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="pulseGradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(34,211,238,0.15)" />
          <stop offset="40%" stopColor="rgba(56,189,248,0.45)" />
          <stop offset="70%" stopColor="rgba(236,72,153,0.4)" />
          <stop offset="100%" stopColor="rgba(45,212,191,0.4)" />
        </linearGradient>
      </defs>
      {circuitPaths.map((d, index) => (
        <motion.path
          key={index}
          d={d}
          stroke="url(#pulseGradient)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 18"
          filter="url(#circuit-glow)"
          initial={{ opacity: 0.15, strokeDashoffset: 0 }}
          animate={{ opacity: [0.2, 0.5, 0.2], strokeDashoffset: [-80, 0] }}
          transition={{ duration: 9 + index * 1.1, repeat: Infinity, ease: 'linear' }}
        />
      ))}
      {pulseKeyframes.map((pulse, index) => (
        <motion.circle
          key={index}
          r={5}
          fill="rgba(165,243,252,0.8)"
          filter="url(#circuit-glow)"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            cx: pulse.cx,
            cy: pulse.cy
          }}
          transition={{ duration: 6.5, repeat: Infinity, delay: pulse.delay, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}
