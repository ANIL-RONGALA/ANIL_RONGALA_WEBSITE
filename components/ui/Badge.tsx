import { ReactNode } from "react";
import { cx } from "./classNames";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cx(
        "rounded-full border border-border/70 px-2 py-1 text-xs font-mono text-muted-foreground transition-colors hover:border-accent hover:text-accent",
        className
      )}
    >
      {children}
    </span>
  );
}
