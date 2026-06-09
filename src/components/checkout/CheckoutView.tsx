"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Lock, ShieldCheck, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { CartSummary } from "@/components/cart/CartSummary";
import { MarketingCanvasBackdrop } from "@/components/ui/MarketingCanvasBackdrop";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { getCheckoutStatus, submitCheckout } from "@/app/actions/checkout";
import type { CheckoutAddress } from "@/types/checkout";
import { formatUsd } from "@/lib/pricing";

const EMPTY_ADDRESS: CheckoutAddress = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postcode: "",
  country: "US",
};

function AddressFields({
  prefix,
  values,
  onChange,
  labels,
}: {
  prefix: string;
  values: CheckoutAddress;
  onChange: (next: CheckoutAddress) => void;
  labels: {
    firstName: string;
    lastName: string;
    company: string;
    companyHint: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
}) {
  const set = (field: keyof CheckoutAddress, value: string) =>
    onChange({ ...values, [field]: value });

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block sm:col-span-1">
        <span className="form-field-label">{labels.firstName} *</span>
        <input
          id={`${prefix}-firstName`}
          name={`${prefix}-firstName`}
          required
          autoComplete="given-name"
          className="checkout-field"
          value={values.firstName}
          onChange={(e) => set("firstName", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="form-field-label">{labels.lastName} *</span>
        <input
          id={`${prefix}-lastName`}
          name={`${prefix}-lastName`}
          required
          autoComplete="family-name"
          className="checkout-field"
          value={values.lastName}
          onChange={(e) => set("lastName", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="form-field-label">{labels.company}</span>
        <input
          id={`${prefix}-company`}
          name={`${prefix}-company`}
          autoComplete="organization"
          className="checkout-field"
          value={values.company ?? ""}
          onChange={(e) => set("company", e.target.value)}
        />
        <span className="form-field-hint mt-1 block">{labels.companyHint}</span>
      </label>
      <label className="block sm:col-span-1">
        <span className="form-field-label">{labels.email} *</span>
        <input
          id={`${prefix}-email`}
          name={`${prefix}-email`}
          type="email"
          required
          autoComplete="email"
          className="checkout-field"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="form-field-label">{labels.phone}</span>
        <input
          id={`${prefix}-phone`}
          name={`${prefix}-phone`}
          type="tel"
          autoComplete="tel"
          className="checkout-field"
          value={values.phone ?? ""}
          onChange={(e) => set("phone", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="form-field-label">{labels.address1} *</span>
        <input
          id={`${prefix}-address1`}
          name={`${prefix}-address1`}
          required
          autoComplete="street-address"
          className="checkout-field"
          value={values.address1}
          onChange={(e) => set("address1", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="form-field-label">{labels.address2}</span>
        <input
          id={`${prefix}-address2`}
          name={`${prefix}-address2`}
          autoComplete="address-line2"
          className="checkout-field"
          value={values.address2 ?? ""}
          onChange={(e) => set("address2", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="form-field-label">{labels.city} *</span>
        <input
          id={`${prefix}-city`}
          name={`${prefix}-city`}
          required
          autoComplete="address-level2"
          className="checkout-field"
          value={values.city}
          onChange={(e) => set("city", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="form-field-label">{labels.state} *</span>
        <input
          id={`${prefix}-state`}
          name={`${prefix}-state`}
          required
          autoComplete="address-level1"
          className="checkout-field"
          value={values.state}
          onChange={(e) => set("state", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="form-field-label">{labels.postcode} *</span>
        <input
          id={`${prefix}-postcode`}
          name={`${prefix}-postcode`}
          required
          autoComplete="postal-code"
          className="checkout-field"
          value={values.postcode}
          onChange={(e) => set("postcode", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="form-field-label">{labels.country} *</span>
        <input
          id={`${prefix}-country`}
          name={`${prefix}-country`}
          required
          autoComplete="country"
          className="checkout-field"
          value={values.country}
          onChange={(e) => set("country", e.target.value.toUpperCase())}
        />
      </label>
    </div>
  );
}

function CheckoutLoading() {
  const { t } = useLanguage();

  return (
    <div className="checkout-loading">
      <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <p className="checkout-eyebrow text-center">{t("checkout.eyebrow")}</p>
        <div className="checkout-layout mt-8">
          <div className="checkout-skeleton-form" />
          <div className="checkout-skeleton-summary" />
        </div>
      </div>
    </div>
  );
}

export function CheckoutView() {
  const router = useRouter();
  const { t } = useLanguage();
  const { items, hydrated, clearCart } = useCart();
  const [billing, setBilling] = useState<CheckoutAddress>(EMPTY_ADDRESS);
  const [shipping, setShipping] = useState<CheckoutAddress>(EMPTY_ADDRESS);
  const [shipDifferent, setShipDifferent] = useState(false);
  const [customerNote, setCustomerNote] = useState("");
  const [ruoAcknowledged, setRuoAcknowledged] = useState(false);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const labels = {
    firstName: t("checkout.firstName"),
    lastName: t("checkout.lastName"),
    company: t("checkout.company"),
    companyHint: t("checkout.companyHint"),
    email: t("checkout.email"),
    phone: t("checkout.phone"),
    address1: t("checkout.address1"),
    address2: t("checkout.address2"),
    city: t("checkout.city"),
    state: t("checkout.state"),
    postcode: t("checkout.postcode"),
    country: t("checkout.country"),
  };

  useEffect(() => {
    void getCheckoutStatus().then((status) => setConfigured(status.configured));
  }, []);

  useEffect(() => {
    if (hydrated && items.length === 0) {
      router.replace("/cart");
    }
  }, [hydrated, items.length, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await submitCheckout({
      items,
      billing,
      shipToDifferentAddress: shipDifferent,
      shipping: shipDifferent ? shipping : undefined,
      customerNote,
      ruoAcknowledged,
    });

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    clearCart();

    sessionStorage.setItem(
      "pepticaribe_last_order",
      JSON.stringify({
        orderNumber: result.orderNumber,
        total: result.total,
        currency: result.currency,
        paymentUrl: result.paymentUrl,
      }),
    );

    const params = new URLSearchParams({
      order: result.orderNumber,
      total: result.total,
      currency: result.currency,
    });

    router.push(`/checkout/success?${params.toString()}`);
  }

  if (!hydrated || items.length === 0) {
    return (
      <div className="checkout-page relative min-h-dvh">
        <MarketingCanvasBackdrop>
          <div className="checkout-page-content">
            <CheckoutLoading />
          </div>
        </MarketingCanvasBackdrop>
      </div>
    );
  }

  return (
    <div className="checkout-page relative min-h-dvh">
      <MarketingCanvasBackdrop>
        <div className="checkout-page-content">
          <section className="checkout-hero relative overflow-hidden">
            <SectionAtmosphere
              variant="products"
              showTopTransition={false}
              showBottomTransition={false}
              className="checkout-hero-atmosphere bg-transparent"
            >
              <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
                <div className="checkout-hero-copy mx-auto max-w-2xl">
                  <p className="checkout-eyebrow">{t("checkout.eyebrow")}</p>
                  <h1 className="font-display type-display-section polish-type-section-title mt-2">
                    <span className="text-[var(--soft-ivory)]">{t("checkout.title")}</span>
                  </h1>
                  <p className="section-caption mx-auto mt-3 max-w-xl text-[14px] leading-relaxed sm:text-[15px]">
                    {t("checkout.description")}
                  </p>
                </div>

                <ul className="checkout-trust" aria-label={t("hero.trustLabel")}>
                  <li>
                    <Lock className="h-3.5 w-3.5" aria-hidden />
                    <span>{t("cart.trustSecure")}</span>
                  </li>
                  <li>
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                    <span>{t("hero.trustIso")}</span>
                  </li>
                  <li>
                    <Truck className="h-3.5 w-3.5" aria-hidden />
                    <span>{t("hero.trustShipping")}</span>
                  </li>
                </ul>
              </div>
            </SectionAtmosphere>
          </section>

          <section className="checkout-main" aria-label={t("checkout.title")}>
            <div className="qa-client-container mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
              <Link href="/cart" className="checkout-back group">
                <ArrowLeft
                  className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                  aria-hidden
                />
                {t("checkout.backToCart")}
              </Link>

              {configured === false ? (
                <div className="checkout-alert" role="status">
                  {t("checkout.notConfigured")}
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="checkout-layout">
                <div className="checkout-form-col">
                  <section className="checkout-section">
                    <h2 className="checkout-section-title">{t("checkout.billingTitle")}</h2>
                    <div className="checkout-section-body">
                      <AddressFields
                        prefix="billing"
                        values={billing}
                        onChange={setBilling}
                        labels={labels}
                      />
                    </div>
                  </section>

                  <section className="checkout-section">
                    <label className="checkout-checkbox-row">
                      <input
                        type="checkbox"
                        checked={shipDifferent}
                        onChange={(e) => setShipDifferent(e.target.checked)}
                      />
                      <span className="checkout-checkbox-label">{t("checkout.shipDifferent")}</span>
                    </label>

                    {shipDifferent ? (
                      <div className="checkout-section-body">
                        <h2 className="checkout-section-title">{t("checkout.shippingTitle")}</h2>
                        <div className="mt-5">
                          <AddressFields
                            prefix="shipping"
                            values={shipping}
                            onChange={setShipping}
                            labels={labels}
                          />
                        </div>
                      </div>
                    ) : null}
                  </section>

                  <section className="checkout-section">
                    <label className="block">
                      <span className="form-field-label">{t("checkout.orderNote")}</span>
                      <textarea
                        rows={3}
                        className="checkout-field"
                        placeholder={t("checkout.orderNotePlaceholder")}
                        value={customerNote}
                        onChange={(e) => setCustomerNote(e.target.value)}
                      />
                    </label>

                    <label className="checkout-ruo-box">
                      <input
                        type="checkbox"
                        required
                        checked={ruoAcknowledged}
                        onChange={(e) => setRuoAcknowledged(e.target.checked)}
                      />
                      <span>{t("checkout.ruoLabel")}</span>
                    </label>
                  </section>

                  {error ? (
                    <p role="alert" className="checkout-error">
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting || configured === false}
                    className="btn-primary checkout-submit"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        {t("checkout.placingOrder")}
                      </>
                    ) : (
                      t("checkout.placeOrder")
                    )}
                  </button>

                  <p className="checkout-payment-note">{t("checkout.paymentRedirectNote")}</p>
                </div>

                <aside className="checkout-summary-col" aria-label={t("checkout.orderSummary")}>
                  <h2 className="checkout-summary-heading">{t("checkout.orderSummary")}</h2>
                  <CartSummary showCheckout={false} showContinueShopping={false} />
                  <ul className="checkout-items-mobile">
                    {items.map((item) => (
                      <li key={item.variantId}>
                        <span>
                          {item.displayName} × {item.quantity}
                        </span>
                        <span>{formatUsd(item.price * item.quantity)}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </form>
            </div>
          </section>
        </div>
      </MarketingCanvasBackdrop>
    </div>
  );
}
