"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

export const Logo = () => {
	const pathname = usePathname();

	const logoContent = (
		<div className="group relative mt-px block h-24 w-24 hover:text-brand">
			<Image src="/logo.png" alt="www.MattsCoinage.com" fill />
		</div>
	);

	if (pathname === "/") {
		return <h1 aria-label="homepage">{logoContent}</h1>;
	}
	return (
		<LinkWithChannel aria-label="homepage" href="/">
			{logoContent}
		</LinkWithChannel>
	);
};
