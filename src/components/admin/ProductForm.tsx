import type { ProductView } from "@/lib/products/types";

type ProductFormProps = {
  product?: ProductView;
  action: string;
  submitLabel: string;
};

export function ProductForm({ product, action, submitLabel }: ProductFormProps) {
  return (
    <form className="card grid gap-5 p-6" action={action} method="post">
      <label className="grid gap-2">
        <span className="text-sm font-bold text-[var(--pm-deep-green)]">Name</span>
        <input name="name" required defaultValue={product?.name} className="rounded-xl border border-[var(--pm-border)] px-4 py-3" />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-bold text-[var(--pm-deep-green)]">Description</span>
        <textarea name="description" required defaultValue={product?.description} rows={4} className="rounded-xl border border-[var(--pm-border)] px-4 py-3" />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-[var(--pm-deep-green)]">Price cents</span>
          <input name="priceCents" type="number" min="1" required defaultValue={product?.priceCents ?? ""} className="rounded-xl border border-[var(--pm-border)] px-4 py-3" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-[var(--pm-deep-green)]">Kind</span>
          <select name="kind" defaultValue={product?.kind ?? "ONE_TIME"} className="rounded-xl border border-[var(--pm-border)] px-4 py-3">
            <option value="ONE_TIME">One-time</option>
            <option value="SUBSCRIPTION">Subscription</option>
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-[var(--pm-deep-green)]">Subscription interval</span>
          <select name="subscriptionInterval" defaultValue={product?.subscriptionInterval ?? ""} className="rounded-xl border border-[var(--pm-border)] px-4 py-3">
            <option value="">None</option>
            <option value="WEEK">Weekly</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-[var(--pm-deep-green)]">Lead time days</span>
          <input name="leadTimeDays" type="number" min="0" defaultValue={product?.leadTimeDays ?? 0} className="rounded-xl border border-[var(--pm-border)] px-4 py-3" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-[var(--pm-deep-green)]">In-stock quantity</span>
          <input name="stockQuantity" type="number" min="0" defaultValue={product?.stockQuantity ?? ""} className="rounded-xl border border-[var(--pm-border)] px-4 py-3" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-[var(--pm-deep-green)]">Weekly capacity</span>
          <input name="weeklyCapacity" type="number" min="0" defaultValue={product?.weeklyCapacity ?? ""} className="rounded-xl border border-[var(--pm-border)] px-4 py-3" />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-[var(--pm-deep-green)]">Sort order</span>
          <input name="sortOrder" type="number" defaultValue={product?.sortOrder ?? 0} className="rounded-xl border border-[var(--pm-border)] px-4 py-3" />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-bold text-[var(--pm-deep-green)]">Cutoff note</span>
        <input name="cutoffNote" defaultValue={product?.cutoffNote ?? "Lead time varies by grow cycle."} className="rounded-xl border border-[var(--pm-border)] px-4 py-3" />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-[var(--pm-deep-green)]">Image URL</span>
          <input name="imageUrl" defaultValue={product?.imageUrl ?? ""} className="rounded-xl border border-[var(--pm-border)] px-4 py-3" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-[var(--pm-deep-green)]">Image S3 key</span>
          <input name="imageS3Key" defaultValue={product?.imageS3Key ?? ""} className="rounded-xl border border-[var(--pm-border)] px-4 py-3" />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-bold text-[var(--pm-deep-green)]">Fulfillment mode</span>
        <select name="fulfillmentMode" defaultValue={product?.fulfillmentMode ?? "PICKUP"} className="rounded-xl border border-[var(--pm-border)] px-4 py-3">
          <option value="PICKUP">Pickup</option>
          <option value="LOCAL_DELIVERY">Local delivery</option>
          <option value="SHIPPING_TEST">Shipping test</option>
        </select>
      </label>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 font-semibold">
          <input name="isAvailable" type="checkbox" defaultChecked={product?.isAvailable ?? true} />
          Available
        </label>
        <label className="flex items-center gap-2 font-semibold">
          <input name="isFeatured" type="checkbox" defaultChecked={product?.isFeatured ?? false} />
          Featured
        </label>
      </div>

      <button className="btn btn-primary justify-self-start" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}
