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
	const widgetRef = useRef<HTMLDivElement>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		let isMounted = true;

		const initWidget = async () => {
			try {
				await initializeTrustPilotWidgets();

				// Use MutationObserver to detect when TrustPilot injects content
				if (widgetRef.current && isMounted) {
					const observer = new MutationObserver((mutations) => {
						for (const mutation of mutations) {
							if (mutation.type === "childList" || mutation.type === "attributes") {
								// Check if iframe was added or widget was modified by TrustPilot
								const iframe = widgetRef.current?.querySelector("iframe");
								const hasContent = widgetRef.current?.children.length > 1;
								if (iframe || hasContent) {
									setIsLoaded(true);
									observer.disconnect();
									return;
								}
							}
						}
					});

					observer.observe(widgetRef.current, {
						childList: true,
						subtree: true,
						attributes: true,
					});

					// Also check immediately in case it already loaded
					const iframe = widgetRef.current.querySelector("iframe");
					if (iframe) {
						setIsLoaded(true);
						observer.disconnect();
						return;
					}

					// Fallback timeout - if nothing happens after 5 seconds, hide loading
					setTimeout(() => {
						if (isMounted && !isLoaded) {
							observer.disconnect();
							// Check one more time before showing error
							const iframe = widgetRef.current?.querySelector("iframe");
							if (iframe) {
								setIsLoaded(true);
							} else {
								// Don't show error, just hide loading - TrustPilot has its own fallback link
								setIsLoaded(true);
							}
						}
					}, 5000);
				}
			} catch (error) {
				console.error("Failed to initialize TrustPilot:", error);
				if (isMounted) {
					setHasError(true);
				}
			}
		};

		// Small delay to ensure DOM is ready
		const timer = setTimeout(initWidget, 100);

		return () => {
			isMounted = false;
			clearTimeout(timer);
		};
	}, [isLoaded]);

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
		<div className="relative">
			<div id={widgetId} ref={widgetRef} className={`trustpilot-widget ${className}`} {...widgetProps}>
				{/* Trustpilot requires a link as fallback */}
				<a href={`https://www.trustpilot.com/review/${domain}`} target="_blank" rel="noopener noreferrer">
					Trustpilot
				</a>
			</div>

			{/* Loading placeholder */}
			{!isLoaded && !hasError && (
				<div className="flex items-center justify-center py-4">
					<div className="flex items-center gap-2 text-sm text-gray-500">
						<svg className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
						<span>Loading reviews...</span>
					</div>
				</div>
			)}

			{/* Error fallback - show link to reviews */}
			{hasError && (
				<div className="flex items-center justify-center py-4">
					<a
						href={`https://www.trustpilot.com/review/${domain}`}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
					>
						<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
						</svg>
						<span>View our reviews on Trustpilot</span>
					</a>
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
