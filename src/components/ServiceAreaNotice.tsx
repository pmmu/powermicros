import { SERVICE_AREA_COPY } from "@/lib/serviceArea";

export function ServiceAreaNotice() {
  return (
    <aside className="service-area-notice" aria-label="PowerMicros local service area">
      <strong>Local orders only.</strong>
      <span>{SERVICE_AREA_COPY}</span>
    </aside>
  );
}
