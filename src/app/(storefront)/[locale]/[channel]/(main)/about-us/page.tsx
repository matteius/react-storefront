import { type Metadata } from "next";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";

export const metadata: Metadata = {
	title: "About Us - Matt&apos;s Coinage",
	description:
		"Learn about Matt&apos;s Coinage, our passion for numismatics, and our commitment to providing authentic collectible coins and currency.",
};

export default function AboutUsPage() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
			<div className="rounded-lg bg-card p-8 shadow-lg">
				<h1 className="mb-8 text-3xl font-bold text-foreground">About Matt&apos;s Coinage</h1>

				<div className="prose prose-lg max-w-none">
					<div className="mb-8 rounded-lg border border-border bg-secondary p-6">
						<h2 className="mb-4 text-2xl font-bold text-foreground">Our Story</h2>
						<p className="text-foreground">
							Founded in 2022, Matt&apos;s Coinage was born from a lifelong passion for numismatics and a
							desire to share the fascinating world of collectible coins and currency with fellow enthusiasts.
							Owned and operated by OpenSensor Engineering LLC of Maine, USA, we are a legitimate business
							dedicated to providing authentic, high-quality collectibles with transparent practices and
							exceptional customer service.
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Our Mission</h2>
					<p className="mb-6 text-foreground">
						At Matt&apos;s Coinage, we believe that every coin tells a story. Our mission is to connect
						collectors with authentic pieces of history while maintaining the highest standards of integrity,
						transparency, and customer satisfaction. We strive to make numismatics accessible to both seasoned
						collectors and newcomers to the hobby.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-foreground">What Sets Us Apart</h2>
					<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
						<div className="rounded-lg border border-border bg-secondary p-6">
							<h3 className="mb-3 text-lg font-semibold text-foreground">Authenticity Guaranteed</h3>
							<p className="text-foreground">
								Every item in our collection is carefully authenticated and accurately described. We provide
								detailed, high-resolution photographs and comprehensive condition assessments for each piece.
							</p>
						</div>

						<div className="rounded-lg border border-border bg-secondary p-6">
							<h3 className="mb-3 text-lg font-semibold text-foreground">Personal Service</h3>
							<p className="text-foreground">
								As an owner-operated business, we provide personalized attention to every customer. When you
								contact us, you&apos;re speaking directly with knowledgeable numismatic enthusiasts.
							</p>
						</div>

						<div className="rounded-lg border border-border bg-secondary p-6">
							<h3 className="mb-3 text-lg font-semibold text-foreground">Secure Transactions</h3>
							<p className="text-foreground">
								We use industry-leading security measures and trusted payment processors to ensure your
								transactions are safe and your personal information is protected.
							</p>
						</div>

						<div className="rounded-lg border border-border bg-secondary p-6">
							<h3 className="mb-3 text-lg font-semibold text-foreground">Quality Focus</h3>
							<p className="text-foreground">
								We carefully curate our inventory to offer exceptional pieces that represent good value and
								historical significance, from ancient coins to modern collectibles.
							</p>
						</div>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Our Expertise</h2>
					<p className="mb-4 text-foreground">With years of experience in numismatics, we specialize in:</p>
					<ul className="mb-6 space-y-2 text-foreground">
						<li>• Ancient coins from various civilizations and time periods</li>
						<li>• World coins and currency from different countries</li>
						<li>• Historical and commemorative pieces</li>
						<li>• Collectible currency and banknotes</li>
						<li>• Precious metals and bullion</li>
						<li>• Numismatic accessories and supplies</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Product Sourcing</h2>
					<p className="mb-4 text-foreground">
						We source our inventory from trusted, reputable dealers in the precious metals and numismatics
						industry. Our primary sources include:
					</p>
					<div className="mb-6 rounded-lg border border-border bg-secondary p-6">
						<ul className="space-y-2 text-foreground">
							<li>
								• <strong>APMEX (American Precious Metals Exchange)</strong> - One of the nation&apos;s
								largest and most trusted precious metals retailers
							</li>
							<li>
								• <strong>Established Coin Dealers</strong> - Reputable dealers with proven track records in
								the numismatic community
							</li>
							<li>
								• <strong>Estate Collections</strong> - Carefully vetted private collections and estate
								sales
							</li>
							<li>
								• <strong>Direct Acquisitions</strong> - Select pieces acquired directly from collectors and
								trusted sources
							</li>
						</ul>
					</div>
					<p className="mb-6 text-foreground">
						Every item we offer has been carefully authenticated and verified for quality. We stand behind
						the authenticity and accurate description of every piece in our inventory.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Business Practices</h2>
					<div className="mb-6 space-y-4">
						<div className="rounded-lg border border-border bg-secondary p-4">
							<h3 className="mb-2 font-semibold text-foreground">Transparency</h3>
							<p className="text-foreground">
								We believe in complete transparency in all our business dealings. Our policies, pricing, and
								practices are clearly stated and consistently applied.
							</p>
						</div>

						<div className="rounded-lg border border-border bg-secondary p-4">
							<h3 className="mb-2 font-semibold text-foreground">Privacy Protection</h3>
							<p className="text-foreground">
								Your privacy is paramount. We never sell, share, or misuse customer information. Our data
								practices are designed to protect your personal information at all times.
							</p>
						</div>

						<div className="rounded-lg border border-border bg-secondary p-4">
							<h3 className="mb-2 font-semibold text-foreground">Secure Operations</h3>
							<p className="text-foreground">
								We maintain secure business practices including proper insurance coverage, secure storage, and
								professional handling of all transactions and shipments.
							</p>
						</div>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Our Commitment to Customers</h2>
					<p className="mb-4 text-foreground">
						We are committed to providing an exceptional experience for every customer:
					</p>
					<ul className="mb-6 space-y-2 text-foreground">
						<li>
							• <strong>Responsive Communication:</strong> We strive to respond to all inquiries within 24
							hours
						</li>
						<li>
							• <strong>Accurate Descriptions:</strong> Every item is thoroughly researched and accurately
							described
						</li>
						<li>
							• <strong>Secure Shipping:</strong> All orders are fully insured and carefully packaged
						</li>
						<li>
							• <strong>Fair Policies:</strong> Our return and refund policies are clearly stated and fairly
							applied
						</li>
						<li>
							• <strong>Continuous Improvement:</strong> We constantly seek ways to enhance our service and
							offerings
						</li>
					</ul>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Community and Education</h2>
					<p className="mb-6 text-foreground">
						We believe in supporting the numismatic community through education and sharing knowledge. Whether
						you&apos;re a seasoned collector or just starting your journey, we&apos;re here to help you learn
						and grow in this fascinating hobby.
					</p>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Looking Forward</h2>
					<p className="mb-6 text-foreground">
						As we continue to grow, our focus remains on maintaining the personal touch and high standards
						that define Matt&apos;s Coinage. We&apos;re excited to serve the numismatic community and help
						preserve these important pieces of history for future generations.
					</p>

					<div className="mb-8 rounded-lg border border-border bg-secondary p-6">
						<h3 className="mb-3 text-lg font-semibold text-foreground">Why Choose Matt&apos;s Coinage?</h3>
						<p className="mb-4 text-foreground">
							When you choose Matt&apos;s Coinage, you&apos;re not just making a purchase &ndash; you&apos;re
							joining a community of collectors who value authenticity, quality, and integrity. We&apos;re
							here to support your collecting journey with expert knowledge, fair pricing, and exceptional
							service.
						</p>
						<p className="font-medium text-foreground">
							Thank you for trusting us with your numismatic needs. We look forward to serving you!
						</p>
					</div>

					<h2 className="mb-4 text-2xl font-bold text-foreground">Get in Touch</h2>
					<p className="mb-4 text-foreground">
						We&apos;d love to hear from you! Whether you have questions about our products, need assistance
						with an order, or simply want to share your collecting interests, don&apos;t hesitate to reach
						out.
					</p>

					<div className="mb-8 rounded-lg border border-border bg-secondary p-6">
						<h3 className="mb-3 text-lg font-semibold text-foreground">Contact Information</h3>
						<ul className="space-y-2 text-foreground">
							<li>
								<strong>Email:</strong>{" "}
								<a href="mailto:matt@mattscoinage.com" className="text-foreground hover:text-foreground">
									matt@mattscoinage.com
								</a>
							</li>
							<li>
								<strong>Facebook:</strong>{" "}
								<a
									href="https://facebook.com/MattsCoinage"
									target="_blank"
									rel="noopener noreferrer"
									className="text-foreground hover:text-foreground"
								>
									MattsCoinage Facebook Page
								</a>
							</li>
						</ul>
					</div>

					<div className="text-center">
						<LinkWithChannel
							href="/customer-support"
							className="inline-block rounded-md bg-secondary px-6 py-3 font-medium text-primary-foreground transition-colors duration-200 hover:bg-secondary"
						>
							Contact Us Today
						</LinkWithChannel>
					</div>
				</div>
			</div>
		</div>
	);
}
