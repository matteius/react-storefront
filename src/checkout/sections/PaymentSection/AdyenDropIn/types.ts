// Inline type declarations to avoid deep imports into @adyen/adyen-web internals
// which break when package exports restrictions are enforced
type CardElementData = {
	paymentMethod: Record<string, unknown>;
	billingAddress?: Record<string, unknown>;
	browserInfo?: Record<string, unknown>;
	storePaymentMethod?: boolean;
};

type DropinElement = {
	setStatus: (status: string, props?: Record<string, unknown>) => void;
	handleAction: (action: Record<string, unknown>) => void;
};

type PaymentMethodsResponse = Record<string, unknown>;

type PaymentResponse = {
	resultCode: string;
	action?: Record<string, unknown>;
	order?: Record<string, unknown>;
	donationToken?: string;
};

export const adyenGatewayId = "app.saleor.adyen";
export type AdyenGatewayId = typeof adyenGatewayId;

// because it's defined to these in the docs but it's a string in the response type
type AdyenResultCode = "Authorised" | "Error" | "Pending" | "PresentToShopper" | "Refused" | "Received";

export interface AdyenGatewayInitializePayload {
	paymentMethodsResponse: PaymentMethodsResponse;
	clientKey: string;
	environment: string;
}

export interface AdyenPaymentResponse extends Omit<PaymentResponse, "resultCode"> {
	resultCode: AdyenResultCode;
	refusalReason?: string;
}

export interface AdyenTransactionInitializeResponse {
	paymentResponse: AdyenPaymentResponse;
}

export interface AdyenTransactionProcessResponse {
	paymentDetailsResponse: AdyenPaymentResponse;
}

// -------

export type ApplePayCallback = <T>(value: T) => void;

export type AdyenCheckoutInstanceState = {
	isValid?: boolean;
	data: CardElementData & Record<string, any>;
};

export type AdyenCheckoutInstanceOnSubmit = (
	state: AdyenCheckoutInstanceState,
	component: DropinElement,
) => Promise<void> | void;

export type AdyenCheckoutInstanceOnAdditionalDetails = (
	state: AdyenCheckoutInstanceState,
	component: DropinElement,
) => Promise<void> | void;
