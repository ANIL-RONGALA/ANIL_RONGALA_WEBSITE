"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cx } from "./classNames";
import { cardBaseClasses } from "./Card";

type MotionCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function MotionCard({ children, className, delay = 0 }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
      className={cx(cardBaseClasses, className)}
    >
      {children}
    </motion.div>
  );
}
