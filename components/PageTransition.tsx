'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type PageTransitionProps = {
  children: ReactNode;
};

const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 }
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
