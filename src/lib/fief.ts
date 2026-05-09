import { type NextResponse } from "next/server";
import { invariant } from "ts-invariant";
import { getNextServerCookiesStorageAsync } from "@saleor/auth-sdk/next/server";

export const FIEF_PLUGIN_ID = process.env.FIEF_PLUGIN_ID || "opensensor.fief";

export const ACCESS_TOKEN_COOKIE = "saleor_auth_access_token";
export const REFRESH_TOKEN_COOKIE = "saleor_auth_module_refresh_token";
export const AUTH_STATE_COOKIE = "saleor_auth_module_auth_state";
export const POST_LOGIN_REDIRECT_COOKIE = "fief_post_login_redirect";

const EXTERNAL_AUTH_URL_MUTATION = /* GraphQL */ `
	mutation ExternalAuthenticationUrl($pluginId: String!, $input: JSONString!) {
		externalAuthenticationUrl(pluginId: $pluginId, input: $input) {
			authenticationData
			errors {
				field
				message
				code
			}
		}
	}
`;

const EXTERNAL_OBTAIN_TOKENS_MUTATION = /* GraphQL */ `
	mutation ExternalObtainAccessTokens($pluginId: String!, $input: JSONString!) {
		externalObtainAccessTokens(pluginId: $pluginId, input: $input) {
			token
			refreshToken
			csrfToken
			user {
				id
				email
			}
			errors {
				field
				message
				code
			}
		}
	}
`;

const EXTERNAL_LOGOUT_MUTATION = /* GraphQL */ `
	mutation ExternalLogout($pluginId: String!, $input: JSONString!) {
		externalLogout(pluginId: $pluginId, input: $input) {
			logoutData
			errors {
				field
				message
				code
			}
		}
	}
`;

const EXTERNAL_REFRESH_MUTATION = /* GraphQL */ `
	mutation ExternalRefresh($pluginId: String!, $input: JSONString!) {
		externalRefresh(pluginId: $pluginId, input: $input) {
			token
			refreshToken
			user {
				id
				email
			}
			errors {
				field
				message
				code
			}
		}
	}
`;

interface SaleorErrorShape {
	field?: string | null;
	message?: string | null;
	code?: string | null;
}

interface ExternalAuthUrlResult {
	externalAuthenticationUrl: {
		authenticationData: string | null;
		errors: SaleorErrorShape[];
	};
}

interface ExternalObtainTokensResult {
	externalObtainAccessTokens: {
		token: string | null;
		refreshToken: string | null;
		csrfToken: string | null;
		user: { id: string; email: string } | null;
		errors: SaleorErrorShape[];
	};
}

interface ExternalLogoutResult {
	externalLogout: {
		logoutData: string | null;
		errors: SaleorErrorShape[];
	};
}

async function postSaleor<T>(query: string, variables: Record<string, unknown>): Promise<T> {
	const url = process.env.NEXT_PUBLIC_SALEOR_API_URL;
	invariant(url, "Missing NEXT_PUBLIC_SALEOR_API_URL env variable");

	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ query, variables }),
		cache: "no-store",
	});
	if (!response.ok) {
		throw new Error(`Saleor responded ${response.status}: ${await response.text()}`);
	}
	const body = (await response.json()) as { data?: T; errors?: { message: string }[] };
	if (body.errors?.length) {
		throw new Error(body.errors.map((error) => error.message).join("\n"));
	}
	if (!body.data) {
		throw new Error("Saleor returned no data");
	}
	return body.data;
}

function firstErrorMessage(errors: SaleorErrorShape[]): string {
	return errors.map((error) => error.message ?? error.code ?? "Unknown error").join("; ");
}

export function getStorefrontOrigin(): string {
	return process.env.NEXT_PUBLIC_STOREFRONT_URL || "http://localhost:3000";
}

export function buildCallbackUrl(): string {
	return `${getStorefrontOrigin().replace(/\/$/, "")}/api/auth/callback`;
}

function getSaleorApiUrl(): string {
	const url = process.env.NEXT_PUBLIC_SALEOR_API_URL;
	invariant(url, "Missing NEXT_PUBLIC_SALEOR_API_URL env variable");
	return url;
}

function getDefaultChannel(): string {
	return process.env.NEXT_PUBLIC_DEFAULT_CHANNEL || "default-channel";
}

export async function initiateFiefLogin(
	redirectUri: string,
	channelSlug: string = getDefaultChannel(),
): Promise<string> {
	const data = await postSaleor<ExternalAuthUrlResult>(EXTERNAL_AUTH_URL_MUTATION, {
		pluginId: FIEF_PLUGIN_ID,
		input: JSON.stringify({
			redirectUri,
			saleorApiUrl: getSaleorApiUrl(),
			channelSlug,
		}),
	});
	const { authenticationData, errors } = data.externalAuthenticationUrl;
	if (errors?.length) {
		throw new Error(`externalAuthenticationUrl: ${firstErrorMessage(errors)}`);
	}
	if (!authenticationData) {
		throw new Error("externalAuthenticationUrl returned empty authenticationData");
	}
	const parsed = JSON.parse(authenticationData) as { authorizationUrl?: string };
	if (!parsed.authorizationUrl) {
		throw new Error("externalAuthenticationUrl missing authorizationUrl");
	}
	return parsed.authorizationUrl;
}

export interface FiefTokenSet {
	token: string;
	refreshToken: string;
	csrfToken: string | null;
	user: { id: string; email: string } | null;
}

