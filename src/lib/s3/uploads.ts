import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

function getS3Client() {
  return new S3Client({ region: process.env.AWS_REGION || "us-east-1" });
}

export function hasS3Config() {
  return Boolean(process.env.S3_PRODUCT_IMAGE_BUCKET);
}

export async function createProductImageUploadUrl({
  filename,
  contentType,
}: {
  filename: string;
  contentType: string;
}) {
  const bucket = process.env.S3_PRODUCT_IMAGE_BUCKET;
  if (!bucket) throw new Error("S3_PRODUCT_IMAGE_BUCKET is not configured.");

  const safeName = filename.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  const key = `products/${Date.now()}-${safeName}`;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(getS3Client(), command, { expiresIn: 300 });
  const baseUrl = process.env.S3_PUBLIC_IMAGE_BASE_URL?.replace(/\/$/, "");

  return {
    key,
    uploadUrl,
    imageUrl: baseUrl ? `${baseUrl}/${key}` : null,
  };
}
