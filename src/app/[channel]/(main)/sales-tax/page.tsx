import { type Metadata } from "next";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export const metadata: Metadata = {
	title: "Sales Tax - Matt's Coinage",
	description: "Information about sales tax on collectible coin and currency purchases.",
};

export default function SalesTaxPage() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="rounded-lg bg-white p-8 shadow-lg">
				<h1 className="mb-8 text-3xl font-bold text-amber-900">Sales Tax Information</h1>

				<div className="prose prose-lg max-w-none">
					<h2 className="mb-4 text-2xl font-bold text-amber-900">Tax-Inclusive Pricing</h2>
					<div className="mb-8 rounded-lg border border-green-200 bg-green-50 p-6">
						<p className="mb-4 text-gray-700">
							<strong>All prices displayed on our website include applicable sales tax.</strong> We follow a
							European-style pricing model where the listed price is your final price – no additional tax will
							be added at checkout at this time.
						</p>
						<p className="text-gray-700">
							As a Maine-based business, we calculate and remit sales tax to states as required based on your
							billing and shipping address, forwarding the appropriate portion to the relevant tax authorities
							for numismatic products.
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">State Tax Exemptions</h2>
					<p className="mb-4 text-gray-700">
						Most U.S. states recognize the investment nature of precious metals and numismatic products by
						providing tax exemptions. Examples include:
					</p>

					<div className="mb-8 grid gap-6 md:grid-cols-2">
						<div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
							<h3 className="mb-2 font-semibold text-blue-800">California:</h3>
							<p className="text-gray-700">Exempts sales over $1,500</p>
						</div>

						<div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
							<h3 className="mb-2 font-semibold text-amber-800">Many Other States:</h3>
							<p className="text-gray-700">Complete exemptions for bullion and numismatic products</p>
						</div>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Our Tax Advocacy</h2>
					<p className="mb-4 text-gray-700">
						We support efforts to eliminate sales tax on precious metals and numismatic investments in the
						remaining states that still impose these taxes. High tax burdens (often 12% or more) can
						significantly impact the viability of physical coin collecting and investing, particularly when
						they exceed typical short-term market gains.
					</p>

					<div className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
						<h3 className="mb-2 text-lg font-semibold text-yellow-800">Impact on the Industry:</h3>
						<p className="text-gray-700">
							Heavy taxation on these investment-grade products often leads to fewer physical coin dealers in
							affected states, reducing access and market competition.
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">What You Can Do</h2>
					<div className="mb-8 rounded-lg border border-purple-200 bg-purple-50 p-6">
						<p className="text-gray-700">
							If your state currently taxes precious metals or numismatic products, we encourage you to
							contact your state representatives to advocate for tax code review and potential exemptions for
							these investment categories.
						</p>
					</div>

					<div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
						<p className="mb-4 text-gray-700">
							<strong>Questions about tax calculations for your specific location?</strong>
						</p>
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
