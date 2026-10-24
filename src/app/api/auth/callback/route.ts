import { getDefaultLocaleSlug } from "@/config/locale";
import { safeFiefNextPath, FIEF_LOGIN_STATE_COOKIE } from "@/lib/auth/fief-redirect";
import { type NextRequest, NextResponse } from "next/server";
import {
	attachFiefCookiesToResponse,
	buildCallbackUrl,
	exchangeFiefCode,
	type FiefTokenSet,
	getStorefrontOrigin,
	POST_LOGIN_REDIRECT_COOKIE,
} from "@/lib/auth/fief";

export async function GET(request: NextRequest) {
	const code = request.nextUrl.searchParams.get("code");
	const state = request.nextUrl.searchParams.get("state");
	const error = request.nextUrl.searchParams.get("error");
	const nextCookie = request.cookies.get(POST_LOGIN_REDIRECT_COOKIE)?.value;
	const next = safeFiefNextPath(nextCookie);

	// Use storefront origin from env — nextUrl.origin reflects the internal
	// pod address behind the Traefik proxy.
	const target = new URL(next, getStorefrontOrigin());

	if (error) {
		target.searchParams.set("auth_error", error);
		const response = NextResponse.redirect(target);
		response.cookies.delete(POST_LOGIN_REDIRECT_COOKIE);
		response.cookies.set(FIEF_LOGIN_STATE_COOKIE, "", { path: "/api/auth", maxAge: 0 });
		return response;
	}

	if (!code || !state || state !== request.cookies.get(FIEF_LOGIN_STATE_COOKIE)?.value) {
		target.searchParams.set("auth_error", "missing_code_or_state");
		const response = NextResponse.redirect(target);
		response.cookies.delete(POST_LOGIN_REDIRECT_COOKIE);
		response.cookies.set(FIEF_LOGIN_STATE_COOKIE, "", { path: "/api/auth", maxAge: 0 });
		return response;
	}

	let tokens: FiefTokenSet;
	try {
		tokens = await exchangeFiefCode({
			code,
			state,
			redirectUri: buildCallbackUrl(),
		});
	} catch {
		console.error("Fief code exchange failed");
		target.searchParams.set("auth_error", "exchange_failed");
		const response = NextResponse.redirect(target);
		response.cookies.delete(POST_LOGIN_REDIRECT_COOKIE);
		response.cookies.set(FIEF_LOGIN_STATE_COOKIE, "", { path: "/api/auth", maxAge: 0 });
		return response;
	}

	// Default landing post-sign-in is the account dashboard. Only fall through
	// to `next` when the storefront supplied a non-root path (e.g. the user
	// clicked sign-in from a product page or the checkout CTA).
	const successTarget = next === "/" ? buildAccountTarget() : target;
	const response = NextResponse.redirect(successTarget);
	response.cookies.delete(POST_LOGIN_REDIRECT_COOKIE);
	response.cookies.set(FIEF_LOGIN_STATE_COOKIE, "", { path: "/api/auth", maxAge: 0 });
	attachFiefCookiesToResponse(response, tokens, {
		secure: getStorefrontOrigin().startsWith("https://"),
	});
	return response;
}

function buildAccountTarget(): URL {
	const channel = process.env.NEXT_PUBLIC_DEFAULT_CHANNEL || "default-channel";
	return new URL(`/${getDefaultLocaleSlug()}/${encodeURIComponent(channel)}/account`, getStorefrontOrigin());
}
