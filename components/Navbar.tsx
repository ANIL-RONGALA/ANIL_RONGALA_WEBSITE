'use client';

import { siteConfig } from '@/lib/siteConfig';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaFileAlt, FaGithub, FaLifeRing, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { cx } from '@/components/ui/classNames';
import { usePerf } from '@/app/providers';

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
  const { theme, setTheme } = useTheme();
  const { effectsEnabled, setEffectsEnabled } = usePerf();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'light' || theme === 'dark' ? theme : 'dark';
  const isLight = currentTheme === 'light';
  const toggleLabel = isLight ? 'Switch to dark mode' : 'Switch to light mode';
  const toggleIcon = isLight ? '🌙' : '☀️';

  const handleToggle = () => {
    document.body.classList.add('theme-transition');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    setTimeout(() => document.body.classList.remove('theme-transition'), 600);
  };

  const handleOpenSupport = () => {
    window.dispatchEvent(new CustomEvent('open-support-widget'));
  };

  const handleOpenResume = () => {
    window.dispatchEvent(new CustomEvent('open-resume-drawer'));
  };

  return (
    <motion.header
      initial={effectsEnabled ? { y: -20, opacity: 0 } : false}
      animate={effectsEnabled ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
      transition={effectsEnabled ? { duration: 0.6, ease: 'easeOut' } : { duration: 0 }}
      className={cx(
        "w-full border-b border-border/60 bg-background/70 supports-[backdrop-filter]:bg-background/50",
        effectsEnabled ? "backdrop-blur" : ""
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 text-muted-foreground transition-colors duration-300 sm:px-6">
        <Link
          href="/"
          className="rounded-full px-2 py-1 font-semibold uppercase tracking-[0.2em] text-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          {siteConfig.siteName}
        </Link>
        <nav className="hidden items-center gap-4 text-sm text-muted-foreground transition-colors duration-300 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cx(
                "relative rounded-full px-3 py-1.5 text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                pathname === link.href
                  ? "neon-accent border-b border-[hsl(var(--accent)/0.5)] bg-muted/40"
                  : ""
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-border/60 bg-background/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 lg:hidden"
        >
          Menu
        </button>
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={handleOpenSupport}
            className="hidden items-center rounded-full border border-border/60 bg-background/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 md:inline-flex"
          >
            Live Support
          </button>
          <button
            type="button"
            onClick={handleOpenSupport}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/60 text-base text-muted-foreground transition-colors duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 md:hidden sm:h-9 sm:w-9"
            aria-label="Live Support"
          >
            <FaLifeRing />
          </button>
          <button
            type="button"
            onClick={handleOpenResume}
            className="hidden items-center rounded-full border border-border/60 bg-background/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 md:inline-flex"
          >
            Resume
          </button>
          <button
            type="button"
            onClick={handleOpenResume}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/60 text-base text-muted-foreground transition-colors duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 md:hidden sm:h-9 sm:w-9"
            aria-label="Resume"
          >
            <FaFileAlt />
          </button>
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/60 text-lg text-muted-foreground transition-colors duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 sm:h-9 sm:w-9"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/60 text-lg text-muted-foreground transition-colors duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 sm:h-9 sm:w-9"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/60 text-lg text-muted-foreground transition-colors duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 sm:h-9 sm:w-9"
            aria-label="Email"
          >
            <HiOutlineMail />
          </a>
          <button
            type="button"
            onClick={() => setEffectsEnabled(!effectsEnabled)}
            className="inline-flex items-center rounded-full border border-border/60 bg-background/60 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            aria-label={`Turn effects ${effectsEnabled ? 'off' : 'on'}`}
          >
            Effects {effectsEnabled ? 'On' : 'Off'}
          </button>
          <button
            type="button"
            onClick={handleToggle}
            disabled={!mounted}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/60 text-lg text-muted-foreground transition-all duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-60 sm:h-9 sm:w-9"
            aria-label={toggleLabel}
          >
            <span aria-hidden className="text-lg">
              {toggleIcon}
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