export async function exchangeFiefCode(params: {
	code: string;
	state: string;
	redirectUri: string;
	channelSlug?: string;
}): Promise<FiefTokenSet> {
	const data = await postSaleor<ExternalObtainTokensResult>(EXTERNAL_OBTAIN_TOKENS_MUTATION, {
		pluginId: FIEF_PLUGIN_ID,
		input: JSON.stringify({
			code: params.code,
			state: params.state,
			redirectUri: params.redirectUri,
			saleorApiUrl: getSaleorApiUrl(),
			channelSlug: params.channelSlug ?? getDefaultChannel(),
		}),
	});
	const { token, refreshToken, csrfToken, user, errors } = data.externalObtainAccessTokens;
	if (errors?.length) {
		throw new Error(`externalObtainAccessTokens: ${firstErrorMessage(errors)}`);
	}
	if (!token || !refreshToken) {
		throw new Error("externalObtainAccessTokens did not return tokens");
	}
	return { token, refreshToken, csrfToken: csrfToken ?? null, user: user ?? null };
}

export async function fiefLogout(refreshToken: string): Promise<string | null> {
	const data = await postSaleor<ExternalLogoutResult>(EXTERNAL_LOGOUT_MUTATION, {
		pluginId: FIEF_PLUGIN_ID,
		input: JSON.stringify({ refreshToken }),
	});
	const { logoutData, errors } = data.externalLogout;
	if (errors?.length) {
		throw new Error(`externalLogout: ${firstErrorMessage(errors)}`);
	}
	if (!logoutData) {
		return null;
	}
	const parsed = JSON.parse(logoutData) as { logoutUrl?: string };
	return parsed.logoutUrl ?? null;
}

export async function persistFiefTokens(tokens: FiefTokenSet): Promise<void> {
	const storage = await getNextServerCookiesStorageAsync();
	storage.setItem(ACCESS_TOKEN_COOKIE, tokens.token);
	storage.setItem(REFRESH_TOKEN_COOKIE, tokens.refreshToken);
	storage.setItem(AUTH_STATE_COOKIE, "signedIn");
}

/*
 * Try to read the JWT `exp` claim so the cookie expires alongside the token
 * — fall through to a session cookie if the token isn't a valid JWT (e.g.
 * the AUTH_STATE_COOKIE value "signedIn"). Mirrors the saleor-auth-sdk's
 * own helper but lives on our side so we don't depend on the SDK's silently
 * try/catch'd cookie storage when persisting via NextResponse directly.
 */
function tryGetJwtExpiry(token: string): Date | undefined {
	try {
		const segment = token.split(".")[1];
		if (!segment) return undefined;
		const padded = segment + "=".repeat((4 - (segment.length % 4)) % 4);
		const payload = JSON.parse(
			Buffer.from(padded.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8"),
		) as { exp?: number };
		if (typeof payload.exp !== "number") return undefined;
		const nowSeconds = Date.now() / 1000;
		if (payload.exp <= nowSeconds) return undefined;
		return new Date(payload.exp * 1000);
	} catch {
		return undefined;
	}
}

/*
 * Set the auth cookies via raw `Set-Cookie` headers. We tried both the
 * saleor-auth-sdk's `cookies().set(...)` (silently try/catch'd) and
 * `response.cookies.set(...)`; in Next 16 production, only two of three
 * cookie sets reliably make it to the browser when used with
 * `NextResponse.redirect`. Going to the lowest-level API
 * (`response.headers.append("Set-Cookie", ...)`) sidesteps all of that
 * — every browser receives every cookie on the redirect.
 */
function buildSetCookieValue(
	name: string,
	value: string,
	options: { secure: boolean; expires?: Date },
): string {
	const parts = [`${name}=${encodeURIComponent(value)}`, "Path=/", "HttpOnly", "SameSite=Lax"];
	if (options.secure) parts.push("Secure");
	if (options.expires) parts.push(`Expires=${options.expires.toUTCString()}`);
	return parts.join("; ");
}

export function attachFiefCookiesToResponse(
	response: NextResponse,
	tokens: FiefTokenSet,
	options: { secure: boolean },
): void {
	/*
	 * Use the **refresh token's** expiry for both cookies. Saleor's access
	 * token JWT has a 5-minute `exp`; if we tie the cookie's Expires
	 * attribute to that, the browser deletes the access cookie 5 minutes
	 * after sign-in and the SDK's `fetchWithAuth` only sees the refresh
	 * cookie thereafter — token-refresh on a Next-server cookie store
	 * doesn't reliably write the new access value back to the response,
	 * so the user permanently appears unauthenticated. Letting the
	 * cookie outlive the JWT is fine: the JWT's own `exp` still governs
	 * validity, the SDK still triggers refresh on expiry, and at least
	 * the cookie is sitting there to be replaced in-place.
	 */
	const cookieExpiry = tryGetJwtExpiry(tokens.refreshToken);
	response.headers.append(
		"Set-Cookie",
		buildSetCookieValue(ACCESS_TOKEN_COOKIE, tokens.token, {
			secure: options.secure,
			expires: cookieExpiry,
		}),
	);
	response.headers.append(
		"Set-Cookie",
		buildSetCookieValue(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
			secure: options.secure,
			expires: cookieExpiry,
		}),
	);
	response.headers.append(
		"Set-Cookie",
		buildSetCookieValue(AUTH_STATE_COOKIE, "signedIn", {
			secure: options.secure,
			expires: cookieExpiry,
		}),
	);
}

export async function clearFiefTokens(): Promise<{ refreshToken: string | null }> {
	const storage = await getNextServerCookiesStorageAsync();
	const refreshToken = storage.getItem(REFRESH_TOKEN_COOKIE);
	storage.removeItem(ACCESS_TOKEN_COOKIE);
	storage.removeItem(REFRESH_TOKEN_COOKIE);
	storage.setItem(AUTH_STATE_COOKIE, "signedOut");
	return { refreshToken };
}

export { EXTERNAL_REFRESH_MUTATION };
