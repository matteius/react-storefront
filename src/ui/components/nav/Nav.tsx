import { Suspense } from "react";
import { UserMenuContainer } from "./components/UserMenu/UserMenuContainer";
import { CartNavItem } from "./components/CartNavItem";
import { NavLinks } from "./components/NavLinks";
import { MobileMenu } from "./components/MobileMenu";
import { SearchBar } from "./components/SearchBar";

export const Nav = ({ channel }: { channel: string }) => {
	return (
		<>
			{/* Desktop Navigation */}
			<nav className="hidden h-full pl-0.5 lg:flex" aria-label="Main navigation">
				<ol className="flex h-full list-none items-center gap-1">
					<NavLinks channel={channel} />
				</ol>
				<div className="flex flex-1 items-center justify-end gap-3">
					<div className="max-w-sm flex-1">
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
				</div>
			</nav>

			{/* Mobile/Tablet Navigation */}
			<div className="flex items-center justify-end gap-3 lg:hidden">
				{/* Search bar for tablet sizes */}
				<div className="hidden max-w-xs flex-1 md:flex">
					<SearchBar channel={channel} />
				</div>

				<Suspense fallback={<div className="w-8" />}>
					<div className="nav-icon-container">
						<UserMenuContainer />
					</div>
				</Suspense>
				<div className="flex xs:hidden">
					<Suspense fallback={<div className="w-6" />}>
						<div className="nav-icon-container">
							<CartNavItem channel={channel} />
						</div>
					</Suspense>
				</div>
				<Suspense>
					<MobileMenu>
						<SearchBar channel={channel} />
						<NavLinks channel={channel} />
					</MobileMenu>
				</Suspense>
			</div>
		</>
	);
};
