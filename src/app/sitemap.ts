import { type MetadataRoute } from "next";
import { DefaultChannelSlug } from "@/app/constants";
import { executeGraphQL } from "@/lib/graphql";
import { absoluteUrl } from "@/lib/canonical";
import {
	SitemapCategoriesDocument,
	SitemapCollectionsDocument,
	SitemapPagesDocument,
	SitemapProductsDocument,
} from "@/gql/graphql";

// The catalogue changes far more slowly than an hour; re-render on that cadence.
export const revalidate = 3600;

const PAGE_SIZE = 100;
// Safety valve: a misbehaving cursor can never spin this loop forever.
const MAX_PAGES = 50;

/*
 * Every browsable route is nested under the channel segment, so the sitemap has
 * to emit /{channel}/... URLs. Anything else 404s and would be dropped again.
 */
const channel = DefaultChannelSlug;

type Node = { slug: string; updatedAt?: string };
type Connection = {
	edges: ReadonlyArray<{ node: Node }>;
	pageInfo: { hasNextPage: boolean; endCursor?: string | null };
} | null;

/** Walk a Relay connection to exhaustion, tolerating an unavailable API. */
const collect = async (
	label: string,
	fetchPage: (after: string | null) => Promise<Connection>,
): Promise<Node[]> => {
	const nodes: Node[] = [];
	let after: string | null = null;

	try {
		for (let page = 0; page < MAX_PAGES; page++) {
			const connection: Connection = await fetchPage(after);
			if (!connection) {
				break;
			}

			nodes.push(...connection.edges.map((edge) => edge.node));

			if (!connection.pageInfo.hasNextPage || !connection.pageInfo.endCursor) {
				break;
			}
			after = connection.pageInfo.endCursor;
		}
	} catch (error) {
		/*
		 * A partial sitemap beats a 500. Losing one section is recoverable on the
		 * next revalidation; serving an error page teaches crawlers the sitemap is
		 * broken, which is the failure mode this file exists to fix.
		 */
		console.error(`sitemap: failed to load ${label}:`, error);
	}

	return nodes;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [products, categories, collections, pages] = await Promise.all([
		collect("products", async (after) => {
			const { products } = await executeGraphQL(SitemapProductsDocument, {
				variables: { first: PAGE_SIZE, after, channel },
				revalidate,
				withAuth: false,
			});
			return products ?? null;
		}),
		collect("categories", async (after) => {
			const { categories } = await executeGraphQL(SitemapCategoriesDocument, {
				variables: { first: PAGE_SIZE, after },
				revalidate,
				withAuth: false,
			});
			return categories ?? null;
		}),
		collect("collections", async (after) => {
			const { collections } = await executeGraphQL(SitemapCollectionsDocument, {
				variables: { first: PAGE_SIZE, after, channel },
				revalidate,
				withAuth: false,
			});
			return collections ?? null;
		}),
		collect("pages", async (after) => {
			const { pages } = await executeGraphQL(SitemapPagesDocument, {
				variables: { first: PAGE_SIZE, after },
				revalidate,
				withAuth: false,
			});
			return pages ?? null;
		}),
	]);

	const entries: MetadataRoute.Sitemap = [];
	const push = (
		path: string,
		options: {
			priority: number;
			changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
			lastModified?: string;
		},
	) => {
		const url = absoluteUrl(path);
		if (!url) {
			return;
		}
		entries.push({
			url,
			priority: options.priority,
			changeFrequency: options.changeFrequency,
			...(options.lastModified ? { lastModified: new Date(options.lastModified) } : {}),
		});
	};

	push(channel, { priority: 1, changeFrequency: "daily" });
	push(`${channel}/products`, { priority: 0.9, changeFrequency: "daily" });
	push(`${channel}/categories`, { priority: 0.7, changeFrequency: "weekly" });
	push(`${channel}/collections`, { priority: 0.7, changeFrequency: "weekly" });

	for (const product of products) {
		push(`${channel}/products/${encodeURIComponent(product.slug)}`, {
			priority: 0.8,
			changeFrequency: "weekly",
			lastModified: product.updatedAt,
		});
	}
	for (const category of categories) {
		push(`${channel}/categories/${encodeURIComponent(category.slug)}`, {
			priority: 0.6,
			changeFrequency: "weekly",
			lastModified: category.updatedAt,
		});
	}
	for (const collection of collections) {
		push(`${channel}/collections/${encodeURIComponent(collection.slug)}`, {
			priority: 0.6,
			changeFrequency: "weekly",
		});
	}
	for (const page of pages) {
		push(`${channel}/pages/${encodeURIComponent(page.slug)}`, {
			priority: 0.4,
			changeFrequency: "monthly",
		});
	}

	// Informational routes worth indexing; cart/account/search deliberately omitted.
	const staticPaths = [
		"about-us",
		"customer-support",
		"shipping-delivery",
		"return-policy",
		"secure-payments",
		"sales-tax",
		"investment-disclaimer",
		"privacy-policy",
		"terms-of-service",
	];
	for (const path of staticPaths) {
		push(`${channel}/${path}`, { priority: 0.3, changeFrequency: "yearly" });
	}

	return entries;
}
