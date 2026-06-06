/**
 * Resolve pre-generated WebP/AVIF siblings for PNG paths in /public.
 * Run `npm run assets:build` after adding or replacing PNG sources.
 */
export type OptimizedAssetPaths = {
  /** Original PNG — fallback */
  png: string;
  webp: string;
  avif: string;
};

export function getOptimizedAssetPaths(pngPath: string): OptimizedAssetPaths {
  const normalized = pngPath.startsWith("/") ? pngPath : `/${pngPath}`;
  const base = normalized.replace(/\.(png|jpe?g)$/i, "");

  return {
    png: `${base}.png`,
    webp: `${base}.webp`,
    avif: `${base}.avif`,
  };
}

/** Primary src for next/image — prefers WebP when generated */
export function getPreferredImageSrc(pngPath: string): string {
  return getOptimizedAssetPaths(pngPath).webp;
}
