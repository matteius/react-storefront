# Stripe purchase browser check

Run `e2e/purchase-flow.spec.ts` against a **nonproduction storefront** backed by a Saleor instance or dedicated channel whose Stripe app configuration uses a `pk_test_` key and a sandbox server key (`rk_test_`, or `sk_test_` in our custom fork). Seed a published, in-stock product with a US shipping method. The product path must point to that product and remain relative to the storefront origin.

```sh
PLAYWRIGHT_BASE_URL=https://storefront-sandbox.example.com \
PURCHASE_E2E_PRODUCT_PATH=/en/default-channel/products/qa-coin \
pnpm exec playwright test e2e/purchase-flow.spec.ts
```

The test creates a fresh guest checkout, enters shipping details, chooses delivery, and waits for the rendered Stripe form to make an API request with a `pk_test_` key. It then submits Stripe's [successful Visa test card and generic decline test card](https://docs.stripe.com/testing). A successful payment must reach an order confirmation with an order number; a decline must leave the shopper on the payment step with an error. Playwright captures a screenshot on failure and a trace on retry.

The test refuses a `mattscoinage.com` storefront origin and fails if the Stripe form uses a live key. It is excluded from ordinary storefront CI unless both environment variables are set. Run it after a checkout, Stripe app, or Saleor deployment against a configured sandbox. A passing sandbox check proves the integrated test-mode flow; a separate low-value live transaction and refund is needed to validate live acquiring, settlement, and production webhooks.

## Mattscoinage QA channel

The Saleor `mattscoinage-qa` channel is mapped to the Mattscoinage Sandbox Stripe configuration. It contains the `checkout-qa-test-coin` product at $1, with $4 US shipping. The live `default-channel` retains its separate live Stripe configuration. This QA channel uses the production Saleor database, so a successful run creates a visibly labeled test order there. Use it for manual QA, and leave the order unfulfilled.

Run the local storefront on `localhost` so Next.js dev resources and checkout hydration load from the same origin:

```sh
NEXT_PUBLIC_SALEOR_API_URL=https://api.mattscoinage.com/graphql/ \
NEXT_PUBLIC_DEFAULT_CHANNEL=mattscoinage-qa \
STOREFRONT_CHANNELS=mattscoinage-qa \
NEXT_PUBLIC_ENABLE_STRIPE_PAYMENTS=true \
ENABLE_STRIPE_PAYMENTS=true \
PORT=3020 pnpm dev
```

In another shell:

```sh
PLAYWRIGHT_BASE_URL=http://localhost:3020 \
PURCHASE_E2E_PRODUCT_PATH=/en/mattscoinage-qa/products/checkout-qa-test-coin \
pnpm run test:e2e:purchase
```
