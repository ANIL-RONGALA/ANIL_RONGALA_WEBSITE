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
            className="min-w-[260px] rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 text-left shadow-lg transition duration-300 hover:border-[hsl(var(--accent)/0.45)] hover:neon-glow"
          >
            <p className="text-xs uppercase tracking-[0.3em] neon-text">Featured</p>
            <h3 className="mt-2 text-lg font-semibold text-body">{item.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{item.description}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-muted">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/60 bg-muted/60 px-2 py-1 text-body"
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
