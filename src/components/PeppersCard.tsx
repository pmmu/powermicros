"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { pepperVarieties } from "@/lib/pepperVarieties";
import type { ProductView } from "@/lib/products/types";
import { CheckoutButton } from "./CheckoutButton";

export function PeppersCard({ product }: { product: ProductView }) {
  const [selectedVarietyId, setSelectedVarietyId] = useState(pepperVarieties[0]?.id ?? "");
  const selectedVariety = useMemo(
    () => pepperVarieties.find((variety) => variety.id === selectedVarietyId) ?? pepperVarieties[0],
    [selectedVarietyId],
  );
  const hasPrice = Boolean(product.stripePriceId);

  return (
    <article className="card product-card peppers-card">
      <div className="product-media">
        <Image
          src={selectedVariety.image}
          alt={`${selectedVariety.name} from the farm`}
          width={1200}
          height={900}
          sizes="(max-width: 800px) 100vw, 33vw"
          className="product-image"
        />
      </div>
      <div className="product-body">
        <p className="eyebrow">seasonal add-on</p>
        <h3>{product.name}</h3>
        <p className="product-price">Seasonal</p>
        <p className="product-description">{product.description}</p>
        <label className="tray-selector">
          <span>Choose a pepper</span>
          <select value={selectedVarietyId} onChange={(event) => setSelectedVarietyId(event.target.value)}>
            {pepperVarieties.map((variety) => (
              <option value={variety.id} key={variety.id}>
                {variety.name} - {variety.heatLabel}
              </option>
            ))}
          </select>
        </label>
        <p className="product-note">
          {selectedVariety.description} {selectedVariety.heatLabel}. Available as the pepper crop allows.
        </p>
        <p className="tray-photo-note">Pepper varieties share one photo for now until we shoot each crop.</p>
        <CheckoutButton itemId={product.id} mode="payment" disabled={!hasPrice} disabledLabel="Add when available">
          Buy peppers
        </CheckoutButton>
      </div>
    </article>
  );
}
