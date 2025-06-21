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
		<footer className="border-t border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
					{/* Customer Support */}
					<div>
						<h3 className="mb-4 text-lg font-semibold text-amber-900">Customer Support</h3>
						<ul className="space-y-2">
							<li>
								<LinkWithChannel
									href="/customer-support"
									className="text-amber-700 transition-colors duration-200 hover:text-amber-900"
								>
									Help Center
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/customer-support#contact"
									className="text-amber-700 transition-colors duration-200 hover:text-amber-900"
								>
									Contact Us
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/customer-support#faq"
									className="text-amber-700 transition-colors duration-200 hover:text-amber-900"
								>
									FAQ
								</LinkWithChannel>
							</li>
						</ul>
					</div>

					{/* Payments & Security */}
					<div>
						<h3 className="mb-4 text-lg font-semibold text-amber-900">Payments</h3>
						<ul className="space-y-2">
							<li>
								<LinkWithChannel
									href="/secure-payments"
									className="text-amber-700 transition-colors duration-200 hover:text-amber-900"
								>
									Secure Payments
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/sales-tax"
									className="text-amber-700 transition-colors duration-200 hover:text-amber-900"
								>
									Sales Tax
								</LinkWithChannel>
							</li>
						</ul>
					</div>

					{/* Shipping */}
					<div>
						<h3 className="mb-4 text-lg font-semibold text-amber-900">Shipping</h3>
						<ul className="space-y-2">
							<li>
								<LinkWithChannel
									href="/shipping-delivery"
									className="text-amber-700 transition-colors duration-200 hover:text-amber-900"
								>
									Shipping & Delivery
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/return-policy"
									className="text-amber-700 transition-colors duration-200 hover:text-amber-900"
								>
									Return Policy
								</LinkWithChannel>
							</li>
						</ul>
					</div>

					{/* Shop */}
					<div>
						<h3 className="mb-4 text-lg font-semibold text-amber-900">Shop</h3>
						<ul className="space-y-2">
							<li>
								<LinkWithChannel
									href="/products"
									className="text-amber-700 transition-colors duration-200 hover:text-amber-900"
								>
									All Products
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/categories"
									className="text-amber-700 transition-colors duration-200 hover:text-amber-900"
								>
									Categories
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/collections/featured-products"
									className="text-amber-700 transition-colors duration-200 hover:text-amber-900"
								>
									Featured Items
								</LinkWithChannel>
							</li>
						</ul>
					</div>

					{/* About */}
					<div>
						<h3 className="mb-4 text-lg font-semibold text-amber-900">About</h3>
						<ul className="space-y-2">
							<li>
								<LinkWithChannel
									href="/about"
									className="text-amber-700 transition-colors duration-200 hover:text-amber-900"
								>
									About Matt&apos;s Coinage
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/privacy"
									className="text-amber-700 transition-colors duration-200 hover:text-amber-900"
								>
									Privacy Policy
								</LinkWithChannel>
							</li>
							<li>
								<LinkWithChannel
									href="/terms"
									className="text-amber-700 transition-colors duration-200 hover:text-amber-900"
								>
									Terms of Service
								</LinkWithChannel>
							</li>
						</ul>
					</div>
				</div>

				{channels?.channels && (
					<div className="mt-8 border-t border-amber-200 pt-8">
						<div className="flex flex-col items-center justify-between sm:flex-row">
							<div className="mb-4 sm:mb-0">
								<label className="text-amber-700">
									<span className="text-sm font-medium">Change currency:</span>{" "}
									<ChannelSelect channels={channels.channels} />
								</label>
							</div>
						</div>
					</div>
				)}

				<div className="mt-8 flex flex-col items-center justify-between border-t border-amber-200 pt-8 sm:flex-row">
					<p className="text-sm text-amber-600">
						Copyright &copy; {currentYear} Matt&apos;s Coinage. All rights reserved.
					</p>
					<div className="mt-4 flex space-x-4 sm:mt-0">
						<span className="text-xs text-amber-500">Trusted since 2020</span>
						<span className="text-xs text-amber-500">•</span>
						<span className="text-xs text-amber-500">Premium Collectibles</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
