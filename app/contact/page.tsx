import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { siteConfig } from "@/lib/siteConfig";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { MotionCard } from "@/components/ui/MotionCard";

export const metadata: Metadata = {
  title: "Contact | ANIL RONGALA WEBSITE"
};

export default function ContactPage() {
  return (
    <Container>
      <Section
        eyebrow="CONTACT"
        title="Contact"
        subtitle="Direct channels for collaboration, verification strategy, and documented work follow-ups."
      >
        <PageTransition>
          <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
            Email and social links for collaborations and opportunities.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <MotionCard className="flex h-full flex-col space-y-6 p-8">
              <h3 className="text-xl font-semibold text-foreground">Connect</h3>
              <div className="flex flex-col gap-3">
                <a
                  href={siteConfig.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-border/60 px-5 py-3 text-sm text-muted-foreground transition hover:bg-muted"
                >
                  <FaGithub /> GitHub
                </a>
                <a
                  href={siteConfig.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-border/60 px-5 py-3 text-sm text-muted-foreground transition hover:bg-muted"
                >
                  <FaLinkedin /> LinkedIn
                </a>
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-3 rounded-full border border-border/60 px-5 py-3 text-sm text-muted-foreground transition hover:bg-muted"
                >
                  <HiOutlineMail /> {siteConfig.email}
                </Link>
              </div>
            </MotionCard>
            <MotionCard className="flex h-full flex-col space-y-6 p-8">
              <h3 className="text-xl font-semibold text-foreground">Send a Signal</h3>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-muted-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-lg border border-border/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition focus:border-foreground/30 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-border/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition focus:border-foreground/30 focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="How can we collaborate?"
                    rows={4}
                    className="w-full rounded-lg border border-border/60 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition focus:border-foreground/30 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  className="w-full rounded-full border border-border/60 px-6 py-3 text-sm font-semibold text-muted-foreground transition hover:bg-muted"
                >
                  Launch Message (Placeholder)
                </button>
              </form>
              <p className="text-xs text-muted-foreground">
                * This form is a UI placeholder. Connect via email or LinkedIn for fastest response.
              </p>
            </MotionCard>
          </div>
        </PageTransition>
      </Section>
    </Container>
  );
}
