"use client";

import { useEffect, useState, type RefObject } from "react";

type UseInViewOptions = {
  once?: boolean;
  margin?: string;
  disabled?: boolean;
};

/** Lightweight Intersection Observer hook — replaces framer-motion useInView for simple reveals */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { once = true, margin = "0px", disabled = false }: UseInViewOptions = {},
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (disabled) {
      setInView(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, once, margin, disabled]);

  return inView;
}
