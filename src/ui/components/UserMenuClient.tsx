"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { LogInIcon, LogOutIcon, PackageIcon, UserIcon, UserCircleIcon } from "lucide-react";
import { usePathname } from "next/navigation";

interface UserMenuUser {
	email: string;
	firstName: string;
}

interface UserMenuClientProps {
	channel: string;
	user: UserMenuUser | null;
}

export function UserMenuClient({ channel, user }: UserMenuClientProps) {
	const pathname = usePathname();
	const [nextParam, setNextParam] = useState("/");

	useEffect(() => {
		const path = pathname && pathname.startsWith("/") ? pathname : "/";
		setNextParam(path);
	}, [pathname]);

	if (!user) {
		const loginHref = `/api/auth/login?next=${encodeURIComponent(nextParam)}`;
		return (
			<a
				href={loginHref}
				data-testid="UserNavSignIn"
				className="hidden items-center gap-1.5 rounded-lg p-2 text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-lg hover:shadow-gold-400/20 hover:backdrop-blur-sm sm:flex"
			>
				<LogInIcon className="h-5 w-5 drop-shadow-sm" aria-hidden="true" />
				<span className="text-sm font-semibold drop-shadow-sm">Sign in</span>
			</a>
		);
	}

	const initial = (user.firstName || user.email || "?").charAt(0).toUpperCase();
	const accountHref = `/${encodeURIComponent(channel)}/account`;
	const ordersHref = `/${encodeURIComponent(channel)}/account/orders`;
	const logoutHref = `/api/auth/logout?next=${encodeURIComponent(nextParam)}`;

	return (
		<Menu as="div" className="relative" data-testid="UserNavMenu">
			<Menu.Button
				className="flex items-center gap-2 rounded-lg p-1.5 text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-lg hover:shadow-gold-400/20 hover:backdrop-blur-sm"
				aria-label={`Account menu for ${user.email}`}
			>
				<span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm font-bold drop-shadow-sm">
					{initial}
				</span>
				<span className="hidden max-w-[140px] truncate text-sm font-semibold drop-shadow-sm md:inline">
					{user.firstName || user.email}
				</span>
			</Menu.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="absolute right-0 z-50 mt-2 w-64 origin-top-right divide-y divide-neutral-200 rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
					<div className="px-4 py-3">
						<p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Signed in as</p>
						<p className="mt-1 truncate text-sm font-semibold text-neutral-900" title={user.email}>
							{user.email}
						</p>
					</div>
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<a
									href={accountHref}
									className={`flex items-center gap-2 px-4 py-2 text-sm ${
										active ? "bg-amber-50 text-amber-700" : "text-neutral-700"
									}`}
								>
									<UserCircleIcon className="h-4 w-4" aria-hidden="true" />
									My account
								</a>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<a
									href={ordersHref}
									className={`flex items-center gap-2 px-4 py-2 text-sm ${
										active ? "bg-amber-50 text-amber-700" : "text-neutral-700"
									}`}
								>
									<PackageIcon className="h-4 w-4" aria-hidden="true" />
									Order history
								</a>
							)}
						</Menu.Item>
					</div>
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<form action={logoutHref} method="post" className="m-0">
									<button
										type="submit"
										className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm ${
											active ? "bg-neutral-50 text-neutral-900" : "text-neutral-700"
										}`}
									>
										<LogOutIcon className="h-4 w-4" aria-hidden="true" />
										Sign out
									</button>
								</form>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}

export const UserMenuFallbackIcon = UserIcon;
