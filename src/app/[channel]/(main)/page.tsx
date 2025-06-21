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
			<div className="relative overflow-hidden bg-gradient-to-r from-gold-600 via-amber-600 to-yellow-600 px-4 py-3 text-white">
				<div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
				<div className="relative z-10 mx-auto max-w-7xl text-center">
					<p className="flex items-center justify-center gap-2 text-sm font-medium">
						<span className="animate-bounce">🎉</span>
						<span>Free shipping on orders over $20</span>
						<span className="hidden sm:inline">•</span>
						<span className="hidden sm:inline">Sale items updated monthly</span>
						<span className="hidden sm:inline">•</span>
						<span className="hidden sm:inline">Trusted since 2022</span>
						<span className="animate-bounce">✨</span>
					</p>
				</div>
			</div>

			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-gold-50 to-yellow-50 py-20">
				{/* Background decorative elements */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute left-10 top-10 h-32 w-32 animate-pulse rounded-full bg-gold-400 blur-3xl"></div>
					<div className="absolute right-20 top-40 h-24 w-24 animate-pulse rounded-full bg-amber-400 blur-2xl delay-1000"></div>
					<div className="delay-2000 absolute bottom-20 left-1/3 h-40 w-40 animate-pulse rounded-full bg-yellow-400 blur-3xl"></div>
				</div>

				<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="gradient-text mb-8 text-5xl font-bold md:text-7xl lg:text-8xl">
							Premium Collectible Coins
						</h1>
						<p className="mx-auto mb-12 max-w-4xl text-xl leading-relaxed text-amber-800 md:text-2xl">
							Discover exceptional deals on <span className="font-semibold text-gold-700">rare coins</span>,
							<span className="font-semibold text-gold-700"> ancient treasures</span>, and
							<span className="font-semibold text-gold-700"> collectible currency</span>. Hand-selected pieces
							at competitive prices with new sale items added regularly.
						</p>
						<div className="flex flex-col justify-center gap-6 sm:flex-row">
							<LinkWithChannel
								href="/collections/sale-items"
								className="pulse-glow group relative overflow-hidden rounded-xl bg-gradient-to-r from-gold-600 to-amber-600 px-10 py-4 font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-gold-500/25"
							>
								<span className="relative z-10">Shop Sale Items</span>
								<div className="absolute inset-0 bg-gradient-to-r from-gold-700 to-amber-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
							</LinkWithChannel>
							<LinkWithChannel
								href="/collections"
								className="border-3 group relative overflow-hidden rounded-xl border-gold-600 bg-white/80 px-10 py-4 font-bold text-gold-700 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-gold-600 hover:text-white"
							>
								<span className="relative z-10">Browse All Collections</span>
							</LinkWithChannel>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Categories */}
			<section className="bg-gradient-to-b from-white to-gray-50 py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-16 text-center">
						<h2 className="gradient-text mb-4 text-4xl font-bold">Shop by Category</h2>
						<p className="mx-auto max-w-2xl text-lg text-gray-600">
							Explore our carefully curated collections of premium collectibles
						</p>
					</div>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						<div className="group transform cursor-pointer transition-all duration-300 hover:scale-105">
							<div className="coin-shimmer relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 via-gold-100 to-yellow-100 p-8 text-center shadow-lg transition-all duration-300 hover:shadow-2xl">
								<div className="floating-animation mb-6 text-6xl">🪙</div>
								<h3 className="mb-3 text-xl font-bold text-amber-800">Ancient Coins</h3>
								<p className="leading-relaxed text-gray-700">
									Historical treasures from ancient civilizations
								</p>
								<div className="absolute inset-0 bg-gradient-to-br from-gold-400/20 to-amber-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
							</div>
						</div>
						<div className="group transform cursor-pointer transition-all duration-300 hover:scale-105">
							<div className="coin-shimmer relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-100 p-8 text-center shadow-lg transition-all duration-300 hover:shadow-2xl">
								<div className="floating-animation mb-6 text-6xl" style={{ animationDelay: "1s" }}>
									🥈
								</div>
								<h3 className="mb-3 text-xl font-bold text-slate-800">Silver Coins</h3>
								<p className="leading-relaxed text-gray-700">Premium silver collectibles and bullion</p>
								<div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 to-gray-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
							</div>
						</div>
						<div className="group transform cursor-pointer transition-all duration-300 hover:scale-105">
							<div className="coin-shimmer relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-100 via-gold-100 to-amber-100 p-8 text-center shadow-lg transition-all duration-300 hover:shadow-2xl">
								<div className="floating-animation mb-6 text-6xl" style={{ animationDelay: "2s" }}>
									🥇
								</div>
								<h3 className="mb-3 text-xl font-bold text-yellow-800">Gold Coins</h3>
								<p className="leading-relaxed text-gray-700">Rare gold coins and investment pieces</p>
								<div className="absolute inset-0 bg-gradient-to-br from-gold-400/20 to-yellow-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
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
			<section className="bg-gradient-to-b from-gray-50 to-white py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-16 text-center">
						<h2 className="gradient-text mb-4 text-4xl font-bold">Why Choose Matt&apos;s Coinage?</h2>
						<p className="mx-auto max-w-2xl text-lg text-gray-600">
							Your trusted partner in numismatic excellence
						</p>
					</div>
					<div className="grid grid-cols-1 gap-12 md:grid-cols-3">
						<div className="group transform text-center transition-all duration-300 hover:scale-105">
							<div className="pulse-glow mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-gold-200 shadow-lg transition-all duration-300 group-hover:shadow-xl">
								<svg className="h-10 w-10 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<h3 className="mb-4 text-2xl font-bold text-amber-800">Quality Assured</h3>
							<p className="leading-relaxed text-gray-600">
								Every item is carefully inspected and comes with our satisfaction guarantee
							</p>
						</div>
						<div className="group transform text-center transition-all duration-300 hover:scale-105">
							<div className="pulse-glow mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 shadow-lg transition-all duration-300 group-hover:shadow-xl">
								<svg className="h-10 w-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
									<path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
								</svg>
							</div>
							<h3 className="mb-4 text-2xl font-bold text-blue-800">Secure Shipping</h3>
							<p className="leading-relaxed text-gray-600">
								Professional packaging with full insurance and real-time tracking
							</p>
						</div>
						<div className="group transform text-center transition-all duration-300 hover:scale-105">
							<div className="pulse-glow mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-200 shadow-lg transition-all duration-300 group-hover:shadow-xl">
								<svg className="h-10 w-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<h3 className="mb-4 text-2xl font-bold text-green-800">Expert Support</h3>
							<p className="leading-relaxed text-gray-600">
								Knowledgeable customer service and professional collecting guidance
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Newsletter Signup */}
			<section className="relative overflow-hidden bg-gradient-to-r from-gold-600 via-amber-600 to-yellow-600 py-20">
				{/* Background decorative elements */}
				<div className="absolute inset-0 opacity-20">
					<div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-white blur-3xl"></div>
					<div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-white blur-2xl"></div>
				</div>

				<div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
					<h2 className="mb-6 text-4xl font-bold text-white">Stay in the Loop</h2>
					<p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-amber-100">
						Get notified about new arrivals, exclusive sale items, and expert collecting insights delivered
						directly to your inbox.
					</p>
					<div className="mx-auto flex max-w-lg flex-col justify-center gap-4 sm:flex-row">
						<input
							type="email"
							placeholder="Enter your email address"
							className="flex-1 rounded-xl border-0 px-6 py-4 text-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30"
						/>
						<button className="group relative overflow-hidden rounded-xl bg-white px-8 py-4 font-bold text-amber-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
							<span className="relative z-10">Subscribe Now</span>
							<div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-gold-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
						</button>
					</div>
					<p className="mt-6 text-sm text-amber-200">Join over 10,000+ collectors who trust our expertise</p>
				</div>
			</section>
		</div>
	);
}
