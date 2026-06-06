/** Subtle DNA / wave decorative elements aligned with PeptiCaribe logo language */

export function DnaHelixAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 0 Q20 15 10 30 Q0 45 10 60 Q20 75 10 90 Q0 105 10 120"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.5"
      />
      <path
        d="M30 0 Q20 15 30 30 Q40 45 30 60 Q20 75 30 90 Q40 105 30 120"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.5"
      />
      {[15, 30, 45, 60, 75, 90, 105].map((y) => (
        <line
          key={y}
          x1={10 + Math.sin(y * 0.1) * 8}
          y1={y}
          x2={30 - Math.sin(y * 0.1) * 8}
          y2={y}
          stroke="currentColor"
          strokeWidth="0.4"
          opacity="0.3"
        />
      ))}
    </svg>
  );
}

export function WaveCurveAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="none"
    >
      <path
        d="M0 28 C30 8, 60 38, 100 22 C140 6, 170 34, 200 18"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.4"
      />
      <path
        d="M0 32 C35 14, 65 36, 100 26 C135 16, 165 36, 200 24"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.2"
      />
    </svg>
  );
}

/** Horizontal section divider — DNA center + wave flanks */
export function BrandSectionDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden
    >
      <WaveCurveAccent className="h-3 w-16 text-teal-500/30" />
      <DnaHelixAccent className="h-8 w-3 text-teal-400/25" />
      <span className="h-1 w-1 rounded-full bg-gold-400/40" />
      <DnaHelixAccent className="h-8 w-3 text-teal-400/25" />
      <WaveCurveAccent className="h-3 w-16 scale-x-[-1] text-teal-500/30" />
    </div>
  );
}

/** Disabled — particle fields removed for minimalist UI */
export function LabParticles(_props?: { count?: number }) {
  return null;
}

/** Disabled — bioluminescent particles removed for minimalist UI */
export function BioluminescentParticles(_props?: { count?: number }) {
  return null;
}

/** Full-width organic wave pattern layer */
export function OceanWaveLayer({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: string;
}) {
  return (
    <div
      className={`ocean-wave-layer pointer-events-none absolute inset-0 ${className}`}
      data-variant={variant}
      aria-hidden
    >
      <svg
        className="ocean-wave-svg ocean-wave-drift absolute bottom-[8%] left-0 w-[200%] text-[var(--ocean-blue)]"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60 C180 20, 360 90, 540 55 C720 20, 900 85, 1080 50 C1260 15, 1350 70, 1440 45 L1440 120 L0 120 Z"
          fill="currentColor"
          opacity="0.04"
        />
        <path
          d="M0 75 C200 40, 400 95, 600 65 C800 35, 1000 90, 1200 58 C1320 38, 1380 72, 1440 55"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.06"
        />
      </svg>
      <svg
        className="ocean-wave-svg ocean-wave-drift-reverse absolute top-[12%] left-[-20%] w-[180%] text-[var(--luxury-gold)]"
        viewBox="0 0 1440 80"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40 C240 10, 480 55, 720 28 C960 1, 1200 48, 1440 22"
          stroke="currentColor"
          strokeWidth="0.75"
          opacity="0.05"
        />
      </svg>
    </div>
  );
}

/** Signature PeptiCaribe — organic Caribbean current light flows (CSS-only) */
export function CaribeCurrentLayer({
  variant = "default",
  className = "",
}: {
  variant?: string;
  className?: string;
}) {
  return (
    <div
      className={`caribe-current-layer caribe-current-${variant} pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="caribe-flow caribe-flow-primary" />
      <div className="caribe-flow caribe-flow-secondary" />
      <div className="caribe-flow caribe-flow-depth" />
    </div>
  );
}

/** Directional cinematic lighting — per-section art direction */
export function ArtDirectionLight({ variant }: { variant: string }) {
  return (
    <div
      className={`art-direction-light art-light-${variant} pointer-events-none absolute inset-0`}
      aria-hidden
    />
  );
}

/** Premium section transition — connects stacked blocks into one experience */
export function SectionBridge({ className = "" }: { className?: string }) {
  return (
    <div className={`section-bridge mx-auto max-w-4xl ${className}`} aria-hidden />
  );
}

/** Ambient background layer — DNA helixes + wave curves, no layout impact */
export function BrandAtmosphere({
  dnaPositions = [
    { className: "left-[4%] top-[15%] h-28 w-7 opacity-[0.04]", delay: 0 },
    { className: "right-[6%] bottom-[20%] h-24 w-6 opacity-[0.035]", delay: 2 },
  ],
  showWaves = true,
}: {
  dnaPositions?: { className: string; delay?: number }[];
  showWaves?: boolean;
}) {
  return (
    <>
      {dnaPositions.map((pos, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute text-teal-400 ${pos.className}`}
          style={{ animationDelay: `${pos.delay ?? 0}s` }}
        >
          <DnaHelixAccent className="brand-dna-drift h-full w-full" />
        </div>
      ))}
      {showWaves && (
        <>
          <WaveCurveAccent className="pointer-events-none absolute bottom-[12%] left-[8%] h-6 w-32 text-teal-500/20" />
          <WaveCurveAccent className="pointer-events-none absolute right-[10%] top-[20%] h-5 w-28 scale-x-[-1] text-gold-400/15" />
        </>
      )}
    </>
  );
}
