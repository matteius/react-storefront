"use client";

import { useFormStatus } from "react-dom";

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

// Google Ads Add to Cart Conversion
// Conversion ID: AW-11004242983
// TODO: Update this label after creating Add to Cart conversion in Google Ads
const GOOGLE_ADS_ADD_TO_CART_LABEL = "ADD_TO_CART_LABEL_HERE";

interface AddButtonProps {
	disabled?: boolean;
	productName?: string;
	productPrice?: number;
	currency?: string;
}

export function AddButton({ disabled, productName, productPrice, currency = "USD" }: AddButtonProps) {
	const { pending } = useFormStatus();
	const isButtonDisabled = disabled || pending;

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (isButtonDisabled) {
			e.preventDefault();
			return;
		}

		// Fire Google Ads Add to Cart conversion
		if (typeof window !== "undefined" && window.gtag && GOOGLE_ADS_ADD_TO_CART_LABEL !== "ADD_TO_CART_LABEL_HERE") {
			window.gtag("event", "conversion", {
				send_to: `AW-11004242983/${GOOGLE_ADS_ADD_TO_CART_LABEL}`,
				value: productPrice ?? 0,
				currency: currency,
			});
			console.log("[Google Ads] Add to Cart conversion tracked:", {
				productName,
				productPrice,
				currency,
			});
		}
	};

	return (
		<button
			type="submit"
			aria-disabled={isButtonDisabled}
			aria-busy={pending}
			onClick={handleClick}
			className="h-12 items-center rounded-md bg-neutral-900 px-6 py-3 text-base font-medium leading-6 text-white shadow hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70 hover:disabled:bg-neutral-700 aria-disabled:cursor-not-allowed aria-disabled:opacity-70 hover:aria-disabled:bg-neutral-700"
		>
			{pending ? (
				<div className="inline-flex items-center">
					<svg
						className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<span>Processing...</span>
				</div>
			) : (
				<span>Add to cart</span>
			)}
		</button>
	);
}
