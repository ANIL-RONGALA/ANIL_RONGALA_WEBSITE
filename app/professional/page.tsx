import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import ClientProfessional from "./_client";

export const metadata: Metadata = {
  title: "Professional | ANIL RONGALA WEBSITE",
};

export default function ProfessionalPage() {
  return (
    <PageShell>
      <ClientProfessional />
    </PageShell>
  );
}
