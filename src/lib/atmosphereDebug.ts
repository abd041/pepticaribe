/** Dev-only atmosphere diagnostics + visibility prototype toggle */

declare global {
  interface Window {
    DEBUG_ATMOSPHERE?: boolean;
    DEBUG_ATMOSPHERE_VISIBILITY?: boolean;
    enableAtmosphereDebug?: () => void;
    disableAtmosphereDebug?: () => void;
    enableAtmosphereVisibilityPrototype?: () => void;
    disableAtmosphereVisibilityPrototype?: () => void;
    auditAtmosphereLayers?: () => AtmosphereAuditReport;
  }
}

export type AtmosphereAuditReport = {
  debugEnabled: boolean;
  visibilityPrototype: boolean;
  reducedMotion: boolean;
  particleCount: number;
  particlesByLayer: Record<string, number>;
  atmospherePresent: boolean;
  atmosphereZIndex: string | null;
  hostPresent: boolean;
  blockingLayers: string[];
  findings: string[];
};

export const DEBUG_MULTIPLIERS = {
  size: 4,
  opacity: 4,
  glow: 3,
  speed: 3,
} as const;

/** Temporary exaggerated mode — window.DEBUG_ATMOSPHERE_VISIBILITY = true */
export const VISIBILITY_PROTOTYPE = {
  size: 3,
  opacity: 5,
  glow: 5,
  speed: 3,
  parallax: 3.5,
  counts: {
    back: 55,
    mid: 60,
    front: 40,
    backMobile: 28,
    midMobile: 30,
    frontMobile: 22,
  },
} as const;

export function isAtmosphereDebugEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return window.DEBUG_ATMOSPHERE === true;
}

export function isAtmosphereVisibilityPrototype(): boolean {
  if (typeof window === "undefined") return false;
  return window.DEBUG_ATMOSPHERE_VISIBILITY === true;
}

export function enableAtmosphereDebug(): void {
  if (typeof window === "undefined") return;
  window.DEBUG_ATMOSPHERE = true;
  window.dispatchEvent(new Event("atmosphere-debug-change"));
}

export function disableAtmosphereDebug(): void {
  if (typeof window === "undefined") return;
  window.DEBUG_ATMOSPHERE = false;
  window.dispatchEvent(new Event("atmosphere-debug-change"));
}

export function enableAtmosphereVisibilityPrototype(): void {
  if (typeof window === "undefined") return;
  window.DEBUG_ATMOSPHERE_VISIBILITY = true;
  window.dispatchEvent(new Event("atmosphere-visibility-change"));
  console.info(
    "[Atmosphere] VISIBILITY PROTOTYPE ON — exaggerated particles/glow/parallax. Reload if layers did not update.",
  );
}

export function disableAtmosphereVisibilityPrototype(): void {
  if (typeof window === "undefined") return;
  window.DEBUG_ATMOSPHERE_VISIBILITY = false;
  window.dispatchEvent(new Event("atmosphere-visibility-change"));
}

export function auditAtmosphereLayers(): AtmosphereAuditReport {
  const findings: string[] = [];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const visibilityPrototype = isAtmosphereVisibilityPrototype();

  if (reducedMotion && !visibilityPrototype) {
    findings.push(
      "prefers-reduced-motion is active — BiotechAtmosphere skips particle creation unless DEBUG_ATMOSPHERE_VISIBILITY is on.",
    );
  }

  if (visibilityPrototype) {
    findings.push(
      "VISIBILITY PROTOTYPE active — particles/glow/parallax intentionally exaggerated for architecture verification.",
    );
  }

  const atmosphere = document.querySelector<HTMLElement>(".bio-atmosphere");
  const host = document.querySelector<HTMLElement>(".bio-atmosphere-host");
  const particles = document.querySelectorAll<HTMLElement>(".bio-particle");

  const particlesByLayer: Record<string, number> = {
    back: 0,
    mid: 0,
    front: 0,
    unknown: 0,
  };

  particles.forEach((p) => {
    if (p.classList.contains("bio-particle--back")) particlesByLayer.back += 1;
    else if (p.classList.contains("bio-particle--mid")) particlesByLayer.mid += 1;
    else if (p.classList.contains("bio-particle--front")) particlesByLayer.front += 1;
    else particlesByLayer.unknown += 1;
  });

  if (particles.length === 0 && !reducedMotion) {
    findings.push("Zero .bio-particle nodes in DOM — particles are not rendering.");
  } else if (particles.length > 0) {
    findings.push(`${particles.length} particles in DOM.`);
    if (visibilityPrototype && particles.length < 150) {
      findings.push(`Expected 150+ particles in visibility prototype; got ${particles.length}.`);
    }
  }

  const atmosphereZIndex = atmosphere ? getComputedStyle(atmosphere).zIndex : null;

  const blockingLayers: string[] = [];
  const hero = document.querySelector<HTMLElement>(".ref-hero-section");
  if (hero) {
    const bg = getComputedStyle(hero).backgroundColor;
    if (bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
      blockingLayers.push(`Hero section background: ${bg}`);
    }
  }

  document.querySelectorAll<HTMLElement>(".atmosphere-base, .section-identity-value").forEach((el) => {
    const bg = getComputedStyle(el).backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)") {
      blockingLayers.push(`${el.className.split(" ")[0]}: ${bg}`);
    }
  });

  const filmStack = document.querySelector(".bio-atmosphere-film-stack");
  if (filmStack) {
    findings.push("Film stack below particles (z-index 1) — particles should render above depth/grain/vignette.");
  }

  const prototypeGlows = document.querySelectorAll(".bio-prototype-glow").length;
  if (visibilityPrototype && prototypeGlows < 2) {
    findings.push("Visibility prototype glow masses missing from DOM.");
  }

  return {
    debugEnabled: isAtmosphereDebugEnabled(),
    visibilityPrototype,
    reducedMotion,
    particleCount: particles.length,
    particlesByLayer,
    atmospherePresent: Boolean(atmosphere),
    atmosphereZIndex,
    hostPresent: Boolean(host),
    blockingLayers,
    findings,
  };
}

export function logAtmosphereAudit(report: AtmosphereAuditReport): void {
  console.group("[PeptiCaribe Atmosphere Audit]");
  console.table({
    visibilityPrototype: report.visibilityPrototype,
    debugEnabled: report.debugEnabled,
    reducedMotion: report.reducedMotion,
    particleCount: report.particleCount,
  });
  console.log("Particles by layer:", report.particlesByLayer);
  if (report.blockingLayers.length) console.warn("Blocking layers:", report.blockingLayers);
  report.findings.forEach((f) => console.info("•", f));
  console.info("Visibility prototype: window.DEBUG_ATMOSPHERE_VISIBILITY = true; location.reload()");
  console.groupEnd();
}

if (typeof window !== "undefined") {
  window.enableAtmosphereDebug = enableAtmosphereDebug;
  window.disableAtmosphereDebug = disableAtmosphereDebug;
  window.enableAtmosphereVisibilityPrototype = enableAtmosphereVisibilityPrototype;
  window.disableAtmosphereVisibilityPrototype = disableAtmosphereVisibilityPrototype;
  window.auditAtmosphereLayers = auditAtmosphereLayers;
}
