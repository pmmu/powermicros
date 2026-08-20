import Image from "next/image";
import type { ProductView } from "@/lib/products/types";
import { CheckoutButton } from "./CheckoutButton";

const defaultImages: Record<string, string> = {
  "small-weekly-greens": "/farm/microgreens-radish.jpg",
  "medium-weekly-greens": "/farm/microgreens-red-stems.jpg",
  "family-weekly-greens": "/farm/microgreens-sunflower.jpg",
};

function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(priceCents / 100);
}

export function SubscriptionCard({ plan }: { plan: ProductView }) {
  const hasPrice = Boolean(plan.stripePriceId);
  const image = plan.imageUrl || defaultImages[plan.id] || "/farm/microgreens-tray.jpg";
  const isLocalImage = image.startsWith("/");
  const capacityLabel =
    plan.weeklyCapacity !== null ? `${plan.weeklyCapacity} weekly spots available` : "Weekly capacity managed by the farm";

  return (
    <article className="card product-card subscription-card">
      <div className="product-media">
        {isLocalImage ? (
          <Image src={image} alt={plan.name} width={1200} height={900} sizes="(max-width: 800px) 100vw, 33vw" className="product-image" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={plan.name} className="product-image" />
        )}
      </div>
      <div className="product-body">
        <p className="eyebrow">Weekly subscription</p>
        <h3>{plan.name}</h3>
        <p className="product-price">{formatPrice(plan.priceCents)}<span>/week</span></p>
        <p className="product-description">{plan.description}</p>
        <p className="product-note">{capacityLabel}</p>
        <ul className="feature-list">
          {[
            "Pay by the tray each week",
            "Higher tray counts unlock better add-on discounts",
            "First access to limited farm extras",
          ].map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <CheckoutButton itemId={plan.id} mode="subscription" disabled={!hasPrice} disabledLabel="Choose this plan">
          Subscribe with Stripe
        </CheckoutButton>
      </div>
    </article>
  );
}
