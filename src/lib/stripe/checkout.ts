import { getSiteUrl, getStripe } from "./client";

export type CheckoutMode = "payment" | "subscription";

export async function createCheckoutSession({
  priceId,
  mode,
  quantity = 1,
  metadata = {},
}: {
  priceId: string;
  mode: CheckoutMode;
  quantity?: number;
  metadata?: Record<string, string>;
}) {
  const stripe = getStripe();
  const siteUrl = getSiteUrl();

  const session = await stripe.checkout.sessions.create({
    mode,
    payment_method_types: ["card", "paypal"],
    line_items: [{ price: priceId, quantity }],
    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/shop`,
    allow_promotion_codes: true,
    metadata,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL.");
  }

  return { checkoutUrl: session.url };
}
