import { invariant } from "ts-invariant";
import { getNextServerCookiesStorageAsync } from "@saleor/auth-sdk/next/server";

export const FIEF_PLUGIN_ID = process.env.FIEF_PLUGIN_ID || "saleor.app.fief";

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

export async function initiateFiefLogin(redirectUri: string): Promise<string> {
	const data = await postSaleor<ExternalAuthUrlResult>(EXTERNAL_AUTH_URL_MUTATION, {
		pluginId: FIEF_PLUGIN_ID,
		input: JSON.stringify({ redirectUri }),
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
}): Promise<FiefTokenSet> {
	const data = await postSaleor<ExternalObtainTokensResult>(EXTERNAL_OBTAIN_TOKENS_MUTATION, {
		pluginId: FIEF_PLUGIN_ID,
		input: JSON.stringify({ code: params.code, state: params.state, redirectUri: params.redirectUri }),
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

export async function clearFiefTokens(): Promise<{ refreshToken: string | null }> {
	const storage = await getNextServerCookiesStorageAsync();
	const refreshToken = storage.getItem(REFRESH_TOKEN_COOKIE);
	storage.removeItem(ACCESS_TOKEN_COOKIE);
	storage.removeItem(REFRESH_TOKEN_COOKIE);
	storage.setItem(AUTH_STATE_COOKIE, "signedOut");
	return { refreshToken };
}

export { EXTERNAL_REFRESH_MUTATION };
