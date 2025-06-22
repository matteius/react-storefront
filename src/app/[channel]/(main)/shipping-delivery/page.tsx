import { type Metadata } from "next";

export const metadata: Metadata = {
	title: "Shipping & Delivery - Matt's Coinage",
	description:
		"Learn about our shipping methods, delivery times, and packaging for collectible coins and currency.",
};

export default function ShippingDeliveryPage() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="rounded-lg bg-white p-8 shadow-lg">
				<h1 className="mb-8 text-3xl font-bold text-amber-900">Shipping & Delivery</h1>

				<div className="prose prose-lg max-w-none">
					<h2 className="mb-4 text-2xl font-bold text-amber-900">Shipping Costs</h2>

					<div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-6">
						<h3 className="mb-2 text-lg font-semibold text-green-800">Free Shipping</h3>
						<p className="text-gray-700">Enjoy complimentary shipping on all orders over $20.</p>
					</div>

					<div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
						<h3 className="mb-2 text-lg font-semibold text-blue-800">Orders Under $20</h3>
						<p className="text-gray-700">
							A nominal shipping fee applies to ensure secure delivery of your coins.
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Secure Delivery Process</h2>
					<p className="mb-6 text-gray-700">
						Every order is carefully packaged and shipped with full insurance coverage up to the purchase
						amount. We use trusted carriers (USPS and UPS) to ensure safe delivery to your door. Tracking
						information is provided for all shipments, and high-value orders require signature confirmation
						for added security.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Shipping Locations</h2>
					<div className="mb-4">
						<h3 className="mb-2 text-lg font-semibold text-amber-800">We Ship To:</h3>
						<p className="mb-4 text-gray-700">All addresses within the United States via USPS or UPS.</p>
					</div>

					<div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
						<h3 className="mb-3 text-lg font-semibold text-yellow-800">Shipping Restrictions:</h3>
						<ul className="space-y-2 text-gray-700">
							<li>International shipping not currently available</li>
							<li>PO Box addresses not accepted</li>
							<li>Shipping address must match billing address exactly</li>
						</ul>
					</div>

					<div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-6">
						<p className="font-medium text-red-800">
							<strong>Important:</strong> Orders with mismatched billing and shipping addresses will be
							automatically canceled and refunded for security purposes.
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Origin & Processing</h2>
					<p className="mb-6 text-gray-700">
						All orders ship from our location in Maine. We maintain current inventory levels to ensure prompt
						fulfillment of your order.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Delivery Timeline</h2>

					<div className="mb-6 space-y-4">
						<div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
							<h3 className="mb-2 font-semibold text-amber-800">Processing Time:</h3>
							<p className="text-gray-700">
								Orders typically ship within 1-7 business days of payment confirmation. Most orders ship
								sooner, but we allow up to one week to ensure quality packaging and processing.
							</p>
						</div>

						<div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
							<h3 className="mb-2 font-semibold text-blue-800">Total Delivery Time:</h3>
							<p className="text-gray-700">
								Expect delivery within 7-14 business days from order placement, though many orders arrive
								faster.
							</p>
						</div>

						<div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
							<h3 className="mb-2 font-semibold text-purple-800">Why This Timeline:</h3>
							<p className="text-gray-700">
								As a small, owner-operated business, we prioritize careful handling and secure packaging of
								every order. While we work diligently to ship orders quickly, this timeframe ensures we can
								maintain our quality standards even during busy periods.
							</p>
						</div>
					</div>

					<hr className="my-8 border-amber-200" />

					<div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
						<p className="text-center font-medium text-gray-700">
							All shipments include tracking information and full insurance coverage. You&apos;ll receive
							tracking details via email once your order ships.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
