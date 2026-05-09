import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/*
 * Diagnostic endpoint: shows what auth-related cookies the server actually
 * sees on a request. Useful when the browser claims it stored a cookie but
 * downstream `getCurrentUser()` returns null. Will be removed once sign-in
 * is verified end-to-end.
 */
export async function GET() {
	const store = await cookies();
	const all = store.getAll();
	return NextResponse.json({
		count: all.length,
		names: all.map((c) => c.name),
		auth: {
			access: store.get("saleor_auth_access_token") ? "present" : "absent",
			refresh: store.get("saleor_auth_module_refresh_token") ? "present" : "absent",
			state: store.get("saleor_auth_module_auth_state")?.value ?? "absent",
		},
	});
}
