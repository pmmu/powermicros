export type SubscriptionPlan = {
  id: string;
  name: string;
  priceLabel: string;
  cadence: string;
  description: string;
  features: string[];
  stripePriceEnv: string;
};

export type FarmProduct = {
  id: string;
  name: string;
  priceLabel: string;
  category: "microgreens" | "eggs" | "lavender" | "peppers" | "seasonal";
  description: string;
  availability: string;
  stripePriceEnv: string;
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "small-weekly-greens",
    name: "Small Weekly Greens",
    priceLabel: "$12/week",
    cadence: "Weekly pickup or local delivery",
    description: "A simple weekly greens box for one person or light use.",
    features: ["Pay by the tray", "Add-on discounts grow with tray count", "First access to farm extras"],
    stripePriceEnv: "STRIPE_PRICE_SMALL_WEEKLY_GREENS",
  },
  {
    id: "medium-weekly-greens",
    name: "Medium Weekly Greens",
    priceLabel: "$20/week",
    cadence: "Weekly pickup or local delivery",
    description: "A practical weekly supply for regular salads, sandwiches, bowls, and garnish.",
    features: ["Best starter plan", "Pay by the tray", "Member discount on one-time orders"],
    stripePriceEnv: "STRIPE_PRICE_MEDIUM_WEEKLY_GREENS",
  },
  {
    id: "family-weekly-greens",
    name: "Family Weekly Greens",
    priceLabel: "$32/week",
    cadence: "Weekly pickup or local delivery",
    description: "A larger weekly harvest for families, meal prep, or serious microgreens use.",
    features: ["Largest weekly value", "First access to limited crops", "Best add-on discounts"],
    stripePriceEnv: "STRIPE_PRICE_FAMILY_WEEKLY_GREENS",
  },
];

export const oneTimeProducts: FarmProduct[] = [
  {
    id: "microgreens-sampler",
    name: "Microgreens Sampler",
    priceLabel: "Coming soon",
    category: "microgreens",
    description: "A rotating mix of what is ready for the next harvest window.",
    availability: "Rotating microgreens sampler.",
    stripePriceEnv: "STRIPE_PRICE_MICROGREENS_SAMPLER",
  },
  {
    id: "sunflower-microgreens",
    name: "Sunflower Microgreens",
    priceLabel: "Coming soon",
    category: "microgreens",
    description: "Crunchy, fresh sunflower greens grown in our outfitted container setup.",
    availability: "Available by grow cycle.",
    stripePriceEnv: "STRIPE_PRICE_SUNFLOWER_MICROGREENS",
  },
  {
    id: "radish-mix",
    name: "Radish Mix",
    priceLabel: "Coming soon",
    category: "microgreens",
    description: "A peppery microgreen option for sandwiches, salads, tacos, and bowls.",
    availability: "Available by grow cycle.",
    stripePriceEnv: "STRIPE_PRICE_RADISH_MIX",
  },
];

export const farmAddOns: FarmProduct[] = [
  {
    id: "blackberries",
    name: "Blackberries",
    priceLabel: "Seasonal",
    category: "seasonal",
    description: "Fresh seasonal blackberries from the farm when the patch is producing.",
    availability: "Seasonal add-on when available.",
    stripePriceEnv: "STRIPE_PRICE_BLACKBERRIES",
  },
  {
    id: "peppers",
    name: "Peppers",
    priceLabel: "Seasonal",
    category: "peppers",
    description: "Choose from ghost peppers, Carolina Reapers, jalapenos, and serranos when the plants are producing.",
    availability: "Available as the pepper crop allows.",
    stripePriceEnv: "STRIPE_PRICE_PEPPERS",
  },
  {
    id: "farm-eggs",
    name: "Farm Eggs",
    priceLabel: "Limited weekly availability",
    category: "eggs",
    description: "Eggs from our laying flock, available for pickup when supply allows.",
    availability: "Pickup add-on when available.",
    stripePriceEnv: "STRIPE_PRICE_FARM_EGGS",
  },
  {
    id: "fresh-lavender-bundle",
    name: "Fresh Lavender Bundle",
    priceLabel: "Seasonal",
    category: "lavender",
    description: "Fresh lavender bundles from Clark Dubignon Farms.",
    availability: "Local pickup first; shipping test later.",
    stripePriceEnv: "STRIPE_PRICE_FRESH_LAVENDER_BUNDLE",
  },
  {
    id: "tomatoes",
    name: "Tomatoes",
    priceLabel: "Seasonal",
    category: "seasonal",
    description: "Fresh tomatoes picked for local orders when the plants are producing.",
    availability: "Seasonal add-on when available.",
    stripePriceEnv: "STRIPE_PRICE_TOMATOES",
  },
  {
    id: "kale",
    name: "Kale",
    priceLabel: "Seasonal",
    category: "seasonal",
    description: "Fresh farm kale available as a seasonal green when harvests allow.",
    availability: "Seasonal add-on when available.",
    stripePriceEnv: "STRIPE_PRICE_KALE",
  },
  {
    id: "basil",
    name: "Basil",
    priceLabel: "Seasonal",
    category: "seasonal",
    description: "Fresh farm basil available as a seasonal herb when the plants are producing.",
    availability: "Seasonal add-on when available.",
    stripePriceEnv: "STRIPE_PRICE_BASIL",
  },
  {
    id: "sugar-cane",
    name: "Sugar Cane",
    priceLabel: "Seasonal",
    category: "seasonal",
    description: "Seasonal sugar cane from the farm, available in limited local batches.",
    availability: "Seasonal add-on when available.",
    stripePriceEnv: "STRIPE_PRICE_SUGAR_CANE",
  },
  {
    id: "muscadines",
    name: "Muscadines",
    priceLabel: "Seasonal",
    category: "seasonal",
    description: "Fresh muscadines when the vines are producing, sold as a seasonal pickup add-on.",
    availability: "Seasonal add-on when available.",
    stripePriceEnv: "STRIPE_PRICE_MUSCADINES",
  },
];

export const allFallbackProducts = [...oneTimeProducts, ...farmAddOns];

export function getStripePriceId(envName: string): string | undefined {
  const value = process.env[envName];
  return value && value.startsWith("price_") ? value : undefined;
}
