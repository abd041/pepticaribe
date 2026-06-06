export type WooCommerceProduct = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  type: "simple" | "variable" | "variation" | "grouped" | "external";
  parent_id?: number;
  price: string;
  regular_price: string;
  status: string;
};

export type WooCommerceOrderLineItem = {
  product_id: number;
  variation_id?: number;
  quantity: number;
};

export type WooCommerceAddress = {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
};

export type WooCommerceOrder = {
  id: number;
  number: string;
  status: string;
  order_key: string;
  currency: string;
  total: string;
  payment_url?: string;
  line_items: Array<{
    id: number;
    name: string;
    product_id: number;
    variation_id: number;
    quantity: number;
    sku: string;
    total: string;
  }>;
  billing: WooCommerceAddress;
  shipping: WooCommerceAddress;
};

export type CreateWooCommerceOrderInput = {
  lineItems: WooCommerceOrderLineItem[];
  billing: WooCommerceAddress;
  shipping?: WooCommerceAddress;
  customerNote?: string;
  paymentMethod?: string;
  paymentMethodTitle?: string;
  metaData?: Array<{ key: string; value: string }>;
};

export type ResolvedSku = {
  sku: string;
  productId: number;
  variationId?: number;
  name?: string;
};
