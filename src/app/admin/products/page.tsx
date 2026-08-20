import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { listProducts } from "@/lib/products/repository";

export const dynamic = "force-dynamic";

function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(priceCents / 100);
}

function formatInventory(product: { stockQuantity: number | null; weeklyCapacity: number | null }) {
  if (product.stockQuantity !== null) return `${product.stockQuantity} in stock`;
  if (product.weeklyCapacity !== null) return `${product.weeklyCapacity}/week capacity`;
  return "Open";
}

export default async function AdminProductsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const products = await listProducts();

  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="mt-3 text-4xl font-black text-[var(--pm-deep-green)]">Products</h1>
          </div>
          <div className="flex gap-3">
            <Link className="btn btn-primary" href="/admin/products/new">Add product</Link>
            <form action="/api/admin/logout" method="post">
              <button className="btn btn-secondary" type="submit">Log out</button>
            </form>
          </div>
        </div>

        <div className="card mt-8 overflow-hidden">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-[rgba(120,145,86,0.12)] text-[var(--pm-deep-green)]">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Type</th>
                <th className="p-4">Lead</th>
                <th className="p-4">Inventory</th>
                <th className="p-4">Status</th>
                <th className="p-4">Stripe</th>
                <th className="p-4">Edit</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-[var(--pm-border)]">
                  <td className="p-4 font-semibold">{product.name}</td>
                  <td className="p-4">{formatPrice(product.priceCents)}</td>
                  <td className="p-4">{product.kind === "SUBSCRIPTION" ? "Weekly subscription" : "One-time"}</td>
                  <td className="p-4">{product.leadTimeDays}d</td>
                  <td className="p-4">{formatInventory(product)}</td>
                  <td className="p-4">{product.isAvailable ? "Available" : "Hidden"}</td>
                  <td className="p-4">{product.stripePriceId ? "Synced" : "Not synced"}</td>
                  <td className="p-4"><Link href={`/admin/products/${product.id}/edit`}>Edit</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
