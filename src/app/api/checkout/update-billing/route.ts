import { NextResponse } from "next/server";
import { invariant } from "ts-invariant";

const CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION = `
mutation CheckoutBillingAddressUpdate($checkoutId: ID!, $billingAddress: AddressInput!) {
	checkoutBillingAddressUpdate(id: $checkoutId, billingAddress: $billingAddress) {
		errors {
			field
			message
			code
		}
		checkout {
			id
			billingAddress {
				firstName
				lastName
				streetAddress1
				city
				postalCode
				country {
					code
				}
			}
		}
	}
}
`;

interface BillingAddressInput {
	firstName: string;
	lastName: string;
	companyName: string | null;
	streetAddress1: string;
	streetAddress2: string | null;
	city: string;
	countryArea: string | null;
	postalCode: string;
	country: string;
	phone: string | null;
}

interface CheckoutBillingAddressUpdateResponse {
	data?: {
		checkoutBillingAddressUpdate?: {
			errors?: Array<{ message?: string }>;
			checkout?: { id: string };
		};
	};
	errors?: Array<{ message: string }>;
}

export async function POST(request: Request) {
	try {
		const body = await request.json() as {
			checkoutId?: string;
			billingAddress?: BillingAddressInput;
		};
		const { checkoutId, billingAddress } = body;

		if (!checkoutId) {
			return NextResponse.json({ error: "Checkout ID is required" }, { status: 400 });
		}

		if (!billingAddress) {
			return NextResponse.json({ error: "Billing address is required" }, { status: 400 });
		}

		invariant(process.env.NEXT_PUBLIC_SALEOR_API_URL, "Missing NEXT_PUBLIC_SALEOR_API_URL");

		const response = await fetch(process.env.NEXT_PUBLIC_SALEOR_API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION,
				variables: {
					checkoutId,
					billingAddress: {
						firstName: billingAddress.firstName,
						lastName: billingAddress.lastName,
						companyName: billingAddress.companyName || "",
						streetAddress1: billingAddress.streetAddress1,
						streetAddress2: billingAddress.streetAddress2 || "",
						city: billingAddress.city,
						countryArea: billingAddress.countryArea || "",
						postalCode: billingAddress.postalCode,
						country: billingAddress.country,
						phone: billingAddress.phone || "",
					},
				},
			}),
		});

		const result = await response.json() as CheckoutBillingAddressUpdateResponse;

		if (result.errors) {
			const errorMessage = result.errors.map((e) => e.message).join(", ");
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}

		const checkout = result.data?.checkoutBillingAddressUpdate;

		if (checkout?.errors && checkout.errors.length > 0) {
			const errorMessage = checkout.errors.map((e) => e.message || "Unknown error").join(", ");
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error updating billing address:", error);
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : "Failed to update billing address" },
			{ status: 500 }
		);
	}
}

