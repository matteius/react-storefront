import { Suspense } from "react";
import { UserMenuContainer } from "./components/UserMenu/UserMenuContainer";
import { CartNavItem } from "./components/CartNavItem";
import { NavLinks } from "./components/NavLinks";
import { MobileMenu } from "./components/MobileMenu";
import { SearchBar } from "./components/SearchBar";

interface NavProps {
	channel: string;
	searchOnly?: boolean;
	actionsOnly?: boolean;
	mobileOnly?: boolean;
	linksOnly?: boolean;
}

export const Nav = ({ channel, searchOnly, actionsOnly, mobileOnly, linksOnly }: NavProps) => {
	// Search only mode - just the search bar
	if (searchOnly) {
		return <SearchBar channel={channel} />;
	}

	// Actions only mode - user menu and cart
	if (actionsOnly) {
		return (
			<div className="flex items-center gap-2 lg:gap-3">
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
			</div>
		);
	}

	// Mobile only mode - mobile menu
	if (mobileOnly) {
		return (
			<Suspense>
				<MobileMenu>
					<SearchBar channel={channel} />
					<NavLinks channel={channel} />
				</MobileMenu>
			</Suspense>
		);
	}

	// Links only mode - navigation links for the bottom row
	if (linksOnly) {
		return (
			<nav className="flex h-full w-full items-center" aria-label="Main navigation">
				<ol className="nav-links-container flex h-full w-full list-none items-center gap-1 overflow-x-auto">
					<NavLinks channel={channel} />
				</ol>
			</nav>
		);
	}

	// Default mode - original single-level navbar (fallback)
	return (
		<nav className="flex h-full w-full items-center pl-0.5" aria-label="Main navigation">
			{/* Desktop Navigation Links - Fixed space allocation */}
			<div className="hidden lg:flex lg:w-[45%] xl:w-[50%] 2xl:w-[55%]">
				<ol className="nav-links-container flex h-full w-full list-none items-center gap-1 overflow-x-auto">
					<NavLinks channel={channel} />
				</ol>
			</div>

			{/* Tablet Navigation Links - Responsive space */}
			<div className="hidden md:flex md:min-w-0 md:flex-1 lg:hidden">
				<ol className="nav-links-container flex h-full list-none items-center gap-1 overflow-x-auto">
					<NavLinks channel={channel} />
				</ol>
			</div>

			{/* Spacer for desktop */}
			<div className="hidden lg:flex lg:flex-1"></div>

			{/* Right side items - Fixed space allocation */}
			<div className="flex flex-shrink-0 items-center gap-2 lg:w-auto lg:gap-3">
				{/* Search bar - responsive sizing */}
				<div className="hidden md:flex">
					<div className="w-36 md:w-40 lg:w-44 xl:w-48">
						<SearchBar channel={channel} />
					</div>
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
