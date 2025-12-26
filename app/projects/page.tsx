import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { projects } from "@/lib/projects";
import { ProjectsFilter } from "./ProjectsFilter";

export const metadata: Metadata = {
  title: "Projects | ANIL RONGALA WEBSITE"
};

export default function ProjectsPage() {
  return (
    <Container>
      <Section
        eyebrow="PROJECTS"
        title="Engineering Projects"
        subtitle="Silicon, verification, and applied ML builds with external repositories and demos."
      >
        <PageTransition>
          <ProjectsFilter projects={projects} />
        </PageTransition>
      </Section>
    </Container>
  );
}
