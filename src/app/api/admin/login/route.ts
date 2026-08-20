import { redirect } from "next/navigation";
import { setAdminSession, verifyAdminPassword } from "@/lib/admin/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = formData.get("password");

  if (typeof password === "string" && verifyAdminPassword(password)) {
    await setAdminSession();
    redirect("/admin/products");
  }

  redirect("/admin/login");
}
