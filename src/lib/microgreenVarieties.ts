export type MicrogreenVariety = {
  id: string;
  productId: string;
  name: string;
  description: string;
  priceCents: number;
  leadTimeDays: number;
  image: string;
};

const neutralTrayImage = "/farm/microgreens-tray.jpg";

export const microgreenVarieties: MicrogreenVariety[] = [
  {
    id: "sunflower",
    productId: "sunflower-microgreens-tray",
    name: "Sunflower",
    description: "Sweet, nutty shoots with a hearty crunch.",
    priceCents: 2000,
    leadTimeDays: 8,
    image: "/farm/microgreens-sunflower.jpg",
  },
  {
    id: "wheatgrass",
    productId: "wheatgrass-tray",
    name: "Wheatgrass",
    description: "Fresh wheatgrass for juicing, shots, and weekly prep.",
    priceCents: 400,
    leadTimeDays: 8,
    image: "/farm/microgreens-sprouts.jpg",
  },
  {
    id: "onion",
    productId: "onion-microgreens-tray",
    name: "Onion",
    description: "Clean allium bite for finishing plates, eggs, and sandwiches.",
    priceCents: 2700,
    leadTimeDays: 15,
    image: "/farm/microgreens-red-stems.jpg",
  },
  {
    id: "radish",
    productId: "radish-microgreens-tray",
    name: "Radish",
    description: "Peppery greens for salads, tacos, bowls, and sandwiches.",
    priceCents: 1500,
    leadTimeDays: 8,
    image: "/farm/microgreens-radish.jpg",
  },
  {
    id: "mustard",
    productId: "mustard-microgreens-tray",
    name: "Mustard",
    description: "Sharp, savory heat in a fresh microgreen tray.",
    priceCents: 1800,
    leadTimeDays: 10,
    image: "/farm/microgreens-round-leaf.jpg",
  },
  {
    id: "arugula",
    productId: "arugula-microgreens-tray",
    name: "Arugula",
    description: "Peppery greens for garnish, salads, and fresh plates.",
    priceCents: 1800,
    leadTimeDays: 10,
    image: "/farm/microgreens-shelf-row.jpg",
  },
  {
    id: "broccoli",
    productId: "broccoli-microgreens-tray",
    name: "Broccoli",
    description: "Mild, crunchy greens with an easy everyday flavor.",
    priceCents: 1800,
    leadTimeDays: 10,
    image: neutralTrayImage,
  },
  {
    id: "kohlrabi",
    productId: "kohlrabi-microgreens-tray",
    name: "Kohlrabi",
    description: "Sweet, mild greens grown as a full tray.",
    priceCents: 1800,
    leadTimeDays: 10,
    image: "/farm/microgreens-hero-sharp.jpg",
  },
  {
    id: "red-cabbage",
    productId: "red-cabbage-microgreens-tray",
    name: "Red Cabbage",
    description: "Colorful greens with a clean cabbage finish.",
    priceCents: 1800,
    leadTimeDays: 10,
    image: "/farm/microgreens-red-stems.jpg",
  },
  {
    id: "red-kale",
    productId: "red-kale-microgreens-tray",
    name: "Red Kale",
    description: "Fresh greens for bowls, plates, and garnish.",
    priceCents: 1800,
    leadTimeDays: 10,
    image: "/farm/microgreens-grow-rack.jpg",
  },
  {
    id: "amaranth",
    productId: "amaranth-microgreens-tray",
    name: "Amaranth",
    description: "Bright, delicate greens with a mild earthy flavor.",
    priceCents: 2000,
    leadTimeDays: 12,
    image: "/farm/microgreens-amaranth.jpg",
  },
  {
    id: "spicy-salad-mix",
    productId: "spicy-salad-mix-tray",
    name: "Spicy Salad Mix",
    description: "Broccoli, kale, kohlrabi, arugula, red cabbage, and mustard.",
    priceCents: 1800,
    leadTimeDays: 10,
    image: "/farm/microgreens-round-leaf.jpg",
  },
];

export const microgreenProductIds = microgreenVarieties.map((variety) => variety.productId);
