import { Suspense } from "react";
import { UserMenuContainer } from "./components/UserMenu/UserMenuContainer";
import { CartNavItem } from "./components/CartNavItem";
import { NavLinks } from "./components/NavLinks";
import { MobileMenu } from "./components/MobileMenu";
import { SearchBar } from "./components/SearchBar";

export const Nav = ({ channel }: { channel: string }) => {
	return (
		<nav className="flex h-full pl-0.5" aria-label="Main navigation">
			{/* Desktop Navigation Links */}
			<ol className="hidden h-full list-none items-center gap-1 lg:flex">
				<NavLinks channel={channel} />
			</ol>

			{/* Tablet Navigation Links */}
			<ol className="hidden h-full list-none items-center gap-1 md:flex lg:hidden">
				<NavLinks channel={channel} />
			</ol>

			{/* Right side items */}
			<div className="flex flex-1 items-center justify-end gap-3">
				{/* Search bar - tablet and desktop */}
				<div className="hidden w-64 md:flex lg:w-80">
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
