import { type NextRequest, NextResponse } from "next/server";
import {
	attachFiefCookiesToResponse,
	buildCallbackUrl,
	exchangeFiefCode,
	type FiefTokenSet,
	getStorefrontOrigin,
	POST_LOGIN_REDIRECT_COOKIE,
} from "@/lib/fief";

export const dynamic = "force-dynamic";

function safeNextPath(raw: string | null | undefined): string {
	if (!raw) return "/";
	if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
	return raw;
}

export async function GET(request: NextRequest) {
	const code = request.nextUrl.searchParams.get("code");
	const state = request.nextUrl.searchParams.get("state");
	const error = request.nextUrl.searchParams.get("error");
	const nextCookie = request.cookies.get(POST_LOGIN_REDIRECT_COOKIE)?.value;
	const next = safeNextPath(nextCookie);

	// Use storefront origin from env — nextUrl.origin reflects the internal
	// pod address behind the Traefik proxy.
	const target = new URL(next, getStorefrontOrigin());

	if (error) {
		target.searchParams.set("auth_error", error);
		const response = NextResponse.redirect(target);
		response.cookies.delete(POST_LOGIN_REDIRECT_COOKIE);
		return response;
	}

	if (!code || !state) {
		target.searchParams.set("auth_error", "missing_code_or_state");
		const response = NextResponse.redirect(target);
		response.cookies.delete(POST_LOGIN_REDIRECT_COOKIE);
		return response;
	}

	let tokens: FiefTokenSet;
	try {
		tokens = await exchangeFiefCode({
			code,
			state,
			redirectUri: buildCallbackUrl(),
		});
	} catch (err) {
		console.error("Fief code exchange failed", err);
		target.searchParams.set("auth_error", "exchange_failed");
		const response = NextResponse.redirect(target);
		response.cookies.delete(POST_LOGIN_REDIRECT_COOKIE);
		return response;
	}

	// Default landing post-sign-in is the account dashboard. Only fall through
	// to `next` when the storefront supplied a non-root path (e.g. the user
	// clicked sign-in from a product page or the checkout CTA).
	const successTarget = next === "/" ? buildAccountTarget() : target;
	const response = NextResponse.redirect(successTarget);
	response.cookies.delete(POST_LOGIN_REDIRECT_COOKIE);
	attachFiefCookiesToResponse(response, tokens, {
		secure: getStorefrontOrigin().startsWith("https://"),
	});
	return response;
}

function buildAccountTarget(): URL {
	const channel = process.env.NEXT_PUBLIC_DEFAULT_CHANNEL || "default-channel";
	return new URL(`/${encodeURIComponent(channel)}/account`, getStorefrontOrigin());
}
