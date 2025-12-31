import { ReactNode } from "react";
import { cx } from "./classNames";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const cardBaseClasses =
  "rounded-2xl border bg-background/60 backdrop-blur shadow-sm transition duration-200 will-change-transform hover:-translate-y-[1px] hover:bg-background/70 hover:shadow-md";

export function Card({ children, className }: CardProps) {
  return <div className={cx(cardBaseClasses, className)}>{children}</div>;
}
