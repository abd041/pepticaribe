import "server-only";

import { wooCommerceFetch } from "./client";
import { getOrderPaymentUrl, getWooCommerceConfig } from "./config";
import type { CreateWooCommerceOrderInput, WooCommerceOrder } from "./types";

export async function createWooCommerceOrder(
  input: CreateWooCommerceOrderInput,
): Promise<WooCommerceOrder & { paymentUrl: string }> {
  const { paymentMethod, paymentMethodTitle } = getWooCommerceConfig();
  const shipping = input.shipping ?? input.billing;

  const order = await wooCommerceFetch<WooCommerceOrder>("/orders", {
    method: "POST",
    body: {
      payment_method: input.paymentMethod ?? paymentMethod,
      payment_method_title: input.paymentMethodTitle ?? paymentMethodTitle,
      set_paid: false,
      status: "pending",
      billing: input.billing,
      shipping,
      line_items: input.lineItems,
      customer_note: input.customerNote,
      meta_data: input.metaData ?? [],
    },
  });

  return {
    ...order,
    paymentUrl: getOrderPaymentUrl(order.id, order.order_key),
  };
}

export async function getWooCommerceOrder(orderId: number): Promise<WooCommerceOrder> {
  return wooCommerceFetch<WooCommerceOrder>(`/orders/${orderId}`);
}
