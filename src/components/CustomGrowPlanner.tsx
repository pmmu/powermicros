"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { SERVICE_AREA_LABEL } from "@/lib/serviceArea";

type GrowType = {
  id: string;
  name: string;
  label: string;
  leadTime: string;
  description: string;
};

type SlotStatus = "available" | "reserved" | "growing" | "harvest";
type StageKey =
  | "available"
  | "requested"
  | "reserved"
  | "seeding"
  | "germinating"
  | "blackout"
  | "growing"
  | "flowering"
  | "fruiting"
  | "harvesting";

type GrowSlot = {
  id: number;
  zone: "Rack" | "Bed" | "Row" | "Patch";
  status: SlotStatus;
  crop?: string;
};

const growTypes: GrowType[] = [
  {
    id: "microgreens",
    name: "Microgreens trays",
    label: "rack slots",
    leadTime: "7-15 days",
    description: "Best for weekly trays, restaurant garnish, family greens, and sampler follow-ups.",
  },
  {
    id: "herbs",
    name: "Herbs",
    label: "bed slots",
    leadTime: "2-6 weeks",
    description: "Basil and other herbs for families, chefs, and recurring kitchen use.",
  },
  {
    id: "peppers",
    name: "Peppers",
    label: "row slots",
    leadTime: "Seasonal",
    description: "Jalapenos, serranos, ghost peppers, Carolina Reapers, and custom heat requests.",
  },
  {
    id: "seasonal",
    name: "Seasonal crops",
    label: "patch slots",
    leadTime: "By crop",
    description: "Tomatoes, kale, lavender, sugar cane, muscadines, blackberries, and other farm extras.",
  },
];

const slots: GrowSlot[] = [
  { id: 1, zone: "Rack", status: "growing", crop: "Sunflower" },
  { id: 2, zone: "Rack", status: "reserved", crop: "Restaurant trays" },
  { id: 3, zone: "Rack", status: "available" },
  { id: 4, zone: "Rack", status: "harvest", crop: "Radish" },
  { id: 5, zone: "Rack", status: "available" },
  { id: 6, zone: "Rack", status: "growing", crop: "Spicy mix" },
  { id: 7, zone: "Rack", status: "available" },
  { id: 8, zone: "Rack", status: "available" },
  { id: 33, zone: "Rack", status: "growing", crop: "Pea shoots" },
  { id: 34, zone: "Rack", status: "available" },
  { id: 35, zone: "Rack", status: "reserved", crop: "Chef trays" },
  { id: 36, zone: "Rack", status: "available" },
  { id: 37, zone: "Rack", status: "growing", crop: "Broccoli" },
  { id: 38, zone: "Rack", status: "available" },
  { id: 39, zone: "Rack", status: "harvest", crop: "Sampler mix" },
  { id: 40, zone: "Rack", status: "available" },
  { id: 9, zone: "Bed", status: "reserved", crop: "Basil" },
  { id: 10, zone: "Bed", status: "available" },
  { id: 11, zone: "Bed", status: "growing", crop: "Kale" },
  { id: 12, zone: "Bed", status: "available" },
  { id: 13, zone: "Bed", status: "available" },
  { id: 14, zone: "Bed", status: "harvest", crop: "Herbs" },
  { id: 15, zone: "Bed", status: "available" },
  { id: 16, zone: "Bed", status: "reserved", crop: "Family greens" },
  { id: 17, zone: "Row", status: "available" },
  { id: 18, zone: "Row", status: "growing", crop: "Jalapenos" },
  { id: 19, zone: "Row", status: "available" },
  { id: 20, zone: "Row", status: "reserved", crop: "Hot peppers" },
  { id: 21, zone: "Row", status: "available" },
  { id: 22, zone: "Row", status: "available" },
  { id: 23, zone: "Row", status: "growing", crop: "Tomatoes" },
  { id: 24, zone: "Row", status: "available" },
  { id: 25, zone: "Patch", status: "reserved", crop: "Lavender" },
  { id: 26, zone: "Patch", status: "available" },
  { id: 27, zone: "Patch", status: "available" },
  { id: 28, zone: "Patch", status: "growing", crop: "Sugar cane" },
  { id: 29, zone: "Patch", status: "available" },
  { id: 30, zone: "Patch", status: "harvest", crop: "Muscadines" },
  { id: 31, zone: "Patch", status: "available" },
  { id: 32, zone: "Patch", status: "available" },
];

const initialWateringSlotId = slots.find((slot) => (
  slot.zone === "Rack" && slot.status !== "available"
))?.id ?? null;

