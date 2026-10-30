import { describe, expect, it } from "vitest";
import { validateMultipartRequest } from "@/multipart-request";

const url = "https://storefront.example/en/default-channel";
const multipart = (body: string, type = "multipart/form-data; boundary=fixture") =>
	new Request(url, { method: "POST", headers: { "content-type": type }, body });

describe("multipart request validation", () => {
	it.each([
		["anything", "multipart/form-data"],
		["no delimiter", "multipart/form-data; boundary=fixture"],
		["--wrong--\r\n", "multipart/form-data; boundary=fixture"],
		[
			"--fixture\r\nContent-Disposition: form-data; name=field\r\n\r\ntruncated",
			"multipart/form-data; boundary=fixture",
		],
	])("returns 400 for malformed bodies without disclosing parser errors", async (body, type) => {
		const response = await validateMultipartRequest(multipart(body, type));
		expect(response?.status).toBe(400);
		expect(await response?.text()).toBe("Malformed multipart body");
		expect(response?.headers.get("cache-control")).toBe("no-store");
	});

	it("preserves a valid native form without requiring a Next-Action header", async () => {
		const form = new FormData();
		form.set("$ACTION_ID_fixture", "");
		form.set("name", "synthetic value");
		form.set("file", new Blob(["fixture content"]), "fixture.txt");
		const request = new Request(url, { method: "POST", body: form });
		expect(await validateMultipartRequest(request)).toBeUndefined();
		expect(request.bodyUsed).toBe(false);
		const original = await request.formData();
		expect(original.get("name")).toBe("synthetic value");
		expect(await (original.get("file") as File).text()).toBe("fixture content");
	});

	it("enforces the limit even without Content-Length", async () => {
		const response = await validateMultipartRequest(multipart("x".repeat(1024 * 1024 + 1)));
		expect(response?.status).toBe(413);
	});

	it("rejects a declared oversized body before reading", async () => {
		const request = multipart("fixture");
		request.headers.set("content-length", String(1024 * 1024 + 1));
		expect((await validateMultipartRequest(request))?.status).toBe(413);
		expect(request.bodyUsed).toBe(false);
	});

	it("ignores GET and non-multipart actions", async () => {
		expect(await validateMultipartRequest(new Request(url))).toBeUndefined();
		const request = new Request(url, { method: "POST", body: "plain action" });
		expect(await validateMultipartRequest(request)).toBeUndefined();
		expect(await request.text()).toBe("plain action");
	});
});
