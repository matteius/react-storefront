import { Suspense } from "react";
import { UserMenuContainer } from "./components/UserMenu/UserMenuContainer";
import { CartNavItem } from "./components/CartNavItem";
import { NavLinks } from "./components/NavLinks";
import { MobileMenu } from "./components/MobileMenu";
import { SearchBar } from "./components/SearchBar";

export const Nav = ({ channel }: { channel: string }) => {
	return (
		<nav className="flex h-full w-full items-center pl-0.5" aria-label="Main navigation">
			{/* Desktop Navigation Links */}
			<div className="hidden min-w-0 flex-1 lg:mr-4 lg:flex">
				<ol className="nav-links-container flex h-full list-none items-center gap-1 overflow-x-auto">
					<NavLinks channel={channel} />
				</ol>
			</div>

			{/* Tablet Navigation Links */}
			<div className="hidden min-w-0 flex-1 md:mr-3 md:flex lg:hidden">
				<ol className="nav-links-container flex h-full list-none items-center gap-1 overflow-x-auto">
					<NavLinks channel={channel} />
				</ol>
			</div>

			{/* Right side items */}
			<div className="flex flex-shrink-0 items-center gap-2 lg:gap-3">
				{/* Search bar - tablet and desktop */}
				<div className="hidden w-40 md:flex lg:w-48 xl:w-56">
					<SearchBar channel={channel} />
				</div>

				<Suspense fallback={<div className="w-8" />}>
					<div className="nav-icon-container">
						<UserMenuContainer />
					</div>
				</Suspense>

				<div className="hidden xs:flex">
					<Suspense fallback={<div className="w-6" />}>
						<div className="nav-icon-container">
							<CartNavItem channel={channel} />
						</div>
					</Suspense>
				</div>

				{/* Mobile Menu */}
				<div className="md:hidden">
					<Suspense>
						<MobileMenu>
							<SearchBar channel={channel} />
							<NavLinks channel={channel} />
						</MobileMenu>
					</Suspense>
				</div>
			</div>
		</nav>
	);
};
