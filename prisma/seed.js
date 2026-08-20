/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const products = [
  {
    id: "small-weekly-greens",
    name: "Small Weekly Greens",
    description: "A simple weekly greens box for one person or light use.",
    priceCents: 1200,
    kind: "SUBSCRIPTION",
    subscriptionInterval: "WEEK",
    leadTimeDays: 7,
    cutoffNote: "Weekly tray count can be adjusted with the farm.",
    isAvailable: true,
    isFeatured: true,
    stockQuantity: null,
    weeklyCapacity: null,
    fulfillmentMode: "PICKUP",
    imageUrl: null,
    imageS3Key: null,
    sortOrder: 10,
  },
  {
    id: "medium-weekly-greens",
    name: "Medium Weekly Greens",
    description: "A practical weekly supply for salads, sandwiches, bowls, and garnish.",
    priceCents: 2000,
    kind: "SUBSCRIPTION",
    subscriptionInterval: "WEEK",
    leadTimeDays: 7,
    cutoffNote: "Weekly tray count can be adjusted with the farm.",
    isAvailable: true,
    isFeatured: true,
    stockQuantity: null,
    weeklyCapacity: null,
    fulfillmentMode: "PICKUP",
    imageUrl: null,
    imageS3Key: null,
    sortOrder: 20,
  },
  {
    id: "family-weekly-greens",
    name: "Family Weekly Greens",
    description: "A larger weekly harvest for families, meal prep, or serious microgreens use.",
    priceCents: 3200,
    kind: "SUBSCRIPTION",
    subscriptionInterval: "WEEK",
    leadTimeDays: 7,
    cutoffNote: "Weekly tray count can be adjusted with the farm.",
    isAvailable: true,
    isFeatured: true,
    stockQuantity: null,
    weeklyCapacity: null,
    fulfillmentMode: "PICKUP",
    imageUrl: null,
    imageS3Key: null,
    sortOrder: 30,
  },
  {
    id: "microgreens-sampler",
    name: "Microgreens Sampler",
    description: "A rotating mix of what is ready for the next harvest window.",
    priceCents: 1000,
    kind: "ONE_TIME",
    subscriptionInterval: null,
    leadTimeDays: 7,
    cutoffNote: "Rotating microgreens sampler.",
    isAvailable: true,
    isFeatured: true,
    stockQuantity: 40,
    weeklyCapacity: 40,
    fulfillmentMode: "PICKUP",
    imageUrl: null,
    imageS3Key: null,
    sortOrder: 100,
  },
  {
    id: "fresh-lavender-bundle",
    name: "Fresh Lavender Bundle",
    description: "Fresh lavender bundles from Clark Dubignon Farms.",
    priceCents: 1000,
    kind: "ONE_TIME",
    subscriptionInterval: null,
    leadTimeDays: 2,
    cutoffNote: "Available seasonally while fresh cuts last.",
    isAvailable: true,
    isFeatured: true,
    stockQuantity: 25,
    weeklyCapacity: 25,
    fulfillmentMode: "PICKUP",
    imageUrl: null,
    imageS3Key: null,
    sortOrder: 240,
  },
  {
    id: "farm-eggs",
    name: "Farm Eggs",
    description: "Eggs from our laying flock, available for pickup when supply allows.",
    priceCents: 600,
    kind: "ONE_TIME",
    subscriptionInterval: null,
    leadTimeDays: 1,
    cutoffNote: "Pickup add-on when available.",
    isAvailable: true,
    isFeatured: false,
    stockQuantity: 40,
    weeklyCapacity: 40,
    fulfillmentMode: "PICKUP",
    imageUrl: null,
    imageS3Key: null,
    sortOrder: 270,
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: product,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
