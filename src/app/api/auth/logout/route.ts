import { safeFiefNextPath } from "@/lib/auth/fief-redirect";
import { type NextRequest, NextResponse } from "next/server";
import { clearFiefTokens, fiefLogout, getStorefrontOrigin } from "@/lib/auth/fief";

async function handle(request: NextRequest) {
	const next = safeFiefNextPath(request.nextUrl.searchParams.get("next"));
	const target = new URL(next, getStorefrontOrigin());

	const { refreshToken } = await clearFiefTokens();

	let endSessionUrl: string | null = null;
	if (refreshToken) {
		try {
			endSessionUrl = await fiefLogout(refreshToken);
		} catch {
			console.error("Fief logout failed");
		}
	}

	if (endSessionUrl) {
		try {
			const url = new URL(endSessionUrl);
			if (!url.searchParams.has("post_logout_redirect_uri")) {
				url.searchParams.set("post_logout_redirect_uri", target.toString());
			}
			return NextResponse.redirect(url.toString());
		} catch {
			// fall through to local redirect
		}
	}

	return NextResponse.redirect(target);
}

export async function GET(request: NextRequest) {
	return handle(request);
}

export async function POST(request: NextRequest) {
	return handle(request);
}
