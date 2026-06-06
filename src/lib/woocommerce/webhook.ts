import "server-only";

import { createHmac, timingSafeEqual } from "crypto";

export function getWebhookSecret(): string | undefined {
  return process.env.WOOCOMMERCE_WEBHOOK_SECRET;
}

/** Verify WooCommerce HMAC-SHA256 signature (base64) */
export function verifyWooCommerceWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): boolean {
  if (!signatureHeader) return false;

  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest("base64");

  try {
    const a = Buffer.from(expected);
    const b = Buffer.from(signatureHeader);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export type WooCommerceWebhookTopic =
  | "order.created"
  | "order.updated"
  | "order.deleted"
  | "product.updated"
  | string;

export type WooCommerceWebhookPayload = {
  id: number;
  status?: string;
  number?: string;
  total?: string;
  currency?: string;
  [key: string]: unknown;
};
