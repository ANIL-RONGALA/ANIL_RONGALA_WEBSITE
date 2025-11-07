'use client';

import { mediaItems } from '@/lib/media';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function AdCarousel() {
  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-white/5 backdrop-blur">
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
            className="min-w-[260px] rounded-xl border border-white/10 bg-slate-900/60 p-4 text-left shadow-[0_0_20px_rgba(34,211,238,0.15)] transition hover:border-cyan-400/60"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Featured</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 line-clamp-2 text-xs text-slate-300">{item.description}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-cyan-100">
              {item.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-cyan-500/20 px-2 py-1">
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
