"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "fade";
}

/** Consistent scroll-reveal — CSS transitions + Intersection Observer */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  return (
    <div
      ref={ref}
      className={`motion-reveal ${direction === "fade" ? "motion-reveal-fade" : ""} ${inView || reduceMotion ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          className={`motion-reveal ${inView || reduceMotion ? "is-visible" : ""} ${itemClassName}`}
          style={{ transitionDelay: `${i * staggerDelay}s` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
