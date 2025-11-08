'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import type { ChipAnimation } from '@/lib/boardSections';

export type ChipProps = {
  label: string;
  subtitle: string;
  href: string;
  color: string;
  animation?: ChipAnimation;
  iconUrl?: string;
  videoUrl?: string;
};

const animationLayers: Record<ChipAnimation, { gradient: string; overlay: string }> = {
  cpu: {
    gradient:
      'repeating-linear-gradient(135deg, rgba(255, 179, 71, 0.25) 0px, rgba(255, 179, 71, 0.45) 12px, transparent 12px, transparent 24px)',
    overlay:
      'linear-gradient(120deg, rgba(255, 179, 71, 0.35), rgba(15, 118, 110, 0.1), rgba(14, 165, 233, 0.2))'
  },
  gpu: {
    gradient:
      'repeating-linear-gradient(45deg, rgba(255, 107, 255, 0.4) 0px, rgba(255, 107, 255, 0.15) 16px, transparent 16px, transparent 32px)',
    overlay:
      'linear-gradient(90deg, rgba(236, 72, 153, 0.5), rgba(14, 165, 233, 0.1), rgba(236, 72, 153, 0.4))'
  },
  ram: {
    gradient:
      'repeating-linear-gradient(120deg, rgba(0, 255, 170, 0.45) 0px, rgba(0, 255, 170, 0.12) 10px, transparent 10px, transparent 18px)',
    overlay:
      'linear-gradient(135deg, rgba(0, 255, 170, 0.4), rgba(20, 184, 166, 0.1), rgba(45, 212, 191, 0.4))'
  },
  ssd: {
    gradient:
      'repeating-linear-gradient(160deg, rgba(255, 217, 59, 0.4) 0px, rgba(255, 217, 59, 0.18) 14px, transparent 14px, transparent 28px)',
    overlay:
      'linear-gradient(110deg, rgba(253, 224, 71, 0.5), rgba(251, 191, 36, 0.2), rgba(253, 224, 71, 0.35))'
  },
  media: {
    gradient:
      'repeating-linear-gradient(140deg, rgba(255, 75, 75, 0.45) 0px, rgba(255, 75, 75, 0.1) 8px, transparent 8px, transparent 16px)',
    overlay:
      'linear-gradient(100deg, rgba(244, 63, 94, 0.45), rgba(88, 28, 135, 0.15), rgba(244, 63, 94, 0.35))'
  },
  sensor: {
    gradient:
      'repeating-linear-gradient(125deg, rgba(224, 231, 255, 0.45) 0px, rgba(165, 180, 252, 0.15) 10px, transparent 10px, transparent 20px)',
    overlay:
      'linear-gradient(120deg, rgba(94, 234, 212, 0.3), rgba(59, 130, 246, 0.15), rgba(226, 232, 240, 0.45))'
  },
  io: {
    gradient:
      'repeating-linear-gradient(150deg, rgba(0, 195, 255, 0.45) 0px, rgba(0, 195, 255, 0.15) 12px, transparent 12px, transparent 24px)',
    overlay:
      'linear-gradient(135deg, rgba(56, 189, 248, 0.4), rgba(14, 116, 144, 0.1), rgba(56, 189, 248, 0.4))'
  }
};

