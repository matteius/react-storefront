import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { CurrentUserDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export const dynamic = "force-dynamic";

interface CapturedFetch {
	url: string;
	method: string | undefined;
	headers: Record<string, string>;
	bodyHead?: string;
	status?: number;
	responseHead?: string;
}

/*
 * Wrap globalThis.fetch within a single async block so we can capture every
 * request the saleor-auth-sdk makes during executeGraphQL — URL + headers
 * (including Authorization) plus the response body. Restores the original
 * fetch on completion.
 */
async function withCapturedFetches<T>(
	fn: () => Promise<T>,
): Promise<{ result: T | undefined; error: string | undefined; calls: CapturedFetch[] }> {
	const calls: CapturedFetch[] = [];
	const original = globalThis.fetch;
	globalThis.fetch = (async (input, init) => {
		const url = typeof input === "string" ? input : "url" in input ? input.url : (input as URL).href;
		const headerEntries: Record<string, string> = {};
		const initHeaders = (init?.headers ?? {}) as Record<string, string> | Headers;
		if (initHeaders instanceof Headers) {
			initHeaders.forEach((v, k) => {
				headerEntries[k] = k.toLowerCase() === "authorization" ? `len=${v.length}` : v;
			});
		} else {
			for (const [k, v] of Object.entries(initHeaders)) {
				headerEntries[k] = k.toLowerCase() === "authorization" ? `len=${v.length}` : v;
			}
		}
		const captured: CapturedFetch = {
			url,
			method: init?.method,
			headers: headerEntries,
			bodyHead: typeof init?.body === "string" ? init.body.slice(0, 200) : undefined,
		};
		const res = await original(input as RequestInfo, init);
		captured.status = res.status;
		const cloned = res.clone();
		const text = await cloned.text();
		captured.responseHead = text.slice(0, 400);
		calls.push(captured);
		return res;
	}) as typeof fetch;
	try {
		const result = await fn();
		return { result, error: undefined, calls };
	} catch (err) {
		return {
			result: undefined,
			error: err instanceof Error ? err.message : String(err),
			calls,
		};
	} finally {
		globalThis.fetch = original;
	}
}

/*
 * Diagnostic endpoint: shows what cookies + headers the request actually
 * carries, plus the raw outcome of the `me` query the header relies on.
 * Surfaces errors that `getCurrentUser` swallows.
 */
export async function GET() {
	const store = await cookies();
	const hdrs = await headers();
	const all = store.getAll();
	const access = store.get("saleor_auth_access_token");
	const refresh = store.get("saleor_auth_module_refresh_token");

	// Peek at what the SDK actually sees from the cookie store.
	const sdkProbe: Record<string, unknown> = {};
	try {
		const { getServerAuthClient } = await import("@/app/config");
		const client = await getServerAuthClient();
		// @ts-expect-error - probing private surfaces for diagnostics only
		const accessHandler = client.accessTokenStorage as {
			getAccessToken: () => string | null;
			storage: { getItem: (key: string) => string | null };
		};
		// @ts-expect-error - same
		const refreshHandler = client.refreshTokenStorage as {
			getRefreshToken: () => string | null;
		};
		const sdkAccess = accessHandler.getAccessToken();
		const sdkRefresh = refreshHandler.getRefreshToken();
		sdkProbe.sdkAccess = sdkAccess ? `len=${sdkAccess.length}, head=${sdkAccess.slice(0, 30)}` : "null";
		sdkProbe.sdkRefresh = sdkRefresh ? `len=${sdkRefresh.length}, head=${sdkRefresh.slice(0, 30)}` : "null";
		// Try direct storage read at a few candidate keys
		for (const key of [
			"saleor_auth_access_token",
			"saleor_auth_module_refresh_token",
			"saleor_auth_module_auth_state",
		]) {
			const v = accessHandler.storage.getItem(key);
			sdkProbe[`raw:${key}`] = v ? `len=${v.length}, head=${v.slice(0, 30)}` : "null";
		}
	} catch (err) {
		sdkProbe.probeError = err instanceof Error ? err.message : String(err);
	}

	const captured = await withCapturedFetches(() =>
		executeGraphQL(CurrentUserDocument, {
			withAuth: true,
			cache: "no-store",
		}),
	);
	const meSurface = {
		ok: captured.error === undefined,
		data: captured.result,
		error: captured.error,
		fetches: captured.calls,
		sdkProbe,
	};

	return NextResponse.json({
		count: all.length,
		names: all.map((c) => c.name),
		auth: {
			access: access ? `len=${access.value.length}, head=${access.value.slice(0, 30)}` : "absent",
			refresh: refresh ? `len=${refresh.value.length}, head=${refresh.value.slice(0, 30)}` : "absent",
			state: store.get("saleor_auth_module_auth_state")?.value ?? "absent",
		},
		req: {
			cookieHeader: hdrs.get("cookie")?.length ?? 0,
			ua: hdrs.get("user-agent")?.slice(0, 80) ?? null,
		},
		me: meSurface,
	});
}
