/*
 * Absolute-URL helpers for SEO metadata.
 *
 * NEXT_PUBLIC_STOREFRONT_URL is injected as a Docker build arg and has
 * historically carried a trailing slash, which produced canonicals like
 * `https://www.mattscoinage.com//products/foo` — a URL that 404s, telling
 * search engines to drop the page. Normalise the origin in one place so
 * callers can't reintroduce it.
 */

export const getStorefrontOrigin = (): string | undefined => {
	const raw = process.env.NEXT_PUBLIC_STOREFRONT_URL;
	if (!raw) {
		return undefined;
	}
	return raw.trim().replace(/\/+$/, "");
};

/** Build an absolute URL from a site-relative path, or undefined when the origin isn't configured. */
export const absoluteUrl = (path: string): string | undefined => {
	const origin = getStorefrontOrigin();
	if (!origin) {
		return undefined;
	}
	return `${origin}/${path.replace(/^\/+/, "")}`;
};

/*
 * Product pages live at /{channel}/products/{slug}. The channel segment is not
 * optional — omitting it yields a 404, so it must be part of the canonical.
 */
export const getProductCanonical = (channel: string, slug: string): string | undefined =>
	absoluteUrl(`${channel}/products/${encodeURIComponent(slug)}`);
