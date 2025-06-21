import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export const metadata = {
	title: "Matt's Coinage - Premium Collectible Coins & Currency",
	description:
		"Discover rare and collectible coins, currency, and numismatic treasures at Matt's Coinage. Your trusted source for premium collectibles.",
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel: params.channel,
		},
		revalidate: 60,
	});

	const products = data.collection?.products?.edges.map(({ node: product }) => product) || [];

	return (
		<div className="min-h-screen">
			{/* News Bar */}
			<div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-4 py-2 text-white">
				<div className="mx-auto max-w-7xl text-center">
					<p className="text-sm font-medium">
						🎉 Free shipping on orders over $20 • Sale items updated monthly • Trusted since 2022
					</p>
				</div>
			</div>

			{/* Hero Section */}
			<section className="bg-gradient-to-br from-amber-50 to-yellow-50 py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="mb-6 text-4xl font-bold text-amber-900 md:text-6xl">Premium Collectible Coins</h1>
						<p className="mx-auto mb-8 max-w-3xl text-xl text-amber-700 md:text-2xl">
							Discover exceptional deals on rare coins, ancient treasures, and collectible currency.
							Hand-selected pieces at competitive prices with new sale items added regularly.
						</p>
						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<LinkWithChannel
								href="/collections/sale-items"
								className="rounded-lg bg-amber-600 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-amber-700"
							>
								Shop Sale Items
							</LinkWithChannel>
							<LinkWithChannel
								href="/collections"
								className="rounded-lg border-2 border-amber-600 px-8 py-3 font-semibold text-amber-600 transition-colors duration-200 hover:bg-amber-600 hover:text-white"
							>
								Browse All Collections
							</LinkWithChannel>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Categories */}
			<section className="bg-white py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<h2 className="mb-12 text-center text-3xl font-bold text-amber-900">Shop by Category</h2>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
						<div className="group cursor-pointer">
							<div className="rounded-lg bg-gradient-to-br from-amber-100 to-yellow-100 p-8 text-center transition-shadow duration-200 hover:shadow-lg">
								<div className="mb-4 text-4xl">🪙</div>
								<h3 className="mb-2 text-xl font-semibold text-amber-800">Ancient Coins</h3>
								<p className="text-gray-600">Historical treasures from ancient civilizations</p>
							</div>
						</div>
						<div className="group cursor-pointer">
							<div className="rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 p-8 text-center transition-shadow duration-200 hover:shadow-lg">
								<div className="mb-4 text-4xl">🥈</div>
								<h3 className="mb-2 text-xl font-semibold text-gray-800">Silver Coins</h3>
								<p className="text-gray-600">Premium silver collectibles and bullion</p>
							</div>
						</div>
						<div className="group cursor-pointer">
							<div className="rounded-lg bg-gradient-to-br from-yellow-100 to-amber-100 p-8 text-center transition-shadow duration-200 hover:shadow-lg">
								<div className="mb-4 text-4xl">🥇</div>
								<h3 className="mb-2 text-xl font-semibold text-yellow-800">Gold Coins</h3>
								<p className="text-gray-600">Rare gold coins and investment pieces</p>
							</div>
						</div>
						<div className="group cursor-pointer">
							<div className="rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 p-8 text-center transition-shadow duration-200 hover:shadow-lg">
								<div className="mb-4 text-4xl">💵</div>
								<h3 className="mb-2 text-xl font-semibold text-green-800">Currency</h3>
								<p className="text-gray-600">Collectible paper money and notes</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Products */}
			{products.length > 0 && (
				<section className="bg-gray-50 py-16">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="mb-12 text-center">
							<h2 className="mb-4 text-3xl font-bold text-amber-900">Featured Products</h2>
							<p className="mx-auto max-w-2xl text-gray-600">
								Discover our hand-picked selection of exceptional collectible coins and currency
							</p>
						</div>
						<ProductList products={products} />
						<div className="mt-12 text-center">
							<LinkWithChannel
								href="/collections/featured-products"
								className="inline-block rounded-lg bg-amber-600 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-amber-700"
							>
								View All Featured Items
							</LinkWithChannel>
						</div>
					</div>
				</section>
			)}

			{/* Why Choose Us */}
			<section className="bg-white py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<h2 className="mb-12 text-center text-3xl font-bold text-amber-900">
						Why Choose Matt&apos;s Coinage?
					</h2>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						<div className="text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
								<svg className="h-8 w-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<h3 className="mb-2 text-xl font-semibold text-amber-800">Authenticity Guaranteed</h3>
							<p className="text-gray-600">
								Every item comes with a certificate of authenticity and our guarantee
							</p>
						</div>
						<div className="text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
								<svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
									<path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
								</svg>
							</div>
							<h3 className="mb-2 text-xl font-semibold text-blue-800">Secure Shipping</h3>
							<p className="text-gray-600">Professional packaging with full insurance and tracking</p>
						</div>
						<div className="text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
								<svg className="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<h3 className="mb-2 text-xl font-semibold text-green-800">Expert Support</h3>
							<p className="text-gray-600">Knowledgeable customer service and collecting guidance</p>
						</div>
					</div>
				</div>
			</section>

			{/* Newsletter Signup */}
			<section className="bg-gradient-to-r from-amber-600 to-yellow-600 py-16">
				<div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
					<h2 className="mb-4 text-3xl font-bold text-white">Stay in the Loop</h2>
					<p className="mb-8 text-lg text-amber-100">
						Get notified about new arrivals, sale items, and collecting insights delivered to your inbox.
					</p>
					<div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
						<input
							type="email"
							placeholder="Enter your email"
							className="flex-1 rounded-lg border-0 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
						/>
						<button className="rounded-lg bg-white px-6 py-3 font-semibold text-amber-600 transition-colors duration-200 hover:bg-gray-100">
							Subscribe
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}
