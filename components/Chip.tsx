'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo, type CSSProperties } from 'react';

import type { ChipAnimation } from '@/lib/boardSections';

export type ChipProps = {
  label: string;
  subtitle: string;
  href: string;
  color: string;
  animation?: ChipAnimation;
  iconUrl?: string;
  videoUrl?: string;
  className?: string;
  style?: CSSProperties;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
};

const metallicGradient = 'linear-gradient(140deg, #111 0%, #1c1c1c 45%, #111 100%)';

const innerSheen =
  'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 55%), radial-gradient(circle at 70% 70%, rgba(0,255,255,0.15), transparent 60%)';

function AnimatedIcon({ animation, color }: { animation: ChipAnimation; color: string }) {
  switch (animation) {
    case 'core':
      return (
        <svg className="h-full w-full" viewBox="0 0 120 80" fill="none">
          <defs>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={color} stopOpacity={0.9} />
              <stop offset="55%" stopColor={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </radialGradient>
          </defs>
          <motion.circle
            cx="60"
            cy="40"
            r="26"
            fill="url(#coreGlow)"
            animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.6, 0.95, 0.6] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx="60"
            cy="40"
            r="18"
            stroke={color}
            strokeWidth="2.4"
            strokeDasharray="10 10"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <motion.circle
            cx="60"
            cy="40"
            r="12"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="4 6"
            animate={{ rotate: -360 }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          />
          <motion.circle
            cx="60"
            cy="40"
            r="4"
            fill={color}
            animate={{ scale: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      );
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
  videoUrl,
  className,
  style,
  onHoverStart,
  onHoverEnd
}: ChipProps) {
  const borderColor = useMemo(() => `${color}aa`, [color]);
  const glowColor = useMemo(() => `${color}44`, [color]);
  const accentColor = useMemo(() => `${color}cc`, [color]);

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: `0 0 40px ${accentColor}` }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className={`group absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none rounded-2xl border-[1.5px] p-[1.5px] transition-all duration-500 will-change-transform ${className ?? ''}`}
      style={{
        ...style,
        borderColor,
        boxShadow: `0 0 28px ${glowColor}`,
        backgroundImage: metallicGradient
      }}
    >
      <Link
        href={href}
        className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[18px] border border-[var(--surface-border)] bg-gradient-to-br from-slate-100 via-white to-slate-200 p-4 text-left transition-colors duration-500 dark:from-[#141414]/90 dark:to-[#0c0c0c]/90"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[18px] opacity-80"
          style={{ backgroundImage: innerSheen }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[18px]"
          style={{ background: `radial-gradient(circle at 20% 20%, ${glowColor}, transparent 60%)` }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative z-[1] flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-blue-700/70 transition-colors duration-300 dark:text-cyan-100/70">
          <span>{label}</span>
          <span className="text-[9px] text-slate-600/70 transition-colors duration-300 dark:text-slate-300/70">Module</span>
        </div>
        <div className="relative z-[1] mt-3 flex-1 overflow-hidden rounded-xl border border-[var(--surface-border)] bg-white/75 p-3 transition-colors duration-500 dark:bg-black/50">
          <div className="absolute inset-0 rounded-xl border border-[var(--surface-border)] opacity-30" />
          {videoUrl ? (
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-75 mix-blend-screen transition duration-500 ease-out group-hover:opacity-100"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : iconUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={iconUrl}
              alt={`${label} visualization`}
              className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-screen"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <AnimatedIcon animation={animation} color={color} />
            </div>
          )}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(circle at 50% 50%, ${accentColor}, transparent 65%)` }}
            animate={{ opacity: [0.12, 0.4, 0.12] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="relative z-[1] mt-4 space-y-1">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-600/80 transition-colors duration-300 dark:text-slate-300/80">Access Port</p>
          <p className="text-lg font-semibold text-slate-900 drop-shadow-[0_0_4px_rgba(0,0,0,0.15)] transition-colors duration-300 dark:text-white dark:drop-shadow-[0_0_4px_rgba(0,0,0,0.45)]">{subtitle}</p>
          <motion.span
            aria-hidden
            className="mt-2 block h-1 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
            animate={{ opacity: [0.3, 0.9, 0.3], scaleX: [0.85, 1.05, 0.85] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
