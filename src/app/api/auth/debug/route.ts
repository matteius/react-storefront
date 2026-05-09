import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CurrentUserDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export const dynamic = "force-dynamic";

/*
 * Diagnostic endpoint: shows what auth-related cookies the server actually
 * sees, plus the raw outcome of the `me` query the header relies on.
 * Surfaces errors that `getCurrentUser` swallows. Will be removed once
 * sign-in is verified end-to-end.
 */
export async function GET() {
	const store = await cookies();
	const all = store.getAll();
	const access = store.get("saleor_auth_access_token");
	const refresh = store.get("saleor_auth_module_refresh_token");

	const meSurface: { ok?: boolean; data?: unknown; error?: string; stack?: string } = {};
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
		meSurface.stack = err instanceof Error ? err.stack : undefined;
	}

	return NextResponse.json({
		count: all.length,
		names: all.map((c) => c.name),
		auth: {
			access: access ? `len=${access.value.length}, head=${access.value.slice(0, 20)}` : "absent",
			refresh: refresh ? `len=${refresh.value.length}, head=${refresh.value.slice(0, 20)}` : "absent",
			state: store.get("saleor_auth_module_auth_state")?.value ?? "absent",
		},
		me: meSurface,
	});
}
