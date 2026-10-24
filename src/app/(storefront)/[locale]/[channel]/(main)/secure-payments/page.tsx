import { type Metadata } from "next";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";

export const metadata: Metadata = {
	title: "Secure Payments - Matt&apos;s Coinage",
	description: "Learn about our secure payment methods and protection for your collectible coin purchases.",
};

export default function SecurePaymentsPage() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="rounded-lg bg-card p-8 shadow-lg">
				<h1 className="mb-8 text-3xl font-bold text-foreground">Secure Payments & Privacy</h1>

				<div className="prose prose-lg max-w-none">
					<h2 className="mb-4 text-2xl font-bold text-foreground">Your Privacy Matters</h2>
					<p className="mb-4 text-foreground">
						Matt&apos;s Coinage is committed to protecting your privacy and safeguarding your personal
						information. We maintain strict confidentiality standards and will never share your individually
						identifiable information with third parties, except as necessary for order fulfillment through our
						trusted partners:
					</p>
					<ul className="mb-6 space-y-2 text-foreground">
						<li>
							<strong>Payment Processing:</strong> Stripe (secure payment handling)
						</li>
						<li>
							<strong>Shipping Services:</strong> PirateShip (shipping label generation only)
						</li>
					</ul>
					<p className="mb-8 text-foreground">
						Your payment information is never stored on our systems and must be entered fresh with each new
						order for your security.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Accepted Payment Methods</h2>
					<p className="mb-4 text-foreground">
						We use Stripe, a leading payment processor, to handle all transactions securely. Currently
						accepted payment methods include:
					</p>
					<ul className="mb-4 space-y-2 text-foreground">
						<li>All major credit cards (Visa, MasterCard, American Express, Discover)</li>
						<li>Debit cards with major network logos</li>
					</ul>
					<div className="mb-8 rounded-lg border border-border bg-secondary p-4">
						<p className="text-foreground">
							<strong>Note:</strong> ACH/bank transfer payments are not currently available but may be added
							in the future.
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Bank-Level Security</h2>

					<div className="space-y-6">
						<div className="rounded-lg border border-border bg-secondary p-6">
							<h3 className="mb-2 text-lg font-semibold text-foreground">Zero Data Storage</h3>
							<p className="text-foreground">
								Your payment information never touches our servers, cloud infrastructure, or databases. We
								maintain a zero-storage policy for all payment data.
							</p>
						</div>

						<div className="rounded-lg border border-border bg-secondary p-6">
							<h3 className="mb-2 text-lg font-semibold text-foreground">Direct Secure Processing</h3>
							<p className="text-foreground">
								Payment information is transmitted directly from your browser to Stripe using encrypted TLS
								connections. Your card data bypasses our systems entirely during the secure form submission
								process.
							</p>
						</div>

						<div className="rounded-lg border border-border bg-secondary p-6">
							<h3 className="mb-2 text-lg font-semibold text-foreground">Industry-Leading Compliance</h3>
							<p className="text-foreground">
								Stripe maintains PCI Service Provider Level 1 certification – the highest security standard in
								the payments industry. This certification requires regular audits by PCI-certified security
								auditors to ensure your data remains protected.
							</p>
						</div>

						<div className="rounded-lg border border-border bg-secondary p-6">
							<h3 className="mb-2 text-lg font-semibold text-foreground">What This Means for You</h3>
							<p className="text-foreground">
								Every transaction is processed with the same security standards used by major banks and
								financial institutions, giving you peace of mind with every purchase.
							</p>
						</div>
					</div>

					<div className="mt-8 border-t border-border pt-8">
						<p className="text-foreground">
							Your security is our priority. If you have questions about our payment security practices,
							please don&apos;t hesitate to{" "}
							<LinkWithChannel href="/customer-support" className="text-foreground hover:text-foreground">
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
