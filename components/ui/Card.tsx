import { ReactNode } from "react";
import { cx } from "./classNames";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const cardBaseClasses =
  "rounded-2xl border border-border bg-card/60 text-card-foreground backdrop-blur shadow-sm transition duration-200 will-change-transform hover:-translate-y-[1px] hover:bg-card/70 hover:shadow-md hover:border-[hsl(var(--accent)/0.4)]";

export function Card({ children, className }: CardProps) {
  return <div className={cx(cardBaseClasses, className)}>{children}</div>;
}
