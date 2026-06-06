import "server-only";

import type { Product, ProductCatalogStats } from "@/types/product";
import { products } from "./data";

export { products };

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getPublicProducts(): Product[] {
  return products.filter((p) => !p.isPrivate);
}

export function getPrivateProducts(): Product[] {
  return products.filter((p) => p.isPrivate);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured && !p.isPrivate);
}

/** All image paths referenced by the catalog */
export function getAllMappedImagePaths(): string[] {
  const paths = new Set<string>();
  for (const p of products) {
    paths.add(p.image);
    for (const v of p.variants) paths.add(v.image);
  }
  return [...paths].sort();
}

/** All video paths referenced by the catalog */
export function getAllMappedVideoPaths(): string[] {
  return products.filter((p) => p.video).map((p) => p.video as string).sort();
}

/** All COA PDF paths referenced by the catalog */
export function getAllMappedCoaPaths(): string[] {
  const paths = new Set<string>();
  for (const p of products) {
    for (const b of p.coaBatches) paths.add(b.pdfUrl);
    for (const v of p.variants) {
      if (v.coaPdf) paths.add(v.coaPdf);
    }
  }
  return [...paths].sort();
}

export function generateCatalogStats(
  availableImages: string[],
  availableVideos: string[],
  availableCoas: string[]
): ProductCatalogStats {
  const mappedImages = getAllMappedImagePaths();
  const mappedVideos = getAllMappedVideoPaths();
  const mappedCoas = getAllMappedCoaPaths();

  const productsMissingImage = products
    .filter((p) => {
      const hasHero = availableImages.includes(p.image.replace("/products/", "/products/"));
      const hasVariants = p.variants.every((v) =>
        availableImages.some((img) => img.endsWith(v.image.split("/").pop() ?? ""))
      );
      return !hasHero || !hasVariants;
    })
    .map((p) => p.slug);

  const productsMissingVideo = products.filter((p) => !p.video).map((p) => p.slug);

  const usedImageFiles = new Set(mappedImages.map((p) => p.split("/").pop()));
  const unmappedImages = availableImages.filter(
    (img) => !usedImageFiles.has(img.split("/").pop() ?? "")
  );

  const usedVideoFiles = new Set(mappedVideos.map((p) => p.split("/").pop()));
  const unmappedVideos = availableVideos.filter(
    (vid) => !usedVideoFiles.has(vid.split("/").pop() ?? "")
  );

  return {
    totalProducts: products.length,
    publicProducts: getPublicProducts().length,
    privateProducts: getPrivateProducts().length,
    totalImagesMapped: mappedImages.length,
    totalVideosMapped: mappedVideos.length,
    productsMissingImage,
    productsMissingVideo,
    productsMissingCoa: products.map((p) => p.slug),
    unmappedImages,
    unmappedVideos,
  };
}
