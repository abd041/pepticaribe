import "server-only";

import { getWooCommerceConfig } from "./config";
import type { WooCommerceProduct } from "./types";

export class WooCommerceError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "WooCommerceError";
    this.status = status;
    this.details = details;
  }
}

type WooCommerceFetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  searchParams?: Record<string, string | number | undefined>;
};

export async function wooCommerceFetch<T>(
  path: string,
  { body, searchParams, ...init }: WooCommerceFetchOptions = {},
): Promise<T> {
  const { url, consumerKey, consumerSecret } = getWooCommerceConfig();
  const endpoint = new URL(`/wp-json/wc/v3${path}`, url);

  endpoint.searchParams.set("consumer_key", consumerKey);
  endpoint.searchParams.set("consumer_secret", consumerSecret);

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined) {
        endpoint.searchParams.set(key, String(value));
      }
    }
  }

  const response = await fetch(endpoint.toString(), {
    ...init,
    method: body ? init.method ?? "POST" : init.method ?? "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const raw = await response.text();
  let parsed: unknown = raw;

  if (raw) {
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = raw;
    }
  }

  if (!response.ok) {
    const message =
      typeof parsed === "object" &&
      parsed !== null &&
      "message" in parsed &&
      typeof (parsed as { message: unknown }).message === "string"
        ? (parsed as { message: string }).message
        : `WooCommerce request failed (${response.status})`;

    throw new WooCommerceError(message, response.status, parsed);
  }

  return parsed as T;
}

export async function findProductBySku(sku: string): Promise<WooCommerceProduct | null> {
  const products = await wooCommerceFetch<WooCommerceProduct[]>("/products", {
    searchParams: { sku, per_page: 1, status: "publish" },
  });

  return products[0] ?? null;
}

export async function getProductById(id: number): Promise<WooCommerceProduct> {
  return wooCommerceFetch<WooCommerceProduct>(`/products/${id}`);
}
