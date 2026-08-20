import Image from "next/image";
import type { ProductView } from "@/lib/products/types";
import { CheckoutButton } from "./CheckoutButton";

const defaultImages: Record<string, string> = {
  "microgreens-sampler": "/farm/microgreens-tray.jpg",
  "blackberries": "/farm/farm-blackberries-close.png",
  "fresh-lavender-bundle": "/farm/farm-lavender-bundle.png",
  "tomatoes": "/farm/farm-tomato-vine.png",
  "kale": "/farm/farm-kale-ground.png",
  "basil": "/farm/farm-field-family.jpg",
  "farm-eggs": "/farm/farm-eggs-basket.png",
  "sugar-cane": "/farm/farm-sugar-cane-pine-straw.png",
  "muscadines": "/farm/farm-muscadines-vine.png",
};

function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(priceCents / 100);
}

function getImage(product: ProductView) {
  return product.imageUrl || defaultImages[product.id] || "/farm/microgreens-tray.jpg";
}

function getPriceLabel(product: ProductView) {
  if (product.priceCents > 0) return formatPrice(product.priceCents);
  return "Seasonal";
}

function getAvailabilityLabel(product: ProductView) {
  if (product.stockQuantity !== null) return `${product.stockQuantity} available now`;
  if (product.weeklyCapacity !== null) return `${product.weeklyCapacity} spots per week`;
  return "Available by farm schedule";
}

export function ProductCard({ product }: { product: ProductView }) {
  const hasPrice = Boolean(product.stripePriceId);
  const image = getImage(product);
  const isLocalImage = image.startsWith("/");

  return (
    <article className="card product-card">
      <div className="product-media">
        {isLocalImage ? (
          <Image src={image} alt={product.name} width={1200} height={900} sizes="(max-width: 800px) 100vw, 33vw" className="product-image" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={product.name} className="product-image" />
        )}
      </div>
      <div className="product-body">
        <p className="eyebrow">{product.fulfillmentMode.replace("_", " ").toLowerCase()}</p>
        <h3>{product.name}</h3>
        <p className="product-price">{getPriceLabel(product)}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-note">
          {product.cutoffNote} Lead time: {product.leadTimeDays} day{product.leadTimeDays === 1 ? "" : "s"}.
        </p>
        <p className="product-note">{getAvailabilityLabel(product)}</p>
        <CheckoutButton itemId={product.id} mode="payment" disabled={!hasPrice} disabledLabel={product.priceCents > 0 ? "Checkout coming soon" : "Add when available"}>
          Buy with Stripe
        </CheckoutButton>
      </div>
    </article>
  );
}
