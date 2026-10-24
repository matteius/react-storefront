import { Suspense } from "react";
import { Checkout, CheckoutSkeleton } from "@/checkout/views/Checkout";
import { OrderConfirmation, OrderConfirmationSkeleton } from "@/checkout/views/OrderConfirmation";
import { getQueryParams } from "@/checkout/lib/utils/url";
import { PaymentProcessingScreen } from "@/checkout/sections/PaymentSection/PaymentProcessingScreen";

export const RootViews = () => {
	const orderId = getQueryParams().orderId;

	// Debug logging for order confirmation navigation
	console.log("RootViews: Current URL params:", window.location.search);
	console.log("RootViews: Extracted orderId:", orderId);

	if (orderId) {
		console.log("RootViews: Rendering OrderConfirmation for order:", orderId);
		return (
			<Suspense fallback={<OrderConfirmationSkeleton />}>
				<OrderConfirmation />
			</Suspense>
		);
	}

	console.log("RootViews: Rendering Checkout flow");
	return (
		<PaymentProcessingScreen>
			<Suspense fallback={<CheckoutSkeleton />}>
				<Checkout />
			</Suspense>
		</PaymentProcessingScreen>
	);
};
