import { ReactNode } from "react";
import { cx } from "./classNames";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return <div className={cx("w-full", className)}>{children}</div>;
}
