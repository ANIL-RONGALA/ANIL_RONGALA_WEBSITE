'use client';

import { siteConfig } from '@/lib/siteConfig';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { useTheme } from '@/app/providers';

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
  const { theme, toggleTheme, mounted } = useTheme();
  const resolvedTheme = mounted ? theme : 'dark';
  const isLight = resolvedTheme === 'light';
  const toggleLabel = isLight ? 'Switch to dark mode' : 'Switch to light mode';
  const toggleIcon = isLight ? '🌙' : '☀️';

  const handleToggle = () => {
    if (!mounted) return;
    if (typeof document !== 'undefined') {
      document.body.classList.add('theme-transition');
      window.setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 600);
    }
    toggleTheme();
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="navbar"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-[color:var(--text-muted)] transition-colors duration-300 sm:px-6 md:px-8">
        <Link
          href="/"
          className="font-semibold uppercase tracking-[0.2em] text-[var(--accent-cyan)] transition-colors duration-300 hover:text-[var(--accent-pink)]"
        >
          {siteConfig.siteName}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[color:var(--text-subtle)] transition-colors duration-300 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[var(--accent-cyan)] transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-soft)] text-xl text-[color:var(--text-muted)] transition-colors duration-300 hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-soft)] text-xl text-[color:var(--text-muted)] transition-colors duration-300 hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-soft)] text-xl text-[color:var(--text-muted)] transition-colors duration-300 hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)]"
            aria-label="Email"
          >
            <HiOutlineMail />
          </a>
          <button
            type="button"
            onClick={handleToggle}
            disabled={!mounted}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-soft)] text-xl text-[color:var(--text-muted)] transition-all duration-300 hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-cyan)] disabled:cursor-not-allowed disabled:opacity-60"
            aria-label={toggleLabel}
          >
            <span aria-hidden className="text-lg">
              {toggleIcon}
            </span>
          </button>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-wrap gap-4 px-4 pb-4 text-xs text-[color:var(--text-subtle)] transition-colors duration-300 lg:hidden">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-[var(--accent-cyan)] transition-colors">
            {link.label}
          </Link>
        ))}
      </div>
    </motion.header>
  );
}
