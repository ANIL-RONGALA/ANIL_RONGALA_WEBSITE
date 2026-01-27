'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-semibold tracking-tight text-foreground transition-colors duration-300 sm:text-5xl"
        >
          {title}
        </motion.h1>
        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="max-w-2xl text-sm leading-relaxed text-muted-foreground transition-colors duration-300 md:text-base"
          >
            {subtitle}
          </motion.p>
        ) : null}
      </div>
      {action ? <div className="mt-4 md:mt-0">{action}</div> : null}
    </div>
  );
}
