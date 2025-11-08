import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/lib/siteConfig';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${siteConfig.ownerName} | ${siteConfig.siteName}`,
  description: siteConfig.tagline,
  metadataBase: new URL('https://anil-rongala.vercel.app'), // temporary preview URL
  openGraph: {
    title: `${siteConfig.ownerName} | ${siteConfig.siteName}`,
    description: siteConfig.tagline,
    url: 'https://anil-rongala.vercel.app',
    siteName: siteConfig.siteName,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.ownerName} | ${siteConfig.siteName}`,
    description: siteConfig.tagline,
  },
  // 👇 This part keeps Google and other search engines from indexing it
  robots: {
    index: false,
    follow: false,
  },
};


export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-slate-950 text-slate-100`}
        style={{
          ['--circuit-bg' as string]:
            'radial-gradient(circle at 50% 20%, rgba(56,189,248,0.12), transparent 40%), linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)'
        }}
      >
        <div className="flex min-h-screen flex-col bg-gradient-to-b from-midnight-950 via-slate-950 to-black">
          <Navbar />
          <main className="relative flex-1">
            <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
              <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_60%)]" />
            </div>
            <div className="relative mx-auto w-full max-w-6xl px-4 py-12">{children}</div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
