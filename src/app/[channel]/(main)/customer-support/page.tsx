import { type Metadata } from "next";

export const metadata: Metadata = {
	title: "Customer Support - Matt's Coinage",
	description: "Get help with your orders, returns, and questions about our collectible coins and currency.",
};

export default function CustomerSupportPage() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="rounded-lg bg-white p-8 shadow-lg">
				<h1 className="mb-8 text-3xl font-bold text-amber-900">Customer Support</h1>

				<div className="prose prose-lg max-w-none">
					<p className="mb-6 text-gray-700">
						At Matt&apos;s Coinage, we&apos;re committed to providing exceptional service and ensuring your
						complete satisfaction with every purchase. Your positive experience is our priority.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Need Assistance?</h2>
					<p className="mb-8 text-gray-700">
						If you have questions about your order, need product information, or encounter any issues,
						we&apos;re here to help. Please don&apos;t hesitate to reach out – we respond promptly and work
						diligently to resolve any concerns.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Contact Us</h2>

					<div className="mb-8 rounded-lg bg-amber-50 p-6">
						<h3 className="mb-4 text-xl font-semibold text-amber-800">Email Support:</h3>
						<ul className="space-y-2">
							<li>
								<strong>General inquiries:</strong>{" "}
								<a href="mailto:sales@mattscoinage.com" className="text-amber-700 hover:text-amber-900">
									sales@mattscoinage.com
								</a>
							</li>
							<li>
								<strong>Direct support:</strong>{" "}
								<a href="mailto:matt@mattscoinage.com" className="text-amber-700 hover:text-amber-900">
									matt@mattscoinage.com
								</a>
							</li>
						</ul>
					</div>

					<div className="mb-8 rounded-lg bg-blue-50 p-6">
						<h3 className="mb-4 text-xl font-semibold text-blue-800">Social Media:</h3>
						<p>
							<strong>Facebook:</strong>{" "}
							<a
								href="https://facebook.com/MattsCoinage"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-700 hover:text-blue-900"
							>
								MattsCoinage Facebook Page
							</a>
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Our Commitment</h2>
					<p className="mb-4 text-gray-700">
						We strive to respond to all inquiries within 24 hours during business days. Our goal is to address
						your concerns quickly and professionally, ensuring you have the best possible experience with
						Matt&apos;s Coinage.
					</p>

					<div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
						<p className="font-medium text-gray-700">
							For the fastest response, please include your order number and detailed description of your
							inquiry when contacting us via email.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
