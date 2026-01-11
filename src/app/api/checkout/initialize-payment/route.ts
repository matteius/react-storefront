import { NextResponse } from "next/server";
import { invariant } from "ts-invariant";

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

		const response = await fetch(process.env.NEXT_PUBLIC_SALEOR_API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: TRANSACTION_INITIALIZE_MUTATION,
				variables: {
					checkoutId,
					paymentGateway: {
						id: process.env.SALEOR_STRIPE_GATEWAY_ID || "app.saleor.stripe",
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

		return NextResponse.json({
			clientSecret,
			transactionId: transaction?.transaction?.id,
		});
	} catch (error) {
		console.error("Error initializing payment:", error);
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "Failed to initialize payment" },
			{ status: 500 }
		);
	}
}

