import { NextResponse } from "next/server";
import { invariant } from "ts-invariant";

const CHECKOUT_COMPLETE_MUTATION = `
mutation CheckoutComplete($checkoutId: ID!) {
	checkoutComplete(id: $checkoutId) {
		errors {
			field
			message
			code
		}
		order {
			id
			number
		}
	}
}
`;

interface CheckoutCompleteResponse {
	data?: {
		checkoutComplete?: {
			errors?: Array<{ message?: string }>;
			order?: { id: string; number?: string };
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
				query: CHECKOUT_COMPLETE_MUTATION,
				variables: { checkoutId },
			}),
		});

		const result = await response.json() as CheckoutCompleteResponse;

		if (result.errors) {
			const errorMessage = result.errors.map((e) => e.message).join(", ");
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}

		const checkout = result.data?.checkoutComplete;

		if (checkout?.errors && checkout.errors.length > 0) {
			const errorMessage = checkout.errors.map((e) => e.message || "Unknown error").join(", ");
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}

		return NextResponse.json({
			success: true,
			orderId: checkout?.order?.id,
			orderNumber: checkout?.order?.number,
		});
	} catch (error) {
		console.error("Error completing checkout:", error);
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "Failed to complete checkout" },
			{ status: 500 }
		);
	}
}

