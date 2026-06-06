type SectionTransitionVariant = "ocean" | "gold" | "neutral";

type SectionTransitionProps = {
  variant?: SectionTransitionVariant;
  className?: string;
};

/** Ambient divider glow between homepage sections — depth without layout change */
export function SectionTransition({
  variant = "neutral",
  className = "",
}: SectionTransitionProps) {
  return (
    <div
      className={`lux-section-transition lux-section-transition--${variant} ${className}`}
      aria-hidden
    >
      <div className="lux-section-transition-radial" />
      <div className="lux-section-transition-glow" />
      <div className="lux-section-transition-line" />
    </div>
  );
}
