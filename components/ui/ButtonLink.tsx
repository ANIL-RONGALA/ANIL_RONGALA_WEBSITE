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
  primary: "rounded-full bg-foreground px-5 py-2 text-sm text-background transition hover:opacity-90",
  secondary: "rounded-full border px-5 py-2 text-sm transition hover:bg-muted",
  ghost: "rounded-full px-4 py-2 text-sm transition hover:bg-muted"
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
      className={cx(variantClasses[variant], className)}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </Link>
  );
}
