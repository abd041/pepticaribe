"use client";

import { useLayoutEffect, type RefObject } from "react";

const ROOT_CLASS = "has-fixed-site-chrome";

/** Measure fixed site chrome and publish --site-chrome-h on :root */
export function useSiteChromeHeight(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = ref.current;
    const root = document.documentElement;
    if (!el) return;

    root.classList.add(ROOT_CLASS);

    const publish = () => {
      const height = Math.ceil(el.getBoundingClientRect().height);
      root.style.setProperty("--site-chrome-h", `${height}px`);
    };

    publish();

    const observer = new ResizeObserver(publish);
    observer.observe(el);

    window.addEventListener("resize", publish);
    window.addEventListener("orientationchange", publish);

    if (document.fonts?.ready) {
      void document.fonts.ready.then(publish);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", publish);
      window.removeEventListener("orientationchange", publish);
      root.classList.remove(ROOT_CLASS);
      root.style.removeProperty("--site-chrome-h");
    };
  }, [ref]);
}
