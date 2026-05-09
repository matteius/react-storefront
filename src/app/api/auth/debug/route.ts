import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { CurrentUserDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export const dynamic = "force-dynamic";

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

	const meSurface: { ok?: boolean; data?: unknown; error?: string } = {};
	try {
		const result = await executeGraphQL(CurrentUserDocument, {
			withAuth: true,
			cache: "no-store",
		});
		meSurface.ok = true;
		meSurface.data = result;
	} catch (err) {
		meSurface.ok = false;
		meSurface.error = err instanceof Error ? err.message : String(err);
	}

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
