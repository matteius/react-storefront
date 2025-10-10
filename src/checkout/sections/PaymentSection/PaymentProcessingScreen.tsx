import React, { type ReactNode, useState, useCallback, useMemo } from "react";
import { createSafeContext } from "@/checkout/providers/createSafeContext";
import { getQueryParams } from "@/checkout/lib/utils/url";

interface PaymentProcessingContextConsumerProps {
	setIsProcessingPayment: (processing: boolean) => void;
}

const [usePaymentProcessingScreen, Provider] = createSafeContext<PaymentProcessingContextConsumerProps>();

export const PaymentProcessingScreen = ({ children }: { children: ReactNode }) => {
	const getInitialProcessing = () => {
		const { processingPayment } = getQueryParams();

		return !!processingPayment;
	};

	const [isProcessingPayment, setIsProcessingPayment] = useState(getInitialProcessing());

	const handleSetProcessing = useCallback((processing: boolean) => {
		setIsProcessingPayment(processing);
	}, []);

	return (
		<Provider value={useMemo(() => ({ setIsProcessingPayment: handleSetProcessing }), [handleSetProcessing])}>
			{isProcessingPayment && (
				<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
					<div className="mx-auto max-w-md px-6 text-center">
						{/* Animated spinner */}
						<div className="mb-8 flex justify-center">
							<div className="relative">
								<div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-amber-600"></div>
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="h-8 w-8 animate-pulse rounded-full bg-amber-600"></div>
								</div>
							</div>
						</div>

						{/* Processing message */}
						<div className="mb-6">
							<h2 className="mb-3 text-2xl font-bold text-gray-900">Processing Your Payment</h2>
							<p className="text-lg text-gray-600">Please wait while we securely process your payment...</p>
						</div>

						{/* Progress indicator */}
						<div className="mb-8">
							<div className="mb-2 flex justify-between text-sm text-gray-500">
								<span>Verifying payment details</span>
								<span>This may take a few seconds</span>
							</div>
							<div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
								<div className="h-full animate-pulse bg-gradient-to-r from-amber-500 to-gold-500"></div>
							</div>
						</div>

						{/* Security message */}
						<div className="rounded-lg bg-green-50 p-4">
							<div className="flex items-center justify-center">
								<svg className="mr-2 h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
									<path
										fillRule="evenodd"
										d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
										clipRule="evenodd"
									/>
								</svg>
								<span className="text-sm font-medium text-green-800">
									Your payment is secured with bank-level encryption
								</span>
							</div>
						</div>
					</div>
				</div>
			)}
			{children}
		</Provider>
	);
};

export { usePaymentProcessingScreen };
