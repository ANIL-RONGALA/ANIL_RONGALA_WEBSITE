type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</p> : null}
      <h1 className="text-3xl sm:text-4xl font-semibold">{title}</h1>
      {subtitle ? <p className="max-w-2xl text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
