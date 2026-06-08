/**
 * Server-only product catalog — import from here in Server Components, routes, and sitemap.
 * Client components should receive product data via props; use @/lib/pricing for price helpers.
 */
export {
  products,
  getProductBySlug,
  getPublicProducts,
  getCatalogProducts,
  getPrivateProducts,
  getFeaturedProducts,
  getAllMappedImagePaths,
  getAllMappedVideoPaths,
  getAllMappedCoaPaths,
  generateCatalogStats,
} from "./catalog/queries";

export { getProductFromPrice } from "@/lib/pricing";
