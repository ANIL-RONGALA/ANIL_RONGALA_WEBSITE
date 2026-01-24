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
    "ring-glow gradient-accent rounded-full px-5 py-2.5 text-sm font-semibold text-[hsl(var(--accent-foreground))] shadow-sm transition duration-200 hover:-translate-y-[1px] hover:brightness-105 hover:neon-glow",
  secondary:
    "ring-glow rounded-full border border-border/70 bg-background/60 px-5 py-2.5 text-sm font-semibold text-body transition duration-200 hover:border-[hsl(var(--accent)/0.45)] hover:bg-[hsl(var(--accent)/0.08)] hover:neon-text hover:neon-glow",
  ghost:
    "rounded-full px-4 py-2 text-sm font-semibold text-muted transition duration-200 hover:bg-muted/70 hover:text-foreground"
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
        "ring-accent neon-ring focus-visible:outline-none",
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
