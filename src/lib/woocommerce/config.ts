import "server-only";

export type WooCommerceConfig = {
  url: string;
  consumerKey: string;
  consumerSecret: string;
  paymentMethod: string;
  paymentMethodTitle: string;
};

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

export function isWooCommerceConfigured(): boolean {
  return Boolean(
    process.env.WOOCOMMERCE_URL &&
      process.env.WOOCOMMERCE_CONSUMER_KEY &&
      process.env.WOOCOMMERCE_CONSUMER_SECRET,
  );
}

export function getWooCommerceConfig(): WooCommerceConfig {
  const url = process.env.WOOCOMMERCE_URL;
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!url || !consumerKey || !consumerSecret) {
    throw new Error(
      "WooCommerce is not configured. Set WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY, and WOOCOMMERCE_CONSUMER_SECRET.",
    );
  }

  return {
    url: trimTrailingSlash(url),
    consumerKey,
    consumerSecret,
    paymentMethod: process.env.WOOCOMMERCE_PAYMENT_METHOD ?? "bacs",
    paymentMethodTitle: process.env.WOOCOMMERCE_PAYMENT_METHOD_TITLE ?? "Direct Bank Transfer",
  };
}

export function getOrderPaymentUrl(orderId: number, orderKey: string): string {
  const { url } = getWooCommerceConfig();
  const params = new URLSearchParams({
    pay_for_order: "true",
    key: orderKey,
  });
  return `${url}/checkout/order-pay/${orderId}/?${params.toString()}`;
}
