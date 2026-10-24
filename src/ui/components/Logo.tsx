"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { LinkWithChannel } from "../atoms/LinkWithChannel";

export const Logo = () => {
	const pathname = usePathname();

	const logoContent = (
		<div className="group relative mt-px block h-16 w-16 hover:text-brand lg:h-20 lg:w-20">
			<Image src="/logo.png" alt="www.MattsCoinage.com" fill style={{ objectFit: "contain" }} priority />
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
