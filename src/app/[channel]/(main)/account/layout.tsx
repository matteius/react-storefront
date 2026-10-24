import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { isSignedIn } from "@/lib/auth";

export const dynamic = "force-dynamic";

export const metadata = {
	title: "My Account - Matt's Coinage",
	description: "View your orders, profile, and account details at Matt's Coinage.",
};

export default async function AccountLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: Promise<{ channel: string }>;
}) {
	const { channel } = await params;
	if (!(await isSignedIn())) {
		const next = encodeURIComponent(`/${channel}/account`);
		redirect(`/api/auth/login?next=${next}`);
	}

	return <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">{children}</div>;
}
