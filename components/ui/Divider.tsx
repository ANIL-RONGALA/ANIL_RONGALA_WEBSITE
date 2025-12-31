import { cx } from "./classNames";

type DividerProps = {
  className?: string;
};

export function Divider({ className }: DividerProps) {
  return (
    <div
      className={cx(
        "h-px w-full bg-gradient-to-r from-transparent via-border/70 to-transparent",
        className
      )}
    />
  );
}
