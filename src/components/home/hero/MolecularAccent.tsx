/** Subtle gold molecular structure — decorative laboratory motif for the hero product side */
export function MolecularAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round">
        {/* Fused hexagonal rings */}
        <polygon points="98,86 85,108 59,108 46,86 59,64 85,64" />
        <polygon points="150,70 137,92 111,92 98,70 111,48 137,48" />

        {/* Inter-ring + pendant bonds */}
        <line x1="98" y1="86" x2="111" y2="92" />
        <line x1="59" y1="64" x2="40" y2="52" />
        <line x1="46" y1="86" x2="28" y2="96" />
        <line x1="150" y1="70" x2="170" y2="60" />
        <line x1="137" y1="48" x2="150" y2="30" />
        <line x1="111" y1="92" x2="118" y2="114" />
      </g>

      {/* Atom nodes */}
      <g fill="currentColor">
        {[
          [98, 86],
          [85, 108],
          [59, 108],
          [46, 86],
          [59, 64],
          [85, 64],
          [150, 70],
          [137, 92],
          [111, 92],
          [111, 48],
          [137, 48],
          [40, 52],
          [28, 96],
          [170, 60],
          [150, 30],
          [118, 114],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.1" />
        ))}
      </g>
    </svg>
  );
}
