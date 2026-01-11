import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { invariant } from "ts-invariant";

const CHECKOUT_QUERY = `
query CheckoutGet($id: ID!) {
	checkout(id: $id) {
		id
		email
		totalPrice {
			gross {
				amount
				currency
			}
		}
		billingAddress {
			firstName
			lastName
			companyName
			streetAddress1
			streetAddress2
			city
			countryArea
			postalCode
			country {
				code
			}
			phone
		}
		lines {
			id
			quantity
			totalPrice {
				gross {
					amount
					currency
				}
			}
			variant {
				product {
					name
					thumbnail {
						url
						alt
					}
				}
				name
			}
		}
	}
}
`;

interface CheckoutResponse {
	data?: {
		checkout?: {
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
			lines: Array<{
				id: string;
				quantity: number;
				totalPrice: { gross: { amount: number; currency: string } };
				variant: {
					product: { name: string; thumbnail?: { url: string; alt?: string } };
					name: string;
				};
			}>;
		};
	};
	errors?: Array<{ message: string }>;
}

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const channel = searchParams.get("channel") || "default-channel";
		
		const cookieStore = await cookies();
		const checkoutId = cookieStore.get(`checkoutId-${channel}`)?.value;

		if (!checkoutId) {
			return NextResponse.json({ error: "No checkout found" }, { status: 404 });
		}

		invariant(process.env.NEXT_PUBLIC_SALEOR_API_URL, "Missing NEXT_PUBLIC_SALEOR_API_URL");

		const response = await fetch(process.env.NEXT_PUBLIC_SALEOR_API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: CHECKOUT_QUERY,
				variables: { id: checkoutId },
			}),
		});

		const result = await response.json() as CheckoutResponse;

		if (result.errors) {
			const errorMessage = result.errors.map((e) => e.message).join(", ");
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}

		if (!result.data?.checkout) {
			return NextResponse.json({ error: "Checkout not found" }, { status: 404 });
		}

		return NextResponse.json({ checkout: result.data.checkout });
	} catch (error) {
		console.error("Error fetching checkout:", error);
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "Failed to fetch checkout" },
			{ status: 500 }
		);
	}
}

