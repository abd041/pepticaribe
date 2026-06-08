"use client";

interface ProductVideoProps {
  src: string;
  poster?: string;
  className?: string;
  ariaLabel?: string;
  onError?: () => void;
}

export function ProductVideo({
  src,
  poster,
  className = "",
  ariaLabel = "Product video",
  onError,
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
      preload="auto"
      aria-label={ariaLabel}
      onError={onError}
    />
  );
}
