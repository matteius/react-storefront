import { type Metadata } from "next";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";

export const metadata: Metadata = {
	title: "Return Policy - Matt's Coinage",
	description: "Learn about our return and exchange policy for collectible coins and currency purchases.",
};

export default function ReturnPolicyPage() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="rounded-lg bg-card p-8 shadow-lg">
				<h1 className="mb-8 text-3xl font-bold text-foreground">Return Policy</h1>

				<div className="prose prose-lg max-w-none">
					<h2 className="mb-4 text-2xl font-bold text-foreground">Our Commitment to Your Satisfaction</h2>
					<p className="mb-8 text-foreground">
						Your satisfaction is important to us. We provide detailed, high-resolution images of each coin –
						particularly our ancient coins, where every piece is unique – to ensure you know exactly what
						you&apos;re purchasing.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Return Eligibility & Process</h2>
					<p className="mb-4 text-foreground">
						If you&apos;re not completely satisfied with your purchase, we accept returns under the following
						conditions:
					</p>

					<div className="mb-8 space-y-4">
						<div className="rounded-lg border border-border bg-secondary p-4">
							<h3 className="mb-2 font-semibold text-foreground">Time Limit:</h3>
							<p className="text-foreground">
								Return requests must be initiated within 7 calendar days of delivery confirmation.
							</p>
						</div>

						<div className="rounded-lg border border-border bg-secondary p-4">
							<h3 className="mb-2 font-semibold text-foreground">Pre-Approval Required:</h3>
							<p className="text-foreground">
								Contact us before returning any item to receive return authorization and instructions.
							</p>
						</div>

						<div className="rounded-lg border border-border bg-secondary p-4">
							<h3 className="mb-2 font-semibold text-foreground">Return Shipping:</h3>
							<p className="text-foreground">
								Items must be returned with tracking at the customer&apos;s expense using secure packaging
								identical to our original shipping methods.
							</p>
						</div>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Return Fees & Refunds</h2>

					<div className="mb-8 space-y-4">
						<div className="rounded-lg border border-border bg-secondary p-4">
							<h3 className="mb-2 font-semibold text-foreground">Restocking Fee:</h3>
							<p className="text-foreground">
								A 10% restocking fee applies to all returns to cover payment processing and fulfillment costs.
							</p>
						</div>

						<div className="rounded-lg border border-border bg-secondary p-4">
							<h3 className="mb-2 font-semibold text-foreground">Shipping Charges:</h3>
							<p className="text-foreground">Original shipping and handling fees are non-refundable.</p>
						</div>

						<div className="rounded-lg border border-border bg-secondary p-4">
							<h3 className="mb-2 font-semibold text-foreground">Refund Processing:</h3>
							<p className="text-foreground">
								Refunds are issued after we receive and inspect the returned item to confirm it matches the
								original condition.
							</p>
						</div>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Damaged Items</h2>
					<p className="mb-6 text-foreground">
						If your item arrives damaged due to shipping, please contact us immediately. We will assist you
						with filing an insurance claim with the carrier. Shipping-damaged returns are exempt from
						restocking fees.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Return Requirements</h2>
					<ul className="mb-8 space-y-2 text-foreground">
						<li>Items must be returned in identical condition to when shipped</li>
						<li>Original packaging and materials must be included</li>
						<li>Return tracking information must be provided</li>
						<li>Items must be securely packaged to prevent damage in transit</li>
					</ul>

					<div className="mb-8 rounded-lg border border-border bg-secondary p-6">
						<h2 className="mb-4 text-xl font-bold text-foreground">Important Notes</h2>
						<p className="mb-4 text-foreground">
							We reserve the right to refuse returns that don&apos;t meet these requirements. Given the unique
							nature of many coins, especially ancient pieces, please review your purchase carefully using our
							detailed photos before ordering.
						</p>
						<p className="font-medium text-foreground">
							For return authorization or questions about our return policy, please contact our customer
							service team before shipping any items back.
						</p>
					</div>

					<div className="text-center">
						<LinkWithChannel
							href="/customer-support"
							className="inline-block rounded-md bg-secondary px-6 py-3 font-medium text-primary-foreground transition-colors duration-200 hover:bg-secondary"
						>
							Contact Customer Service
						</LinkWithChannel>
					</div>
				</div>
			</div>
		</div>
	);
}
