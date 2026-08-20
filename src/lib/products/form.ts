import type { FulfillmentMode, ProductFormInput, ProductKind, SubscriptionInterval } from "./types";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getInt(formData: FormData, key: string, fallback = 0) {
  const value = Number.parseInt(getString(formData, key), 10);
  return Number.isFinite(value) ? value : fallback;
}

export function parseProductForm(formData: FormData): ProductFormInput {
  const kind = getString(formData, "kind") === "SUBSCRIPTION" ? "SUBSCRIPTION" : "ONE_TIME";
  const interval = getString(formData, "subscriptionInterval");
  const stockQuantity = getString(formData, "stockQuantity");
  const weeklyCapacity = getString(formData, "weeklyCapacity");

  return {
    name: getString(formData, "name"),
    description: getString(formData, "description"),
    priceCents: Math.max(0, getInt(formData, "priceCents")),
    kind: kind as ProductKind,
    subscriptionInterval:
      kind === "SUBSCRIPTION" && interval === "WEEK" ? ("WEEK" as SubscriptionInterval) : null,
    leadTimeDays: Math.max(0, getInt(formData, "leadTimeDays")),
    cutoffNote: getString(formData, "cutoffNote") || "Lead time varies by grow cycle.",
    isAvailable: formData.get("isAvailable") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    stockQuantity: stockQuantity ? Math.max(0, Number.parseInt(stockQuantity, 10)) : null,
    weeklyCapacity: weeklyCapacity ? Math.max(0, Number.parseInt(weeklyCapacity, 10)) : null,
    fulfillmentMode: (getString(formData, "fulfillmentMode") || "PICKUP") as FulfillmentMode,
    imageUrl: getString(formData, "imageUrl") || null,
    imageS3Key: getString(formData, "imageS3Key") || null,
    sortOrder: getInt(formData, "sortOrder"),
  };
}

export function validateProductInput(input: ProductFormInput) {
  const errors: string[] = [];
  if (!input.name) errors.push("Name is required.");
  if (!input.description) errors.push("Description is required.");
  if (input.priceCents <= 0) errors.push("Price must be greater than zero.");
  if (input.kind === "SUBSCRIPTION" && input.subscriptionInterval !== "WEEK") {
    errors.push("Subscriptions must use a weekly interval for launch.");
  }
  return errors;
}
