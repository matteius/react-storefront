"use client";

import { useState } from "react";
import { CheckoutModal } from "./CheckoutModal";

interface CheckoutButtonProps {
	disabled?: boolean;
	className?: string;
	children?: React.ReactNode;
	channel?: string;
}

export function CheckoutButton({ disabled = false, className = "", children, channel = "default-channel" }: CheckoutButtonProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSuccess = () => {
		// Redirect to success page or refresh
		window.location.href = "/checkout/success";
	};

	return (
		<>
			<button
				type="button"
				disabled={disabled}
				onClick={() => setIsModalOpen(true)}
				className={`inline-block max-w-full rounded border border-transparent bg-neutral-900 px-6 py-3 text-center font-medium text-neutral-50 hover:bg-neutral-800 aria-disabled:cursor-not-allowed aria-disabled:bg-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-500 sm:px-16 ${className}`}
				data-testid="CheckoutButton"
			>
				{children || "Checkout"}
			</button>
			<CheckoutModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSuccess={handleSuccess}
				channel={channel}
			/>
		</>
	);
}

