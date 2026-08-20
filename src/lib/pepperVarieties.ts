export type PepperVariety = {
  id: string;
  name: string;
  description: string;
  heatLabel: string;
  image: string;
};

const pepperImage = "/farm/farm-peppers.jpg";

export const pepperVarieties: PepperVariety[] = [
  {
    id: "ghost-peppers",
    name: "Ghost Peppers",
    description: "Very hot seasonal peppers for customers who know exactly what they are getting.",
    heatLabel: "Extreme heat",
    image: pepperImage,
  },
  {
    id: "carolina-reaper-peppers",
    name: "Carolina Reaper Peppers",
    description: "Extreme heat peppers sold seasonally in small farm batches.",
    heatLabel: "Superhot",
    image: pepperImage,
  },
  {
    id: "jalapenos",
    name: "Jalapenos",
    description: "Fresh jalapenos for salsa, pickling, grilling, and everyday cooking.",
    heatLabel: "Medium heat",
    image: pepperImage,
  },
  {
    id: "serranos",
    name: "Serranos",
    description: "Fresh serrano peppers with clean heat for sauces, tacos, and marinades.",
    heatLabel: "Hot",
    image: pepperImage,
  },
];
