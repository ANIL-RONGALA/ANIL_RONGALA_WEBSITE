import { ReactNode } from "react";
import { cx } from "./classNames";

type SectionProps = {
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export function Section({ children, className, eyebrow, title, subtitle }: SectionProps) {
  const hasHeader = Boolean(eyebrow || title || subtitle);

  return (
    <section className={cx("py-12 sm:py-16", className)}>
      {hasHeader ? (
        <div className="space-y-3">
          {eyebrow ? (
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</p>
          ) : null}
          {title ? <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">{title}</h2> : null}
          {subtitle ? <p className="max-w-2xl text-muted-foreground">{subtitle}</p> : null}
        </div>
      ) : null}
      <div className={cx(hasHeader ? "mt-8" : "", "space-y-6")}>{children}</div>
    </section>
  );
}
