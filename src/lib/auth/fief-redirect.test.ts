import { describe, expect, it } from "vitest";
import { safeFiefNextPath } from "./fief-redirect";

describe("Fief return destinations", () => {
	it.each([
		null,
		undefined,
		"",
		"https://evil.example",
		"//evil.example",
		"/\\evil.example",
		"/\nevil.example",
		"/\tevil.example",
	])("rejects unsafe destination %j", (value) => {
		expect(safeFiefNextPath(value)).toBe("/");
	});
	it.each([
		"/en/default-channel/account",
		"/checkout?checkout=abc&locale=en",
		"/en/default-channel/products/coin",
	])("preserves the local flow %s", (value) => {
		expect(safeFiefNextPath(value)).toBe(value);
	});
});
