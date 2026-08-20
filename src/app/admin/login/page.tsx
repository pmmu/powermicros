import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin/auth";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin/products");

  return (
    <section className="section">
      <div className="container max-w-xl">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-4 text-4xl font-black text-[var(--pm-deep-green)]">PowerMicros admin login</h1>
        <form className="card mt-8 grid gap-4 p-6" action="/api/admin/login" method="post">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-[var(--pm-deep-green)]">Password</span>
            <input name="password" type="password" className="rounded-xl border border-[var(--pm-border)] px-4 py-3" />
          </label>
          <button className="btn btn-primary" type="submit">Log in</button>
        </form>
      </div>
    </section>
  );
}
