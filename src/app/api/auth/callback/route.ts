import { type NextRequest, NextResponse } from "next/server";
import {
	buildCallbackUrl,
	exchangeFiefCode,
	getStorefrontOrigin,
	persistFiefTokens,
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

	try {
		const tokens = await exchangeFiefCode({
			code,
			state,
			redirectUri: buildCallbackUrl(),
		});
		await persistFiefTokens(tokens);
	} catch (err) {
		console.error("Fief code exchange failed", err);
		target.searchParams.set("auth_error", "exchange_failed");
		const response = NextResponse.redirect(target);
		response.cookies.delete(POST_LOGIN_REDIRECT_COOKIE);
		return response;
	}

	const response = NextResponse.redirect(target);
	response.cookies.delete(POST_LOGIN_REDIRECT_COOKIE);
	return response;
}
