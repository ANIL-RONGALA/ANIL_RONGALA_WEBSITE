'use client';

import { mediaItems } from '@/lib/media';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function AdCarousel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-soft)] backdrop-blur transition-colors duration-500">
      <motion.div
        className="flex min-w-full gap-6 p-6"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
      >
        {[...mediaItems, ...mediaItems].map((item, index) => (
          <Link
            key={`${item.title}-${index}`}
            href={item.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="min-w-[260px] rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 text-left shadow-lg transition-colors duration-300 hover:border-[var(--accent-cyan)] hover:shadow-2xl dark:shadow-[0_0_20px_rgba(34,211,238,0.18)] dark:hover:shadow-[0_18px_36px_rgba(34,211,238,0.28)]"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-cyan)]">Featured</p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
            <p className="mt-2 line-clamp-2 text-xs text-slate-700 dark:text-slate-300">{item.description}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-blue-700 dark:text-cyan-100">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-200/60 px-2 py-1 text-blue-800 dark:bg-cyan-500/20 dark:text-cyan-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
