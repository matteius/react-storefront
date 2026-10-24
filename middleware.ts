import { NextResponse ,type  NextRequest } from "next/server";
import { DefaultChannelSlug } from "@/app/constants";

/*
 * Top-level segments that are real routes rather than channel slugs. They must
 * reach the app untouched.
 */
const RESERVED_SEGMENTS: readonly string[] = ["checkout", "api", "_next", "public"];

/*
 * Other Saleor channels on the shared instance. A visitor arriving on a URL
 * scoped to one of these gets permanently sent to this storefront's channel so
 * the ranking signal consolidates on a single address.
 *
 * Anything NOT in this set is simply an unknown URL: it falls through and the
 * `[channel]` layout answers 404. Blanket-redirecting every unmatched path to
 * the home page (the previous behaviour) is what search engines classify as a
 * soft 404 — it made the site look like an unlimited supply of duplicate home
 * pages instead of a store with a finite catalogue.
 */
const ALTERNATE_CHANNEL_SLUGS: readonly string[] = ["open-sensor", "opensensor-ocr", "owlbooks"];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Split the leading segment from the remainder so the rest of the path can be
	// carried across a channel redirect without re-deriving it from `segment`.
	const match = /^\/([^/]+)(\/.*)?$/.exec(pathname);
	const segment: string = match?.[1] ?? "";
	const rest: string = match?.[2] ?? "";

	if (!segment) {
		return NextResponse.next();
	}

	// Static assets slip through the matcher only rarely, but never rewrite them.
	if (segment.includes(".")) {
		return NextResponse.next();
	}

	if (segment === DefaultChannelSlug || RESERVED_SEGMENTS.includes(segment)) {
		return NextResponse.next();
	}

	if (ALTERNATE_CHANNEL_SLUGS.includes(segment)) {
		const url = request.nextUrl.clone();
		url.pathname = `/${DefaultChannelSlug}${rest}`;
		return NextResponse.redirect(url, 308);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public files (public folder)
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
	],
};
