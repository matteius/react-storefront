import { cookies } from "next/headers";
import { CurrentUserDocument, CurrentUserOrderListDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ACCESS_TOKEN_COOKIE, AUTH_STATE_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/fief";

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;

export async function isSignedIn(): Promise<boolean> {
	const store = await cookies();
	const state = store.get(AUTH_STATE_COOKIE)?.value;
	const access = store.get(ACCESS_TOKEN_COOKIE)?.value;
	const refresh = store.get(REFRESH_TOKEN_COOKIE)?.value;
	return state === "signedIn" && Boolean(access || refresh);
}

export async function getCurrentUser() {
	if (!(await isSignedIn())) return null;
	try {
		const { me } = await executeGraphQL(CurrentUserDocument, {
			withAuth: true,
			cache: "no-store",
		});
		return me ?? null;
	} catch {
		return null;
	}
}

export async function getCurrentUserWithOrders() {
	if (!(await isSignedIn())) return null;
	try {
		const { me } = await executeGraphQL(CurrentUserOrderListDocument, {
			withAuth: true,
			cache: "no-store",
		});
		return me ?? null;
	} catch {
		return null;
	}
}
