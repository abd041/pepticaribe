import "server-only";

import { findProductBySku, WooCommerceError } from "./client";
import type { ResolvedSku, WooCommerceOrderLineItem } from "./types";

export type CartItemInput = {
  sku: string;
  quantity: number;
  displayName?: string;
};

export async function resolveSku(sku: string): Promise<ResolvedSku> {
  const product = await findProductBySku(sku);

  if (!product) {
    throw new WooCommerceError(`No WooCommerce product found for SKU "${sku}"`, 404);
  }

  if (product.type === "variation" && product.parent_id) {
    return {
      sku,
      productId: product.parent_id,
      variationId: product.id,
      name: product.name,
    };
  }

  return {
    sku,
    productId: product.id,
    name: product.name,
  };
}

export async function resolveCartLineItems(
  items: CartItemInput[],
): Promise<WooCommerceOrderLineItem[]> {
  const resolved: WooCommerceOrderLineItem[] = [];

  for (const item of items) {
    if (item.quantity < 1) continue;

    const match = await resolveSku(item.sku);
    resolved.push({
      product_id: match.productId,
      variation_id: match.variationId,
      quantity: item.quantity,
    });
  }

  if (resolved.length === 0) {
    throw new WooCommerceError("Cart has no valid line items", 400);
  }

  return resolved;
}

export async function validateCartSkus(items: CartItemInput[]): Promise<ResolvedSku[]> {
  const results: ResolvedSku[] = [];

  for (const item of items) {
    results.push(await resolveSku(item.sku));
  }

  return results;
}
