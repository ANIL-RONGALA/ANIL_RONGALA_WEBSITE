import { siteConfig } from '@/lib/siteConfig';
import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-shell">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-[color:var(--text-subtle)] transition-colors duration-300 md:flex-row">
        <p>© {year} {siteConfig.ownerName}. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--accent-cyan)] transition-colors"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--accent-cyan)] transition-colors"
          >
            LinkedIn
          </a>
          <Link href={`mailto:${siteConfig.email}`} className="hover:text-[var(--accent-cyan)] transition-colors">
            {siteConfig.email}
          </Link>
        </div>
      </div>
    </footer>
  );
}
