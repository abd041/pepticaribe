import type { CartLine } from "@/types/cart";

export type CheckoutAddress = {
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
};

export type CheckoutInput = {
  items: CartLine[];
  billing: CheckoutAddress;
  shipToDifferentAddress: boolean;
  shipping?: CheckoutAddress;
  customerNote?: string;
  ruoAcknowledged: boolean;
};

export type CheckoutSuccess = {
  ok: true;
  orderId: number;
  orderNumber: string;
  paymentUrl: string;
  total: string;
  currency: string;
};

export type CheckoutFailure = {
  ok: false;
  error: string;
  fieldErrors?: Partial<Record<keyof CheckoutAddress | "ruo" | "items", string>>;
};

export type CheckoutResult = CheckoutSuccess | CheckoutFailure;

export type CheckoutStatus = {
  configured: boolean;
};
