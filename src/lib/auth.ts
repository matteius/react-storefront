import { cookies } from "next/headers";
import { CurrentUserDocument, CurrentUserOrderListDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/fief";

export type CurrentUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;

/*
 * Treat the user as signed in when an access OR refresh token is present.
 * The saleor-auth-sdk also stores a separate "auth state" cookie, but we
 * don't depend on it — the JWT presence is the source of truth, and the
 * SDK's `fetchWithAuth` only reads the access token to authenticate
 * requests, not the state marker.
 */
export async function isSignedIn(): Promise<boolean> {
	const store = await cookies();
	const access = store.get(ACCESS_TOKEN_COOKIE)?.value;
	const refresh = store.get(REFRESH_TOKEN_COOKIE)?.value;
	return Boolean(access || refresh);
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
