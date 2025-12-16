import { ReactNode } from 'react';

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  const innerClasses = ['max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10'];

  if (className) {
    innerClasses.push(className);
  }

  return (
    <div className="w-full">
      <div className={innerClasses.join(' ')}>{children}</div>
    </div>
  );
}
