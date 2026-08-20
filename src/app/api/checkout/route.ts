import { createCheckoutSession } from "@/lib/stripe/checkout";
import { getProduct, releaseProductStock, reserveProductStock } from "@/lib/products/repository";
import { SERVICE_AREA_LABEL } from "@/lib/serviceArea";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    itemId?: unknown;
    mode?: unknown;
    quantity?: unknown;
    fulfillmentLocation?: unknown;
    serviceAreaConfirmed?: unknown;
  } | null;

  if (!body || typeof body.itemId !== "string" || body.itemId.length === 0) {
    return Response.json({ error: "itemId is required" }, { status: 400 });
  }

  if (body.mode !== "payment" && body.mode !== "subscription") {
    return Response.json({ error: "mode must be payment or subscription" }, { status: 400 });
  }

  const quantity = typeof body.quantity === "number" && Number.isInteger(body.quantity) && body.quantity > 0 ? body.quantity : 1;
  const fulfillmentLocation = typeof body.fulfillmentLocation === "string" ? body.fulfillmentLocation.trim() : "";
  if (fulfillmentLocation.length < 3 || fulfillmentLocation.length > 200) {
    return Response.json({ error: "Enter a valid pickup or delivery town/address before checkout." }, { status: 400 });
  }

  if (body.serviceAreaConfirmed !== true) {
    return Response.json({ error: `Confirm your pickup or delivery location is ${SERVICE_AREA_LABEL}.` }, { status: 400 });
  }

  const product = await getProduct(body.itemId);

  if (!product || product.kind !== (body.mode === "subscription" ? "SUBSCRIPTION" : "ONE_TIME")) {
    return Response.json({ error: "Product is not available for this checkout mode" }, { status: 400 });
  }

  if (!product.stripePriceId) {
    return Response.json({ error: "Stripe price is not configured for this item" }, { status: 400 });
  }

  let stockReserved = false;

  try {
    if (product.stockQuantity !== null && body.mode === "payment") {
      await reserveProductStock(product.id, quantity);
      stockReserved = true;
    }

    const session = await createCheckoutSession({
      priceId: product.stripePriceId,
      mode: body.mode,
      quantity,
      metadata: { itemId: body.itemId, productId: product.id, source: "powermicros" },
    });
    return Response.json(session);
  } catch (error) {
    if (stockReserved) {
      await releaseProductStock(product.id, quantity).catch(() => undefined);
    }

    if (error instanceof Error && error.name === "InsufficientStockError") {
      return Response.json({ error: "Not enough stock is available for that quantity." }, { status: 409 });
    }

    return Response.json(
      { error: error instanceof Error ? error.message : "Unable to create Stripe checkout session" },
      { status: 500 },
    );
  }
}
