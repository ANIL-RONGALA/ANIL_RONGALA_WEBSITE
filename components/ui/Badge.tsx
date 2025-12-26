import { ReactNode } from "react";
import { cx } from "./classNames";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return <span className={cx("rounded-full border px-2 py-1 text-xs text-muted-foreground", className)}>{children}</span>;
}
