import "./globals.css";
import { Suspense, type ReactNode } from "react";
import { type Metadata } from "next";
import Script from "next/script";
import { DraftModeNotification } from "@/ui/components/DraftModeNotification";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import { CookieConsent } from "@/ui/components/CookieConsent";
import { GoogleAnalyticsWrapper } from "@/ui/components/GoogleAnalyticsWrapper";

export const metadata: Metadata = {
	title: "Matt's Coinage - Premium Collectible Coins & Currency",
	description:
		"Discover rare and collectible coins, currency, and numismatic treasures at Matt's Coinage. Your trusted source for premium collectibles.",
	metadataBase: process.env.NEXT_PUBLIC_STOREFRONT_URL
		? new URL(process.env.NEXT_PUBLIC_STOREFRONT_URL)
		: undefined,
};

export default function RootLayout(props: { children: ReactNode }) {
	const { children } = props;

	return (
		<html lang="en" className="min-h-dvh">
			<head>
				{/* Trustpilot Widget Script */}
				<Script
					src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
					strategy="afterInteractive"
				/>
			</head>
			<body className="min-h-dvh font-sans">
				<CookieConsentProvider>
					<GoogleAnalyticsWrapper />
					{children}
					<CookieConsent />
					<Suspense>
						<DraftModeNotification />
					</Suspense>
				</CookieConsentProvider>
			</body>
		</html>
	);
}
