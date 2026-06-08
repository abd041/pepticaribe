"use client";

import { useEffect, useRef } from "react";
import { HERO_ASSETS } from "@/lib/heroAssets";
import { isReducedMotion } from "@/lib/gsap/motion";

/** Hero atmosphere — ambient vial video + copy legibility veil */
export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || isReducedMotion()) return;

    const play = () => {
      void video.play().catch(() => undefined);
    };

    play();
    video.addEventListener("loadeddata", play);
    return () => video.removeEventListener("loadeddata", play);
  }, []);

  return (
    <div
      className="ref-hero-bg concept-hero-bg hero-cinematic-layers pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <video
        ref={videoRef}
        className="ref-hero-bg-video absolute inset-0 h-full w-full object-cover opacity-[0.22] motion-reduce:hidden"
        src={HERO_ASSETS.showcaseVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="ref-hero-copy-legibility absolute inset-0" />
    </div>
  );
}
