import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-shell">
      <Container className="py-6">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground transition-colors duration-300 md:flex-row">
          <p>
            © {year} {siteConfig.ownerName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-200 hover:neon-text ring-accent neon-ring"
            >
              GitHub
            </a>
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-200 hover:neon-text ring-accent neon-ring"
            >
              LinkedIn
            </a>
            <Link href={`mailto:${siteConfig.email}`} className="transition-colors duration-200 hover:neon-text ring-accent neon-ring">
              {siteConfig.email}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
