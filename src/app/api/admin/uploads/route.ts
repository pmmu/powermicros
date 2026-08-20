import { isAdminAuthenticated } from "@/lib/admin/auth";
import { createProductImageUploadUrl } from "@/lib/s3/uploads";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { filename?: unknown; contentType?: unknown } | null;
  if (!body || typeof body.filename !== "string" || typeof body.contentType !== "string") {
    return Response.json({ error: "filename and contentType are required" }, { status: 400 });
  }

  const upload = await createProductImageUploadUrl({ filename: body.filename, contentType: body.contentType });
  return Response.json(upload);
}
