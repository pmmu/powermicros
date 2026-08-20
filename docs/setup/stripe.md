# Stripe Setup Checklist

Use Stripe as the payment and subscription backend for PowerMicros. The custom site owns the farm model; Stripe owns checkout, billing, customer payment methods, receipts, and subscription management.

## Stripe Products and Prices

There are two supported setup paths:

1. Preferred: create products in `/admin/products` after Postgres is configured. The app will create/update Stripe Products and Prices automatically.
2. Manual fallback: create products/prices directly in Stripe and paste IDs into the database.

The original MVP env-var price IDs are no longer the primary path. Product IDs and Stripe Price IDs should live in Postgres.

### Recurring weekly subscription prices

- Small Weekly Greens — $12/week -> `STRIPE_PRICE_SMALL_WEEKLY_GREENS`
- Medium Weekly Greens — $20/week -> `STRIPE_PRICE_MEDIUM_WEEKLY_GREENS`
- Family Weekly Greens — $32/week -> `STRIPE_PRICE_FAMILY_WEEKLY_GREENS`

### One-time prices

- Microgreens Sampler -> `STRIPE_PRICE_MICROGREENS_SAMPLER`
- Sunflower Microgreens -> `STRIPE_PRICE_SUNFLOWER_MICROGREENS`
- Radish Mix -> `STRIPE_PRICE_RADISH_MIX`
- Farm Eggs -> `STRIPE_PRICE_FARM_EGGS`
- Fresh Lavender Bundle -> `STRIPE_PRICE_FRESH_LAVENDER_BUNDLE`
- Fresh Hot Peppers -> `STRIPE_PRICE_FRESH_HOT_PEPPERS`
- Seasonal Produce Box -> `STRIPE_PRICE_SEASONAL_PRODUCE_BOX`

## Payment Methods

Enable in Stripe Dashboard:

- Cards
- Link
- Apple Pay / Google Pay where available
- PayPal

PayPal recurring payments may require an additional Dashboard enablement step depending on account eligibility and PayPal restrictions.

## Local Environment

Copy `.env.example` to `.env.local` and fill in real values.

```bash
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Webhooks Later

Add a webhook endpoint later for:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

The webhook should eventually record paid subscriptions/orders into the farm operations database and trigger Hermes/Jira/Discord grow-plan automation.
