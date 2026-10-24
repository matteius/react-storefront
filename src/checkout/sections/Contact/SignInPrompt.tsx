import { useEffect, useState } from "react";

interface CurrentUserPayload {
	user: { id: string; email: string; firstName: string; lastName: string } | null;
}

interface SignInPromptProps {
	onUserResolved?: (email: string | null) => void;
}

export const SignInPrompt = ({ onUserResolved }: SignInPromptProps) => {
	const [user, setUser] = useState<CurrentUserPayload["user"] | null>(null);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		let cancelled = false;
		void (async () => {
			try {
				const response = await fetch("/api/auth/me", {
					credentials: "include",
					cache: "no-store",
				});
				if (!response.ok) {
					if (!cancelled) {
						setLoaded(true);
						onUserResolved?.(null);
					}
					return;
				}
				const data = (await response.json()) as CurrentUserPayload;
				if (cancelled) return;
				setUser(data.user);
				setLoaded(true);
				onUserResolved?.(data.user?.email ?? null);
			} catch {
				if (!cancelled) {
					setLoaded(true);
					onUserResolved?.(null);
				}
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [onUserResolved]);

	if (!loaded) {
		return <div className="h-12" aria-hidden="true" />;
	}

	const checkoutPath =
		typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : "/checkout";

	const channel = process.env.NEXT_PUBLIC_DEFAULT_CHANNEL || "default-channel";
	const ordersHref = `/${encodeURIComponent(channel)}/account/orders`;

	if (user) {
		return (
			<div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
				<div className="min-w-0">
					<p className="font-semibold text-amber-900">Signed in as {user.firstName || user.email}</p>
					<p className="truncate text-amber-800/80">
						We&apos;ll keep this order in your{" "}
						<a href={ordersHref} className="underline hover:text-amber-900">
							order history
						</a>
						.
					</p>
				</div>
			</div>
		);
	}

	const loginHref = `/api/auth/login?next=${encodeURIComponent(checkoutPath)}`;

	return (
		<div className="mb-3 flex flex-col gap-3 rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
			<div>
				<p className="font-semibold text-neutral-900">Have an account?</p>
				<p className="text-neutral-700">
					Sign in to track your order history, save addresses, and check out faster.
				</p>
			</div>
			<a
				href={loginHref}
				className="inline-flex flex-shrink-0 items-center justify-center rounded-lg bg-amber-500 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-amber-600"
			>
				Sign in
			</a>
		</div>
	);
};
