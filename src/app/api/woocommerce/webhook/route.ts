import { NextResponse } from "next/server";
import {
  getWebhookSecret,
  verifyWooCommerceWebhookSignature,
  type WooCommerceWebhookPayload,
} from "@/lib/woocommerce/webhook";

/**
 * WooCommerce webhook receiver.
 * Configure in WP: WooCommerce → Settings → Advanced → Webhooks
 * Delivery URL: https://your-site.com/api/woocommerce/webhook
 * Secret: WOOCOMMERCE_WEBHOOK_SECRET
 */
export async function POST(request: Request) {
  const secret = getWebhookSecret();
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Webhook secret not configured" }, { status: 503 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-wc-webhook-signature");
  const topic = request.headers.get("x-wc-webhook-topic") ?? "unknown";
  const deliveryId = request.headers.get("x-wc-webhook-delivery-id") ?? "unknown";

  if (!verifyWooCommerceWebhookSignature(rawBody, signature, secret)) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
  }

  let payload: WooCommerceWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WooCommerceWebhookPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  console.info("[woocommerce:webhook]", {
    topic,
    deliveryId,
    id: payload.id,
    status: payload.status,
    number: payload.number,
  });

  switch (topic) {
    case "order.created":
    case "order.updated":
      break;
    case "product.updated":
      break;
    default:
      break;
  }

  return NextResponse.json({ ok: true, topic, deliveryId });
}
