"use client";

import clsx from "clsx";
import { type ReactElement } from "react";
import { LinkWithChannel } from "@/ui/atoms/LinkWithChannel";
import useSelectedPathname from "@/hooks/useSelectedPathname";

export function NavLink({ href, children }: { href: string; children: ReactElement | string }) {
	const pathname = useSelectedPathname();
	const isActive = pathname === href;

	return (
		<li className="nav-link-item h-full">
			<div className="flex h-full items-center">
				<LinkWithChannel
					href={href}
					className={clsx(
						"group relative flex h-full items-center px-3 text-center text-sm font-semibold transition-all duration-300 ease-in-out lg:px-5",
						"mx-1 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm",
						"before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:w-0 before:-translate-x-1/2 before:bg-white before:transition-all before:duration-300",
						"hover:shadow-lg hover:shadow-gold-400/20 hover:before:w-3/4",
						isActive
							? "bg-white/15 text-white shadow-lg shadow-gold-400/30 backdrop-blur-sm before:w-3/4"
							: "text-white/90 hover:text-white",
					)}
				>
					<span className="relative z-10 drop-shadow-sm">{children}</span>
				</LinkWithChannel>
			</div>
		</li>
	);
}
