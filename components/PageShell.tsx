import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  const wrapperClasses = ["w-full", className].filter(Boolean).join(" ");

  return (
    <div className={wrapperClasses}>
      <Container className="py-12 sm:py-16">{children}</Container>
    </div>
  );
}
