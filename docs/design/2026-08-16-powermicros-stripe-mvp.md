# PowerMicros Stripe-Backed Farm-to-Home MVP Design

Date: 2026-08-16
Repo: `/Users/james/repos/powermicros`
Domain: `powermicros.com`

## Summary

PowerMicros is a custom farm-to-home web app for weekly microgreens subscriptions, one-time microgreens orders, and farm add-ons such as eggs, lavender bundles, fresh peppers, and seasonal produce.

The commerce backend is Stripe, not Shopify. Stripe handles Checkout, Billing subscriptions, payment methods, receipts, customer payment details, and future customer portal flows. The PowerMicros app owns the farm-specific model: order cutoff, harvest windows, grow commitments, product availability, pickup/local delivery, and later Hermes/Jira/Discord grow-plan automation.

PowerMicros is positioned as a subsidiary/brand under Clark Dubignon Farms.

## Goals

- Launch a customer-facing PowerMicros site without building custom payment infrastructure.
- Use Stripe Checkout for one-time orders and Stripe Billing for weekly subscriptions.
- Support PayPal through Stripe where account eligibility allows it.
- Start local-first with pickup and local delivery.
- Defer broad shipping until packaging and cold-chain tests are complete.
- Preserve a clean path to future farm operations automation.

## Non-Goals for MVP

- No Shopify dependency.
- No custom payment processor.
- No native mobile app.
- No route optimization.
- No broad microgreens shipping at launch.
- No automated customer outreach without human approval.
- No medical, unsupported nutrition, or uncertified organic claims.

## Brand Direction

Use the existing PowerMicros logo as the primary launch logo, extracted from the old label source files. Surround it with a refreshed visual system:

- green and white base
- warm cream / honey accents
- clean health-food feel
- light honeybee/farm-life motifs
- parent-brand line: `A Clark Dubignon Farms company`

## Customer MVP

Pages:

- `/` — explains grow-to-order model
- `/subscribe` — weekly subscription plans
- `/shop` — one-time orders and farm add-ons
- `/farm-story` — Clark Dubignon Farms story
- `/success` — Stripe checkout success page

Launch fulfillment:

- local pickup first
- local delivery for defined local area
- shipping copy says testing is coming later

## Stripe Integration

Stripe owns:

- Checkout
- recurring Billing subscriptions
- one-time payments
- payment methods including cards, wallets, Link, and PayPal where available
- receipts
- customer payment details
- future customer portal

PowerMicros owns:

- product presentation
- subscription education
- farm add-on availability
- order cutoff messaging
- local-first fulfillment copy
- future grow-plan and operational records

Expected flow:

```text
Customer visits powermicros.com
  -> selects subscription or one-time product
  -> app POSTs item ID to /api/checkout
  -> server maps item ID to configured Stripe Price ID
  -> server creates Stripe Checkout Session
  -> customer pays in Stripe Checkout
  -> customer returns to /success
  -> future webhook records paid order/subscription
```

## Technical Architecture

- Next.js App Router
- TypeScript
- Stripe SDK
- Stripe Checkout Sessions
- Stripe Billing recurring prices
- environment variables for Stripe keys and price IDs

Important security choice: the browser never sends arbitrary Stripe price IDs. It sends an internal `itemId`; the server maps that to a configured environment variable.

## Agentic Automation Roadmap

After paid orders/subscriptions exist, add Stripe webhooks and a farm ops store. Then Hermes can:

- read weekly subscriptions and one-time orders
- group them by harvest window
- calculate grow targets with a 1.75x–2x buffer
- create Jira tasks for planting, harvest, packing, pickup, delivery, and overage sales
- post Discord briefings

## Stripe Setup Needed

Create Stripe products/prices for:

- Small Weekly Greens — weekly recurring
- Medium Weekly Greens — weekly recurring
- Family Weekly Greens — weekly recurring
- Microgreens Sampler — one-time
- Sunflower Microgreens — one-time
- Radish Mix — one-time
- Farm Eggs — one-time
- Fresh Lavender Bundle — one-time
- Fresh Hot Peppers — one-time
- Seasonal Produce Box — one-time

Then fill `.env.local` using `.env.example`.
