import { notFound, redirect } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { getProduct } from "@/lib/products/repository";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <section className="section">
      <div className="container max-w-4xl">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-3 text-4xl font-black text-[var(--pm-deep-green)]">Edit {product.name}</h1>
        <div className="mt-8">
          <ProductForm product={product} action={`/api/admin/products/${product.id}`} submitLabel="Save product" />
        </div>
      </div>
    </section>
  );
}
