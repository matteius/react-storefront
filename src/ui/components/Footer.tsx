import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ChannelSelect } from "./ChannelSelect";
import { ChannelsListDocument, MenuGetBySlugDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";

export async function Footer({ channel }: { channel: string }) {
	const footerLinks = await executeGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "footer", channel },
		revalidate: 60 * 60 * 24,
	});
	const channels = process.env.SALEOR_APP_TOKEN
		? await executeGraphQL(ChannelsListDocument, {
				withAuth: false, // disable cookie-based auth for this call
				headers: {
					// and use app token instead
					Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
				},
			})
		: null;
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mb-1 mt-1 sm:container sm:mb-1">
			<div className="border-l-0 border-r-0 bg-orange-100 px-2 sm:border-l-2 sm:border-r-2 sm:p-4">
				<div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-3 md:gap-8">
					{footerLinks.menu?.items && footerLinks.menu.items.length > 0 ? (
						footerLinks.menu.items.map((item) => {
							return (
								<div key={item.id}>
									<h3 className="mb-1 block cursor-pointer text-md font-bold text-sky-700 hover:underline">
										{item.name}
									</h3>
									<ul className="mb-1 list-none flex-col">
										{item.children?.map((child) => {
											if (child.category) {
												return (
													<li key={child.id} className="mt-1">
														<LinkWithChannel
															href={`/categories/${child.category.slug}`}
															className="cursor-pointer text-base text-sky-700 hover:underline"
														>
															{child.category.name}
														</LinkWithChannel>
													</li>
												);
											}
											if (child.collection) {
												return (
													<li key={child.id} className="mt-1">
														<LinkWithChannel
															href={`/collections/${child.collection.slug}`}
															className="cursor-pointer text-base text-sky-700 hover:underline"
														>
															{child.collection.name}
														</LinkWithChannel>
													</li>
												);
											}
											if (child.page) {
												return (
													<li key={child.id} className="mt-1">
														<LinkWithChannel
															href={`/pages/${child.page.slug}`}
															className="cursor-pointer text-base text-sky-700 hover:underline"
														>
															{child.page.title}
														</LinkWithChannel>
													</li>
												);
											}
											if (child.url) {
												return (
													<li key={child.id} className="mt-1">
														<LinkWithChannel
															href={child.url}
															className="cursor-pointer text-base text-sky-700 hover:underline"
														>
															{child.name}
														</LinkWithChannel>
													</li>
												);
											}
											return null;
										})}
									</ul>
								</div>
							);
						})
					) : (
						<>
							<div>
								<h3 className="mb-1 block text-md font-bold text-sky-700">Shop</h3>
								<ul className="mb-1 list-none flex-col">
									<li className="mt-1">
										<LinkWithChannel
											href="/products"
											className="cursor-pointer text-base text-sky-700 hover:underline"
										>
											All Products
										</LinkWithChannel>
									</li>
								</ul>
							</div>
							<div>
								<h3 className="mb-1 block text-md font-bold text-sky-700">Support</h3>
								<ul className="mb-1 list-none flex-col">
									<li className="mt-1">
										<LinkWithChannel
											href="/contact"
											className="cursor-pointer text-base text-sky-700 hover:underline"
										>
											Contact Us
										</LinkWithChannel>
									</li>
								</ul>
							</div>
							<div>
								<h3 className="mb-1 block text-md font-bold text-sky-700">Company</h3>
								<ul className="mb-1 list-none flex-col">
									<li className="mt-1">
										<LinkWithChannel
											href="/about"
											className="cursor-pointer text-base text-sky-700 hover:underline"
										>
											About Us
										</LinkWithChannel>
									</li>
								</ul>
							</div>
						</>
					)}
				</div>

				{channels?.channels && (
					<div className="mb-4 text-neutral-500">
						<label>
							<span className="text-sm">Change currency:</span> <ChannelSelect channels={channels.channels} />
						</label>
					</div>
				)}

				<div className="flex flex-col justify-between border-t border-neutral-200 py-4 sm:flex-row">
					<p className="text-sm text-neutral-500">Copyright &copy; {currentYear} www.MattsCoinage.com</p>
				</div>
			</div>
		</footer>
	);
}
