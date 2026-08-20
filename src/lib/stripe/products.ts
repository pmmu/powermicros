import type { ProductView } from "@/lib/products/types";
import { getStripe } from "./client";

export async function syncStripeProduct(product: ProductView) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return {
      stripeProductId: product.stripeProductId,
      stripePriceId: product.stripePriceId,
      stripePriceAmountCents: product.stripePriceAmountCents,
    };
  }

  const stripe = getStripe();
  const stripeProductId =
    product.stripeProductId ??
    (
      await stripe.products.create({
        name: product.name,
        description: product.description,
        active: product.isAvailable,
        images: product.imageUrl ? [product.imageUrl] : undefined,
        metadata: { productId: product.id, source: "powermicros" },
      })
    ).id;

  if (product.stripeProductId) {
    await stripe.products.update(stripeProductId, {
      name: product.name,
      description: product.description,
      active: product.isAvailable,
      images: product.imageUrl ? [product.imageUrl] : [],
    });
  }

  if (product.stripePriceId && product.stripePriceAmountCents === product.priceCents) {
    return {
      stripeProductId,
      stripePriceId: product.stripePriceId,
      stripePriceAmountCents: product.stripePriceAmountCents,
    };
  }

  if (product.stripePriceId) {
    await stripe.prices.update(product.stripePriceId, { active: false });
  }

  const price = await stripe.prices.create({
    product: stripeProductId,
    currency: "usd",
    unit_amount: product.priceCents,
    recurring: product.kind === "SUBSCRIPTION" ? { interval: "week" } : undefined,
    metadata: { productId: product.id, source: "powermicros" },
  });

  return {
    stripeProductId,
    stripePriceId: price.id,
    stripePriceAmountCents: product.priceCents,
  };
}
