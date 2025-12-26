import { type Metadata } from "next";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export const metadata: Metadata = {
	title: "Terms of Service - Matt&apos;s Coinage",
	description: "Terms and conditions for purchasing collectible coins and currency from Matt&apos;s Coinage.",
};

export default function TermsOfServicePage() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="rounded-lg bg-white p-8 shadow-lg">
				<h1 className="mb-8 text-3xl font-bold text-amber-900">Terms of Service</h1>

				<div className="prose prose-lg max-w-none">
					<p className="mb-6 text-sm text-gray-600">
						<strong>Last Updated:</strong> {new Date().toLocaleDateString()}
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Agreement to Terms</h2>
					<p className="mb-6 text-gray-700">
						By accessing and using Matt&apos;s Coinage website and services, you agree to be bound by these
						Terms of Service and all applicable laws and regulations. If you do not agree with any of these
						terms, you are prohibited from using or accessing this site.
					</p>

					<div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
						<h3 className="mb-2 text-lg font-semibold text-blue-800">About Matt&apos;s Coinage</h3>
						<p className="text-gray-700">
							Matt&apos;s Coinage is a legitimate, Maine-based business specializing in collectible coins and
							currency. We are committed to providing authentic, high-quality numismatic products with
							transparent business practices and excellent customer service.
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Business Information</h2>
					<div className="mb-6 space-y-2 text-gray-700">
						<p>
							<strong>Business Name:</strong> Matt&apos;s Coinage
						</p>
						<p>
							<strong>Operated By:</strong> OpenSensor Engineering LLC
						</p>
						<p>
							<strong>Location:</strong> Maine, United States
						</p>
						<p>
							<strong>Business Type:</strong> Collectible Coins & Currency Retailer
						</p>
						<p>
							<strong>Established:</strong> 2022
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Product Information & Authenticity</h2>
					<p className="mb-4 text-gray-700">
						All coins and currency offered by Matt&apos;s Coinage are authentic collectible items. We provide:
					</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Detailed, high-resolution photographs of each item</li>
						<li>• Accurate descriptions and condition assessments</li>
						<li>• Provenance information when available</li>
						<li>• Professional grading information where applicable</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Ordering and Payment</h2>

					<h3 className="mb-3 text-xl font-semibold text-amber-800">Order Acceptance</h3>
					<p className="mb-4 text-gray-700">
						All orders are subject to acceptance by Matt&apos;s Coinage. We reserve the right to refuse or
						cancel any order for any reason, including but not limited to product availability, errors in
						product or pricing information, or suspected fraudulent activity.
					</p>

					<h3 className="mb-3 text-xl font-semibold text-amber-800">Pricing and Payment</h3>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• All prices are displayed in US Dollars and include applicable sales tax</li>
						<li>• Payment is processed securely through Stripe</li>
						<li>• We accept major credit cards and debit cards</li>
						<li>• Payment must be received before order shipment</li>
					</ul>

					<h3 className="mb-3 text-xl font-semibold text-amber-800">Security Requirements</h3>
					<div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
						<p className="font-medium text-red-800">
							<strong>Important Security Policy:</strong> For fraud prevention, billing and shipping addresses
							must match exactly. Orders with mismatched addresses will be automatically canceled and
							refunded.
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Shipping and Delivery</h2>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• We ship to addresses within the United States only</li>
						<li>• PO Box addresses are not accepted</li>
						<li>• All shipments include full insurance coverage</li>
						<li>• High-value orders require signature confirmation</li>
						<li>• Processing time: 1-7 business days</li>
						<li>• Total delivery time: 7-14 business days from order placement</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Returns and Refunds</h2>
					<p className="mb-4 text-gray-700">
						Please refer to our detailed{" "}
						<LinkWithChannel href="/return-policy" className="text-amber-700 hover:text-amber-900">
							Return Policy
						</LinkWithChannel>{" "}
						for complete information. Key points:
					</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Returns must be initiated within 3 business days of delivery</li>
						<li>• Pre-approval required for all returns</li>
						<li>• 10% restocking fee applies</li>
						<li>• Original shipping fees are non-refundable</li>
						<li>• Items must be returned in original condition</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Privacy and Data Protection</h2>
					<p className="mb-6 text-gray-700">
						Your privacy is important to us. Please review our{" "}
						<LinkWithChannel href="/privacy-policy" className="text-amber-700 hover:text-amber-900">
							Privacy Policy
						</LinkWithChannel>{" "}
						to understand how we collect, use, and protect your personal information. We never sell or share
						your personal information with third parties for marketing purposes.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Intellectual Property</h2>
					<p className="mb-6 text-gray-700">
						All content on this website, including text, graphics, logos, images, and software, is the
						property of Matt&apos;s Coinage or its content suppliers and is protected by copyright and other
						intellectual property laws. You may not reproduce, distribute, or create derivative works without
						written permission.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">User Conduct</h2>
					<p className="mb-4 text-gray-700">You agree not to:</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Use the website for any unlawful purpose</li>
						<li>• Attempt to gain unauthorized access to our systems</li>
						<li>• Interfere with the website&apos;s operation or security</li>
						<li>• Submit false or misleading information</li>
						<li>• Violate any applicable laws or regulations</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Product Disclaimers</h2>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Collectible values may fluctuate based on market conditions</li>
						<li>• Color variations may occur due to photography and monitor differences</li>
						<li>• Ancient coins are unique items with natural variations</li>
						<li>• We make every effort to accurately describe items but cannot guarantee perfection</li>
						<li>
							• See our{" "}
							<LinkWithChannel href="/investment-disclaimer" className="text-amber-700 hover:text-amber-900">
								Investment Disclaimer
							</LinkWithChannel>{" "}
							for important information about collectibles and precious metals
						</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Limitation of Liability</h2>
					<p className="mb-4 text-gray-700">
						To the maximum extent permitted by law, Matt&apos;s Coinage and its operators shall not be
						liable for:
					</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>
							• Any indirect, incidental, special, consequential, or punitive damages arising from your use
							of our services
						</li>
						<li>
							• Loss of profits, revenue, data, or business opportunities related to your purchases
						</li>
						<li>
							• Damages exceeding the amount you paid for the specific product giving rise to the claim
						</li>
						<li>
							• Issues arising from third-party services (payment processors, shipping carriers, etc.)
						</li>
					</ul>
					<p className="mb-6 text-gray-700">
						Our total liability for any claim arising from your purchase shall not exceed the purchase price
						of the specific item in question.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Dispute Resolution</h2>
					<p className="mb-4 text-gray-700">
						We are committed to resolving any disputes fairly and efficiently:
					</p>
					<div className="mb-6 space-y-4">
						<div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
							<h3 className="mb-2 font-semibold text-blue-800">Step 1: Direct Communication</h3>
							<p className="text-gray-700">
								Please contact us first at matt@mattscoinage.com to resolve any issues. We will make every
								effort to address your concerns promptly and fairly.
							</p>
						</div>

						<div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
							<h3 className="mb-2 font-semibold text-amber-800">Step 2: Informal Resolution</h3>
							<p className="text-gray-700">
								If direct communication does not resolve the issue, we will work with you to find a mutually
								acceptable solution through good-faith negotiation.
							</p>
						</div>

						<div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
							<h3 className="mb-2 font-semibold text-purple-800">Step 3: Formal Dispute</h3>
							<p className="text-gray-700">
								Any unresolved disputes shall be governed by the laws of the State of Maine and subject to
								the exclusive jurisdiction of the courts in Maine, United States.
							</p>
						</div>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Force Majeure</h2>
					<p className="mb-6 text-gray-700">
						We shall not be liable for any failure or delay in performance due to circumstances beyond our
						reasonable control, including but not limited to acts of God, natural disasters, war, terrorism,
						labor disputes, government actions, or disruptions to shipping and payment processing services.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Governing Law</h2>
					<p className="mb-6 text-gray-700">
						These Terms of Service shall be governed by and construed in accordance with the laws of the State
						of Maine, United States, without regard to its conflict of law provisions.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Changes to Terms</h2>
					<p className="mb-6 text-gray-700">
						We reserve the right to modify these Terms of Service at any time. Changes will be effective
						immediately upon posting on our website. Your continued use of the website after changes are
						posted constitutes acceptance of the modified terms.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Contact Information</h2>
					<p className="mb-4 text-gray-700">
						If you have questions about these Terms of Service, please contact us:
					</p>
					<div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-6">
						<ul className="space-y-2 text-gray-700">
							<li>
								<strong>General Support:</strong>{" "}
								<a href="mailto:matt@mattscoinage.com" className="text-amber-700 hover:text-amber-900">
									matt@mattscoinage.com
								</a>
							</li>
						</ul>
					</div>

					<div className="text-center">
						<LinkWithChannel
							href="/customer-support"
							className="inline-block rounded-md bg-amber-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-amber-700"
						>
							Contact Customer Service
						</LinkWithChannel>
					</div>
				</div>
			</div>
		</div>
	);
}
