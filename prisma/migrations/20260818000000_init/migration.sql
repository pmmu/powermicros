-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ProductKind" AS ENUM ('ONE_TIME', 'SUBSCRIPTION');

-- CreateEnum
CREATE TYPE "SubscriptionInterval" AS ENUM ('WEEK', 'MONTH');

-- CreateEnum
CREATE TYPE "FulfillmentMode" AS ENUM ('PICKUP', 'LOCAL_DELIVERY', 'SHIPPING_TEST');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "kind" "ProductKind" NOT NULL,
    "subscriptionInterval" "SubscriptionInterval",
    "leadTimeDays" INTEGER NOT NULL DEFAULT 0,
    "cutoffNote" TEXT NOT NULL DEFAULT 'Order by Friday for next week’s harvest.',
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "stockQuantity" INTEGER,
    "weeklyCapacity" INTEGER,
    "fulfillmentMode" "FulfillmentMode" NOT NULL DEFAULT 'PICKUP',
    "imageUrl" TEXT,
    "imageS3Key" TEXT,
    "stripeProductId" TEXT,
    "stripePriceId" TEXT,
    "stripePriceAmountCents" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderSnapshot" (
    "id" TEXT NOT NULL,
    "stripeCheckoutSessionId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "customerEmail" TEXT,
    "status" TEXT NOT NULL,
    "fulfillmentLocation" TEXT,
    "lineItems" JSONB NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionSnapshot" (
    "id" TEXT NOT NULL,
    "stripeSubscriptionId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "customerEmail" TEXT,
    "status" TEXT NOT NULL,
    "productId" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "fulfillmentLocation" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeWebhookEvent" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payloadSummary" JSONB,

    CONSTRAINT "StripeWebhookEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Product_kind_isAvailable_sortOrder_idx" ON "Product"("kind", "isAvailable", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "OrderSnapshot_stripeCheckoutSessionId_key" ON "OrderSnapshot"("stripeCheckoutSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionSnapshot_stripeSubscriptionId_key" ON "SubscriptionSnapshot"("stripeSubscriptionId");
