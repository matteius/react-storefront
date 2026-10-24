import { type Metadata } from "next";

export const metadata: Metadata = {
	title: "Shipping & Delivery - Matt&apos;s Coinage",
	description:
		"Learn about our shipping methods, delivery times, and packaging for collectible coins and currency.",
};

export default function ShippingDeliveryPage() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="rounded-lg bg-card p-8 shadow-lg">
				<h1 className="mb-8 text-3xl font-bold text-foreground">Shipping & Delivery</h1>

				<div className="prose prose-lg max-w-none">
					<h2 className="mb-4 text-2xl font-bold text-foreground">Shipping Costs</h2>

					<div className="mb-6 rounded-lg border border-border bg-secondary p-6">
						<h3 className="mb-2 text-lg font-semibold text-foreground">Free Shipping</h3>
						<p className="text-foreground">Enjoy complimentary shipping on all orders over $20.</p>
					</div>

					<div className="mb-8 rounded-lg border border-border bg-secondary p-6">
						<h3 className="mb-2 text-lg font-semibold text-foreground">Orders Under $20</h3>
						<p className="text-foreground">
							A nominal shipping fee applies to ensure secure delivery of your coins.
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Secure Delivery Process</h2>
					<p className="mb-6 text-foreground">
						Every order is carefully packaged and shipped using trusted carriers (USPS and UPS) to ensure safe
						delivery to your door. All shipments include detailed tracking information, and we require
						signature confirmation for delivery to provide maximum security for your valuable collectibles.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Shipping Locations</h2>
					<div className="mb-4">
						<h3 className="mb-2 text-lg font-semibold text-foreground">We Ship To:</h3>
						<p className="mb-4 text-foreground">All addresses within the United States via USPS or UPS.</p>
					</div>

					<div className="mb-6 rounded-lg border border-border bg-secondary p-6">
						<h3 className="mb-3 text-lg font-semibold text-foreground">Shipping Restrictions:</h3>
						<ul className="space-y-2 text-foreground">
							<li>• International shipping not currently available</li>
							<li>• PO Box addresses not accepted</li>
						</ul>
					</div>

					<div className="mb-8 rounded-lg border border-border bg-secondary p-6">
						<h3 className="mb-3 text-lg font-semibold text-foreground">Address Verification:</h3>
						<p className="mb-2 text-foreground">
							For your security and ours, we carefully review all orders. Orders with different billing and
							shipping addresses may require additional verification before processing.
						</p>
						<p className="text-foreground">
							This helps us prevent fraud while ensuring legitimate orders are fulfilled promptly. We
							appreciate your understanding as we work to protect all our customers.
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Origin & Processing</h2>
					<p className="mb-6 text-foreground">
						All orders ship from our location in Maine. We maintain current inventory levels to ensure prompt
						fulfillment of your order.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Delivery Timeline</h2>

					<div className="mb-6 space-y-4">
						<div className="rounded-lg border border-border bg-secondary p-4">
							<h3 className="mb-2 font-semibold text-foreground">Processing & Shipping:</h3>
							<p className="text-foreground">
								Orders ship within 7 business days of payment capture and order acknowledgement. Most orders
								ship sooner, but we allow up to one week to ensure quality packaging, proper authentication
								verification, and secure processing.
							</p>
						</div>

						<div className="rounded-lg border border-border bg-secondary p-4">
							<h3 className="mb-2 font-semibold text-foreground">Transit Time:</h3>
							<p className="text-foreground">
								Once shipped, delivery typically takes 3-7 business days via USPS or UPS, depending on your
								location. You&apos;ll receive tracking information as soon as your order ships.
							</p>
						</div>

						<div className="rounded-lg border border-border bg-secondary p-4">
							<h3 className="mb-2 font-semibold text-foreground">Our Commitment:</h3>
							<p className="text-foreground">
								As a small, owner-operated business, we prioritize careful handling and secure packaging of
								every order. Each item is verified for authenticity and condition before shipment to ensure
								you receive exactly what you ordered.
							</p>
						</div>
					</div>

					<hr className="my-8 border-border" />

					<div className="rounded-lg border border-border bg-secondary p-6">
						<p className="text-center font-medium text-foreground">
							All shipments include detailed tracking information and require signature confirmation.
							You&apos;ll receive tracking details via email once your order ships.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
