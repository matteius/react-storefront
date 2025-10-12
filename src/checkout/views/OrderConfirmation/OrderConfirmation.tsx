import { Suspense } from "react";
import { Summary, SummarySkeleton } from "@/checkout/sections/Summary";
import { OrderInfo } from "@/checkout/sections/OrderInfo";
import { useOrder } from "@/checkout/hooks/useOrder";
import { TrustPilotReviewCollector } from "@/ui/components/TrustPilot";

export const OrderConfirmation = () => {
	const { order } = useOrder();

	return (
		<main className="grid grid-cols-1 gap-x-16 lg:grid-cols-2">
			<div>
				<header>
					<p className="mb-2 text-lg font-bold" data-testid="orderConfrmationTitle">
						Order #{order.number} confirmed
					</p>
					<p className="text-base">
						Thank you for placing your order. We&apos;ve received it and we will contact you as soon as your
						package is shipped. A confirmation email has been sent to {order.userEmail}.
					</p>
				</header>
				<OrderInfo />

				{/* TrustPilot Review Collector */}
				<div className="mt-8">
					<div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
						<h3 className="mb-4 text-lg font-semibold text-amber-900">
							Help Other Collectors - Share Your Experience!
						</h3>
						<p className="mb-4 text-sm text-amber-700">
							Your feedback helps fellow coin enthusiasts make informed decisions. Please take a moment to
							review your experience with Matt&apos;s Coinage.
						</p>
						<TrustPilotReviewCollector className="mt-4" />
					</div>
				</div>
			</div>
			<Suspense fallback={<SummarySkeleton />}>
				<Summary
					{...order}
					// for now there can only be one voucher per order in the api
					discount={order?.discounts?.find(({ type }) => type === "VOUCHER")?.amount}
					voucherCode={order?.voucher?.code}
					totalPrice={order?.total}
					subtotalPrice={order?.subtotal}
					editable={false}
				/>
			</Suspense>
		</main>
	);
};
