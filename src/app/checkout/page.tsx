import Link from "next/link";
import Image from "next/image";
import { invariant } from "ts-invariant";
import { RootWrapper } from "./pageWrapper";

export const metadata = {
	title: "Checkout - Matt's Coinage",
	description: "Complete your purchase at Matt's Coinage - Premium collectible coins and bullion.",
};

export default async function CheckoutPage(props: {
	searchParams: Promise<{ checkout?: string; order?: string }>;
}) {
	const searchParams = await props.searchParams;
	invariant(process.env.NEXT_PUBLIC_SALEOR_API_URL, "Missing NEXT_PUBLIC_SALEOR_API_URL env variable");

	if (!searchParams.checkout && !searchParams.order) {
		return null;
	}

	return (
		<div className="min-h-dvh bg-gradient-to-br from-slate-50 to-amber-50">
			<section className="mx-auto flex min-h-dvh max-w-7xl flex-col p-8">
				<div className="flex items-center">
					<Link aria-label="homepage" href="/" className="group relative block h-12 w-12 hover:text-brand">
						<Image src="/logo.png" alt="Matt's Coinage" fill style={{ objectFit: "contain" }} priority />
					</Link>
				</div>
				<h1 className="gradient-text mt-8 text-3xl font-bold">Checkout</h1>

				<section className="mb-12 mt-6 flex-1">
					<RootWrapper saleorApiUrl={process.env.NEXT_PUBLIC_SALEOR_API_URL} />
				</section>
			</section>
		</div>
	);
}
