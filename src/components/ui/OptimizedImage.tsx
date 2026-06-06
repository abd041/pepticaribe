import { getOptimizedAssetPaths } from "@/lib/optimizedAssets";

type OptimizedImageProps = {
  /** Canonical PNG path under /public */
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Native picture element — serves AVIF → WebP → PNG from pre-built assets.
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
}: OptimizedImageProps) {
  const paths = getOptimizedAssetPaths(src);

  return (
    <picture>
      {sizes ? <source srcSet={paths.avif} type="image/avif" sizes={sizes} /> : (
        <source srcSet={paths.avif} type="image/avif" />
      )}
      {sizes ? <source srcSet={paths.webp} type="image/webp" sizes={sizes} /> : (
        <source srcSet={paths.webp} type="image/webp" />
      )}
      <img
        src={paths.png}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        sizes={sizes}
      />
    </picture>
  );
}