const microgreenStages: Array<{ key: StageKey; label: string }> = [
  { key: "available", label: "Available" },
  { key: "seeding", label: "Seeding" },
  { key: "germinating", label: "Germinating" },
  { key: "blackout", label: "Blackout" },
  { key: "requested", label: "Your request" },
  { key: "reserved", label: "Reserved" },
];

const plantStages: Array<{ key: StageKey; label: string }> = [
  { key: "available", label: "Available" },
  { key: "growing", label: "Growing" },
  { key: "flowering", label: "Flowering" },
  { key: "fruiting", label: "Fruiting" },
  { key: "harvesting", label: "Harvesting" },
  { key: "requested", label: "Your request" },
  { key: "reserved", label: "Reserved" },
];

function getZoneForGrowType(growTypeId: string): GrowSlot["zone"] {
  if (growTypeId === "microgreens") return "Rack";
  if (growTypeId === "herbs") return "Bed";
  if (growTypeId === "peppers") return "Row";
  return "Patch";
}

function getSlotStage(slot: GrowSlot, growTypeId: string, isSelected: boolean): StageKey {
  if (isSelected) return "requested";
  if (slot.status === "available") return "available";
  if (slot.status === "reserved") return "reserved";

  if (growTypeId === "microgreens") {
    const stages: StageKey[] = ["seeding", "germinating", "blackout"];
    return stages[slot.id % stages.length];
  }

  if (slot.status === "harvest") return "harvesting";

  const stages: StageKey[] = ["growing", "flowering", "fruiting"];
  return stages[slot.id % stages.length];
}

