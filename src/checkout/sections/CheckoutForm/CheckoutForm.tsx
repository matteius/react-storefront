import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useCheckout } from "@/checkout/hooks/useCheckout";
import { Contact } from "@/checkout/sections/Contact";
import { DeliveryMethods } from "@/checkout/sections/DeliveryMethods";
import { ContactSkeleton } from "@/checkout/sections/Contact/ContactSkeleton";
import { DeliveryMethodsSkeleton } from "@/checkout/sections/DeliveryMethods/DeliveryMethodsSkeleton";
import { AddressSectionSkeleton } from "@/checkout/components/AddressSectionSkeleton";
import { Divider } from "@/checkout/components";
import { GuestShippingAddressSection } from "@/checkout/sections/GuestShippingAddressSection";
import { PaymentSection, PaymentSectionSkeleton } from "@/checkout/sections/PaymentSection";
import { GuestBillingAddressSection } from "@/checkout/sections/GuestBillingAddressSection";
import { usePreloadShippingMethods } from "@/checkout/hooks/usePreloadShippingMethods";

export const CheckoutForm = () => {
	const { checkout } = useCheckout();

	// Pre-load shipping methods with US default to show options earlier
	usePreloadShippingMethods();

	return (
		<section className="flex flex-auto flex-col space-y-4 overflow-y-auto px-4 pb-4 pt-4">
			<div className="flex w-full flex-col">
				<ErrorBoundary
					FallbackComponent={({ error }) => {
						console.error("Contact section error:", error);
						return <div>Contact Error: {(error as Error)?.message || "Unknown error"}</div>;
					}}
				>
					<Suspense fallback={<ContactSkeleton />}>
						<Contact setShowOnlyContact={() => {}} />
					</Suspense>
				</ErrorBoundary>
				<>
					{checkout?.isShippingRequired && (
						<ErrorBoundary
							FallbackComponent={({ error }) => {
								console.error("Address section error:", error);
								return <div>Address Error: {(error as Error)?.message || "Unknown error"}</div>;
							}}
						>
							<Suspense fallback={<AddressSectionSkeleton />}>
								<Divider />
								<div className="py-4" data-testid="shippingAddressSection">
									<GuestShippingAddressSection />
								</div>
								<GuestBillingAddressSection />
							</Suspense>
						</ErrorBoundary>
					)}
					<ErrorBoundary
						FallbackComponent={({ error }) => {
							console.error("DeliveryMethods section error:", error);
							return <div>DeliveryMethods Error: {(error as Error)?.message || "Unknown error"}</div>;
						}}
					>
						<Suspense fallback={<DeliveryMethodsSkeleton />}>
							<DeliveryMethods collapsed={false} />
						</Suspense>
					</ErrorBoundary>
					<ErrorBoundary
						FallbackComponent={({ error }) => {
							console.error("PaymentSection section error:", error);
							return <div>PaymentSection Error: {(error as Error)?.message || "Unknown error"}</div>;
						}}
					>
						<Suspense fallback={<PaymentSectionSkeleton />}>
							<PaymentSection />
						</Suspense>
					</ErrorBoundary>
				</>
			</div>
		</section>
	);
};
