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
    "rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition duration-200 hover:-translate-y-[1px] hover:brightness-105 hover:neon-glow",
  secondary:
    "rounded-full border border-border/70 bg-background/60 px-5 py-2.5 text-sm font-semibold text-foreground transition duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:bg-muted/40",
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
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
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