export function CustomGrowPlanner() {
  const [growTypeId, setGrowTypeId] = useState(growTypes[0].id);
  const [selectedSlotIds, setSelectedSlotIds] = useState<number[]>([]);
  const [wateringSlotId, setWateringSlotId] = useState<number | null>(initialWateringSlotId);
  const [requesterType, setRequesterType] = useState("family");
  const [frequency, setFrequency] = useState("one-time");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const selectedGrowType = growTypes.find((type) => type.id === growTypeId) ?? growTypes[0];
  const activeZone = getZoneForGrowType(growTypeId);
  const isMicrogreensView = growTypeId === "microgreens";
  const visibleSlots = isMicrogreensView ? slots.filter((slot) => slot.zone === "Rack") : slots;
  const selectedSlots = slots.filter((slot) => selectedSlotIds.includes(slot.id));
  const suggestedSlots = selectedSlotIds.length || (requesterType === "business" ? 6 : 2);
  const stageLegend = growTypeId === "microgreens" ? microgreenStages : plantStages;

  useEffect(() => {
    if (!isMicrogreensView) {
      return undefined;
    }

    const wateringCandidates = slots.filter((slot) => (
      slot.zone === "Rack" && slot.status !== "available"
    ));

    if (!wateringCandidates.length) {
      return undefined;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index = (index + 1) % wateringCandidates.length;
      setWateringSlotId(wateringCandidates[index].id);
    }, 1800);

    return () => window.clearInterval(interval);
  }, [isMicrogreensView]);

  function toggleSlot(slot: GrowSlot) {
    if (slot.status !== "available" || slot.zone !== activeZone) return;
    setSelectedSlotIds((current) => (
      current.includes(slot.id) ? current.filter((id) => id !== slot.id) : [...current, slot.id]
    ));
  }

  function changeGrowType(nextGrowTypeId: string) {
    setGrowTypeId(nextGrowTypeId);
    setSelectedSlotIds([]);
    setSubmitMessage(null);
    setSubmitError(null);
  }

  async function submitGrowRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitMessage(null);
    setSubmitError(null);

    if (!name.trim() || !contact.trim() || !location.trim()) {
      setSubmitError("Name, contact, and pickup/delivery location are required.");
      return;
    }

    if (selectedSlots.length === 0) {
      setSubmitError("Choose at least one available grow slot before sending the request.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/custom-grow-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          requesterType,
          growType: growTypeId,
          growTypeLabel: selectedGrowType.name,
          frequency,
          fulfillmentLocation: location,
          notes,
          selectedSlots: selectedSlots.map((slot) => ({
            id: slot.id,
            zone: slot.zone,
            stage: getSlotStage(slot, growTypeId, true),
          })),
        }),
      });

      const data = (await response.json()) as { id?: string; error?: string; errors?: string[] };
      if (!response.ok) {
        throw new Error(data.errors?.join(" ") || data.error || "Unable to save the grow request.");
      }

      setSubmitMessage(`Grow request saved. Request ID: ${data.id}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to save the grow request.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section section-tight grow-planner-section">
      <div className="container grow-planner">
        <div className="grow-controls card">
          <p className="eyebrow">Plan a grow request</p>
          <h2>Pick a grow type, then choose open slots.</h2>
          <p>
            This is a planning request, not an instant reservation. We confirm final timing after checking crop rotation, weather, and farm capacity.
          </p>

          <div className="grow-type-list" aria-label="Grow type">
            {growTypes.map((type) => (
              <button
                className={`grow-type-button${type.id === growTypeId ? " is-active" : ""}`}
                type="button"
                onClick={() => changeGrowType(type.id)}
                key={type.id}
              >
                <span>{type.name}</span>
                <small>{type.leadTime}</small>
              </button>
            ))}
          </div>

          <div className="grow-option-grid">
            <label>
              <span>Who is this for?</span>
              <select value={requesterType} onChange={(event) => setRequesterType(event.target.value)}>
                <option value="family">Family/home</option>
                <option value="business">Restaurant or business</option>
                <option value="event">Event or special use</option>
              </select>
            </label>
            <label>
              <span>Grow rhythm</span>
              <select value={frequency} onChange={(event) => setFrequency(event.target.value)}>
                <option value="one-time">One-time batch</option>
                <option value="weekly">Weekly recurring</option>
                <option value="monthly">Monthly recurring</option>
                <option value="unsure">Help me decide</option>
              </select>
            </label>
          </div>

        </div>

        <div className="grow-board-wrap card">
          <div className="grow-board-heading">
            <div>
              <p className="eyebrow">{selectedGrowType.label}</p>
              <h2>{selectedGrowType.name}</h2>
            </div>
            <p>{selectedGrowType.description}</p>
          </div>

          <div className="grow-legend grow-stage-legend" aria-label="Growth stage legend">
            {stageLegend.map((stage) => (
              <span className={`stage-pill is-stage-${stage.key}`} key={stage.key}>{stage.label}</span>
            ))}
          </div>

          <div className={`grow-board${isMicrogreensView ? " is-rack-board" : ""}`} aria-label="Grow slots">
            {visibleSlots.map((slot, index) => {
              const isSelected = selectedSlotIds.includes(slot.id);
              const isRelevant = slot.zone === activeZone;
              const stage = getSlotStage(slot, growTypeId, isSelected);
              const isWatering = isMicrogreensView && wateringSlotId === slot.id;
              return (
                <button
                  className={`grow-slot is-stage-${stage}${isRelevant ? " is-relevant" : ""}${isMicrogreensView ? " is-tray-slot" : ""}${isWatering ? " is-watering" : ""}`}
                  type="button"
                  onClick={() => toggleSlot(slot)}
                  disabled={slot.status !== "available" || !isRelevant}
                  aria-pressed={isSelected}
                  key={slot.id}
                >
                  {isMicrogreensView ? (
                    <span className="tray-scene" aria-hidden="true">
                      <span className="tray-stack">
                        {stage === "blackout" ? <span className="tray-pan tray-pan-cover" /> : null}
                        <span className="tray-pan">
                          <span className="tray-soil" />
                          {stage === "seeding" || stage === "germinating" ? <span className="tray-seeds" /> : null}
                          {stage === "reserved" || stage === "germinating" ? <span className="tray-greens" /> : null}
                          {stage === "harvesting" ? <span className="tray-harvest-glow" /> : null}
                        </span>
                      </span>
                      <span className="watering-stream" />
                    </span>
                  ) : null}
                  <span className="slot-zone">{isMicrogreensView ? `Tray ${index + 1}` : slot.zone}</span>
                  <span className="slot-crop">{isSelected ? "Your request" : slot.crop ?? "Open"}</span>
                </button>
              );
            })}
          </div>
        </div>

        <form className="grow-request-card card" onSubmit={submitGrowRequest}>
          <p className="eyebrow">Request summary</p>
          <h2>{selectedSlots.length ? `${selectedSlots.length} selected ${selectedGrowType.label}` : `${suggestedSlots} suggested ${selectedGrowType.label}`}</h2>
          <p>
            {selectedGrowType.name} usually needs {selectedGrowType.leadTime}. We will confirm the exact schedule before planting.
          </p>

          <div className="grow-summary-list">
            <span>{frequency}</span>
            <span>{requesterType}</span>
            <span>{SERVICE_AREA_LABEL}</span>
          </div>

          <label>
            <span>Name</span>
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
          </label>
          <label>
            <span>Email or phone</span>
            <input value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Best way to reach you" />
          </label>
          <label>
            <span>Pickup or delivery location</span>
            <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Town, ZIP, or address" />
          </label>
          <label>
            <span>What do you want grown?</span>
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Varieties, quantities, timing, kitchen use, event date..." />
          </label>

          <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving request..." : "Send grow request"}
          </button>
          {submitMessage ? <p className="form-success">{submitMessage}</p> : null}
          {submitError ? <p className="form-error">{submitError}</p> : null}
        </form>
      </div>
    </section>
  );
}
