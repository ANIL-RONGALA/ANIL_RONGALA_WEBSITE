import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import ClientAcademics from "./_client";

export const metadata: Metadata = {
  title: "Academics | ANIL RONGALA WEBSITE",
};

export default function AcademicsPage() {
  return (
    <PageShell>
      <ClientAcademics />
    </PageShell>
  );
}
