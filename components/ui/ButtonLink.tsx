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
    "ring-glow rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-[hsl(var(--accent-foreground))] shadow-sm transition duration-200 hover:-translate-y-[1px] hover:shadow-md hover:brightness-110",
  secondary:
    "ring-glow rounded-full border border-accent bg-background/40 px-5 py-2.5 text-sm font-semibold text-accent transition duration-200 hover:bg-[hsl(var(--accent)/0.12)]",
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
        "ring-accent focus-visible:outline-none",
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
