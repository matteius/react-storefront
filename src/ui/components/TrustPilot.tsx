"use client";

import { useEffect, useRef } from "react";
import { initializeTrustPilotWidgets } from "@/lib/trustpilot";

interface TrustPilotWidgetProps {
	businessunitId: string;
	domain: string;
	variant?: "micro" | "mini" | "standard" | "carousel";
	theme?: "light" | "dark";
	stars?: "1" | "2" | "3" | "4" | "5";
	reviewCount?: string;
	className?: string;
}

export const TrustPilotWidget = ({
	businessunitId,
	domain,
	variant = "standard",
	theme = "light",
	stars,
	reviewCount,
	className = "",
}: TrustPilotWidgetProps) => {
	const widgetRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Small delay to ensure DOM is ready
		const timer = setTimeout(() => {
			void initializeTrustPilotWidgets();
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	const widgetProps = {
		"data-locale": "en-US",
		"data-template-id": getTemplateId(variant),
		"data-businessunit-id": businessunitId,
		"data-style-height": getStyleHeight(variant),
		"data-style-width": "100%",
		"data-theme": theme,
		...(stars && { "data-stars": stars }),
		...(reviewCount && { "data-review-count": reviewCount }),
	};

	const widgetId = `trustpilot-widget-${Math.random().toString(36).substr(2, 9)}`;

	return (
		<div id={widgetId} ref={widgetRef} className={`trustpilot-widget ${className}`} {...widgetProps}>
			{/* Trustpilot requires a link as fallback */}
			<a href={`https://www.trustpilot.com/review/${domain}`} target="_blank" rel="noopener noreferrer">
				Trustpilot
			</a>
		</div>
	);
};

// TrustPilot Badge Component for smaller spaces
export const TrustPilotBadge = ({
	businessunitId,
	domain,
	className = "",
}: {
	businessunitId: string;
	domain: string;
	className?: string;
}) => {
	return (
		<TrustPilotWidget businessunitId={businessunitId} domain={domain} variant="micro" className={className} />
	);
};

// Review Invitation Component
export const TrustPilotReviewInvite = ({
	businessunitId: _businessunitId,
	domain,
	customerEmail,
	customerName,
	orderReference,
}: {
	businessunitId: string;
	domain: string;
	customerEmail?: string;
	customerName?: string;
	orderReference?: string;
}) => {
	const inviteCustomer = () => {
		if (!customerEmail) {
			// Redirect to general review page
			window.open(`https://www.trustpilot.com/evaluate/${domain}`, "_blank");
			return;
		}

		// For future implementation with TrustPilot API
		console.log("Invite customer to review:", {
			email: customerEmail,
			name: customerName,
			reference: orderReference,
		});

		// For now, redirect to review page
		window.open(`https://www.trustpilot.com/evaluate/${domain}`, "_blank");
	};

	return (
		<div className="rounded-lg border border-green-200 bg-green-50 p-4">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-sm font-medium text-green-800">Love your purchase?</h3>
					<p className="text-sm text-green-700">Share your experience and help other collectors!</p>
				</div>
				<button
					onClick={inviteCustomer}
					className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
				>
					Write Review
				</button>
			</div>
		</div>
	);
};

// TrustPilot Review Collector Widget (for checkout confirmation)
export const TrustPilotReviewCollector = ({ className = "" }: { className?: string }) => {
	useEffect(() => {
		void initializeTrustPilotWidgets();
	}, []);

	const widgetId = `trustpilot-collector-${Math.random().toString(36).substr(2, 9)}`;

	return (
		<div
			id={widgetId}
			className={`trustpilot-widget ${className}`}
			data-locale="en-US"
			data-template-id="56278e9abfbbba0bdcd568bc"
			data-businessunit-id="68e97c5f13f7f55ed9aad8c3"
			data-style-height="52px"
			data-style-width="100%"
			data-token="46ce6344-38ce-4e20-a3f6-eb7641fa6b08"
		>
			<a href="https://www.trustpilot.com/review/mattscoinage.com" target="_blank" rel="noopener">
				Trustpilot
			</a>
		</div>
	);
};

// Helper functions
function getTemplateId(variant: string): string {
	switch (variant) {
		case "micro":
			return "5419b6a8b0d04a076446a9ad"; // Micro review count
		case "mini":
			return "5419b6ffb0d04a076446a9ae"; // Mini review widget
		case "carousel":
			return "53aa8912dec7e10d38f59f36"; // Review carousel
		case "standard":
		default:
			return "5419b6a8b0d04a076446a9ad"; // Standard widget
	}
}

function getStyleHeight(variant: string): string {
	switch (variant) {
		case "micro":
			return "20px";
		case "mini":
			return "120px";
		case "carousel":
			return "240px";
		case "standard":
		default:
			return "150px";
	}
}
