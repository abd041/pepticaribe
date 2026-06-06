"use client";

import type { ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "fade";
  stagger?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Consistent scroll-reveal motion language */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  const initial =
    direction === "up"
      ? { opacity: 0, y: reduceMotion ? 0 : 28 }
      : { opacity: 0 };

  const animate = inView
    ? { opacity: 1, y: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{ duration: reduceMotion ? 0.01 : 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
}

export function StaggerReveal({
  children,
  className = "",
  itemClassName = "",
  staggerDelay = 0.08,
}: StaggerRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          className={itemClassName}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: reduceMotion ? 0.01 : 0.55,
            delay: i * staggerDelay,
            ease: EASE,
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
