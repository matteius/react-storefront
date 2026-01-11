"use client";

import { useState, useEffect, useCallback } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BillingAddressForm, type BillingAddressData } from "./BillingAddressForm";

type CheckoutStep = "loading" | "billing" | "payment" | "processing" | "success" | "error";

interface CheckoutModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess?: () => void;
	channel?: string;
}

interface PaymentInitResponse {
	error?: string;
	clientSecret?: string;
	transactionId?: string;
	stripePublishableKey?: string;
}

interface ApiResponse {
	error?: string;
	success?: boolean;
}

interface CheckoutData {
	id: string;
	email?: string;
	totalPrice: {
		gross: {
			amount: number;
			currency: string;
		};
	};
	billingAddress?: {
		firstName: string;
		lastName: string;
		companyName?: string;
		streetAddress1: string;
		streetAddress2?: string;
		city: string;
		countryArea?: string;
		postalCode: string;
		country: { code: string };
		phone?: string;
	};
}

export function CheckoutModal({ isOpen, onClose, onSuccess, channel = "default-channel" }: CheckoutModalProps) {
	const [checkout, setCheckout] = useState<CheckoutData | null>(null);
	const [step, setStep] = useState<CheckoutStep>("loading");
	const [billingAddress, setBillingAddress] = useState<BillingAddressData | null>(null);
	const [clientSecret, setClientSecret] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [transactionId, setTransactionId] = useState<string | null>(null);
	const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);

	// Fetch checkout data when modal opens
	const fetchCheckout = useCallback(async () => {
		try {
			const response = await fetch(`/api/checkout/get?channel=${channel}`);
			const data = await response.json() as { checkout?: CheckoutData; error?: string };

			if (data.error) {
				throw new Error(data.error);
			}

			if (data.checkout) {
				setCheckout(data.checkout);

				// Check if we have billing address saved
				const savedBilling = data.checkout.billingAddress;
				if (savedBilling) {
					setBillingAddress({
						firstName: savedBilling.firstName,
						lastName: savedBilling.lastName,
						companyName: savedBilling.companyName || null,
						streetAddress1: savedBilling.streetAddress1,
						streetAddress2: savedBilling.streetAddress2 || null,
						city: savedBilling.city,
						countryArea: savedBilling.countryArea || null,
						postalCode: savedBilling.postalCode,
						country: savedBilling.country.code,
						phone: savedBilling.phone || null,
					});
				}
				setStep("billing");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load checkout");
			setStep("error");
		}
	}, [channel]);

	// Reset state when modal opens
	useEffect(() => {
		if (isOpen) {
			setStep("loading");
			setError(null);
			setClientSecret(null);
			setCheckout(null);
			fetchCheckout();
		}
	}, [isOpen, fetchCheckout]);

	const initializePayment = useCallback(async () => {
		if (!checkout?.id) return;

		setStep("loading");
		try {
			// Call transactionInitialize to get Stripe client secret and publishable key
			const response = await fetch("/api/checkout/initialize-payment", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ checkoutId: checkout.id }),
			});

			const data = await response.json() as PaymentInitResponse;
			if (data.error) {
				throw new Error(data.error);
			}

			if (!data.stripePublishableKey) {
				throw new Error("Failed to get Stripe configuration");
			}

			setClientSecret(data.clientSecret || null);
			setTransactionId(data.transactionId || null);
			setStripePromise(loadStripe(data.stripePublishableKey));
			setStep("payment");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to initialize payment");
			setStep("error");
		}
	}, [checkout?.id]);

	const handleBillingSubmit = async (data: BillingAddressData) => {
		if (!checkout?.id) return;
		
		setStep("loading");
		setBillingAddress(data);
		
		try {
			// Save billing address to checkout
			const response = await fetch("/api/checkout/update-billing", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ 
					checkoutId: checkout.id,
					billingAddress: data,
				}),
			});
			
			const result = await response.json() as ApiResponse;
			if (result.error) {
				throw new Error(result.error);
			}

			// Now initialize payment
			await initializePayment();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to save billing address");
			setStep("error");
		}
	};

	const handlePaymentSuccess = () => {
		setStep("success");
		onSuccess?.();
	};

	const handlePaymentError = (errorMessage: string) => {
		setError(errorMessage);
		setStep("error");
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
			<div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 p-6 shadow-2xl">
				{/* Close button */}
				<button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700" aria-label="Close">
					<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

				{/* Header */}
				<div className="mb-6 text-center">
					<h2 className="text-2xl font-bold text-amber-800">Checkout</h2>
					{checkout && (
						<p className="mt-1 text-amber-600">
							Total: ${(checkout.totalPrice.gross.amount).toFixed(2)} {checkout.totalPrice.gross.currency}
						</p>
					)}
				</div>

				{/* Content based on step */}
				{step === "loading" && <LoadingState />}
				{step === "billing" && <BillingAddressForm initialData={billingAddress} onSubmit={handleBillingSubmit} onCancel={onClose} />}
				{step === "payment" && clientSecret && stripePromise && (
					<Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" } }}>
						<PaymentForm checkoutId={checkout?.id || ""} transactionId={transactionId || ""} onSuccess={handlePaymentSuccess} onError={handlePaymentError} />
					</Elements>
				)}
				{step === "payment" && (!clientSecret || !stripePromise) && (
					<div className="rounded border border-red-300 bg-red-50 p-4">
						<p className="text-red-800">
							Payment initialization failed. Missing {!clientSecret ? "client secret" : "Stripe configuration"}.
						</p>
						<button
							onClick={() => setStep("billing")}
							className="mt-3 rounded-lg bg-amber-500 px-4 py-2 text-white hover:bg-amber-600"
						>
							Try Again
						</button>
					</div>
				)}
				{step === "processing" && <ProcessingState />}
				{step === "success" && <SuccessState onClose={onClose} />}
				{step === "error" && <ErrorState error={error} onRetry={() => setStep("billing")} onClose={onClose} />}
			</div>
		</div>
	);
}

