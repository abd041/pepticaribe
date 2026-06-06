import { AssetDiagnostics } from "@/components/debug/AssetDiagnostics";
import { products } from "@/data/products";

export const metadata = {
  title: "Asset Diagnostics | PeptiCaribe",
  robots: "noindex, nofollow",
};

export default function DebugAssetsPage() {
  return <AssetDiagnostics catalog={products} />;
}
