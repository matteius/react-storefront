import { Suspense } from "react";
import { UserMenuContainer } from "./components/UserMenu/UserMenuContainer";
import { CartNavItem } from "./components/CartNavItem";
import { NavLinks } from "./components/NavLinks";
import { MobileMenu } from "./components/MobileMenu";
import { SearchBar } from "./components/SearchBar";

export const Nav = ({ channel }: { channel: string }) => {
	return (
		<nav className="hidden h-full pl-0.5 lg:flex" aria-label="Main navigation">
			<ol className="flex h-full list-none items-center">
				<NavLinks channel={channel} />
			</ol>
			<div className="flex flex-1 justify-end">
				<Suspense fallback={<div className="w-8" />}>
					<UserMenuContainer />
				</Suspense>
				<div className="ml-2 hidden xs:flex">
					<Suspense fallback={<div className="w-6" />}>
						<CartNavItem channel={channel} />
					</Suspense>
				</div>
				<div className="ml-2 hidden lg:flex">
					<SearchBar channel={channel} />
				</div>
			</div>
			<Suspense>
				<MobileMenu>
					<SearchBar channel={channel} />
					<NavLinks channel={channel} />
				</MobileMenu>
			</Suspense>
		</nav>
	);
};