function LoadingState() {
	return (
		<div className="flex flex-col items-center justify-center py-12">
			<div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500" />
			<p className="mt-4 text-amber-700">Loading...</p>
		</div>
	);
}

function ProcessingState() {
	return (
		<div className="flex flex-col items-center justify-center py-12">
			<div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500" />
			<p className="mt-4 text-amber-700">Processing your payment...</p>
			<p className="mt-2 text-sm text-amber-600">Please do not close this window.</p>
		</div>
	);
}

function SuccessState({ onClose }: { onClose: () => void }) {
	return (
		<div className="flex flex-col items-center justify-center py-12 text-center">
			<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
				<svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
				</svg>
			</div>
			<h3 className="text-xl font-bold text-green-700">Payment Successful!</h3>
			<p className="mt-2 text-gray-600">Thank you for your purchase. You will receive a confirmation email shortly.</p>
			<button onClick={onClose} className="mt-6 rounded-lg bg-amber-500 px-6 py-2 font-medium text-white hover:bg-amber-600">
				Close
			</button>
		</div>
	);
}

function ErrorState({ error, onRetry, onClose }: { error: string | null; onRetry: () => void; onClose: () => void }) {
	return (
		<div className="flex flex-col items-center justify-center py-12 text-center">
			<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
				<svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
			<h3 className="text-xl font-bold text-red-700">Payment Failed</h3>
			<p className="mt-2 text-gray-600">{error || "An error occurred during payment."}</p>
			<div className="mt-6 flex gap-3">
				<button onClick={onRetry} className="rounded-lg bg-amber-500 px-6 py-2 font-medium text-white hover:bg-amber-600">
					Try Again
				</button>
				<button onClick={onClose} className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-gray-700 hover:bg-gray-50">
					Cancel
				</button>
			</div>
		</div>
	);
}

interface PaymentFormProps {
	checkoutId: string;
	transactionId: string;
	onSuccess: () => void;
	onError: (error: string) => void;
}

function PaymentForm({ checkoutId, transactionId, onSuccess, onError }: PaymentFormProps) {
	const stripe = useStripe();
	const elements = useElements();
	const [processing, setProcessing] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!stripe || !elements) return;

		setProcessing(true);

		try {
			// Confirm the payment with Stripe
			const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
				elements,
				confirmParams: {
					return_url: `${window.location.origin}/checkout/success`,
				},
				redirect: "if_required",
			});

			if (stripeError) {
				onError(stripeError.message || "Payment failed");
				setProcessing(false);
				return;
			}

			if (paymentIntent?.status === "succeeded" || paymentIntent?.status === "requires_capture") {
				// Complete the checkout
				const response = await fetch("/api/checkout/complete", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ checkoutId, transactionId }),
				});

				const result = await response.json() as ApiResponse;
				if (result.error) {
					onError(result.error);
				} else {
					onSuccess();
				}
			} else {
				onError("Payment was not completed. Please try again.");
			}
		} catch (err) {
			onError(err instanceof Error ? err.message : "An unexpected error occurred");
		}

		setProcessing(false);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<PaymentElement options={{ layout: "tabs" }} />
			<button
				type="submit"
				disabled={!stripe || processing}
				className="w-full rounded-lg bg-amber-500 px-4 py-3 font-medium text-white hover:bg-amber-600 disabled:opacity-50"
			>
				{processing ? "Processing..." : "Pay Now"}
			</button>
		</form>
	);
}

