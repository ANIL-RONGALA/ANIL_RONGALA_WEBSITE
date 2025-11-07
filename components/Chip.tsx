'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export type ChipProps = {
  label: string;
  subtitle: string;
  href: string;
  color: string;
};

export function Chip({ label, subtitle, href, color }: ChipProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: `0 0 18px ${color}` }}
      whileTap={{ scale: 0.98 }}
      className="neon-border rounded-xl bg-white/5 backdrop-blur"
      style={{ borderColor: color }}
    >
      <Link
        href={href}
        className="flex h-28 w-40 flex-col justify-between rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 text-left transition-colors duration-200 hover:bg-white/15"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-slate-300">{label}</span>
        <span className="text-lg font-semibold" style={{ color }}>
          {subtitle}
        </span>
      </Link>
    </motion.div>
  );
}
