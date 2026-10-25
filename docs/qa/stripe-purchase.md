# Stripe purchase browser check

Run `e2e/purchase-flow.spec.ts` against a **nonproduction storefront** backed by a Saleor instance or dedicated channel whose Stripe app configuration uses `pk_test_` and `rk_test_` keys. Seed a published, in-stock product with a US shipping method. The product path must point to that product and remain relative to the storefront origin.

```sh
PLAYWRIGHT_BASE_URL=https://storefront-sandbox.example.com \
PURCHASE_E2E_PRODUCT_PATH=/en/default-channel/products/qa-coin \
pnpm exec playwright test e2e/purchase-flow.spec.ts
```

The test creates a fresh guest checkout, enters shipping details, chooses delivery, and waits for the rendered Stripe form to make an API request with a `pk_test_` key. It then submits Stripe's [successful Visa test card and generic decline test card](https://docs.stripe.com/testing). A successful payment must reach an order confirmation with an order number; a decline must leave the shopper on the payment step with an error. Playwright captures a screenshot on failure and a trace on retry.

The test refuses a `mattscoinage.com` storefront origin and fails if the Stripe form uses a live key. It is excluded from ordinary storefront CI unless both environment variables are set. Run it after a checkout, Stripe app, or Saleor deployment against a configured sandbox. A passing sandbox check proves the integrated test-mode flow; a separate low-value live transaction and refund is needed to validate live acquiring, settlement, and production webhooks.
