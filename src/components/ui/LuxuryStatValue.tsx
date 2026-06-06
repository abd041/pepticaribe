"use client";

type LuxuryStatValueProps = {
  value: string;
  className?: string;
};

/** Animates numeric prefix on scroll; final rendered text matches `value` exactly. */
export function LuxuryStatValue({ value, className = "" }: LuxuryStatValueProps) {
  const match = value.match(/^(\d+)(.*)$/);

  if (!match) {
    return <span className={className}>{value}</span>;
  }

  const [, numeric, suffix] = match;

  return (
    <span
      className={`lux-stat-counter lux-stat-value ${className}`}
      data-end={numeric}
      data-suffix={suffix}
      aria-label={value}
    >
      <span className="lux-stat-counter-num">0</span>
      <span className="lux-stat-counter-suffix">{suffix}</span>
    </span>
  );
}
