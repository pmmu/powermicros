import Link from "next/link";
import { SERVICE_AREA_LABEL } from "@/lib/serviceArea";

export default function SuccessPage() {
  return (
    <section className="section">
      <div className="container card grid gap-4 p-8 text-center">
        <p className="eyebrow">Order received</p>
        <h1 className="text-4xl font-black text-[var(--pm-deep-green)]">Thanks for supporting PowerMicros.</h1>
        <p className="mx-auto max-w-2xl leading-7 text-[var(--pm-muted)]">
          Stripe has received your checkout. We’ll use your order details to plan the next harvest window and confirm pickup or delivery {SERVICE_AREA_LABEL}.
        </p>
        <div><Link className="btn btn-primary" href="/shop">Back to shop</Link></div>
      </div>
    </section>
  );
}
