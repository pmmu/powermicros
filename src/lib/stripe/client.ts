import Stripe from "stripe";

const missingConfigMessage = "Missing Stripe configuration. Set STRIPE_SECRET_KEY and NEXT_PUBLIC_SITE_URL.";

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(missingConfigMessage);
  }

  return new Stripe(secretKey, {
    apiVersion: "2026-07-29.dahlia",
  });
}

export function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    throw new Error(missingConfigMessage);
  }
  return siteUrl.replace(/\/$/, "");
}
