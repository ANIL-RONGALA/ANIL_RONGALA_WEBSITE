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
import localFont from "next/font/local";

const sansFont = localFont({
  src: "public/fonts/Inter-Variable.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const monoFont = localFont({
  src: "public/fonts/JetBrainsMono-Variable.woff2",
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
          <BootScreen />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <HelpBot />
          <SupportWidget />
        </Providers>
      </body>
    </html>
  );
}
