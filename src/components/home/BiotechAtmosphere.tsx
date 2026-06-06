"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScrollReady } from "@/components/home/SmoothScrollProvider";
import {
  auditAtmosphereLayers,
  DEBUG_MULTIPLIERS,
  isAtmosphereDebugEnabled,
  isAtmosphereVisibilityPrototype,
  logAtmosphereAudit,
  VISIBILITY_PROTOTYPE,
} from "@/lib/atmosphereDebug";

type ParticleTone = "teal" | "cyan" | "gold";
type DepthLayer = "back" | "mid" | "front";

type LayerConfig = {
  count: number;
  countMobile: number;
  sizeMin: number;
  sizeMax: number;
  opacityMin: number;
  opacityMax: number;
  driftAmpX: number;
  driftAmpY: number;
  durationMin: number;
  durationMax: number;
};

const LAYER_CONFIG: Record<DepthLayer, LayerConfig> = {
  back: {
    count: 8,
    countMobile: 4,
    sizeMin: 1.5,
    sizeMax: 2.75,
    opacityMin: 0.22,
    opacityMax: 0.42,
    driftAmpX: 22,
    driftAmpY: 18,
    durationMin: 34,
    durationMax: 52,
  },
  mid: {
    count: 10,
    countMobile: 5,
    sizeMin: 2,
    sizeMax: 4.25,
    opacityMin: 0.34,
    opacityMax: 0.62,
    driftAmpX: 32,
    driftAmpY: 26,
    durationMin: 20,
    durationMax: 34,
  },
  front: {
    count: 6,
    countMobile: 3,
    sizeMin: 2.75,
    sizeMax: 6,
    opacityMin: 0.46,
    opacityMax: 0.78,
    driftAmpX: 38,
    driftAmpY: 30,
    durationMin: 14,
    durationMax: 24,
  },
};

const VISIBILITY_LAYER_COUNTS: Record<DepthLayer, { desktop: number; mobile: number }> = {
  back: { desktop: VISIBILITY_PROTOTYPE.counts.back, mobile: VISIBILITY_PROTOTYPE.counts.backMobile },
  mid: { desktop: VISIBILITY_PROTOTYPE.counts.mid, mobile: VISIBILITY_PROTOTYPE.counts.midMobile },
  front: { desktop: VISIBILITY_PROTOTYPE.counts.front, mobile: VISIBILITY_PROTOTYPE.counts.frontMobile },
};

const TONES: ParticleTone[] = ["cyan", "teal", "cyan", "teal", "cyan", "gold"];

/** Phase 6A + reference visibility — brighter cyan field like premium biotech refs */
const ATMOSPHERE_6A: Record<DepthLayer, { size: number; opacity: number }> = {
  back: { size: 1.62, opacity: 1.72 },
  mid: { size: 1.72, opacity: 1.85 },
  front: { size: 1.88, opacity: 1.92 },
};

function applyAtmosphere6A(base: LayerConfig, layer: DepthLayer): LayerConfig {
  const tune = ATMOSPHERE_6A[layer];
  const tuned: LayerConfig = {
    ...base,
    sizeMin: base.sizeMin * tune.size,
    sizeMax: base.sizeMax * tune.size,
    opacityMin: Math.min(base.opacityMin * tune.opacity, 1),
    opacityMax: Math.min(base.opacityMax * tune.opacity, 1),
  };

  if (layer === "front") {
    return {
      ...tuned,
      durationMin: base.durationMin * 0.82,
      durationMax: base.durationMax * 0.82,
      driftAmpX: base.driftAmpX * 1.08,
      driftAmpY: base.driftAmpY * 1.08,
    };
  }

  return tuned;
}

function resolveLayerConfig(layer: DepthLayer, visibilityPrototype: boolean): LayerConfig {
  const base = LAYER_CONFIG[layer];
  if (!visibilityPrototype) return applyAtmosphere6A(base, layer);

  const { size, opacity, speed } = VISIBILITY_PROTOTYPE;
  const counts = VISIBILITY_LAYER_COUNTS[layer];

  return {
    count: counts.desktop,
    countMobile: counts.mobile,
    sizeMin: base.sizeMin * size,
    sizeMax: base.sizeMax * size,
    opacityMin: Math.min(base.opacityMin * opacity, 1),
    opacityMax: Math.min(base.opacityMax * opacity, 1),
    driftAmpX: base.driftAmpX * speed,
    driftAmpY: base.driftAmpY * speed,
    durationMin: base.durationMin / speed,
    durationMax: base.durationMax / speed,
  };
}

