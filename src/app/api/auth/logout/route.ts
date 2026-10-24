import { type NextRequest, NextResponse } from "next/server";
import { clearFiefTokens, fiefLogout, getStorefrontOrigin } from "@/lib/fief";

export const dynamic = "force-dynamic";

function safeNextPath(raw: string | null): string {
	if (!raw) return "/";
	if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
	return raw;
}

async function handle(request: NextRequest) {
	const next = safeNextPath(request.nextUrl.searchParams.get("next"));
	const target = new URL(next, getStorefrontOrigin());

	const { refreshToken } = await clearFiefTokens();

	let endSessionUrl: string | null = null;
	if (refreshToken) {
		try {
			endSessionUrl = await fiefLogout(refreshToken);
		} catch (err) {
			console.error("Fief logout failed", err);
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
