import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { projects } from "@/lib/projects";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";

export const metadata: Metadata = {
  title: "Projects | ANIL RONGALA WEBSITE"
};

export default function ProjectsPage() {
  return (
    <Container>
      <Section
        eyebrow="PROJECTS"
        title="Selected Work"
        subtitle="Case studies with direct proof links to repositories, demos, and research artifacts."
      >
        <ProjectsExplorer projects={projects} />
      </Section>
    </Container>
  );
}
