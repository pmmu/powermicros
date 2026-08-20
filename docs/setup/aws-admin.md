# AWS/Postgres Product Admin Setup

PowerMicros now has a small product admin instead of a full store CMS.

## Architecture

- Next.js admin pages under `/admin/products`
- Postgres via Prisma
- Stripe Product/Price sync when `STRIPE_SECRET_KEY` is configured
- S3 presigned upload endpoint for product images
- Simple password-protected admin session cookie

## Required Environment

```bash
DATABASE_URL=postgresql://user:password@host:5432/powermicros
ADMIN_PASSWORD=replace-with-a-real-password
ADMIN_SESSION_SECRET=replace-with-32-plus-random-bytes
STRIPE_SECRET_KEY=sk_test_or_live_value
NEXT_PUBLIC_SITE_URL=https://powermicros.com
AWS_REGION=us-east-1
S3_PRODUCT_IMAGE_BUCKET=powermicros-product-images
S3_PUBLIC_IMAGE_BASE_URL=https://images.powermicros.com
```

## Database Setup

Run locally or in deployment:

```bash
npx prisma generate
npx prisma migrate dev --name init_products
```

For production:

```bash
npx prisma migrate deploy
```

## Admin URLs

```text
/admin/login
/admin/products
/admin/products/new
/admin/products/[id]/edit
```

## Product Fields

- name
- description
- price in cents
- kind: one-time or subscription
- subscription interval: weekly for launch
- lead time days
- cutoff note
- available
- featured
- weekly capacity
- fulfillment mode
- image URL
- image S3 key
- sort order

## Stripe Behavior

On create/edit:

1. Product is saved to Postgres.
2. If `STRIPE_SECRET_KEY` is configured, the app creates or updates the Stripe Product.
3. If the price changed, the app creates a new Stripe Price and deactivates the old one.
4. The app stores `stripeProductId`, `stripePriceId`, and `stripePriceAmountCents`.

The browser never sends arbitrary Stripe Price IDs. Checkout uses product IDs, and the server looks up the current Stripe Price ID from Postgres.

## Image Upload

The endpoint exists:

```text
POST /api/admin/uploads
```

Body:

```json
{
  "filename": "lavender.jpg",
  "contentType": "image/jpeg"
}
```

Response:

```json
{
  "key": "products/...",
  "uploadUrl": "https://...",
  "imageUrl": "https://images.powermicros.com/products/..."
}
```

The current form accepts image URL and S3 key manually. A drag/drop upload UI can be added later.
