"use client";

interface TrustPilotWidgetProps {
	businessunitId?: string;
	domain: string;
	variant?: "micro" | "mini" | "standard" | "carousel";
	theme?: "light" | "dark";
	stars?: string;
	reviewCount?: string;
	className?: string;
}

// Static TrustPilot badge that links to your review page (no star rating to avoid misrepresentation)
export const TrustPilotWidget = ({
	domain,
	variant = "standard",
	className = "",
}: TrustPilotWidgetProps) => {
	const reviewUrl = `https://www.trustpilot.com/review/${domain}`;

	// Compact badge for micro/mini variants
	if (variant === "micro") {
		return (
			<a
				href={reviewUrl}
				target="_blank"
				rel="noopener noreferrer"
				className={`inline-flex items-center gap-1.5 text-sm hover:opacity-80 transition-opacity ${className}`}
			>
				<svg className="h-4 w-4 text-[#00b67a]" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
				</svg>
				<span className="font-medium text-gray-700">Trustpilot</span>
			</a>
		);
	}

	// Standard/mini widget - just branding and link, no stars
	return (
		<a
			href={reviewUrl}
			target="_blank"
			rel="noopener noreferrer"
			className={`inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all hover:shadow-md hover:border-[#00b67a]/30 ${className}`}
		>
			<svg className="h-6 w-6 text-[#00b67a]" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
			</svg>
			<span className="text-base font-semibold text-gray-800">See our reviews on Trustpilot</span>
		</a>
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

// TrustPilot Review Collector - simplified version that links to review page
export const TrustPilotReviewCollector = ({ className = "" }: { className?: string }) => {
	return (
		<a
			href="https://www.trustpilot.com/evaluate/mattscoinage.com"
			target="_blank"
			rel="noopener noreferrer"
			className={`inline-flex items-center gap-2 rounded-md bg-[#00b67a] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#00a06a] ${className}`}
		>
			<svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
			</svg>
			Leave us a review on Trustpilot
		</a>
	);
};
