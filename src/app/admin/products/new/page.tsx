import { redirect } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export default async function NewProductPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  return (
    <section className="section">
      <div className="container max-w-4xl">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-3 text-4xl font-black text-[var(--pm-deep-green)]">Add product</h1>
        <div className="mt-8">
          <ProductForm action="/api/admin/products" submitLabel="Create product" />
        </div>
      </div>
    </section>
  );
}
