import Link from "next/link";
import { SERVICE_AREA_LABEL } from "@/lib/serviceArea";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-brand">PowerMicros</p>
          <p className="footer-subtitle">A Clark Dubignon Farms company</p>
          <p className="footer-copy">
            Fresh microgreens, eggs, lavender, peppers, and seasonal farm add-ons. Pickup and delivery are local only: {SERVICE_AREA_LABEL}.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/subscribe">Subscribe</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/custom-grow">Custom Grow</Link>
          <Link href="/farm-story">Farm Story</Link>
        </div>
      </div>
    </footer>
  );
}