function AnimatedIcon({ animation, color }: { animation: ChipAnimation; color: string }) {
  switch (animation) {
    case 'gpu':
      return (
        <svg className="h-full w-full" viewBox="0 0 120 80" fill="none">
          <defs>
            <linearGradient id="gpuGradient" x1="0" y1="0" x2="120" y2="80">
              <stop offset="0%" stopColor={color} stopOpacity={0.1} />
              <stop offset="50%" stopColor={color} stopOpacity={0.6} />
              <stop offset="100%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <motion.rect
            x="12"
            y="12"
            width="96"
            height="56"
            rx="10"
            stroke={color}
            strokeWidth="1.5"
            fill="url(#gpuGradient)"
            animate={{ strokeDashoffset: [0, -60] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            strokeDasharray="10 6"
          />
          {[...Array(4)].map((_, idx) => (
            <motion.line
              key={idx}
              x1={30 + idx * 16}
              x2={30 + idx * 16}
              y1="22"
              y2="58"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ opacity: [0.2, 1, 0.2], scaleY: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.6 + idx * 0.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </svg>
      );
    case 'ram':
      return (
        <svg className="h-full w-full" viewBox="0 0 120 80" fill="none">
          {[...Array(6)].map((_, idx) => (
            <motion.rect
              key={idx}
              x={10 + idx * 18}
              y="16"
              width="12"
              height="48"
              rx="4"
              fill={color}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 0.8, 0.2], scaleY: [0.8, 1.1, 0.8] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: idx * 0.18, ease: 'easeInOut' }}
            />
          ))}
        </svg>
      );
    case 'ssd':
      return (
        <svg className="h-full w-full" viewBox="0 0 120 80" fill="none">
          <motion.circle
            cx="40"
            cy="40"
            r="26"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="6 10"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <motion.circle
            cx="40"
            cy="40"
            r="12"
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray="2 6"
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <motion.rect
            x="70"
            y="18"
            width="32"
            height="44"
            rx="8"
            stroke={color}
            strokeWidth="1.5"
            animate={{ y: [18, 22, 18] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      );
    case 'media':
      return (
        <svg className="h-full w-full" viewBox="0 0 120 80" fill="none">
          {[...Array(5)].map((_, idx) => (
            <motion.polygon
              key={idx}
              points={`10,${20 + idx * 10} 40,${15 + idx * 10} 40,${25 + idx * 10}`}
              fill={color}
              opacity={0.5}
              animate={{ opacity: [0.2, 0.9, 0.2], x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: idx * 0.15, ease: 'easeInOut' }}
            />
          ))}
          <motion.polygon
            points="70,24 100,40 70,56"
            fill={color}
            animate={{ scale: [0.92, 1.05, 0.92] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      );
    case 'sensor':
      return (
        <svg className="h-full w-full" viewBox="0 0 120 80" fill="none">
          <motion.path
            d="M10 40 C20 20, 30 20, 40 40 S60 60, 70 40 90 20, 110 40"
            stroke={`${color}aa`}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [0, -60] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: 'linear' }}
          />
          <motion.circle
            r="4"
            cx="10"
            cy="40"
            fill={color}
            animate={{ cx: [10, 30, 50, 70, 90, 110], cy: [40, 26, 54, 34, 24, 40] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      );
    case 'io':
      return (
        <svg className="h-full w-full" viewBox="0 0 120 80" fill="none">
          <motion.circle
            cx="24"
            cy="40"
            r="16"
            stroke={color}
            strokeWidth="1.5"
            animate={{ strokeDashoffset: [-20, 20] }}
            strokeDasharray="6 10"
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <motion.line
            x1="40"
            y1="40"
            x2="100"
            y2="40"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [-40, 0] }}
            strokeDasharray="10 6"
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          {[0, 1, 2].map((idx) => (
            <motion.circle
              key={idx}
              cx={52 + idx * 16}
              cy="40"
              r="5"
              fill={color}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: idx * 0.2, ease: 'easeInOut' }}
            />
          ))}
        </svg>
      );
    case 'cpu':
    default:
      return (
        <svg className="h-full w-full" viewBox="0 0 120 80" fill="none">
          <motion.rect
            x="20"
            y="12"
            width="80"
            height="56"
            rx="8"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="8 8"
            animate={{ strokeDashoffset: [0, -32] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          <motion.rect
            x="40"
            y="24"
            width="40"
            height="32"
            rx="6"
            fill={`${color}33`}
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.96, 1.04, 0.96] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          {[...Array(6)].map((_, idx) => (
            <motion.rect
              key={idx}
              x={16}
              y={10 + idx * 10}
              width="4"
              height="6"
              rx="2"
              fill={color}
              animate={{ opacity: [0.2, 0.9, 0.2] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: idx * 0.12, ease: 'easeInOut' }}
            />
          ))}
          {[...Array(6)].map((_, idx) => (
            <motion.rect
              key={`right-${idx}`}
              x={100}
              y={10 + idx * 10}
              width="4"
              height="6"
              rx="2"
              fill={color}
              animate={{ opacity: [0.2, 0.9, 0.2] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: idx * 0.12 + 0.2, ease: 'easeInOut' }}
            />
          ))}
        </svg>
      );
  }
}

export function Chip({
  label,
  subtitle,
  href,
  color,
  animation = 'cpu',
  iconUrl,
  videoUrl
}: ChipProps) {
  const layers = animationLayers[animation] ?? animationLayers.cpu;

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${color}` }}
      whileTap={{ scale: 0.98 }}
      className="neon-border rounded-xl bg-white/5 backdrop-blur"
      style={{ borderColor: color }}
    >
      <Link
        href={href}
        className="group relative flex h-40 w-52 flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 text-left transition-colors duration-200 hover:bg-white/15"
      >
        <motion.span
          aria-hidden
          className="absolute inset-px rounded-[10px] opacity-80"
          style={{ backgroundImage: layers.gradient }}
          animate={{ backgroundPosition: ['0% 50%', '120% 50%'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-xl mix-blend-screen"
          style={{ backgroundImage: layers.overlay }}
          animate={{ opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative z-[1] flex flex-col gap-3">
          <div className="relative h-20 overflow-hidden rounded-lg border border-white/10 bg-black/30">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40" />
            {videoUrl ? (
              <video
                className="h-full w-full object-cover opacity-80 transition duration-500 ease-out group-hover:opacity-100"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster=""
              >
                <source src={videoUrl} type="video/mp4" />
              </video>
            ) : iconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={iconUrl}
                alt={`${label} visualization`}
                className="h-full w-full object-cover opacity-80 transition duration-500 ease-out group-hover:opacity-100"
              />
            ) : (
              <AnimatedIcon animation={animation} color={color} />
            )}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ background: `radial-gradient(circle at 30% 30%, ${color}33, transparent 60%)` }}
            />
          </div>
          <div className="space-y-2">
            <span className="block text-xs uppercase tracking-[0.3em] text-slate-200">{label}</span>
            <span className="block text-lg font-semibold" style={{ color }}>
              {subtitle}
            </span>
            <motion.span
              aria-hidden
              className="block h-[3px] w-full rounded-full"
              style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
              animate={{ opacity: [0.2, 0.9, 0.2], scaleX: [0.9, 1.05, 0.9] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
