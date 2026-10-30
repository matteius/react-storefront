import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";

process.env.NEXT_PUBLIC_DEFAULT_CHANNEL = "default-channel";
process.env.STOREFRONT_CHANNELS = "default-channel";
const { middleware } = await import("./middleware");

describe("legacy storefront locale URLs", () => {
	it("redirects a bookmarked homepage without losing its query", async () => {
		const response = await middleware(
			new NextRequest("https://www.mattscoinage.com/en/default-channel/en-US?utm_source=bookmark"),
		);
		expect(response.status).toBe(308);
		expect(response.headers.get("location")).toBe(
			"https://www.mattscoinage.com/en/default-channel?utm_source=bookmark",
		);
	});

	it("preserves the destination after the obsolete locale segment", async () => {
		const response = await middleware(
			new NextRequest("https://www.mattscoinage.com/en/default-channel/en-US/products"),
		);
		expect(response.headers.get("location")).toBe("https://www.mattscoinage.com/en/default-channel/products");
	});
});

describe("multipart request boundary", () => {
	it("rejects malformed data before rendering", async () => {
		const response = await middleware(
			new NextRequest("https://www.mattscoinage.com/en/default-channel", {
				method: "POST",
				headers: { "content-type": "multipart/form-data; boundary=fixture" },
				body: "invalid",
			}),
		);
		expect(response.status).toBe(400);
	});
});
