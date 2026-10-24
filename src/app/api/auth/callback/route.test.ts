import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
const exchange = vi.hoisted(() => vi.fn());
vi.mock("@/lib/auth/fief", () => ({
	exchangeFiefCode: exchange,
	getStorefrontOrigin: () => "https://mattscoinage.com",
	buildCallbackUrl: () => "https://mattscoinage.com/api/auth/callback",
	POST_LOGIN_REDIRECT_COOKIE: "fief_post_login_redirect",
	attachFiefCookiesToResponse: vi.fn(),
}));
import { GET } from "./route";

describe("Fief callback browser binding", () => {
	beforeEach(() => {
		exchange.mockReset();
	});
	it.each([undefined, "another-browser"])("rejects a missing or mismatched browser state", async (state) => {
		const headers = state ? { cookie: `fief_login_state=${state}` } : undefined;
		const response = await GET(
			new NextRequest("https://mattscoinage.com/api/auth/callback?code=code&state=expected", { headers }),
		);
		expect(exchange).not.toHaveBeenCalled();
		expect(response.headers.get("location")).toContain("auth_error=");
	});
	it("exchanges once and returns to the locale-aware checkout destination", async () => {
		exchange.mockResolvedValue({ token: "token", refreshToken: "refresh", csrfToken: null, user: null });
		const response = await GET(
			new NextRequest("https://mattscoinage.com/api/auth/callback?code=code&state=expected", {
				headers: { cookie: "fief_login_state=expected; fief_post_login_redirect=/checkout?checkout=abc" },
			}),
		);
		expect(exchange).toHaveBeenCalledTimes(1);
		expect(response.headers.get("location")).toBe("https://mattscoinage.com/checkout?checkout=abc");
		expect(response.headers.get("set-cookie")).toContain("fief_login_state=;");
	});
});
