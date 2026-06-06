"use server";

import { isWooCommerceConfigured } from "@/lib/woocommerce/config";
import { resolveCartLineItems } from "@/lib/woocommerce/catalog";
import { createWooCommerceOrder } from "@/lib/woocommerce/orders";
import { WooCommerceError } from "@/lib/woocommerce/client";
import type {
  CheckoutInput,
  CheckoutResult,
  CheckoutStatus,
} from "@/types/checkout";

function trim(value: string | undefined): string {
  return value?.trim() ?? "";
}

function validateCheckout(input: CheckoutInput): string | null {
  if (!input.items.length) return "Your cart is empty.";
  if (!input.ruoAcknowledged) return "You must confirm Research Use Only eligibility.";

  const required: Array<keyof CheckoutInput["billing"]> = [
    "firstName",
    "lastName",
    "email",
    "address1",
    "city",
    "state",
    "postcode",
    "country",
  ];

  for (const field of required) {
    if (!trim(input.billing[field])) {
      return "Please complete all required billing fields.";
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.billing.email)) {
    return "Please enter a valid email address.";
  }

  if (input.shipToDifferentAddress && input.shipping) {
    for (const field of ["firstName", "lastName", "address1", "city", "state", "postcode", "country"] as const) {
      if (!trim(input.shipping[field])) {
        return "Please complete all required shipping fields.";
      }
    }
  }

  return null;
}

function toWooAddress(address: CheckoutInput["billing"]) {
  return {
    first_name: trim(address.firstName),
    last_name: trim(address.lastName),
    company: trim(address.company) || undefined,
    address_1: trim(address.address1),
    address_2: trim(address.address2) || undefined,
    city: trim(address.city),
    state: trim(address.state),
    postcode: trim(address.postcode),
    country: trim(address.country).toUpperCase(),
    email: trim(address.email),
    phone: trim(address.phone) || undefined,
  };
}

export async function getCheckoutStatus(): Promise<CheckoutStatus> {
  return { configured: isWooCommerceConfigured() };
}

export async function submitCheckout(input: CheckoutInput): Promise<CheckoutResult> {
  const validationError = validateCheckout(input);
  if (validationError) {
    return { ok: false, error: validationError };
  }

  if (!isWooCommerceConfigured()) {
    return {
      ok: false,
      error:
        "Checkout is temporarily unavailable. WooCommerce credentials are not configured on this environment.",
    };
  }

  try {
    const lineItems = await resolveCartLineItems(
      input.items.map((item) => ({
        sku: item.sku,
        quantity: item.quantity,
        displayName: item.displayName,
      })),
    );

    const billing = toWooAddress(input.billing);
    const shipping = input.shipToDifferentAddress && input.shipping
      ? toWooAddress({ ...input.shipping, email: input.billing.email })
      : billing;

    const order = await createWooCommerceOrder({
      lineItems,
      billing,
      shipping,
      customerNote: trim(input.customerNote) || undefined,
      metaData: [
        { key: "_headless_checkout", value: "pepticaribe-next" },
        { key: "_ruo_acknowledged", value: input.ruoAcknowledged ? "yes" : "no" },
        { key: "_research_institution", value: trim(input.billing.company) || "" },
      ],
    });

    return {
      ok: true,
      orderId: order.id,
      orderNumber: order.number,
      paymentUrl: order.paymentUrl,
      total: order.total,
      currency: order.currency,
    };
  } catch (error) {
    if (error instanceof WooCommerceError) {
      return {
        ok: false,
        error: error.message,
      };
    }

    console.error("[checkout]", error);
    return {
      ok: false,
      error: "Unable to place your order. Please try again or contact support.",
    };
  }
}
