import { safeFiefNextPath, FIEF_LOGIN_STATE_COOKIE } from "@/lib/auth/fief-redirect";
import { NextRequest, NextResponse } from "next/server";
import { rejectIfRateLimited } from "@/lib/auth/auth-rate-limit";

import {
	buildCallbackUrl,
	getStorefrontOrigin,
	initiateFiefLogin,
	POST_LOGIN_REDIRECT_COOKIE,
} from "@/lib/auth/fief";

export async function GET(request: NextRequest) {
	const limited = rejectIfRateLimited(request, "login");
	if (limited) return limited;
	const next = safeFiefNextPath(request.nextUrl.searchParams.get("next"));

	let authorizationUrl: string;
	try {
		authorizationUrl = await initiateFiefLogin(buildCallbackUrl());
	} catch {
		console.error("Fief login init failed");
		// Use NEXT_PUBLIC_STOREFRONT_URL — request.nextUrl.origin reflects the
		// internal pod address behind the Traefik proxy (e.g. localhost:3000).
		const fallback = new URL(next, getStorefrontOrigin());
		fallback.searchParams.set("auth_error", "login_init_failed");
		return NextResponse.redirect(fallback);
	}

	const state = new URL(authorizationUrl).searchParams.get("state");
	if (!state) return NextResponse.json({ error: "Authentication unavailable" }, { status: 502 });
	const response = NextResponse.redirect(authorizationUrl);
	response.cookies.set(FIEF_LOGIN_STATE_COOKIE, state, {
		httpOnly: true,
		sameSite: "lax",
		secure: getStorefrontOrigin().startsWith("https://"),
		path: "/api/auth",
		maxAge: 600,
	});
	response.cookies.set(POST_LOGIN_REDIRECT_COOKIE, next, {
		httpOnly: true,
		sameSite: "lax",
		secure: getStorefrontOrigin().startsWith("https://"),
		path: "/",
		maxAge: 600,
	});
	return response;
}
