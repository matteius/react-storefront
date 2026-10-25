import "server-only";

import { ProductListByCollectionDocument, ProductOrderField, OrderDirection } from "@/gql/graphql";
import { graphqlLanguageCodeVariables } from "@/lib/graphql-locale";
import { CACHE_PROFILES, cachedQuery } from "@/lib/saleor";

/**
 * Products from a collection for the homepage featured section.
 * A Saleor failure throws so the outage is not cached as an empty grid.
 */
export async function getFeaturedProducts(
	channel: string,
	localeSlug: string,
	limit = 12,
	collectionSlug = "featured-products",
) {
	"use cache";

	for (const slug of collectionSlug === "featured-products"
		? [collectionSlug, "sale-items"]
		: [collectionSlug]) {
		const data = await cachedQuery(ProductListByCollectionDocument, {
			profile: CACHE_PROFILES.collections,
			tag: slug,
			variables: {
				slug,
				channel,
				first: limit,
				sortBy: { field: ProductOrderField.Collection, direction: OrderDirection.Asc },
				...graphqlLanguageCodeVariables(localeSlug),
			},
		});
		const products = data.collection?.products?.edges.map(({ node }) => node) ?? [];
		if (products.length) return products;
	}
	return [];
}
