"use client";

interface ProductVideoProps {
  src: string;
  poster?: string;
  className?: string;
  ariaLabel?: string;
}

export function ProductVideo({
  src,
  poster,
  className = "",
  ariaLabel = "Product video",
}: ProductVideoProps) {
  return (
    <video
      src={src}
      poster={poster}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={ariaLabel}
    />
  );
}
