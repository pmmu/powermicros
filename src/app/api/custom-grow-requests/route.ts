import { hasDatabaseConfig, prisma } from "@/lib/db/prisma";
import { SERVICE_AREA_LABEL } from "@/lib/serviceArea";

type GrowRequestBody = {
  name?: unknown;
  contact?: unknown;
  requesterType?: unknown;
  growType?: unknown;
  growTypeLabel?: unknown;
  frequency?: unknown;
  fulfillmentLocation?: unknown;
  notes?: unknown;
  selectedSlots?: unknown;
};

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  if (!hasDatabaseConfig()) {
    return Response.json({ error: "DATABASE_URL is required to save custom grow requests." }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as GrowRequestBody | null;
  if (!body) {
    return Response.json({ error: "Request body is required." }, { status: 400 });
  }

  const name = cleanString(body.name, 120);
  const contact = cleanString(body.contact, 160);
  const requesterType = cleanString(body.requesterType, 40);
  const growType = cleanString(body.growType, 60);
  const growTypeLabel = cleanString(body.growTypeLabel, 120);
  const frequency = cleanString(body.frequency, 40);
  const fulfillmentLocation = cleanString(body.fulfillmentLocation, 200);
  const notes = cleanString(body.notes, 2000);
  const selectedSlots = Array.isArray(body.selectedSlots) ? body.selectedSlots.slice(0, 40) : [];

  const errors = [
    !name ? "Name is required." : null,
    !contact ? "Email or phone is required." : null,
    !requesterType ? "Customer type is required." : null,
    !growType ? "Grow type is required." : null,
    !growTypeLabel ? "Grow type label is required." : null,
    !frequency ? "Grow rhythm is required." : null,
    fulfillmentLocation.length < 3 ? "Pickup or delivery location is required." : null,
    selectedSlots.length === 0 ? "Choose at least one available grow slot." : null,
  ].filter(Boolean);

  if (errors.length) {
    return Response.json({ errors }, { status: 400 });
  }

  const savedRequest = await prisma.customGrowRequest.create({
    data: {
      name,
      contact,
      requesterType,
      growType,
      growTypeLabel,
      frequency,
      fulfillmentLocation,
      notes: notes || null,
      selectedSlots,
      serviceAreaLabel: SERVICE_AREA_LABEL,
    },
    select: { id: true },
  });

  return Response.json({ id: savedRequest.id });
}
