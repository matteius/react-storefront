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

export default async function AccountPage({ params }: { params: Promise<{ channel: string }> }) {
	const { channel } = await params;
	const me = await getCurrentUserWithOrders();

	if (!me) {
		return (
			<div className="rounded-2xl border border-amber-200 bg-white p-8 shadow-sm">
				<h1 className="text-2xl font-semibold">My account</h1>
				<p className="mt-3 text-neutral-600">
					We couldn&apos;t load your account. Please{" "}
					<Link href="/api/auth/login" className="text-amber-600 underline">
						sign in again
					</Link>
					.
				</p>
			</div>
		);
	}

	const orderEdges = me.orders?.edges ?? [];

	return (
		<div className="space-y-8">
			<header className="flex items-center justify-between gap-4">
				<div>
					<p className="text-sm font-medium uppercase tracking-wide text-amber-600">My account</p>
					<h1 className="mt-1 text-3xl font-semibold text-neutral-900">
						{me.firstName ? `Welcome back, ${me.firstName}` : "Welcome back"}
					</h1>
					<p className="mt-2 text-neutral-600">{me.email}</p>
				</div>
				<form action={`/api/auth/logout?next=/${channel}`} method="post">
					<button
						type="submit"
						className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
					>
						Sign out
					</button>
				</form>
			</header>

			<section className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
					<p className="text-sm font-medium text-neutral-500">Email</p>
					<p className="mt-1 break-all font-medium text-neutral-900">{me.email}</p>
				</div>
				<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
					<p className="text-sm font-medium text-neutral-500">Name</p>
					<p className="mt-1 font-medium text-neutral-900">
						{[me.firstName, me.lastName].filter(Boolean).join(" ") || "—"}
					</p>
				</div>
				<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
					<p className="text-sm font-medium text-neutral-500">Orders placed</p>
					<p className="mt-1 font-medium text-neutral-900">{orderEdges.length}</p>
				</div>
			</section>

			<section>
				<div className="flex items-end justify-between">
					<h2 className="text-xl font-semibold text-neutral-900">Recent orders</h2>
					<LinkWithChannel
						href="/account/orders"
						className="text-sm font-medium text-amber-600 hover:text-amber-700"
					>
						View all orders →
					</LinkWithChannel>
				</div>

				{orderEdges.length === 0 ? (
					<div className="mt-4 rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
						<p className="text-neutral-600">You haven&apos;t placed any orders yet.</p>
						<LinkWithChannel
							href="/products"
							className="mt-4 inline-flex rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
						>
							Start shopping
						</LinkWithChannel>
					</div>
				) : (
					<ul className="mt-4 grid grid-cols-1 gap-4">
						{orderEdges.slice(0, 5).map(({ node: order }) => {
							const firstThumb = order.lines.find((line) => line.variant?.product?.thumbnail);
							return (
								<li
									key={order.id}
									className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
								>
									<div className="flex items-center gap-4">
										{firstThumb?.variant?.product?.thumbnail ? (
											<div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
												<Image
													src={firstThumb.variant.product.thumbnail.url}
													alt={firstThumb.variant.product.thumbnail.alt ?? ""}
													fill
													sizes="64px"
													className="object-cover"
												/>
											</div>
										) : (
											<div className="h-16 w-16 flex-shrink-0 rounded-lg bg-neutral-100" />
										)}
										<div>
											<p className="text-sm text-neutral-500">Order #{order.number}</p>
											<p className="font-semibold text-neutral-900">
												{new Date(order.created).toLocaleDateString(undefined, {
													month: "short",
													day: "numeric",
													year: "numeric",
												})}
											</p>
											<p className="text-sm text-neutral-500">
												{order.lines.reduce((acc, line) => acc + line.quantity, 0)} item
												{order.lines.length !== 1 ? "s" : ""} · Status: {order.paymentStatus.toLowerCase()}
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className="font-semibold text-neutral-900">{formatMoney(order.total.gross)}</p>
									</div>
								</li>
							);
						})}
					</ul>
				)}
			</section>
		</div>
	);
}
