export type CartLine = {
  productId: string;
  variantId: string;
  sku: string;
  slug: string;
  displayName: string;
  sizeLabel: string;
  price: number;
  quantity: number;
  image: string;
};

export type CartState = {
  items: CartLine[];
  updatedAt: string;
};
