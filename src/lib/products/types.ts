export type ProductKind = "ONE_TIME" | "SUBSCRIPTION";
export type SubscriptionInterval = "WEEK" | "MONTH";
export type FulfillmentMode = "PICKUP" | "LOCAL_DELIVERY" | "SHIPPING_TEST";

export type ProductView = {
  id: string;
  pk?: string;
  sk?: string;
  name: string;
  description: string;
  priceCents: number;
  kind: ProductKind;
  subscriptionInterval: SubscriptionInterval | null;
  leadTimeDays: number;
  cutoffNote: string;
  isAvailable: boolean;
  isFeatured: boolean;
  stockQuantity: number | null;
  weeklyCapacity: number | null;
  fulfillmentMode: FulfillmentMode;
  imageUrl: string | null;
  imageS3Key: string | null;
  stripeProductId: string | null;
  stripePriceId: string | null;
  stripePriceAmountCents: number | null;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductFormInput = {
  name: string;
  description: string;
  priceCents: number;
  kind: ProductKind;
  subscriptionInterval: SubscriptionInterval | null;
  leadTimeDays: number;
  cutoffNote: string;
  isAvailable: boolean;
  isFeatured: boolean;
  stockQuantity: number | null;
  weeklyCapacity: number | null;
  fulfillmentMode: FulfillmentMode;
  imageUrl: string | null;
  imageS3Key: string | null;
  sortOrder: number;
};
