"use client";

import { useEffect, useRef, useState } from "react";
import { BRAND_HERO_VIDEO } from "@/lib/brandAssets";
import { HERO_SHOWCASE, HERO_SHOWCASE_PATH } from "@/lib/heroAssets";
import { LuxuryProductPresentation } from "@/components/ui/LuxuryProductPresentation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Hero right panel — AI three-vial motion with static reference PNG fallback.
 */
export function HeroShowcase() {
  const reduceMotion = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const useVideo = !reduceMotion && !videoFailed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !useVideo) return;

    const play = () => {
      void video.play().catch(() => setVideoFailed(true));
    };

    play();
    video.addEventListener("loadeddata", play);
    return () => video.removeEventListener("loadeddata", play);
  }, [useVideo]);

  return (
    <div
      className="ref-hero-showcase concept-hero-showcase ref-hero-showcase-reference-scene art-hero-showcase"
      data-hero-asset={useVideo ? "hero-showcase-video" : "hero-showcase-reference"}
      data-hero-src={useVideo ? BRAND_HERO_VIDEO : HERO_SHOWCASE_PATH}
    >
      <div className="lux-hero-product">
        <LuxuryProductPresentation variant="hero" alt={HERO_SHOWCASE.alt}>
          <div className="ref-hero-showcase-reference-frame lux-hero-float relative mx-auto flex items-end justify-center lg:items-center lg:justify-start">
            {useVideo ? (
              <video
                ref={videoRef}
                src={BRAND_HERO_VIDEO}
                poster={HERO_SHOWCASE_PATH}
                className="ref-hero-showcase-reference ref-hero-showcase-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label={HERO_SHOWCASE.alt}
                onError={() => setVideoFailed(true)}
              />
            ) : (
              <img
                src={HERO_SHOWCASE_PATH}
                alt={HERO_SHOWCASE.alt}
                width={HERO_SHOWCASE.width}
                height={HERO_SHOWCASE.height}
                decoding="async"
                fetchPriority="high"
                loading="eager"
                className="ref-hero-showcase-reference h-auto w-auto max-h-[var(--hero-showcase-max-h)] max-w-[var(--hero-showcase-max-w)] object-contain"
              />
            )}
          </div>
        </LuxuryProductPresentation>
      </div>
    </div>
  );
}
