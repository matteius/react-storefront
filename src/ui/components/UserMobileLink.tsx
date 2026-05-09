import { getCurrentUser } from "@/lib/auth";

export async function UserMobileLink({ channel }: { channel: string }) {
	const user = await getCurrentUser();

	if (!user) {
		return (
			<li className="py-3">
				{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
				<a
					href="/api/auth/login?next=/"
					className="block w-full rounded-lg bg-amber-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-amber-600"
				>
					Sign in to track orders
				</a>
			</li>
		);
	}

	const accountHref = `/${encodeURIComponent(channel)}/account`;
	const ordersHref = `/${encodeURIComponent(channel)}/account/orders`;

	return (
		<li className="py-3">
			<div className="flex flex-col gap-2">
				<p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Signed in as</p>
				<p className="truncate text-sm font-semibold text-neutral-900">{user.email}</p>
				<a
					href={accountHref}
					className="block rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
				>
					My account
				</a>
				<a
					href={ordersHref}
					className="block rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
				>
					Order history
				</a>
				<form action="/api/auth/logout?next=/" method="post">
					<button
						type="submit"
						className="block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-left text-sm font-medium text-neutral-800 hover:bg-neutral-50"
					>
						Sign out
					</button>
				</form>
			</div>
		</li>
	);
}
