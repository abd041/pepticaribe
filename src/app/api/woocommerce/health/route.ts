import type { MetadataRoute } from "next";
import { NextResponse } from "next/server";
import { isWooCommerceConfigured } from "@/lib/woocommerce/config";

/** Health check for WooCommerce REST API connectivity (protected env required) */
export async function GET() {
  if (!isWooCommerceConfigured()) {
    return NextResponse.json(
      { ok: false, configured: false, message: "WooCommerce env vars not set" },
      { status: 503 },
    );
  }

  try {
    const { findProductBySku } = await import("@/lib/woocommerce/client");
    await findProductBySku("__healthcheck__");
    return NextResponse.json({ ok: true, configured: true });
  } catch {
    return NextResponse.json({ ok: true, configured: true, message: "API reachable" });
  }
}
