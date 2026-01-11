import { NextResponse } from "next/server";
import { invariant } from "ts-invariant";

const PAYMENT_GATEWAY_INITIALIZE_MUTATION = `
mutation PaymentGatewayInitialize($checkoutId: ID!, $paymentGateways: [PaymentGatewayToInitialize!]) {
	paymentGatewayInitialize(id: $checkoutId, paymentGateways: $paymentGateways) {
		errors {
			field
			message
			code
		}
		gatewayConfigs {
			id
			data
			errors {
				field
				message
				code
			}
		}
	}
}
`;

const TRANSACTION_INITIALIZE_MUTATION = `
mutation TransactionInitialize($checkoutId: ID!, $paymentGateway: PaymentGatewayToInitialize!) {
	transactionInitialize(id: $checkoutId, paymentGateway: $paymentGateway) {
		transaction {
			id
			actions
		}
		transactionEvent {
			message
			type
		}
		data
		errors {
			field
			code
			message
		}
	}
}
`;

interface GatewayConfig {
	id: string;
	data?: {
		stripePublishableKey?: string;
		publishableKey?: string;
	};
	errors?: Array<{ message?: string }>;
}

interface PaymentGatewayInitializeResponse {
	data?: {
		paymentGatewayInitialize?: {
			gatewayConfigs?: GatewayConfig[];
			errors?: Array<{ message?: string }>;
		};
	};
	errors?: Array<{ message: string }>;
}

interface TransactionInitializeResponse {
	data?: {
		transactionInitialize?: {
			transaction?: { id: string };
			data?: { client_secret?: string };
			errors?: Array<{ message?: string }>;
		};
	};
	errors?: Array<{ message: string }>;
}

export async function POST(request: Request) {
	try {
		const body = await request.json() as { checkoutId?: string };
		const { checkoutId } = body;

		if (!checkoutId) {
			return NextResponse.json({ error: "Checkout ID is required" }, { status: 400 });
		}

		invariant(process.env.NEXT_PUBLIC_SALEOR_API_URL, "Missing NEXT_PUBLIC_SALEOR_API_URL");

		const stripeGatewayId = process.env.SALEOR_STRIPE_GATEWAY_ID || "app.saleor.stripe";

		// Step 1: Initialize payment gateway to get Stripe publishable key
		const gatewayResponse = await fetch(process.env.NEXT_PUBLIC_SALEOR_API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: PAYMENT_GATEWAY_INITIALIZE_MUTATION,
				variables: {
					checkoutId,
					paymentGateways: [{ id: stripeGatewayId, data: null }],
				},
			}),
		});

		const gatewayResult = await gatewayResponse.json() as PaymentGatewayInitializeResponse;

		if (gatewayResult.errors) {
			console.error("Gateway init errors:", gatewayResult.errors);
		}

		const gatewayConfigs = gatewayResult.data?.paymentGatewayInitialize?.gatewayConfigs || [];
		const stripeConfig = gatewayConfigs.find(g => g.id === stripeGatewayId);
		const stripePublishableKey = stripeConfig?.data?.stripePublishableKey || stripeConfig?.data?.publishableKey;

		// Step 2: Initialize transaction to get client secret
		const response = await fetch(process.env.NEXT_PUBLIC_SALEOR_API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: TRANSACTION_INITIALIZE_MUTATION,
				variables: {
					checkoutId,
					paymentGateway: {
						id: stripeGatewayId,
						data: {
							automatic_payment_methods: { enabled: true },
						},
					},
				},
			}),
		});

		const result = await response.json() as TransactionInitializeResponse;

		if (result.errors) {
			const errorMessage = result.errors.map((e) => e.message).join(", ");
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}

		const transaction = result.data?.transactionInitialize;

		if (transaction?.errors && transaction.errors.length > 0) {
			const errorMessage = transaction.errors.map((e) => e.message || "Unknown error").join(", ");
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}

		const clientSecret = transaction?.data?.client_secret;

		if (!clientSecret) {
			return NextResponse.json({ error: "Failed to get payment client secret" }, { status: 500 });
		}

		if (!stripePublishableKey) {
			return NextResponse.json({ error: "Failed to get Stripe publishable key from payment gateway" }, { status: 500 });
		}

		return NextResponse.json({
			clientSecret,
			transactionId: transaction?.transaction?.id,
			stripePublishableKey,
		});
	} catch (error) {
		console.error("Error initializing payment:", error);
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "Failed to initialize payment" },
			{ status: 500 }
		);
	}
}

