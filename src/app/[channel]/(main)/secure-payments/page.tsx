import { type Metadata } from "next";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export const metadata: Metadata = {
	title: "Secure Payments - Matt's Coinage",
	description: "Learn about our secure payment methods and protection for your collectible coin purchases.",
};

export default function SecurePaymentsPage() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="rounded-lg bg-white p-8 shadow-lg">
				<h1 className="mb-8 text-3xl font-bold text-amber-900">Secure Payments & Privacy</h1>

				<div className="prose prose-lg max-w-none">
					<h2 className="mb-4 text-2xl font-bold text-amber-900">Your Privacy Matters</h2>
					<p className="mb-4 text-gray-700">
						Matt&apos;s Coinage is committed to protecting your privacy and safeguarding your personal
						information. We maintain strict confidentiality standards and will never share your individually
						identifiable information with third parties, except as necessary for order fulfillment through our
						trusted partners:
					</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>
							<strong>Payment Processing:</strong> Stripe (secure payment handling)
						</li>
						<li>
							<strong>Shipping Services:</strong> PirateShip (shipping label generation only)
						</li>
					</ul>
					<p className="mb-8 text-gray-700">
						Your payment information is never stored on our systems and must be entered fresh with each new
						order for your security.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Accepted Payment Methods</h2>
					<p className="mb-4 text-gray-700">
						We use Stripe, a leading payment processor, to handle all transactions securely. Currently
						accepted payment methods include:
					</p>
					<ul className="mb-4 space-y-2 text-gray-700">
						<li>All major credit cards (Visa, MasterCard, American Express, Discover)</li>
						<li>Debit cards with major network logos</li>
					</ul>
					<div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
						<p className="text-blue-800">
							<strong>Note:</strong> ACH/bank transfer payments are not currently available but may be added
							in the future.
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Bank-Level Security</h2>

					<div className="space-y-6">
						<div className="rounded-lg border border-green-200 bg-green-50 p-6">
							<h3 className="mb-2 text-lg font-semibold text-green-800">Zero Data Storage</h3>
							<p className="text-gray-700">
								Your payment information never touches our servers, cloud infrastructure, or databases. We
								maintain a zero-storage policy for all payment data.
							</p>
						</div>

						<div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
							<h3 className="mb-2 text-lg font-semibold text-blue-800">Direct Secure Processing</h3>
							<p className="text-gray-700">
								Payment information is transmitted directly from your browser to Stripe using encrypted TLS
								connections. Your card data bypasses our systems entirely during the secure form submission
								process.
							</p>
						</div>

						<div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
							<h3 className="mb-2 text-lg font-semibold text-amber-800">Industry-Leading Compliance</h3>
							<p className="text-gray-700">
								Stripe maintains PCI Service Provider Level 1 certification – the highest security standard in
								the payments industry. This certification requires regular audits by PCI-certified security
								auditors to ensure your data remains protected.
							</p>
						</div>

						<div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
							<h3 className="mb-2 text-lg font-semibold text-purple-800">What This Means for You</h3>
							<p className="text-gray-700">
								Every transaction is processed with the same security standards used by major banks and
								financial institutions, giving you peace of mind with every purchase.
							</p>
						</div>
					</div>

					<div className="mt-8 border-t border-amber-200 pt-8">
						<p className="text-gray-700">
							Your security is our priority. If you have questions about our payment security practices,
							please don&apos;t hesitate to{" "}
							<LinkWithChannel href="/customer-support" className="text-amber-700 hover:text-amber-900">
								contact us
							</LinkWithChannel>
							.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
