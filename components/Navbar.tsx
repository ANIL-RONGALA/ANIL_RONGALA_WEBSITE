'use client';

import { siteConfig } from '@/lib/siteConfig';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { LuMoonStar, LuSunMedium } from 'react-icons/lu';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/academics', label: 'Academics' },
  { href: '/professional', label: 'Professional' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/media', label: 'Media' },
  { href: '/personal', label: 'Personal' },
  { href: '/contact', label: 'Contact' }
];

export function Navbar() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 border-b border-cyan-500/10 bg-slate-950/80 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold uppercase tracking-[0.2em] text-cyan-200">
          {siteConfig.siteName}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-slate-200 transition hover:border-cyan-400/60 hover:text-white"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-slate-200 transition hover:border-cyan-400/60 hover:text-white"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-slate-200 transition hover:border-cyan-400/60 hover:text-white"
            aria-label="Email"
          >
            <HiOutlineMail />
          </a>
          <button
            onClick={() => setIsDark((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-slate-200 transition hover:border-cyan-400/60 hover:text-white"
            aria-label="Toggle theme"
          >
            {isDark ? <LuSunMedium /> : <LuMoonStar />}
          </button>
        </div>
      </div>
      <div className="border-t border-cyan-500/10 bg-slate-950/90 px-4 py-3 text-xs text-slate-400 lg:hidden">
        <div className="flex flex-wrap gap-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </motion.header>
  );
}
