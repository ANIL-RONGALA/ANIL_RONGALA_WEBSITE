import type { Metadata } from 'next';
import { PageTransition } from '@/components/PageTransition';
import { SectionHeader } from '@/components/SectionHeader';
import { siteConfig } from '@/lib/siteConfig';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

export const metadata: Metadata = {
  title: 'Contact | ANIL RONGALA WEBSITE'
};

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="space-y-10">
        <SectionHeader
          title="Contact"
          subtitle="Reach out for collaborations, verification strategy, or speaking engagements."
        />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h3 className="text-xl font-semibold text-white">Connect</h3>
            <div className="flex flex-col gap-3">
              <a
                href={siteConfig.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-900/60 px-5 py-3 text-sm text-slate-200 transition hover:border-cyan-400/50 hover:text-white"
              >
                <FaGithub /> GitHub
              </a>
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-900/60 px-5 py-3 text-sm text-slate-200 transition hover:border-cyan-400/50 hover:text-white"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <Link
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-900/60 px-5 py-3 text-sm text-slate-200 transition hover:border-cyan-400/50 hover:text-white"
              >
                <HiOutlineMail /> {siteConfig.email}
              </Link>
            </div>
          </div>
          <div className="neon-border space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h3 className="text-xl font-semibold text-white">Send a Signal</h3>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-slate-300">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-slate-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we collaborate?"
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <button
                type="button"
                className="w-full rounded-full border border-cyan-500/40 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20"
              >
                Launch Message (Placeholder)
              </button>
            </form>
            <p className="text-xs text-slate-400">* This form is a UI placeholder. Connect via email or LinkedIn for fastest response.</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
