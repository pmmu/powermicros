import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { hasDatabaseConfig } from "@/lib/db/prisma";
import { parseProductForm, validateProductInput } from "@/lib/products/form";
import { createProduct, updateProductStripeFields } from "@/lib/products/repository";
import { syncStripeProduct } from "@/lib/stripe/products";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  if (!hasDatabaseConfig()) {
    return Response.json({ error: "DATABASE_URL is required to create products." }, { status: 500 });
  }

  const input = parseProductForm(await request.formData());
  const errors = validateProductInput(input);
  if (errors.length) {
    return Response.json({ errors }, { status: 400 });
  }

  const product = await createProduct(input);
  const stripeFields = await syncStripeProduct(product);
  await updateProductStripeFields(product.id, stripeFields);

  redirect("/admin/products");
}
