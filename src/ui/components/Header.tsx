import { Logo } from "./Logo";
import { Nav } from "./nav/Nav";

export function Header({ channel }: { channel: string }) {
	return (
		<header className="glass-effect sticky top-0 z-50 border-b border-gold-200/30 shadow-xl">
			<div className="absolute inset-0 bg-gradient-to-r from-gold-400/95 via-yellow-400/95 to-gold-500/95"></div>
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5"></div>

			{/* Two-level navbar structure */}
			<div className="container relative">
				{/* Top level - Logo, Search, User actions */}
				<div className="flex h-14 items-center justify-between lg:h-16">
					<div className="flex flex-shrink-0 items-center gap-3 lg:gap-4">
						<div className="floating-animation pulse-glow rounded-lg">
							<Logo />
						</div>
						{/* Website URL - Desktop only */}
						<div className="hidden lg:block">
							<span className="gradient-text text-lg font-semibold tracking-wide drop-shadow-sm">
								www.MattsCoinage.com
							</span>
						</div>
					</div>

					{/* Top level right side - Search and user actions */}
					<div className="flex items-center gap-2 lg:gap-3">
						{/* Search bar - visible on tablet and desktop */}
						<div className="hidden w-40 md:flex lg:w-48 xl:w-56">
							<Nav channel={channel} searchOnly />
						</div>

						{/* User menu and cart */}
						<Nav channel={channel} actionsOnly />

						{/* Mobile menu */}
						<div className="md:hidden">
							<Nav channel={channel} mobileOnly />
						</div>
					</div>
				</div>

				{/* Bottom level - Navigation links (desktop and tablet only) */}
				<div className="hidden border-t border-white/20 md:block">
					<div className="flex h-12 items-center">
						<Nav channel={channel} linksOnly />
					</div>
				</div>
			</div>
		</header>
	);
}
