import { type Metadata } from "next";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

export const metadata: Metadata = {
	title: "Investment Disclaimer - Matt's Coinage",
	description:
		"Important information about collectible coins, precious metals, and investment considerations.",
};

export default function InvestmentDisclaimerPage() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="rounded-lg bg-white p-8 shadow-lg">
				<h1 className="mb-8 text-3xl font-bold text-amber-900">Investment Disclaimer</h1>

				<div className="prose prose-lg max-w-none">
					<div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-6">
						<h2 className="mb-4 text-2xl font-bold text-red-900">Important Notice</h2>
						<p className="font-medium text-gray-700">
							The information provided on this website is for educational and informational purposes only.
							Matt&apos;s Coinage is a collectibles dealer, not a financial advisor or investment
							professional.
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Not Investment Advice</h2>
					<p className="mb-6 text-gray-700">
						Nothing on this website should be construed as investment, financial, legal, or tax advice. We
						do not provide recommendations regarding the purchase or sale of coins, precious metals, or any
						other items as investments.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Collectibles vs. Investments</h2>
					<p className="mb-4 text-gray-700">
						The coins, currency, and precious metals we offer are sold as collectibles and numismatic items.
						While some items may contain precious metals with intrinsic value, we make no representations or
						guarantees about:
					</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Future value appreciation or depreciation</li>
						<li>• Investment returns or performance</li>
						<li>• Market liquidity or resale value</li>
						<li>• Suitability for any particular investment strategy</li>
						<li>• Tax implications of purchases or sales</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Market Volatility</h2>
					<p className="mb-6 text-gray-700">
						Precious metals markets are subject to significant price volatility. The value of items
						containing gold, silver, platinum, or other precious metals can fluctuate substantially based on
						market conditions, economic factors, and other variables beyond our control. Past performance is
						not indicative of future results.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Consult Professional Advisors</h2>
					<p className="mb-6 text-gray-700">
						Before making any purchase decisions, especially those involving significant amounts, we strongly
						recommend consulting with qualified professionals, including:
					</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Financial advisors or investment professionals</li>
						<li>• Tax professionals or certified public accountants</li>
						<li>• Legal counsel as appropriate</li>
						<li>• Certified numismatic experts for authentication and grading</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Our Role</h2>
					<p className="mb-6 text-gray-700">
						Matt&apos;s Coinage serves as a dealer in collectible coins, currency, and precious metals. Our
						role is to:
					</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• Provide accurate descriptions of items we offer</li>
						<li>• Authenticate and verify the items in our inventory</li>
						<li>• Offer fair pricing based on current market conditions</li>
						<li>• Facilitate transactions between buyers and sellers</li>
						<li>• Provide educational information about numismatics and collectibles</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">Risk Acknowledgment</h2>
					<p className="mb-6 text-gray-700">
						By purchasing from Matt&apos;s Coinage, you acknowledge that:
					</p>
					<ul className="mb-6 space-y-2 text-gray-700">
						<li>• You are purchasing collectible items, not making an investment</li>
						<li>• The value of your purchase may increase or decrease over time</li>
						<li>• You have not relied on any statements from us as investment advice</li>
						<li>• You understand the risks associated with collectibles and precious metals</li>
						<li>• You have conducted your own research or consulted appropriate professionals</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-amber-900">No Guarantees</h2>
					<p className="mb-6 text-gray-700">
						We make no guarantees, warranties, or representations regarding the future value, appreciation,
						or investment potential of any items we sell. All purchases are made at the buyer&apos;s own
						risk and discretion.
					</p>

					<div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-6">
						<h3 className="mb-3 text-lg font-semibold text-amber-800">Questions?</h3>
						<p className="mb-4 text-gray-700">
							If you have questions about any items we offer, their authenticity, condition, or current
							market pricing, please don&apos;t hesitate to contact us. We&apos;re happy to provide
							information about our products as collectibles.
						</p>
						<p className="text-gray-700">
							For investment advice, please consult a qualified financial professional.
						</p>
					</div>

					<div className="text-center">
						<LinkWithChannel
							href="/customer-support"
							className="inline-block rounded-md bg-amber-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-amber-700"
						>
							Contact Us
						</LinkWithChannel>
					</div>
				</div>
			</div>
		</div>
	);
}

