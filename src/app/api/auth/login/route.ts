import { type NextRequest, NextResponse } from "next/server";
import {
	buildCallbackUrl,
	getStorefrontOrigin,
	initiateFiefLogin,
	POST_LOGIN_REDIRECT_COOKIE,
} from "@/lib/fief";

export const dynamic = "force-dynamic";

function safeNextPath(raw: string | null): string {
	if (!raw) return "/";
	if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
	return raw;
}

export async function GET(request: NextRequest) {
	const next = safeNextPath(request.nextUrl.searchParams.get("next"));

	let authorizationUrl: string;
	try {
		authorizationUrl = await initiateFiefLogin(buildCallbackUrl());
	} catch (error) {
		console.error("Fief login init failed", error);
		// Use NEXT_PUBLIC_STOREFRONT_URL — request.nextUrl.origin reflects the
		// internal pod address behind the Traefik proxy (e.g. localhost:3000).
		const fallback = new URL(next, getStorefrontOrigin());
		fallback.searchParams.set("auth_error", "login_init_failed");
		return NextResponse.redirect(fallback);
	}

	const response = NextResponse.redirect(authorizationUrl);
	response.cookies.set(POST_LOGIN_REDIRECT_COOKIE, next, {
		httpOnly: true,
		sameSite: "lax",
		secure: request.nextUrl.protocol === "https:",
		path: "/",
		maxAge: 600,
	});
	return response;
}
