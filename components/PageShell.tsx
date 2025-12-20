import { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  const wrapperClasses = ["w-full", className].filter(Boolean).join(" ");

  return (
    <div className={wrapperClasses}>
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
