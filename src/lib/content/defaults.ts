import { brandConfig } from "@/config/brand";
import { STOREFRONT_CONTENT_VERSION, type StorefrontContent } from "@/lib/content/types";

/**
 * Code fallback for all storefront marketing copy.
 * Saleor PageType overrides merge on top when CONTENT_PROVIDER=saleor.
 *
 * English SoT for editorial copy — export to Configurator seed: pnpm content:export-seed
 */
export const defaultStorefrontContent = {
	version: STOREFRONT_CONTENT_VERSION,
	// Single source of truth for channel-wide facts. Copy references these via
	// `{freeShippingThreshold}` / `{returnsWindowDays}` tokens instead of baking the
	// numbers into strings, so the cart math, announcement, and trust labels never drift.
	policies: {
		shipping: {
			freeShippingThreshold: 20,
		},
		returns: {
			windowDays: 7,
		},
	},
	chrome: {
		announcementBar: {
			id: "",
			message: "Free shipping on orders over {freeShippingThreshold}",
			href: null,
			linkLabel: null,
			dismissible: true,
		},
		nav: {
			allProductsLabel: "All",
			viewAllLabel: "View all {label}",
		},
	},
	surfaces: {
		homepage: {
			hero: {
				heading: "Discover collectible coins",
				subheading: brandConfig.tagline,
				primaryCtaLabel: "Shop all",
			},
			featuredCollection: {
				heading: "Featured products",
				collectionSlug: "sale-items",
				limit: 8,
			},
			categories: {
				heading: "Shop by category",
			},
			photoCredits: [],
			brandStory: {
				heading: "Our story",
				paragraphs: [
					"Mattscoinage brings collectors authentic coins, currency and precious metals.",
					"Founded in 2022 and operated by OpenSensor Engineering LLC in Maine, USA.",
				],
			},
			values: {
				heading: "Why shop with us",
				columns: [
					{
						title: "Quality",
						text: "Authentic collectibles with detailed descriptions and photographs.",
					},
					{
						title: "Shipping",
						text: "Orders ship within seven business days of payment and acknowledgement.",
					},
					{
						title: "Returns",
						text: "Request return authorization within {returnsWindowDays} days. See our return policy for conditions and fees.",
					},
				],
				columnsDesktop: 3,
			},
			editorial: {
				heading: "From the shop",
				paragraphs: ["Explore coins, currency and precious metals for your collection."],
				imagePosition: "right",
				ctaLabel: "Browse all products",
				image: null,
				imageAlt: "",
			},
		},
		products: {
			title: "All Products",
			description: "Browse our full catalog.",
		},
		cart: {
			empty: {
				title: "Your bag is empty",
				body: "Looks like you haven't added anything to your bag yet.",
				ctaLabel: "Start Shopping",
			},
			trust: {
				freeShippingPrefix: "Free delivery over",
				returnsLabel: "{returnsWindowDays}-day returns",
			},
			drawer: {
				title: "Your Bag",
				addForFreeShipping: "Add {amount} more for free shipping",
				freeShippingQualified: "You qualify for free shipping!",
			},
		},
		checkout: {
			emptyCart: {
				title: "Your cart is empty",
				body: "Looks like you haven't added anything to your cart yet.",
				startShoppingLabel: "Start Shopping",
				goBackLabel: "Go back",
			},
			emptySession: {
				title: "Your cart is empty",
				message: "Add items from the store, then return here to complete your purchase.",
			},
			marketingOptInLabel: "Email me with news and offers",
			trust: {
				secureCheckout: "Secure checkout",
				stripeProcessor: "Payments processed by Stripe",
			},
		},
	},
} satisfies StorefrontContent;
