import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function ProjectNotFound() {
  return (
    <Container>
      <Section
        className="pt-16 sm:pt-20"
        eyebrow="Not Found"
        title="Project not found"
        subtitle="The case study you requested does not exist or has moved."
      >
        <Link href="/projects" className="text-sm font-semibold text-foreground hover:text-primary">
          ← Back to Projects
        </Link>
      </Section>
    </Container>
  );
}
