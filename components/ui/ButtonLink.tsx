import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { cx } from "./classNames";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  target?: string;
  rel?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "ring-glow rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background shadow-sm transition duration-200 hover:-translate-y-[1px] hover:shadow-md",
  secondary:
    "ring-glow rounded-full border border-border/70 bg-background/40 px-5 py-2.5 text-sm font-semibold text-foreground/90 transition duration-200 hover:bg-muted",
  ghost:
    "rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition duration-200 hover:bg-muted/70 hover:text-foreground"
};

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  target,
  rel,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cx(
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        variantClasses[variant],
        className
      )}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </Link>
  );
}
