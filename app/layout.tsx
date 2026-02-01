import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/lib/siteConfig";
import { ReactNode } from "react";
import { Providers } from "./providers";
import BootScreen from "@/components/BootScreen";
import { HelpBot } from "@/components/HelpBot";
import { SupportWidget } from "@/components/SupportWidget";
import { ResumeDrawer } from "@/components/ResumeDrawer";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { AmbientOverlay } from "@/components/AmbientOverlay";
import { SparkleTrailOverlay } from "@/components/SparkleTrailOverlay";
import localFont from "next/font/local";

const sansFont = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const monoFont = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-mono",
  weight: "100 800",
  display: "swap",
});

type RootLayoutProps = { children: ReactNode };

export const metadata: Metadata = {
  title: `${siteConfig.ownerName} | ${siteConfig.siteName}`,
  description: siteConfig.tagline,
  metadataBase: new URL("https://anil-rongala.vercel.app"),
  openGraph: {
    title: `${siteConfig.ownerName} | ${siteConfig.siteName}`,
    description: siteConfig.tagline,
    url: "https://anil-rongala.vercel.app",
    siteName: siteConfig.siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.ownerName} | ${siteConfig.siteName}`,
    description: siteConfig.tagline,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${sansFont.variable} ${monoFont.variable} min-h-screen bg-background text-foreground`}
      >
        <Providers>
          <AmbientOverlay />
          <SparkleTrailOverlay />
          <BootScreen />
          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 sm:px-6">
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </div>
          <HelpBot />
          <SupportWidget />
          <ResumeDrawer />
          <KeyboardShortcuts />
        </Providers>
      </body>
    </html>
  );
}