function applyDebugMultipliers(config: LayerConfig, debug: boolean): LayerConfig {
  if (!debug) return config;
  return {
    ...config,
    sizeMin: config.sizeMin * DEBUG_MULTIPLIERS.size,
    sizeMax: config.sizeMax * DEBUG_MULTIPLIERS.size,
    opacityMin: Math.min(config.opacityMin * DEBUG_MULTIPLIERS.opacity, 1),
    opacityMax: Math.min(config.opacityMax * DEBUG_MULTIPLIERS.opacity, 1),
    driftAmpX: config.driftAmpX * DEBUG_MULTIPLIERS.speed,
    driftAmpY: config.driftAmpY * DEBUG_MULTIPLIERS.speed,
    durationMin: config.durationMin / DEBUG_MULTIPLIERS.speed,
    durationMax: config.durationMax / DEBUG_MULTIPLIERS.speed,
  };
}

function createLayerParticles(
  container: HTMLElement,
  layer: DepthLayer,
  mobile: boolean,
  visibilityPrototype: boolean,
  layoutDebug: boolean,
) {
  const config = applyDebugMultipliers(resolveLayerConfig(layer, visibilityPrototype), layoutDebug);
  const count = mobile ? config.countMobile : config.count;
  const particles: HTMLSpanElement[] = [];

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement("span");
    const tone = TONES[i % TONES.length];
    const isBokeh = layer !== "back" && Math.random() < 0.24;
    const sizeBase = gsap.utils.random(config.sizeMin, config.sizeMax, 0.25);
    const size = sizeBase * (isBokeh ? gsap.utils.random(2.1, 3.4) : 1);

    particle.className = [
      "bio-particle",
      `bio-particle--${tone}`,
      `bio-particle--${layer}`,
      isBokeh ? "bio-particle--bokeh" : "",
    ]
      .filter(Boolean)
      .join(" ");
    particle.style.left = `${4 + Math.random() * 92}%`;
    particle.style.top = `${3 + Math.random() * 94}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.setAttribute("aria-hidden", "true");
    particle.dataset.layer = layer;
    if (visibilityPrototype || layoutDebug) {
      particle.title = `particle (${layer}, ${tone}, ${size.toFixed(1)}px)`;
    }
    container.appendChild(particle);
    particles.push(particle);
  }

  return particles;
}

function animateParticles(
  particles: HTMLSpanElement[],
  layer: DepthLayer,
  visibilityPrototype: boolean,
  layoutDebug: boolean,
) {
  const tuned = applyDebugMultipliers(resolveLayerConfig(layer, visibilityPrototype), layoutDebug);
  const fast = visibilityPrototype || layoutDebug;

  particles.forEach((particle) => {
    const driftX = gsap.utils.random(-tuned.driftAmpX, tuned.driftAmpX);
    const driftY = gsap.utils.random(-tuned.driftAmpY, tuned.driftAmpY);
    const duration = gsap.utils.random(tuned.durationMin, tuned.durationMax);
    const delay = gsap.utils.random(0, fast ? 1 : 6);

    gsap.set(particle, { opacity: gsap.utils.random(tuned.opacityMin, tuned.opacityMax) });

    gsap.to(particle, {
      x: driftX,
      y: driftY,
      duration,
      delay,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    gsap.to(particle, {
      opacity: gsap.utils.random(tuned.opacityMin, tuned.opacityMax),
      duration: gsap.utils.random(fast ? 1.5 : 5, fast ? 3 : 10),
      delay: gsap.utils.random(0, fast ? 0.5 : 3),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  });
}

/** Phase 5 — luxury biotech particle environment with depth layers */
export function BiotechAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const [layoutDebug, setLayoutDebug] = useState(() =>
    typeof window !== "undefined" ? isAtmosphereDebugEnabled() : false,
  );
  const [visibilityPrototype, setVisibilityPrototype] = useState(() =>
    typeof window !== "undefined" ? isAtmosphereVisibilityPrototype() : false,
  );
  const scrollReady = useSmoothScrollReady();

  useEffect(() => {
    const sync = () => {
      setLayoutDebug(isAtmosphereDebugEnabled());
      setVisibilityPrototype(isAtmosphereVisibilityPrototype());
    };
    sync();
    window.addEventListener("atmosphere-debug-change", sync);
    window.addEventListener("atmosphere-visibility-change", sync);
    return () => {
      window.removeEventListener("atmosphere-debug-change", sync);
      window.removeEventListener("atmosphere-visibility-change", sync);
    };
  }, []);

  useEffect(() => {
    if (!scrollReady) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const visProto = isAtmosphereVisibilityPrototype();
    const layoutDbg = isAtmosphereDebugEnabled();

    if (reduced && !visProto && !layoutDbg) {
      logAtmosphereAudit(auditAtmosphereLayers());
      return;
    }

    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const host = document.querySelector(".bio-atmosphere-host");
    const parallax = visProto ? VISIBILITY_PROTOTYPE.parallax : 1;
    const speedScale = visProto ? VISIBILITY_PROTOTYPE.speed : layoutDbg ? DEBUG_MULTIPLIERS.speed : 1;
    const glowBase = visProto ? 0.95 : 0.782;
    const glowCyan = visProto ? 0.88 : 0.598;
    const glowGold = visProto ? 0.85 : 0.552;

    const backParticles =
      backRef.current
        ? createLayerParticles(backRef.current, "back", mobile, visProto, layoutDbg)
        : [];
    const midParticles =
      midRef.current ? createLayerParticles(midRef.current, "mid", mobile, visProto, layoutDbg) : [];
    const frontParticles =
      frontRef.current
        ? createLayerParticles(frontRef.current, "front", mobile, visProto, layoutDbg)
        : [];

    const ctx = gsap.context(() => {
      animateParticles(backParticles, "back", visProto, layoutDbg);
      animateParticles(midParticles, "mid", visProto, layoutDbg);
      animateParticles(frontParticles, "front", visProto, layoutDbg);

      gsap.to(".bio-energy--teal", {
        x: visProto ? "12%" : "4%",
        y: visProto ? "8%" : "2.5%",
        opacity: glowBase,
        duration: (visProto ? 14 : 46) / speedScale,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".bio-energy--cyan", {
        x: visProto ? "-10%" : "-3%",
        y: visProto ? "-6%" : "-2%",
        opacity: glowCyan,
        duration: (visProto ? 18 : 54) / speedScale,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });

      gsap.to(".bio-energy--gold", {
        x: visProto ? "8%" : "2%",
        y: visProto ? "-7%" : "-2.5%",
        scale: visProto ? 1.12 : 1.04,
        opacity: glowGold,
        duration: (visProto ? 16 : 50) / speedScale,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });

      if (!visProto) {
        gsap.to(".bio-env-mass--a", {
          x: "4%",
          y: "3%",
          opacity: 0.44,
          duration: gsap.utils.random(22, 32),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(".bio-env-mass--b", {
          x: "-3.5%",
          y: "4.5%",
          opacity: 0.39,
          duration: gsap.utils.random(24, 34),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2,
        });

        gsap.to(".bio-env-mass--c", {
          x: "3%",
          y: "-3.5%",
          opacity: 0.35,
          duration: gsap.utils.random(20, 30),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 4,
        });
      }

      if (visProto) {
        gsap.to(".bio-prototype-glow--mass-a", {
          x: "14%",
          y: "10%",
          opacity: 0.95,
          duration: 12,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.to(".bio-prototype-glow--mass-b", {
          x: "-12%",
          y: "-8%",
          opacity: 0.9,
          duration: 15,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.5,
        });
      }

      if (host) {
        const scrubEnv = visProto ? 0.45 : 1;
        const scrubEnergy = visProto ? 0.45 : 0.9;
        const scrubBack = visProto ? 0.55 : 0.95;
        const scrubMid = visProto ? 0.35 : 0.85;
        const scrubFront = visProto ? 0.2 : 0.75;
        const scrollParallax = {
          trigger: host,
          start: "top top",
          end: "bottom bottom",
        } as const;

        gsap.to(".bio-env-glow-field", {
          yPercent: 12 * parallax,
          ease: "none",
          scrollTrigger: { ...scrollParallax, scrub: scrubEnv },
        });

        gsap.to(".bio-energy-field", {
          yPercent: 8 * parallax,
          ease: "none",
          scrollTrigger: { ...scrollParallax, scrub: scrubEnergy },
        });

        if (visProto && document.querySelector(".bio-prototype-glow-field")) {
          gsap.to(".bio-prototype-glow-field", {
            yPercent: 8 * parallax,
            ease: "none",
            scrollTrigger: { ...scrollParallax, scrub: scrubEnergy * 0.9 },
          });
        }

        gsap.to(".bio-particle-layer--back", {
          yPercent: 6 * parallax,
          ease: "none",
          scrollTrigger: { ...scrollParallax, scrub: scrubBack },
        });

        gsap.to(".bio-particle-layer--mid", {
          yPercent: 10 * parallax,
          ease: "none",
          scrollTrigger: { ...scrollParallax, scrub: scrubMid },
        });

        gsap.to(".bio-particle-layer--front", {
          yPercent: 12 * parallax,
          ease: "none",
          scrollTrigger: { ...scrollParallax, scrub: scrubFront },
        });
      }
    }, rootRef);

    requestAnimationFrame(() => {
      logAtmosphereAudit(auditAtmosphereLayers());
    });

    return () => {
      ctx.revert();
      [...backParticles, ...midParticles, ...frontParticles].forEach((p) => p.remove());
    };
  }, [layoutDebug, visibilityPrototype, scrollReady]);

  const rootClass = [
    "bio-atmosphere",
    "bio-particle-system",
    layoutDebug ? "bio-atmosphere--debug" : "",
    visibilityPrototype ? "bio-atmosphere--visibility-prototype" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rootClass}
      ref={rootRef}
      aria-hidden
      data-debug={layoutDebug ? "true" : "false"}
      data-visibility-prototype={visibilityPrototype ? "true" : "false"}
      style={
        layoutDebug
          ? ({ ["--bio-debug-glow" as string]: DEBUG_MULTIPLIERS.glow } as CSSProperties)
          : undefined
      }
    >
      <div className="bio-atmosphere-gradient" />

      <div className="bio-atmosphere-film-stack">
        <div className="bio-atmosphere-depth" />
        <div className="bio-atmosphere-grain" />
        <div className="bio-atmosphere-vignette" />
      </div>

      {visibilityPrototype ? (
        <div className="bio-prototype-glow-field" aria-hidden>
          <div className="bio-prototype-glow bio-prototype-glow--mass-a" />
          <div className="bio-prototype-glow bio-prototype-glow--mass-b" />
        </div>
      ) : (
        <div className="bio-env-glow-field" aria-hidden>
          <div className="bio-env-mass bio-env-mass--a" />
          <div className="bio-env-mass bio-env-mass--b" />
          <div className="bio-env-mass bio-env-mass--c" />
        </div>
      )}

      <div className="bio-energy-field bio-atmosphere-glows">
        <div className="bio-energy bio-energy--teal bio-atmosphere-glow bio-atmosphere-glow--a" />
        <div className="bio-energy bio-energy--cyan bio-atmosphere-glow bio-atmosphere-glow--b" />
        <div className="bio-energy bio-energy--gold bio-atmosphere-glow bio-atmosphere-glow--c" />
      </div>

      <div className="bio-particle-layer bio-particle-layer--back" ref={backRef} />
      <div className="bio-particle-layer bio-particle-layer--mid" ref={midRef} />
      <div className="bio-particle-layer bio-particle-layer--front" ref={frontRef} />

      <svg
        className="bio-molecular-field bio-atmosphere-molecular"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="bio-molecular-cluster bio-molecular-cluster--a bio-atmosphere-molecular-group--a">
          <circle cx="118" cy="142" r="2" />
          <circle cx="198" cy="98" r="1.5" />
          <circle cx="248" cy="168" r="2" />
          <circle cx="168" cy="218" r="1.5" />
          <line x1="118" y1="142" x2="198" y2="98" strokeWidth="0.45" />
          <line x1="198" y1="98" x2="248" y2="168" strokeWidth="0.45" />
          <line x1="248" y1="168" x2="168" y2="218" strokeWidth="0.45" />
          <line x1="168" y1="218" x2="118" y2="142" strokeWidth="0.45" />
        </g>
        <g className="bio-molecular-cluster bio-molecular-cluster--b bio-atmosphere-molecular-group--b">
          <circle cx="1320" cy="720" r="2" />
          <circle cx="1388" cy="668" r="1.5" />
          <circle cx="1348" cy="792" r="1.5" />
          <line x1="1320" y1="720" x2="1388" y2="668" strokeWidth="0.4" />
          <line x1="1388" y1="668" x2="1348" y2="792" strokeWidth="0.4" />
          <line x1="1348" y1="792" x2="1320" y2="720" strokeWidth="0.4" />
        </g>
        <g className="bio-molecular-cluster bio-molecular-cluster--c">
          <circle cx="320" cy="680" r="1.5" />
          <circle cx="368" cy="648" r="1.5" />
          <circle cx="408" cy="692" r="1.5" />
          <circle cx="352" cy="728" r="1.5" />
          <line x1="320" y1="680" x2="368" y2="648" strokeWidth="0.35" />
          <line x1="368" y1="648" x2="408" y2="692" strokeWidth="0.35" />
          <line x1="408" y1="692" x2="352" y2="728" strokeWidth="0.35" />
          <line x1="352" y1="728" x2="320" y2="680" strokeWidth="0.35" />
        </g>
      </svg>
    </div>
  );
}
