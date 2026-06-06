"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { CartSummary } from "@/components/cart/CartSummary";
import { getCheckoutStatus, submitCheckout } from "@/app/actions/checkout";
import type { CheckoutAddress } from "@/types/checkout";

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

  const fieldClass =
    "mt-1.5 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-[var(--soft-ivory)] outline-none transition-colors focus:border-[var(--ocean-blue)]/50";

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block sm:col-span-1">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--soft-ivory)]/55">
          {labels.firstName} *
        </span>
        <input
          id={`${prefix}-firstName`}
          name={`${prefix}-firstName`}
          required
          autoComplete="given-name"
          className={fieldClass}
          value={values.firstName}
          onChange={(e) => set("firstName", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--soft-ivory)]/55">
          {labels.lastName} *
        </span>
        <input
          id={`${prefix}-lastName`}
          name={`${prefix}-lastName`}
          required
          autoComplete="family-name"
          className={fieldClass}
          value={values.lastName}
          onChange={(e) => set("lastName", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--soft-ivory)]/55">
          {labels.company}
        </span>
        <input
          id={`${prefix}-company`}
          name={`${prefix}-company`}
          autoComplete="organization"
          className={fieldClass}
          value={values.company ?? ""}
          onChange={(e) => set("company", e.target.value)}
        />
        <span className="mt-1 block text-[11px] text-[var(--soft-ivory)]/35">{labels.companyHint}</span>
      </label>
      <label className="block sm:col-span-1">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--soft-ivory)]/55">
          {labels.email} *
        </span>
        <input
          id={`${prefix}-email`}
          name={`${prefix}-email`}
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--soft-ivory)]/55">
          {labels.phone}
        </span>
        <input
          id={`${prefix}-phone`}
          name={`${prefix}-phone`}
          type="tel"
          autoComplete="tel"
          className={fieldClass}
          value={values.phone ?? ""}
          onChange={(e) => set("phone", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--soft-ivory)]/55">
          {labels.address1} *
        </span>
        <input
          id={`${prefix}-address1`}
          name={`${prefix}-address1`}
          required
          autoComplete="street-address"
          className={fieldClass}
          value={values.address1}
          onChange={(e) => set("address1", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--soft-ivory)]/55">
          {labels.address2}
        </span>
        <input
          id={`${prefix}-address2`}
          name={`${prefix}-address2`}
          autoComplete="address-line2"
          className={fieldClass}
          value={values.address2 ?? ""}
          onChange={(e) => set("address2", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--soft-ivory)]/55">
          {labels.city} *
        </span>
        <input
          id={`${prefix}-city`}
          name={`${prefix}-city`}
          required
          autoComplete="address-level2"
          className={fieldClass}
          value={values.city}
          onChange={(e) => set("city", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--soft-ivory)]/55">
          {labels.state} *
        </span>
        <input
          id={`${prefix}-state`}
          name={`${prefix}-state`}
          required
          autoComplete="address-level1"
          className={fieldClass}
          value={values.state}
          onChange={(e) => set("state", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--soft-ivory)]/55">
          {labels.postcode} *
        </span>
        <input
          id={`${prefix}-postcode`}
          name={`${prefix}-postcode`}
          required
          autoComplete="postal-code"
          className={fieldClass}
          value={values.postcode}
          onChange={(e) => set("postcode", e.target.value)}
        />
      </label>
      <label className="block sm:col-span-1">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--soft-ivory)]/55">
          {labels.country} *
        </span>
        <input
          id={`${prefix}-country`}
          name={`${prefix}-country`}
          required
          autoComplete="country"
          className={fieldClass}
          value={values.country}
          onChange={(e) => set("country", e.target.value.toUpperCase())}
        />
      </label>
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
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm text-[var(--soft-ivory)]/50">{t("cart.updating")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Link
        href="/cart"
        className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--soft-ivory)]/55 transition-colors hover:text-[var(--ocean-blue)]"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
        {t("checkout.backToCart")}
      </Link>

      <p className="premium-eyebrow-gold font-display mt-8">{t("nav.cart")}</p>
      <h1 className="font-display mt-3 text-3xl font-bold text-[var(--soft-ivory)] sm:text-4xl">
        {t("checkout.title")}
      </h1>
      <p className="section-caption mt-4 max-w-2xl">{t("checkout.description")}</p>

      {configured === false ? (
        <div className="mt-8 rounded-xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100/90">
          {t("checkout.notConfigured")}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
        <div className="space-y-8">
          <section className="glass-card rounded-xl p-6">
            <h2 className="font-display text-lg font-bold text-[var(--soft-ivory)]">
              {t("checkout.billingTitle")}
            </h2>
            <div className="mt-5">
              <AddressFields prefix="billing" values={billing} onChange={setBilling} labels={labels} />
            </div>
          </section>

          <section className="glass-card rounded-xl p-6">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={shipDifferent}
                onChange={(e) => setShipDifferent(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent accent-[var(--ocean-blue)]"
              />
              <span className="text-sm font-medium text-[var(--soft-ivory)]/80">
                {t("checkout.shipDifferent")}
              </span>
            </label>

            {shipDifferent ? (
              <div className="mt-5">
                <h2 className="font-display text-lg font-bold text-[var(--soft-ivory)]">
                  {t("checkout.shippingTitle")}
                </h2>
                <div className="mt-5">
                  <AddressFields prefix="shipping" values={shipping} onChange={setShipping} labels={labels} />
                </div>
              </div>
            ) : null}
          </section>

          <section className="glass-card rounded-xl p-6">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--soft-ivory)]/55">
                {t("checkout.orderNote")}
              </span>
              <textarea
                rows={3}
                className="mt-1.5 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-sm text-[var(--soft-ivory)] outline-none focus:border-[var(--ocean-blue)]/50"
                placeholder={t("checkout.orderNotePlaceholder")}
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
              />
            </label>

            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-lg border border-white/[0.08] bg-white/[0.02] p-4">
              <input
                type="checkbox"
                required
                checked={ruoAcknowledged}
                onChange={(e) => setRuoAcknowledged(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-transparent accent-[var(--ocean-blue)]"
              />
              <span className="text-sm leading-relaxed text-[var(--soft-ivory)]/75">
                {t("checkout.ruoLabel")}
              </span>
            </label>
          </section>

          {error ? (
            <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting || configured === false}
            className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.08em] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
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

          <p className="text-xs text-[var(--soft-ivory)]/40">{t("checkout.paymentRedirectNote")}</p>
        </div>

        <div>
          <h2 className="mb-4 font-display text-lg font-bold text-[var(--soft-ivory)] lg:hidden">
            {t("checkout.orderSummary")}
          </h2>
          <CartSummary showCheckout={false} />
          <ul className="mt-4 space-y-2 lg:hidden">
            {items.map((item) => (
              <li key={item.variantId} className="flex justify-between text-sm text-[var(--soft-ivory)]/65">
                <span>
                  {item.displayName} × {item.quantity}
                </span>
                <span className="font-display">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}
