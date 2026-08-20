# PowerMicros Stripe MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a custom PowerMicros site using Stripe Checkout for one-time products and Stripe Billing for weekly microgreens subscriptions.

**Architecture:** Next.js App Router renders the customer-facing pages. Server route `/api/checkout` maps internal item IDs to Stripe Price IDs from environment variables and creates Checkout Sessions. Stripe handles payment, subscriptions, PayPal where enabled, and future customer portal flows.

**Tech Stack:** Next.js 16, TypeScript, React 19, Stripe SDK, Tailwind CSS 4.

## Global Constraints

- Use the existing PowerMicros logo as the primary launch logo.
- Position PowerMicros as “A Clark Dubignon Farms company.”
- Local pickup and local delivery are the launch fulfillment posture.
- Broad shipping is not exposed at launch; shipping copy says it is being tested.
- Stripe owns Checkout, Billing subscriptions, one-time payments, customer payment details, receipts, and future customer portal flows.
- PowerMicros owns the farm-specific model: cutoff dates, harvest windows, grow commitments, local fulfillment, and future automation.
- Do not build custom payment processing.
- Do not accept arbitrary Stripe Price IDs from the browser.
- Do not make medical, unsupported nutrition, or uncertified organic claims.
- Do not commit or push without explicit user approval.

---

## Completed MVP Tasks

- [x] Scaffold Next.js app.
- [x] Add extracted PowerMicros brand assets.
- [x] Build homepage, subscription page, shop page, farm story page, and success page.
- [x] Add fallback catalog for subscription plans and farm products.
- [x] Install Stripe SDK.
- [x] Add Stripe client and checkout-session helper.
- [x] Add `/api/checkout` route.
- [x] Replace Shopify cart integration with Stripe Checkout button.
- [x] Add `.env.example` with Stripe secret, webhook secret, site URL, and Stripe Price ID variables.
- [x] Add `docs/setup/stripe.md`.
- [x] Verify lint, build, and local route responses.

## Remaining Setup Tasks

- [ ] Create Stripe products and prices listed in `docs/setup/stripe.md`.
- [ ] Enable PayPal in Stripe Dashboard if available for the account.
- [ ] Copy `.env.example` to `.env.local` and fill real Stripe values.
- [ ] Test one one-time checkout in Stripe test mode.
- [ ] Test one weekly subscription checkout in Stripe test mode.
- [ ] Add Stripe webhook endpoint when ready to persist orders/subscriptions for grow planning.
- [ ] Add farm operations database after checkout flow is validated.
