"use client";

import clsx from "clsx";
import { type ReactElement } from "react";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import useSelectedPathname from "@/hooks/useSelectedPathname";

export function NavLink({ href, children }: { href: string; children: ReactElement | string }) {
	const pathname = useSelectedPathname();
	const isActive = pathname === href;

	return (
		<li className="h-full">
			<div className="flex h-full items-center">
				<LinkWithChannel
					href={href}
					className={clsx(
						"flex h-full items-center px-2 text-center text-sm font-semibold hover:text-brand lg:px-4",
						isActive ? "text-brand" : "text-main",
					)}
				>
					{children}
				</LinkWithChannel>
			</div>
		</li>
	);
}
