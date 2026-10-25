import { expect, test, type Frame, type Page } from "@playwright/test";

const productPath = process.env.PURCHASE_E2E_PRODUCT_PATH;
const baseUrl = process.env.PLAYWRIGHT_BASE_URL;
const isProductionHost = baseUrl ? /(^|\.)mattscoinage\.com$/.test(new URL(baseUrl).hostname) : false;
const isRelativeProductPath = Boolean(productPath?.startsWith("/") && !productPath.startsWith("//"));

async function cardFrame(page: Page): Promise<Frame> {
	await expect
		.poll(
			async () => {
				for (const frame of page.frames()) {
					if (
						(await frame
							.locator('input[name="number"]')
							.count()
							.catch(() => 0)) > 0
					)
						return true;
				}
				return false;
			},
			{ timeout: 30_000 },
		)
		.toBe(true);
	for (const frame of page.frames()) {
		if (
			frame.url().startsWith("https://js.stripe.com/") &&
			(await frame
				.locator('input[name="number"]')
				.count()
				.catch(() => 0)) > 0
		)
			return frame;
	}
	throw new Error("Stripe card input frame disappeared");
}

test.describe("Stripe sandbox purchase", () => {
	test.describe.configure({ mode: "serial", timeout: 180_000 });
	test.skip(
		!productPath || !baseUrl,
		"Set PLAYWRIGHT_BASE_URL and PURCHASE_E2E_PRODUCT_PATH for a Stripe sandbox storefront",
	);
	test.beforeAll(() => {
		if (isProductionHost || !isRelativeProductPath) {
			throw new Error("Purchase E2E requires a nonproduction storefront and a relative product path");
		}
	});

	async function reachPayment(page: Page) {
		const observedKeyModes = new Set<string>();
		page.on("request", (request) => {
			if (!request.url().startsWith("https://api.stripe.com/")) return;
			const requestText = `${request.url()} ${JSON.stringify(request.headers())}`;
			for (const match of requestText.matchAll(/pk_(test|live)_[A-Za-z0-9]+/g)) {
				observedKeyModes.add(match[1]!);
			}
		});

		await page.goto(productPath!);
		await expect(page.locator("h1").first()).toBeVisible();
		await page
			.getByRole("button", { name: /add to (cart|bag)/i })
			.first()
			.click();
		await expect
			.poll(async () => {
				const cookies = await page.context().cookies();
				return cookies.find((cookie) => cookie.name.startsWith("checkoutId-") && cookie.value)?.value;
			})
			.not.toBeFalsy();
		const cookies = await page.context().cookies();
		const id = cookies.find((cookie) => cookie.name.startsWith("checkoutId-") && cookie.value)?.value;
		if (!id) throw new Error("Cart did not create a Saleor checkout");

		await page.goto(`/checkout?checkout=${encodeURIComponent(id)}&step=contact&locale=en`);
		await page.locator('input[name="email"]').fill(`purchase-qa-${Date.now()}@example.invalid`);
		await page.locator('select[name="countryCode"]').selectOption("US");
		for (const [field, value] of Object.entries({
			firstName: "Purchase",
			lastName: "QA",
			streetAddress1: "100 Test Street",
			city: "New York",
			postalCode: "10001",
			countryArea: "NY",
		})) {
			const input = page.locator(`[name="${field}"]`);
			if (!(await input.count())) continue;
			if ((await input.evaluate((element) => element.tagName)) === "SELECT") {
				await input.selectOption(value);
			} else {
				await input.fill(value);
			}
		}
		await page.getByRole("button", { name: /continue to shipping/i }).click();
		await expect(page).toHaveURL(/step=shipping/);
		await page.locator('input[name="shipping"]').first().check({ force: true });
		await page.getByRole("button", { name: /continue to payment/i }).click();
		await expect(page).toHaveURL(/step=payment/);

		await expect.poll(() => observedKeyModes.size, { timeout: 30_000 }).toBeGreaterThan(0);
		expect(
			[...observedKeyModes],
			"Refusing test cards unless the rendered Stripe form uses only test keys",
		).toEqual(["test"]);
		await expect((await cardFrame(page)).locator('input[name="number"]')).toBeVisible();
	}

	async function fillCard(page: Page, number: string) {
		const frame = await cardFrame(page);
		await frame.locator('input[name="number"]').fill(number);
		await frame.locator('input[name="expiry"]').fill("12/34");
		await frame.locator('input[name="cvc"]').fill("123");
	}

	test("Visa test card creates an order confirmation", async ({ page }) => {
		await reachPayment(page);
		await fillCard(page, "4242424242424242");
		await page.getByRole("button", { name: /^pay\b/i }).click();
		await expect(page).toHaveURL(/\/order\/[^/?]+/, { timeout: 90_000 });
		await expect(page.locator("h1")).toBeVisible();
		await expect(page.getByText(/order\s*#/i).first()).toBeVisible();
	});

	test("declined test card keeps the shopper at payment", async ({ page }) => {
		await reachPayment(page);
		await fillCard(page, "4000000000009995");
		await page.getByRole("button", { name: /^pay\b/i }).click();
		await expect(page.getByText(/declined/i).first()).toBeVisible({ timeout: 45_000 });
		await expect(page).toHaveURL(/\/checkout\?.*step=payment/);
	});
});
