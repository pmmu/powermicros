import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { hasDatabaseConfig } from "@/lib/db/prisma";
import { parseProductForm, validateProductInput } from "@/lib/products/form";
import { updateProduct, updateProductStripeFields } from "@/lib/products/repository";
import { syncStripeProduct } from "@/lib/stripe/products";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  if (!hasDatabaseConfig()) {
    return Response.json({ error: "DATABASE_URL is required to update products." }, { status: 500 });
  }

  const { id } = await params;
  const input = parseProductForm(await request.formData());
  const errors = validateProductInput(input);
  if (errors.length) {
    return Response.json({ errors }, { status: 400 });
  }

  const product = await updateProduct(id, input);
  const stripeFields = await syncStripeProduct(product);
  await updateProductStripeFields(id, stripeFields);

  redirect("/admin/products");
}
