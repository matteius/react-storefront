import { useMemo } from "react";
import { paymentMethodToComponent } from "./supportedPaymentApps";
import { PaymentSectionSkeleton } from "@/checkout/sections/PaymentSection/PaymentSectionSkeleton";
import { usePayments } from "@/checkout/sections/PaymentSection/usePayments";
import { useCheckoutUpdateState } from "@/checkout/state/updateStateStore";

export const PaymentMethods = () => {
	const { availablePaymentGateways, fetching } = usePayments();
	const {
		changingBillingCountry,
		updateState: { checkoutDeliveryMethodUpdate },
	} = useCheckoutUpdateState();

	const gatewaysWithDefinedComponent = useMemo(
		() => availablePaymentGateways.filter((gateway) => gateway.id in paymentMethodToComponent),
		[availablePaymentGateways],
	);

	const isUpdating = changingBillingCountry || fetching || checkoutDeliveryMethodUpdate === "loading";

	// Show skeleton only on initial load when we have no gateways yet
	// During updates, keep the payment form mounted to preserve Stripe state
	if (isUpdating && gatewaysWithDefinedComponent.length === 0) {
		return <PaymentSectionSkeleton />;
	}

	return (
		<div className={`gap-y-8 ${isUpdating ? "pointer-events-none opacity-60" : ""}`}>
			{gatewaysWithDefinedComponent.map((gateway) => {
				const Component = paymentMethodToComponent[gateway.id];

				// Handle unsupported payment gateways gracefully
				if (!Component) {
					console.warn(
						`Payment gateway "${gateway.id}" is not supported. Available gateways:`,
						Object.keys(paymentMethodToComponent),
					);
					return (
						<div key={gateway.id} className="rounded border border-yellow-300 bg-yellow-50 p-4">
							<p className="text-yellow-800">Payment method &quot;{gateway.id}&quot; is not yet supported.</p>
						</div>
					);
				}

				return (
					<Component
						key={gateway.id}
						// @ts-expect-error -- gateway matches the id but TypeScript doesn't know that
						config={gateway}
					/>
				);
			})}
		</div>
	);
};
