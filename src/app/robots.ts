import { type MetadataRoute } from "next";
import { DefaultChannelSlug } from "@/app/constants";
import { absoluteUrl, getStorefrontOrigin } from "@/lib/canonical";

export default function robots(): MetadataRoute.Robots {
	const sitemap = absoluteUrl("sitemap.xml");
	const host = getStorefrontOrigin();

	return {
		rules: {
			userAgent: "*",
			allow: "/",
			// Session-specific routes carry no ranking value and waste crawl budget.
			disallow: [
				"/api/",
				`/${DefaultChannelSlug}/cart`,
				`/${DefaultChannelSlug}/account`,
				`/${DefaultChannelSlug}/search`,
				"/checkout",
			],
		},
		...(sitemap ? { sitemap } : {}),
		...(host ? { host } : {}),
	};
}
