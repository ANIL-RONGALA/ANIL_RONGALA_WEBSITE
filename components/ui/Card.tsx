import { ReactNode } from "react";
import { cx } from "./classNames";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cx(
        "rounded-2xl border bg-background/60 backdrop-blur shadow-sm transition hover:bg-background/70 hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
