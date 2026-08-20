"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { SERVICE_AREA_COPY, SERVICE_AREA_LABEL } from "@/lib/serviceArea";

type CheckoutButtonProps = {
  itemId: string;
  mode: "payment" | "subscription";
  quantity?: number;
  disabled?: boolean;
  disabledLabel?: string;
  children: React.ReactNode;
};

export function CheckoutButton({
  itemId,
  mode,
  quantity = 1,
  disabled = false,
  disabledLabel = "Checkout coming soon",
  children,
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingArea, setIsCheckingArea] = useState(false);
  const [fulfillmentLocation, setFulfillmentLocation] = useState("");
  const [serviceAreaConfirmed, setServiceAreaConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (disabled) {
    return (
      <button className="btn btn-disabled w-full" type="button" disabled>
        {disabledLabel}
      </button>
    );
  }

  async function startCheckout(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (!isCheckingArea) {
      setError(null);
      setIsCheckingArea(true);
      return;
    }

    const location = fulfillmentLocation.trim();
    if (location.length < 3) {
      setError("Enter your town, ZIP code, or delivery address before checkout.");
      return;
    }

    if (!serviceAreaConfirmed) {
      setError(`Confirm your pickup or delivery location is ${SERVICE_AREA_LABEL}.`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId,
          mode,
          quantity,
          fulfillmentLocation: location,
          serviceAreaConfirmed,
        }),
      });

      const data = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error || "Unable to start checkout. Please try again.");
      }

      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start checkout.");
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-2">
      {isCheckingArea ? (
        <form className="checkout-local-gate" onSubmit={startCheckout}>
          <p>{SERVICE_AREA_COPY}</p>
          <label>
            <span>Pickup or delivery town/address</span>
            <input
              value={fulfillmentLocation}
              onChange={(event) => setFulfillmentLocation(event.target.value)}
              placeholder="Town, ZIP code, or delivery address"
              autoComplete="street-address"
            />
          </label>
          <label className="checkout-local-confirm">
            <input
              type="checkbox"
              checked={serviceAreaConfirmed}
              onChange={(event) => setServiceAreaConfirmed(event.target.checked)}
            />
            <span>I confirm this order is {SERVICE_AREA_LABEL}.</span>
          </label>
          <button className="btn btn-primary w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Starting checkout…" : "Continue to checkout"}
          </button>
        </form>
      ) : (
        <button className="btn btn-primary w-full" type="button" onClick={() => void startCheckout()} disabled={isLoading}>
          {isLoading ? "Starting checkout…" : children}
        </button>
      )}
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
