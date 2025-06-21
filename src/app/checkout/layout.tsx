import { type ReactNode } from "react";
import { AuthProvider } from "@/ui/components/AuthProvider";
import { ReactQueryProvider } from "@/checkout/providers/ReactQueryProvider";

export const metadata = {
	title: "Checkout - Matt's Coinage",
	description: "Complete your purchase at Matt's Coinage - Premium collectible coins and bullion.",
};

export default function RootLayout(props: { children: ReactNode }) {
	return (
		<main>
			<AuthProvider>
				<ReactQueryProvider>{props.children}</ReactQueryProvider>
			</AuthProvider>
		</main>
	);
}
