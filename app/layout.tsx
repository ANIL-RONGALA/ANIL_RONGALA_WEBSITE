type RootLayoutProps = { children: React.ReactNode };
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/lib/siteConfig';
import { ReactNode } from 'react';
import { ThemeProvider } from './providers';

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
      <body className={`${inter.className} min-h-screen bg-transparent text-[color:var(--text-primary)] transition-colors duration-500`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col bg-[var(--surface-canvas)] transition-colors duration-500">
            <Navbar />
            <main className="relative flex-1">
              <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
                <div className="h-full w-full bg-[var(--circuit-overlay)]" />
              </div>
              <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">{children}</div>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
