import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ChannelSelect } from "./ChannelSelect";
import { ChannelsListDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export async function Footer({ channel: _channel }: { channel: string }) {
	const channels = process.env.SALEOR_APP_TOKEN
		? await executeGraphQL(ChannelsListDocument, {
				withAuth: false, // disable cookie-based auth for this call
				headers: {
					// and use app token instead
					Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
				},
			})
		: null;
	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative overflow-hidden border-t border-gold-200/50 bg-gradient-to-br from-amber-50 via-gold-50 to-yellow-50">
			{/* Background decorative elements */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-gold-400 blur-3xl"></div>
				<div className="absolute bottom-10 left-10 h-24 w-24 rounded-full bg-amber-400 blur-2xl"></div>
			</div>

			<div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
					{/* Customer Support */}
					<div className="group">
						<h3 className="mb-3 text-base font-semibold text-amber-900">Customer Support</h3>
						<ul className="space-y-2">
							<li>
								<LinkWithChannel
									href="/customer-support"
									className="group flex items-center text-amber-700 transition-all duration-300 hover:translate-x-1 hover:text-amber-900"
								>
									<span className="mr-3 h-2 w-2 rounded-full bg-gold-400 transition-all duration-300 group-hover:bg-gold-600"></span>
									Help Center
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/customer-support#contact"
									className="group flex items-center text-amber-700 transition-all duration-300 hover:translate-x-1 hover:text-amber-900"
								>
									<span className="mr-3 h-2 w-2 rounded-full bg-gold-400 transition-all duration-300 group-hover:bg-gold-600"></span>
									Contact Us
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/customer-support#faq"
									className="group flex items-center text-amber-700 transition-all duration-300 hover:translate-x-1 hover:text-amber-900"
								>
									<span className="mr-3 h-2 w-2 rounded-full bg-gold-400 transition-all duration-300 group-hover:bg-gold-600"></span>
									FAQ
								</LinkWithChannel>
							</li>
						</ul>
					</div>

					{/* Payments & Security */}
					<div className="group">
						<h3 className="mb-3 text-base font-semibold text-amber-900">Payments</h3>
						<ul className="space-y-2">
							<li>
								<LinkWithChannel
									href="/secure-payments"
									className="group flex items-center text-amber-700 transition-all duration-300 hover:translate-x-1 hover:text-amber-900"
								>
									<span className="mr-3 h-2 w-2 rounded-full bg-gold-400 transition-all duration-300 group-hover:bg-gold-600"></span>
									Secure Payments
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/sales-tax"
									className="group flex items-center text-amber-700 transition-all duration-300 hover:translate-x-1 hover:text-amber-900"
								>
									<span className="mr-3 h-2 w-2 rounded-full bg-gold-400 transition-all duration-300 group-hover:bg-gold-600"></span>
									Sales Tax
								</LinkWithChannel>
							</li>
						</ul>
					</div>

					{/* Shipping */}
					<div className="group">
						<h3 className="mb-3 text-base font-semibold text-amber-900">Shipping</h3>
						<ul className="space-y-2">
							<li>
								<LinkWithChannel
									href="/shipping-delivery"
									className="group flex items-center text-amber-700 transition-all duration-300 hover:translate-x-1 hover:text-amber-900"
								>
									<span className="mr-3 h-2 w-2 rounded-full bg-gold-400 transition-all duration-300 group-hover:bg-gold-600"></span>
									Shipping & Delivery
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/return-policy"
									className="group flex items-center text-amber-700 transition-all duration-300 hover:translate-x-1 hover:text-amber-900"
								>
									<span className="mr-3 h-2 w-2 rounded-full bg-gold-400 transition-all duration-300 group-hover:bg-gold-600"></span>
									Return Policy
								</LinkWithChannel>
							</li>
						</ul>
					</div>

					{/* Shop */}
					<div className="group">
						<h3 className="mb-3 text-base font-semibold text-amber-900">Shop</h3>
						<ul className="space-y-2">
							<li>
								<LinkWithChannel
									href="/products"
									className="group flex items-center text-amber-700 transition-all duration-300 hover:translate-x-1 hover:text-amber-900"
								>
									<span className="mr-3 h-2 w-2 rounded-full bg-gold-400 transition-all duration-300 group-hover:bg-gold-600"></span>
									All Products
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/categories"
									className="group flex items-center text-amber-700 transition-all duration-300 hover:translate-x-1 hover:text-amber-900"
								>
									<span className="mr-3 h-2 w-2 rounded-full bg-gold-400 transition-all duration-300 group-hover:bg-gold-600"></span>
									Categories
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/products"
									className="group flex items-center text-amber-700 transition-all duration-300 hover:translate-x-1 hover:text-amber-900"
								>
									<span className="mr-3 h-2 w-2 rounded-full bg-gold-400 transition-all duration-300 group-hover:bg-gold-600"></span>
									Featured Items
								</LinkWithChannel>
							</li>
						</ul>
					</div>

					{/* About */}
					<div className="group">
						<h3 className="mb-3 text-base font-semibold text-amber-900">About</h3>
						<ul className="space-y-2">
							<li>
								<LinkWithChannel
									href="/about"
									className="group flex items-center text-amber-700 transition-all duration-300 hover:translate-x-1 hover:text-amber-900"
								>
									<span className="mr-3 h-2 w-2 rounded-full bg-gold-400 transition-all duration-300 group-hover:bg-gold-600"></span>
									About Matt&apos;s Coinage
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/privacy"
									className="group flex items-center text-amber-700 transition-all duration-300 hover:translate-x-1 hover:text-amber-900"
								>
									<span className="mr-3 h-2 w-2 rounded-full bg-gold-400 transition-all duration-300 group-hover:bg-gold-600"></span>
									Privacy Policy
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/terms"
									className="group flex items-center text-amber-700 transition-all duration-300 hover:translate-x-1 hover:text-amber-900"
								>
									<span className="mr-3 h-2 w-2 rounded-full bg-gold-400 transition-all duration-300 group-hover:bg-gold-600"></span>
									Terms of Service
								</LinkWithChannel>
							</li>
						</ul>
					</div>
				</div>

				{channels?.channels && (
					<div className="mt-6 border-t border-gold-200/50 pt-4">
						<div className="flex flex-col items-center justify-between sm:flex-row">
							<div className="mb-4 sm:mb-0">
								<label className="font-medium text-amber-700">
									<span className="text-sm">Change currency:</span>{" "}
									<ChannelSelect channels={channels.channels} />
								</label>
							</div>
						</div>
					</div>
				)}

				<div className="mt-6 flex flex-col items-center justify-between border-t border-gold-200/50 pt-4 sm:flex-row">
					<p className="font-medium text-amber-700">
						Copyright &copy; {currentYear} Matt&apos;s Coinage. All rights reserved.
					</p>
					<div className="mt-4 flex items-center space-x-4 sm:mt-0">
						<div className="flex items-center space-x-2">
							<div className="h-2 w-2 animate-pulse rounded-full bg-gold-500"></div>
							<span className="text-sm font-medium text-amber-600">Trusted since 2022</span>
						</div>
						<span className="text-amber-400">•</span>
						<div className="flex items-center space-x-2">
							<div className="h-2 w-2 animate-pulse rounded-full bg-amber-500 delay-500"></div>
							<span className="text-sm font-medium text-amber-600">Premium Collectibles</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
