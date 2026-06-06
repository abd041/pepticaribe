"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import {
  SMOOTH_SCROLL_DURATION,
  SMOOTH_SCROLL_MIN_WIDTH,
  shouldUseSmoothScroll,
} from "@/lib/smoothScroll";

type SmoothScrollContextValue = {
  ready: boolean;
  enabled: boolean;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  ready: true,
  enabled: false,
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function useSmoothScrollReady() {
  return useContext(SmoothScrollContext).ready;
}

type SmoothScrollProviderProps = {
  chrome?: ReactNode;
  children: ReactNode;
};

export function SmoothScrollProvider({ chrome, children }: SmoothScrollProviderProps) {
  const [state, setState] = useState<SmoothScrollContextValue>({
    ready: false,
    enabled: false,
  });
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const smoothModeRef = useRef(false);

  const clearSmoothClasses = () => {
    document.documentElement.classList.remove("smooth-scroll-active");
    document.documentElement.removeAttribute("data-smooth-scroll");
  };

  const killSmoother = () => {
    smootherRef.current?.kill();
    smootherRef.current = null;
    smoothModeRef.current = false;
    clearSmoothClasses();
  };

  const enableNativeScroll = () => {
    killSmoother();
    setState({ ready: true, enabled: false });
    ScrollTrigger.refresh();
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMq = window.matchMedia(`(max-width: ${SMOOTH_SCROLL_MIN_WIDTH - 1}px)`);

    const initSmoother = () => {
      if (!shouldUseSmoothScroll()) {
        enableNativeScroll();
        return;
      }

      const wrapper = document.getElementById("smooth-wrapper");
      const content = document.getElementById("smooth-content");
      if (!wrapper || !content) {
        enableNativeScroll();
        return;
      }

      killSmoother();

      try {
        smootherRef.current = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: SMOOTH_SCROLL_DURATION,
          effects: true,
          smoothTouch: false,
          normalizeScroll: true,
        });

        ScrollTrigger.refresh(true);

        const maxScroll = content.scrollHeight - window.innerHeight;
        if (maxScroll <= 8) {
          throw new Error("ScrollSmoother: insufficient scroll range");
        }

        document.documentElement.classList.add("smooth-scroll-active");
        document.documentElement.setAttribute("data-smooth-scroll", "ready");
        smoothModeRef.current = true;
        setState({ ready: true, enabled: true });
      } catch (error) {
        console.warn("[SmoothScrollProvider] ScrollSmoother unavailable — native scroll.", error);
        enableNativeScroll();
      }
    };

    initSmoother();

    const onLoad = () => {
      if (smoothModeRef.current) {
        ScrollTrigger.refresh(true);
      }
    };
    window.addEventListener("load", onLoad);

    const onBreakpointChange = () => {
      initSmoother();
    };
    reducedMq.addEventListener("change", onBreakpointChange);
    mobileMq.addEventListener("change", onBreakpointChange);

    const onResize = () => {
      if (smoothModeRef.current) {
        ScrollTrigger.refresh(true);
        return;
      }
      if (shouldUseSmoothScroll()) {
        initSmoother();
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("load", onLoad);
      reducedMq.removeEventListener("change", onBreakpointChange);
      mobileMq.removeEventListener("change", onBreakpointChange);
      window.removeEventListener("resize", onResize);
      killSmoother();
    };
  }, []);

  if (!state.enabled) {
    return (
      <SmoothScrollContext.Provider value={state}>
        {chrome}
        {children}
      </SmoothScrollContext.Provider>
    );
  }

  return (
    <SmoothScrollContext.Provider value={state}>
      <div id="smooth-wrapper" className="smooth-scroll-wrapper">
        {chrome}
        <div id="smooth-content">{children}</div>
      </div>
    </SmoothScrollContext.Provider>
  );
}
