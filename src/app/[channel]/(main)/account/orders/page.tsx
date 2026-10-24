import Image from "next/image";
import Link from "next/link";
import { getCurrentUserWithOrders } from "@/lib/auth";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";

function formatMoney(money: { amount: number; currency: string }): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: money.currency,
	}).format(money.amount);
}

export const metadata = {
	title: "Order history - Matt's Coinage",
};

export default async function OrdersPage() {
	const me = await getCurrentUserWithOrders();
	const orderEdges = me?.orders?.edges ?? [];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium uppercase tracking-wide text-amber-600">Account</p>
					<h1 className="mt-1 text-3xl font-semibold text-neutral-900">Order history</h1>
				</div>
				<LinkWithChannel
					href="/account"
					className="text-sm font-medium text-neutral-600 hover:text-neutral-900"
				>
					← Back to account
				</LinkWithChannel>
			</div>

			{orderEdges.length === 0 ? (
				<div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
					<p className="text-neutral-600">No orders to show yet.</p>
					<LinkWithChannel
						href="/products"
						className="mt-4 inline-flex rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
					>
						Browse products
					</LinkWithChannel>
				</div>
			) : (
				<ul className="grid grid-cols-1 gap-4">
					{orderEdges.map(({ node: order }) => (
						<li key={order.id} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
							<div className="flex items-start justify-between gap-4">
								<div>
									<p className="text-sm text-neutral-500">Order #{order.number}</p>
									<p className="font-semibold text-neutral-900">
										Placed{" "}
										{new Date(order.created).toLocaleDateString(undefined, {
											month: "long",
											day: "numeric",
											year: "numeric",
										})}
									</p>
								</div>
								<div className="text-right">
									<p className="text-sm text-neutral-500">Total</p>
									<p className="font-semibold text-neutral-900">{formatMoney(order.total.gross)}</p>
									<p className="mt-1 text-xs uppercase tracking-wide text-neutral-500">
										{order.paymentStatus.replaceAll("_", " ").toLowerCase()}
									</p>
								</div>
							</div>
							<ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
								{order.lines.map((line, idx) => {
									const product = line.variant?.product;
									const thumb = product?.thumbnail;
									return (
										<li
											key={`${order.id}-${idx}`}
											className="flex items-center gap-3 rounded-xl bg-neutral-50 p-3"
										>
											{thumb ? (
												<div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-white">
													<Image
														src={thumb.url}
														alt={thumb.alt ?? ""}
														fill
														sizes="56px"
														className="object-cover"
													/>
												</div>
											) : (
												<div className="h-14 w-14 flex-shrink-0 rounded-lg bg-white" />
											)}
											<div className="min-w-0">
												<p className="truncate font-medium text-neutral-900">{product?.name ?? "Product"}</p>
												<p className="text-sm text-neutral-500">
													Qty {line.quantity}
													{line.variant?.name ? ` · ${line.variant.name}` : ""}
												</p>
											</div>
										</li>
									);
								})}
							</ul>
						</li>
					))}
				</ul>
			)}

			<p className="text-xs text-neutral-500">
				Need help with an order?{" "}
				<Link href="/customer-support" className="text-amber-600 underline">
					Contact support
				</Link>
				.
			</p>
		</div>
	);
}
