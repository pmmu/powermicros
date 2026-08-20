import { hasDatabaseConfig, prisma } from "@/lib/db/prisma";
import { fallbackProducts } from "./fallbackProducts";
import type { ProductFormInput, ProductKind, ProductView } from "./types";

type ProductLike = Omit<ProductView, "createdAt" | "updatedAt"> & {
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

function slugifyProductName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeDate(value: Date | string | undefined) {
  if (!value) return undefined;
  return value instanceof Date ? value.toISOString() : value;
}

function normalizeProduct(item: ProductLike): ProductView {
  return {
    ...item,
    pk: undefined,
    sk: undefined,
    subscriptionInterval: item.subscriptionInterval ?? null,
    stockQuantity: item.stockQuantity ?? null,
    weeklyCapacity: item.weeklyCapacity ?? null,
    imageUrl: item.imageUrl ?? null,
    imageS3Key: item.imageS3Key ?? null,
    stripeProductId: item.stripeProductId ?? null,
    stripePriceId: item.stripePriceId ?? null,
    stripePriceAmountCents: item.stripePriceAmountCents ?? null,
    createdAt: normalizeDate(item.createdAt),
    updatedAt: normalizeDate(item.updatedAt),
  };
}

function buildProduct(id: string, input: ProductFormInput, existing?: ProductView | null) {
  return {
    id,
    ...input,
    stripeProductId: existing?.stripeProductId ?? null,
    stripePriceId: existing?.stripePriceId ?? null,
    stripePriceAmountCents: existing?.stripePriceAmountCents ?? null,
  };
}

export async function listProducts(): Promise<ProductView[]> {
  if (!hasDatabaseConfig()) return fallbackProducts;

  try {
    const items = await prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
    if (items.length === 0) return fallbackProducts;
    return items.map(normalizeProduct);
  } catch {
    return fallbackProducts;
  }
}

export async function listPublicProducts(kind?: ProductKind): Promise<ProductView[]> {
  const products = await listProducts();
  return products.filter((product) => product.isAvailable && (!kind || product.kind === kind));
}

export async function getProduct(id: string): Promise<ProductView | null> {
  if (!hasDatabaseConfig()) return fallbackProducts.find((product) => product.id === id) ?? null;

  const product = await prisma.product.findUnique({ where: { id } });
  return product ? normalizeProduct(product) : fallbackProducts.find((fallback) => fallback.id === id) ?? null;
}

export async function createProduct(input: ProductFormInput): Promise<ProductView> {
  return normalizeProduct(
    await prisma.product.create({
      data: buildProduct(slugifyProductName(input.name), input),
    }),
  );
}

export async function updateProduct(id: string, input: ProductFormInput): Promise<ProductView> {
  return normalizeProduct(
    await prisma.product.upsert({
      where: { id },
      update: input,
      create: buildProduct(id, input, await getProduct(id)),
    }),
  );
}

export async function updateProductStripeFields(
  id: string,
  stripeFields: Pick<ProductView, "stripeProductId" | "stripePriceId" | "stripePriceAmountCents">,
) {
  await prisma.product.update({
    where: { id },
    data: stripeFields,
  });
}

export class InsufficientStockError extends Error {
  constructor() {
    super("Not enough stock is available for that quantity.");
    this.name = "InsufficientStockError";
  }
}

export async function seedFallbackProducts() {
  if (!hasDatabaseConfig()) return;

  for (const product of fallbackProducts) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: {
        id: product.id,
        name: product.name,
        description: product.description,
        priceCents: product.priceCents,
        kind: product.kind,
        subscriptionInterval: product.subscriptionInterval,
        leadTimeDays: product.leadTimeDays,
        cutoffNote: product.cutoffNote,
        isAvailable: product.isAvailable,
        isFeatured: product.isFeatured,
        stockQuantity: product.stockQuantity,
        weeklyCapacity: product.weeklyCapacity,
        fulfillmentMode: product.fulfillmentMode,
        imageUrl: product.imageUrl,
        imageS3Key: product.imageS3Key,
        stripeProductId: product.stripeProductId,
        stripePriceId: product.stripePriceId,
        stripePriceAmountCents: product.stripePriceAmountCents,
        sortOrder: product.sortOrder,
      },
    });
  }
}

export async function reserveProductStock(id: string, quantity: number) {
  if (!hasDatabaseConfig()) return;

  const result = await prisma.product.updateMany({
    where: {
      id,
      stockQuantity: { gte: quantity },
    },
    data: {
      stockQuantity: { decrement: quantity },
    },
  });

  if (result.count === 0) {
    throw new InsufficientStockError();
  }
}

export async function releaseProductStock(id: string, quantity: number) {
  if (!hasDatabaseConfig()) return;

  await prisma.product.update({
    where: { id },
    data: {
      stockQuantity: { increment: quantity },
    },
  });
}
