"use client";

import { useEffect, useRef, useState } from "react";
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
	const [isLoaded, setIsLoaded] = useState(false);
	const widgetRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const loadWidget = async () => {
			await initializeTrustPilotWidgets();
			// Give the widget a moment to render
			setTimeout(() => {
				setIsLoaded(true);
			}, 500);
		};
		void loadWidget();
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
		"data-domain": domain,
	};

	const widgetId = `trustpilot-widget-${Math.random().toString(36).substr(2, 9)}`;

	const handleManualLoad = () => {
		void initializeTrustPilotWidgets();
	};

	return (
		<div className="relative">
			<div id={widgetId} ref={widgetRef} className={`trustpilot-widget ${className}`} {...widgetProps}>
				{/* Trustpilot requires a link as fallback */}
				<a href={`https://www.trustpilot.com/review/${domain}`} target="_blank" rel="noopener noreferrer">
					Trustpilot
				</a>
			</div>
			{/* Loading overlay - hidden once widget loads */}
			{!isLoaded && (
				<div className="absolute inset-0 flex items-center justify-center space-x-2 bg-white text-gray-600">
					<div className="flex space-x-1">
						{Array.from({ length: 5 }, (_, i) => (
							<svg key={i} className="h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
						))}
					</div>
					<span className="text-sm">Loading reviews...</span>
					<button
						onClick={handleManualLoad}
						className="ml-2 rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
					>
						Retry
					</button>
				</div>
			)}
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
			data-businessunit-id="68e97c5feaeab4d0f7b9e85e"
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
