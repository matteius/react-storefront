import { type Metadata } from "next";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export const metadata: Metadata = {
	title: "Privacy Policy - Matt&apos;s Coinage",
	description: "Learn how Matt&apos;s Coinage protects your privacy and handles your personal information.",
};

export default function PrivacyPolicyPage() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="rounded-lg bg-white p-8 shadow-lg">
				<h1 className="mb-8 text-3xl font-bold text-amber-900">Privacy Policy</h1>

				<div className="prose prose-lg max-w-none">
					<p className="mb-6 text-sm text-gray-600">
						<strong>Last Updated:</strong> {new Date().toLocaleDateString()}
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Our Commitment to Your Privacy</h2>
					<p className="mb-6 text-gray-700">
						Matt&apos;s Coinage is committed to protecting your privacy and maintaining the confidentiality of
						your personal information. This Privacy Policy explains how we collect, use, protect, and handle
						your information when you visit our website or make a purchase.
					</p>

					<div className="mb-8 rounded-lg border border-green-200 bg-green-50 p-6">
						<h3 className="mb-2 text-lg font-semibold text-green-800">Key Privacy Principles</h3>
						<ul className="space-y-2 text-gray-700">
							<li>
								• We never sell, rent, or share your personal information with third parties for marketing
								purposes
							</li>
							<li>• Your payment information is never stored on our servers</li>
							<li>• We collect only the minimum information necessary to fulfill your orders</li>
							<li>• You have control over your personal information and can request its deletion</li>
						</ul>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Information We Collect</h2>

					<h3 className="mb-3 text-xl font-semibold text-amber-800">Information You Provide</h3>
					<p className="mb-4 text-gray-700">When you make a purchase or create an account, we collect:</p>
					<ul className="mb-6 space-y-1 text-gray-700">
						<li>• Name and contact information (email, phone, address)</li>
						<li>• Billing and shipping addresses</li>
						<li>• Order history and preferences</li>
						<li>• Communications with our customer service team</li>
					</ul>

					<h3 className="mb-3 text-xl font-semibold text-amber-800">Automatically Collected Information</h3>
					<p className="mb-4 text-gray-700">When you visit our website, we may automatically collect:</p>
					<ul className="mb-6 space-y-1 text-gray-700">
						<li>• IP address and browser information</li>
						<li>• Pages visited and time spent on our site</li>
						<li>• Referring website information</li>
						<li>• Device and operating system information</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">How We Use Your Information</h2>
					<p className="mb-4 text-gray-700">
						We use your information solely for legitimate business purposes:
					</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>
							• <strong>Order Processing:</strong> To fulfill your orders, process payments, and provide
							customer service
						</li>
						<li>
							• <strong>Communication:</strong> To send order confirmations, shipping updates, and respond to
							inquiries
						</li>
						<li>
							• <strong>Legal Compliance:</strong> To comply with applicable laws and regulations
						</li>
						<li>
							• <strong>Business Operations:</strong> To improve our website, products, and services
						</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Information Sharing</h2>
					<p className="mb-4 text-gray-700">
						We maintain strict confidentiality and only share your information with trusted partners necessary
						for order fulfillment:
					</p>

					<div className="mb-6 space-y-4">
						<div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
							<h3 className="mb-2 font-semibold text-blue-800">Payment Processing</h3>
							<p className="text-gray-700">
								<strong>Stripe:</strong> Handles all payment processing. Your payment information goes
								directly to Stripe and never touches our servers.
							</p>
						</div>

						<div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
							<h3 className="mb-2 font-semibold text-purple-800">Shipping Services</h3>
							<p className="text-gray-700">
								<strong>PirateShip:</strong> Used only for generating shipping labels. They receive only the
								shipping address information necessary for delivery.
							</p>
						</div>

						<div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
							<h3 className="mb-2 font-semibold text-amber-800">Email Communications</h3>
							<p className="text-gray-700">
								<strong>Mailjet:</strong> Handles newsletter subscriptions and transactional emails. Only
								email addresses are shared for this purpose.
							</p>
						</div>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Data Security</h2>
					<p className="mb-4 text-gray-700">
						We implement industry-standard security measures to protect your information:
					</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>
							• <strong>Encryption:</strong> All data transmission is encrypted using TLS/SSL technology
						</li>
						<li>
							• <strong>Secure Hosting:</strong> Our website is hosted on secure, monitored servers
						</li>
						<li>
							• <strong>Access Controls:</strong> Limited access to personal information on a need-to-know
							basis
						</li>
						<li>
							• <strong>Regular Updates:</strong> We keep our security systems current with the latest
							protections
						</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Cookies and Tracking</h2>
					<p className="mb-4 text-gray-700">
						We use cookies and similar technologies to enhance your browsing experience:
					</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>
							• <strong>Essential Cookies:</strong> Required for website functionality and security
						</li>
						<li>
							• <strong>Analytics Cookies:</strong> Help us understand how visitors use our site (Google
							Analytics)
						</li>
						<li>
							• <strong>Preference Cookies:</strong> Remember your settings and preferences
						</li>
					</ul>
					<p className="mb-6 text-gray-700">
						You can control cookie settings through your browser preferences. Note that disabling certain
						cookies may affect website functionality.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Your Rights</h2>
					<p className="mb-4 text-gray-700">
						You have the following rights regarding your personal information:
					</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>
							• <strong>Access:</strong> Request a copy of the personal information we hold about you
						</li>
						<li>
							• <strong>Correction:</strong> Request correction of inaccurate or incomplete information
						</li>
						<li>
							• <strong>Deletion:</strong> Request deletion of your personal information (subject to legal
							requirements)
						</li>
						<li>
							• <strong>Portability:</strong> Request transfer of your information to another service
						</li>
						<li>
							• <strong>Opt-out:</strong> Unsubscribe from marketing communications at any time
						</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Data Retention</h2>
					<p className="mb-6 text-gray-700">
						We retain your personal information only as long as necessary for the purposes outlined in this
						policy or as required by law. Order information is typically retained for 7 years for tax and
						legal compliance purposes.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Children&apos;s Privacy</h2>
					<p className="mb-6 text-gray-700">
						Our website is not intended for children under 13 years of age. We do not knowingly collect
						personal information from children under 13. If you believe we have collected information from a
						child under 13, please contact us immediately.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Changes to This Policy</h2>
					<p className="mb-6 text-gray-700">
						We may update this Privacy Policy from time to time to reflect changes in our practices or
						applicable laws. We will notify you of any material changes by posting the updated policy on our
						website and updating the &ldquo;Last Updated&rdquo; date.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Contact Us</h2>
					<p className="mb-4 text-gray-700">
						If you have questions about this Privacy Policy or how we handle your personal information, please
						contact us:
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
